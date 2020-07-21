<template>
	<view class="containerBox" :style="{ background: commonColor }">
		<view class="titleBox" ref='titleBox'>
			<view class="leftBox">
				购物车
			</view>
			<view class="rightBox" @click="changeBottomControl">{{ this.bottomControl == true ? '管理' : '完成' }}</view>
		</view>
		<!-- 未到指定距离 隐藏 -->
		<view class="showTitleBox" v-if="scrollTopChild > 40">
			<view class="leftBox">
				购物车（
					<text>{{ this.shopCarNum }}</text>
					）
			</view>
			<view class="rightBox" @click="changeBottomControl">{{ this.bottomControl == true ? '管理' : '完成' }}</view>
		</view>
		
		<view class="commodityContainer" :style="{height:commodityListHeight + 'px' }">
			<view class="commodityBox" >
				<view v-for="(item, index) in commodityList" :key="index" style="padding-bottom: 60upx;">
					<!-- 用户选中 -->
					<u-checkbox-group class="userTitleBox">
						<u-checkbox 
						:name="item.userName" 
						v-model="item.checkUser" 
						@change="checkUser(item)" 
						shape="circle" 
						activeColor="#FFE300" 
						icon-size="36">
							<view class="username">
								{{ item.userName }}
							</view>
						</u-checkbox>
						<view class="location">
							{{ item.location }}
						</view>
						<view>
							<image src="../../static/imgs/arrows_r@2x.png" class="imgBox"></image>
						</view>
					</u-checkbox-group>
					
					<!-- 用户商品选中 -->
					<view class="commodityList" v-for="(list,index) in item.orderForm" :key='index'>
						<u-checkbox-group class="chackCommodityBox">
							<u-checkbox 
							shape="circle" 
							activeColor="#FFE300" 
							icon-size="36"
							@change="checkCommodity(list)"
							v-model="list.checkCommodity">
								<view class="commodityImg">
									<image :src="list.imgUrl" mode=""></image>
								</view>
							</u-checkbox>
								<view class="rightBox">
									<view class="commodityName">
										{{ list.name }}
									</view>
									<view class="commodityIntroduce">
										{{ list.content }}
									</view>
									<view class="commodityStar">
										<view class="imgBox">
											<image src="../../static/imgs/xingxing.png" mode=""></image>	
										</view>
										{{ list.star }}
									</view>
									<view class="unitPrice">
										单价 &nbsp; ￥{{ list.price }}/1次
									</view>
								</view>
						</u-checkbox-group>
						<view class="commodityBottom">
							<view class="price">
								￥<text>{{ list.price * list.number }}</text>.00
							</view>
							<view class="control">
								<view class="imgBox" @click="changeNum(-1,list.commodityId)">
									<image src="../../static/imgs/reduce.png" mode=""></image>	
								</view>
								{{ list.number }}
								<view class="imgBox" @click="changeNum(1,list.commodityId)">
									<image src="../../static/imgs/add.png" mode=""></image>	
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部结算 控制栏 -->
		<view class="footerBox">
			<view class="footerLeft">
				<u-checkbox-group>
					<u-checkbox 
					v-model="checkAll" 
					@change="checkboxAll" 
					name="checkAll" 
					shape="circle" 
					activeColor="#FFE300" 
					icon-size="36">
						全选
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<!-- 结算相关 -->
			<view class="rightMainBox" v-if="this.bottomControl == true ">
				<view class="rightMainBox_left">
					合计：
					<text class="number">￥{{ this.totalMoney }}.00</text>
				</view>
				<view class="rightMainBox_right">
					<view class="txetBox">
						结算（
						<text>{{ this.commodityNumAll }}</text>
						）
					</view>
				</view>
			</view>
			<!-- 删除 移动至收藏夹 -->
			<view class="rightMainBox" v-if="this.bottomControl == false ">
				<view class="rightRemoveBox_left" @click="removeFavorite">
					移至收藏夹
				</view>
				<view class="rightRemoveBox_right" @click="deleteGoods">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	//获取到顶部高度数据
	props:['scrollTopChild'],
	data() {
		return {
			scrollTopMsg:0,			//据顶部高度
			commonColor: '',		//全局颜色
			bottomControl:true,		//顶部控件 负责切换底部结算/删除控件
			checkAll: false,		//是否选中全选
			commodityListHeight: 0, //商品容器高度
			favoriteList:[],		//收藏夹列表
			commodityList: [
				{	
					userId:1,
					userName: '张倩倩',
					location: '北京市朝阳区三里屯北路19号三里屯太古里',
					checkUser: false,
					orderForm: [
						{
							name: '彭山新城医院',
							commodityId:1,
							imgUrl:'../../static/imgs/touxiang.png',
							content: '基础体检血压血糖检测常规体规体',
							checkCommodity:false,
							star: 4.8,
							price: 50,
							number:1
						},
						{
							name: '彭山新城医院',
							commodityId:2,
							imgUrl:'../../static/imgs/touxiang_01.png',
							content: '基础体检血压血糖检测常规体规体',
							checkCommodity:false,
							star: 4.8,
							price: 50,
							number:1
						}
					]
				},
				{	
					userId:2,
					userName: '萧蔷',
					location: '北京市朝阳区三里屯北路19号三里屯太古里',
					checkUser: false,
					orderForm: [
						{
							name: '彭山新城医院',
							commodityId:3,
							imgUrl:'../../static/imgs/touxiang.png',
							content: '基础体检血压血糖检测常规体规体',
							checkCommodity:false,
							star: 4.8,
							price: 50,
							number:1
						},
						{
							name: '彭山新城医院',
							commodityId:4,
							imgUrl:'../../static/imgs/touxiang_01.png',
							content: '基础体检血压血糖检测常规体规体',
							checkCommodity:false,
							star: 4.8,
							price: 50,
							number:1
						},
						{
							name: '彭山新城医院',
							commodityId:5,
							imgUrl:'../../static/imgs/touxiang_01.png',
							content: '基础体检血压血糖检测常规体规体',
							checkCommodity:false,
							star: 4.8,
							price: 50,
							number:1
						}
					]
				},
				{
					userId:3,
					userName: '张倩倩',
					location: '北京市朝阳区三里屯北路19号三里屯太古里',
					checkUser: false,
					orderForm: [
						{
							name: '彭山新城医院',
							commodityId:1,
							imgUrl:'../../static/imgs/touxiang.png',
							content: '基础体检血压血糖检测常规体规体',
							checkCommodity:false,
							star: 4.8,
							price: 500,
							number:1
						}
					]
				},
				
			]
		};
	},
	
	computed:{
		//合计金额
		totalMoney(){
			let total = 0 ;
			for (let i in this.commodityList) {
				this.commodityList[i].orderForm.filter(item=>{
					if(item.checkCommodity == true){
						total += item.price * item.number
					}
				})
			}
			return total
		},
		
		//合计商品数量
		commodityNumAll(){
			let that = this;
			let commodityNum = 0 ;
			for (let i in this.commodityList) {
				let iList = [];
				iList = this.commodityList[i].orderForm.filter(item=>{
					return item.checkCommodity == true 
				})
				if(typeof(iList[0])!="undefined"){
					iList.map(item1=>{
						commodityNum += item1.number
					})
				}
			}
			return commodityNum;
		},
		
		//商品种类数量
		shopCarNum(){
			let goodsNum = 0 ;
			for (let i in this.commodityList) {
				this.commodityList[i].orderForm.map(item=>{
					goodsNum++
				})
			}
			return goodsNum
		}
		
	},
	watch:{
		
	},
	methods: {
		//切换控件 结算与删除
		changeBottomControl(){
			this.bottomControl = this.bottomControl == true ? false : true ;
		},
		
		//移动至收藏夹
		removeFavorite(){
			let list = [];
			this.commodityList.map((item)=>{
				item.orderForm.filter((i)=>{
					if(i.checkCommodity == true){
						list.push(i)
					}
				})
			})
			this.favoriteList = list
			//提示判断
			if(	this.favoriteList.length == 0 ){
				uni.showToast({
					icon:'none',
					title:"还未选择新商品"
				})
			}else if(list.length != 0){
				uni.showToast({
					title:"已移动至收藏夹"
				})
			}
		},
		
		//删除商品
		deleteGoods(){
			for (let i = this.commodityList.length - 1; i>= 0; i--) {
				//处理单个选中进行删除
				if(this.commodityList[i].orderForm){
					this.commodityList[i].orderForm = this.commodityList[i].orderForm.filter((item)=>{
						return item.checkCommodity != true
					})	
				}
				//处理选中一个商家进行删除
				if(this.commodityList[i].checkUser == true){
					this.commodityList.splice(i,1)
				}
			}
			
			
			this.commodityList.length == 0 ? this.checkAll = false : '' ;
				
				
			
			
		},
		
		//改变商品数量
		changeNum(Num,Id){
			let list = '';
			for (let i = 0; i < this.commodityList.length; i++) {
				list = this.commodityList[i].orderForm.filter((item)=>{
					return item.commodityId == Id
				})[0]
				if(typeof(list)!="undefined"){
					if(Num == -1 && list.number >1 ){
						list.number += Num
					}else if(Num == 1){
						list.number += Num
					}
				}
			}
		},
		
		// 全选
		checkboxAll(e) {
			//用户名全选
			if(this.checkAll == true){
				this.commodityList.filter(item=>{
					item.checkUser = true;
				})
			}else if(this.checkAll == false){
				this.commodityList.filter(item=>{
					item.checkUser = false;
				})
			}
			//商品全选
			for (let i in this.commodityList) {
				this.commodityList[i].orderForm.filter(item=>{
					if(this.checkAll == true){
						item.checkCommodity = true;
					}else if(this.checkAll == false){
						item.checkCommodity = false;
					}
				})
			}
		},
		
		//用户名选中
		checkUser(res) {
			var list = []; //选中的用户
			//处理点击用户的全选与全消  商品自动同步
			if(res.checkUser == true){
				res.orderForm.filter(item=>{
					item.checkCommodity = true
				})
			}else if(res.checkUser == false){
				res.orderForm.filter(item=>{
					item.checkCommodity = false
				})
			}
			//过滤出选中的用户
			list = this.commodityList.filter(item=>{
				return item.checkUser == true;
			})
			//全部选中则全选 有一个为选中则取消全选中
			if(this.commodityList.length == list.length){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}
			
		},
		
		//商品选中
		checkCommodity(res){
			var list = [];
			for (let i in this.commodityList) {
				let iList = [];
				iList = this.commodityList[i].orderForm.filter(item=>{
					return item.checkCommodity == true 
				})
				if(typeof(iList)!="undefined" && iList.length >0){
					if(iList.length == this.commodityList[i].orderForm.length){
						this.commodityList[i].checkUser = true;
					}else{
						this.commodityList[i].checkUser = false;
					}
				}else if(iList.length == 0){
					//单独处理 只有一项时 取消商品选中iList为空的情况
					this.commodityList[i].checkUser = false;
				}
			}
			//过滤出选中的用户
			list = this.commodityList.filter(item=>{
				return item.checkUser == true;
			})
			//全部选中则全选 有一个为选中则取消全选中
			if(this.commodityList.length == list.length){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}
		},
	},
	
	created() {
		//获取全局颜色
		this.commonColor = this.commonColorAll;
		// 获取设备信息
		uni.getSystemInfo({
			success: res => {
				this.commodityListHeight = res.windowHeight - 70 - 40 -54;
				// console.log(res.windowHeight)
			}
		});
		
	},
	
	mounted() {
		
	}
	
	
	
};
</script>

<style lang="scss">
.containerBox {
	font-size: 14px;
	line-height: 24px;
	// height: 100%;
	position: relative;
	
	.showTitleBox {
		width: 96%;
		// width: 100%;
		height: 100upx;
		top: 0upx;
		color: #282828;
		background: #FFE300;
		position: fixed;
		display: flex;
		justify-content: space-between;
		// justify-content: space-around;
		align-items: flex-end;
		padding: 20upx 2%;
		z-index: 999;
		.leftBox {
			font-weight: 600;
			font-size: 18px;
		}
	}
	
	.titleBox {
		padding: 0 24upx;
		padding-top:100upx ;
		height: 80upx;
		color: #282828;
		background: #FFE300;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.leftBox {
			font-weight: 600;
			font-size: 18px;
		}
	}
	
	.commodityContainer {
		// min-height:80% ;
		padding: 32upx 0 0;
		border-radius: 20upx 20upx 0 0;
		background: #fff;
		.commodityBox {
			padding: 0 24upx 248upx 24upx;
			.userTitleBox {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				.username {
					color: #ff9500;
					font-weight: bold;
					font-size: 16px;
				}
				.location {
					width: 60%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.imgBox {
					width: 10upx;
					height: 20upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.commodityList{
				padding-bottom: 20upx;
				//商品样式
				.chackCommodityBox{
					display: flex;
					padding: 30upx 0 10upx;
					.commodityImg{
						width: 180upx;
						height: 180upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.rightBox{
						display: flex;
						flex-direction: column;
						.commodityName{
							font-size: 30upx;
							color: #282828;
							font-weight: bold;
						}
						.commodityIntroduce{
							width: 90%;
							color: #666;
							font-size: 28upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.commodityStar{
							color: #FEB34A;
							font-size: 24upx;
							display: flex;
							.imgBox{
								width: 20upx;
								height: 20upx;
								image{
									width: 100%;
									height: 100%;
								}
							}
						}
						.unitPrice{
							color: #666;
							font-size: 22upx;
						}
					}
				}
				// 商品底部控件
				.commodityBottom{
					display: flex;
					justify-content: space-between;
					.price{
						width: 80%;
						display: flex;
						justify-content: center;
						color: #EC7171;
						font-size: 24upx;
						text{
							font-size: 38upx;
						}
					}
					.control{
						width: 20%;
						display: flex;
						justify-content: space-between;
						.imgBox{
							width: 40upx;
							height: 40upx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}

	.footerBox {
		width: 100%;
		height: 108upx;
		background: #fff;
		position: fixed;
		bottom: 140upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.footerLeft {
			
		}
		.rightMainBox{
			display: flex;
			justify-content: flex-end;
			min-width: 70%;
			//结算相关
			.rightMainBox_left {
				font-weight: bold;
				display: flex;
				align-items: center;
				color: #282828;
				font-size: 14px;
				margin-right: 20upx;
				.number {
					font-weight: lighter;
					color: #ec7171;
				}
			}
			.rightMainBox_right {
				width: 218upx;
				height: 88upx;
				background: #ec7171;
				border-radius: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				.txetBox {
					color: #fff;
				}
			}
			//控制商品相关
			.rightRemoveBox_left{
				height: 56upx;
				width: 180upx;
				font-size: 12px;
				color:#FF9500 ;
				border-radius: 40upx;
				border: 1upx solid #FF9500;
				margin-right: 10upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.rightRemoveBox_right{
				width: 140upx;
				height: 56upx;
				font-size: 12px;
				color: #EC7171;
				border-radius: 40upx;
				border: 1upx solid #EC7171;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
		}
	}
}
</style>
