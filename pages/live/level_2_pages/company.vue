<template>
	<view class="container">
		<view class="topBox">
			<view class="box">
				<view class="cardBox">
					<view class="leftBox">
						<image src="../../../static/imgs/one.png" mode=""></image>
					</view>
					<view class="rightBox">
						<view class="titleBox">
							{{ companyData.name }}
						</view>
						<view class="certification">
							<view class="leftBox_1">
								<text>单位资质</text>
								<view class="type" >{{ companyData.certification[0] }}</view>
								<view class="type" >{{ companyData.certification[1] }}</view>
							</view>
							<image src="../../../static/imgs/arrows_r@2x.png" style="width: 10upx;height: 20upx;" mode=""></image>
						</view>
						<view class="gradeBox">
							<image src="../../../static/imgs/bf.png" mode=""></image>
							{{ companyData.grade }}
						</view>
					</view>
				</view> 
				<view class="tabbarBox">
					<view class="leftBox">
						<view class="tagBox" :class="index == activeClass ? 'active' : ''" v-for="(item, index) in topTag" :key="index" @click="changeTag(item, index)">
							{{ item.name }}
						</view>
					</view>
					<view class="rightBox">
						<view class="controlBox" @click="show = true">
							<image src="../../../static/imgs/shaixuan@2x.png" mode=""></image>
							<text>筛选</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<scroll-view class="goodsListContainer" scroll-y="true" :style="{height:goodsListHeight + 'px' }">
			<view class="goodsBox" v-for="(item, index) in companysList" :key="index" @click="goToPage(item)">
				<view class="leftBox"><image :src="item.imgUrl" mode=""></image></view>
				<view class="rightBox">
					<view class="goodsName">{{ item.name }}</view>
					<view class="goodsStar">
						<text>{{ '已售' + item.sales + '+' }}</text>
						<text>{{ '评价' + item.comment + '+' }}</text>
					</view>
					<view class="price">单价 {{ '￥' + item.price }}/1次</view>
					<view class="explain">
						<text>说明：</text>
						1年12次体检，支持预约时间1年12次体检，支持预约时间
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 筛选弹出层 -->
		<u-popup class="popup" v-model="show" mode="right" border-radius="26" width="70%" :closeable="true">
			<view class="popupBox">
				<view class="caption">筛选</view>
				<view class="contentBox"></view>
		
				<view class="cotrol" ><u-button class="custom-style" type="warning" @click="show = false" shape="circle" :ripple="true" ripple-bg-color="#ffee00">确定</u-button></view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyData:'',		//公司数据
				goodsList:'',		//商品列表
				activeClass: 0, //选项卡默认激活项
				show: false, //弹出层控制
				topBox:0,
				goodsListHeight:200, //
				topTag: [
					{
						name: '综合排名'
					},
					{
						name: '信用排名'
					},
					{
						name: '销量'
					}
				],
				companysList: [
					{
						name: '新城医疗中心（良乡）',
						imgUrl: '../../../static/imgs/one.png',
						grade: '4.3',
						price: 300,
						sales: 213,
						comment: 233,
						type: ['体检', '医疗', '交流'],
						appraise: ['服务好，专业', '很贴心'],
						certification:['执业许可','医师证','卫生许可证']
					},
					{
						name: '新城医疗中心（良乡）',
						imgUrl: '../../../static/imgs/three.png',
						grade: '4.3',
						price: 300,
						sales: 213,
						comment: 233,
						type: ['体检', '医疗', '交流'],
						appraise: ['服务好，专业', '很贴心'],
						certification:['执业许可','医师证','卫生许可证']
					},
					{
						name: '新城医疗中心（良乡）',
						imgUrl: '../../../static/imgs/three.png',
						grade: '4.3',
						price: 300,
						sales: 213,
						comment: 233,
						type: ['体检', '医疗', '交流'],
						appraise: ['服务好，专业', '很贴心'],
						certification:['执业许可','医师证','卫生许可证']
					},
					{
						name: '万合一家医疗中心（房山）',
						imgUrl: '../../../static/imgs/one.png',
						grade: '4.3',
						price: 300,
						sales: 213,
						comment: 233,
						type: ['体检', '医疗', '交流'],
						appraise: ['服务好，专业', '很贴心'],
						certification:['执业许可','医师证','卫生许可证']
					},
					{
						name: '万合一家医疗中心（绿地缤纷城）',
						imgUrl: '../../../static/imgs/three.png',
						grade: '4.3',
						price: 300,
						sales: 213,
						comment: 233,
						type: ['体检', '医疗', '交流'],
						appraise: ['服务好，专业', '很贴心'],
						certification:['执业许可','医师证','卫生许可证']
					},
					{
						name: '万合一家医疗中心（绿地缤纷城）',
						imgUrl: '../../../static/imgs/three.png',
						grade: '4.3',
						price: 300,
						sales: 213,
						comment: 233,
						type: ['体检', '医疗', '交流'],
						appraise: ['服务好，专业', '很贴心'],
						certification:['执业许可','医师证','卫生许可证']
					}
				]
				
			}
		},
		methods: {
			changeTag(res, index) {
				this.activeClass = index;
			},
			//获取元素高度
			async getHeightFun(){
				uni.createSelectorQuery().in(this).select('.topBox').boundingClientRect(data => {
					this.topBox = data.height
					// console.log(this.topBox)
				}).exec();
			},
			goToPage(res){
				uni.navigateTo({
					url:'../../../pages/live/level_2_pages/commodityDetails?data=' + JSON.stringify(res)
				})
			}
			
		},
		onLoad(option) {
			if(option.data){
				this.companyData = JSON.parse(option.data);
				// console.log(this.companyData)
			}
		},
		created() {
			
		},
		mounted() {
			// 获取元素高度
			this.getHeightFun()
			
		},
		onNavigationBarButtonTap(){
		
		},
		watch: {
			topBox:function(){
				// 获取设备信息
				uni.getSystemInfo({
					success:(res)=>{
						this.goodsListHeight = res.windowHeight - this.topBox - res.statusBarHeight - 44;
						// console.log(res.windowHeight,res.statusBarHeight, this.topBox,this.goodsListHeight)
					}
				})
			}
			
		},
	}
</script>

<style lang="scss">
	.active {
		font-weight: bold;
		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			top: auto;
			left: 50%;
			margin-left: -18upx;
			height: 4upx;
			width: 36upx;
			background-color: #ffe300;
		}
	}
	//弹出层
	.popup {
		height: 96%;
		top: 2%;
		.popupBox {
			height: 88%;
			padding: 10% 4% 0;
			.caption {
				color: #afafaf;
			}
			.contentBox {
				
			}
		}
		.cotrol {
			width: 92%;
			position: fixed;
			display: flex;
			bottom: 2%;
			.custom-style {
				width: 400upx;
				height: 70upx;
				background: #ffe300;
				color: #000000;
			}
		}
	}
	
	.container {
		font-size: 14px;
		line-height: 24px;
		.topBox {
			// width: 96%;
			// position: fixed;
			// z-index: 999;
			// padding: 2%;
			height: 390upx;
			// height: 10%;
			// background:#ffe300;
			
			.box{
				height: 10%;
				background:#ffe300;
				width: 96%;
				position: fixed;
				z-index: 999;
				padding: 2%;
			
				.cardBox{
					width: 92%;
					background: #ffffff;
					display: flex;
					padding: 4%;
					border: 1px solid #ddd;
					border-radius:16upx ;
					.leftBox {
						margin-right: 20upx;
						width: 200upx;
						height: 200upx;
						image {
							height: 100%;
							width: 100%;
						}
					}
					.rightBox{
						font-size: 12px;
						width: 65%;
						.titleBox{
							font-size: 16px;
						}
						.certification{
							display: flex;
							align-items: center;
							justify-content: space-between;
							.leftBox_1{
								display: flex;
								align-items: center;
								text{
									color: #8f8f8f;
									padding: 0 !important;
								}
								.type {
									line-height: 24upx;
									margin: 6upx 0;
								}
								:first-child {
									padding-right: 20upx;
								}
								:not(:first-child ) {
									padding: 0 20upx;
									border-left: 1px solid #878ba1;
								}
							}
						}
						.gradeBox {
							color: #ff9500;
							image {
								width: 20upx;
								height: 20upx;
							}
						}
					}
				}
				
				.tabbarBox{
					display: flex;
					.leftBox {
						width: 70%;
						// padding-left:20upx ;
						display: flex;
						justify-content: space-between;
						.tagBox {
							display: flex;
							align-items: center;
							height: 100upx;
							// border-bottom: 2px solid #FFE300;
							position: relative;
						}
					}
					.rightBox {
						width: 25%;
						// padding-right:20upx ;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						.controlBox {
							display: flex;
							align-items: center;
							image {
								width: 28upx;
								height: 28upx;
								margin-right: 16upx;
							}
						}
					}
					
				}
			
			}
		}
		
		.goodsListContainer {
			// padding-top: 400upx;
			
			.goodsBox {
				padding: 0 2% 40upx;
				display: flex;
				.leftBox {
					margin-right: 20upx;
					width: 200upx;
					height: 200upx;
					image {
						height: 100%;
						width: 100%;
					}
				}
				.rightBox {
					font-size: 12px;
					color: #878ba1;
					.goodsName {
						width: 450upx;
						font-size: 16px;
						color: #2b2b33;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; //溢出不换行
					}
					.goodsStar {
						display: flex;
						:not(:first-child) {
							margin-left: 20upx;
						}
					}
					.explain{
						width: 450upx;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; //溢出不换行
					}
				}
			}
		}
		
		
	}
</style>
