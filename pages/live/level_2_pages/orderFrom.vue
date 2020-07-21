<template >
	<view class="container" :style="{height:containerHeight*0.93 + 'px'}">
		<view class="topCard">
			<view class="topBox">
				<view class="">
					{{ clientInfo.name }}
				</view>
				<view class="">
					{{ clientInfo.phoneNum }}
				</view>
			</view>
			<view class="locationBox">
				<view class="">
					{{ clientInfo.location }}
				</view>
				<image src="../../../static/imgs/arrows_r@2x.png" style="width: 14upx;height: 20upx;" mode=""></image>
			</view>
		</view>
		<view class="orderFrom">
			<view class="chackCommodityBox">
				<view >
					<view class="commodityImg">
						<image :src="commodityInfo.imgUrl" mode=""></image>
					</view>
				</view>
					<view class="rightBox">
						<view class="shopsName">
							{{ commodityInfo.shopsName }}
						</view>
						<view class="commodityName">
							{{ commodityInfo.commodityName }}
						</view>
						<view class="unitPrice">
							单价 &nbsp; ￥{{ parseInt(commodityInfo.price) }}/1次
						</view>
					</view>
			</view>
			<view class="commodityNum">
				<text>购买数量</text>
				<view class="control">
					<view class="imgBox" @click="changeNum(-1,commodityInfo.commodityId)">
						<image src="../../../static/imgs/reduce.png" mode=""></image>	
					</view>
					{{ commodityInfo.commodityNum }}
					<view class="imgBox" @click="changeNum(1,commodityInfo.commodityId)">
						<image src="../../../static/imgs/add.png" mode=""></image>	
					</view>
				</view>
			</view>
			<view class="selectTime" @click="show = true">
				<text class="left">预约服务时间</text>
				<view class="rightBox">
					<text>{{ commodityInfo.serviceTime }}</text>
					<image src="../../../static/imgs/arrows_r@2x.png" style="width: 14upx;height: 20upx;" mode=""></image>
				</view>
			</view>
			<view class="remarks">
				<text class="left">订单备注</text>
				<input class="right" v-model="commodityInfo.remarks" type="text" value="" placeholder-style="font-size:12px" placeholder="选填,填写订单备注"/>
			</view>
			
			<view class="price">
				<span>小计：</span>
				￥<text>{{ parseInt(commodityInfo.price * commodityInfo.commodityNum) }}</text>.00
			</view>
		</view>
		
		<!-- 时间弹出层 -->
		<u-select v-model="show" :list="list" @confirm="confirm" title='选择服务时间'></u-select>
		
		<view class="controlBox">
			<view class="leftBox">
				<span>合计：</span>
				￥<text>{{ commodityInfo.price * commodityInfo.commodityNum }}</text>.00
			</view>
			<view class="rightBox">
				提交订单
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				containerHeight:0,
				orderFromListHight:0,		//订单列表高度
				clientInfo:{
					name:'晓雅',
					phoneNum:'13668584685',
					location:'北京市 朝阳区三里屯北路19号三里屯太古里北区N8楼一层'
				},
				commodityInfo:{
					shopsName:'彭山新城医院',
					commodityName:'基础体检血压血糖检测常规体检',
					imgUrl:'../../../static/imgs/three.png',
					price:50,
					commodityNum:1,
					serviceTime:'请选择服务时间',
					remarks:''
				},
				show: false,		//控制选择时间弹框
				list: [
					{
						value: '1',
						label: '系统安排'
					},{
						value: '2',
						label: '每天一次'
					},{
						value: '3',
						label: '每三天一次'
					},{
						value: '4',
						label: '每周一次'
					},{
						value: '5',
						label: '每月一次'
					}
				],
			}
		},
		methods: {
			confirm(res){
				this.commodityInfo.serviceTime = res[0].label
			},
			changeNum(num,id){
				if(num == -1 && this.commodityInfo.commodityNum >1 ){
					this.commodityInfo.commodityNum += num
				}else if(num == 1){
					this.commodityInfo.commodityNum += num
				}else if(num == -1 && this.commodityInfo.commodityNum == 1){
					uni.showToast({
						icon:'none',
						title:'亲.不能再减少了哦'
					})
				}
			}
		},
		created() {
			 
		},
		mounted() {
			uni.getSystemInfo({
				success:(res)=>{
					this.containerHeight = res.windowHeight
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 14px;
		line-height: 24px;
		// background: #eeeeee;
		background-color:#f2f2f2;
		padding: 20upx 0;
		border-radius: 0 0 16upx 16upx;
		.topCard{
			width: 88%;
			margin: 0 3%;
			padding: 20upx 3% 10upx;
			background: #FFFFFF;
			border-radius: 16upx;
			.topBox{
				display: flex;
				font-size: 16px;
				:last-child{
					margin-left: 30upx;
					font-size: 12px;
					color: #686868;
				}
			}
			.locationBox{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #505050;
				:nth-child(1){
					width: 90%;
					font-size: 12px;
				}
			}
		}
		
		.orderFrom{
			width: 88%;
			margin: 0 3%;
			padding: 20upx 3% 10upx;
			margin-top: 20upx;
			background: #FFFFFF;
			border-radius: 16upx;
				
			//商品样式
			.chackCommodityBox{
				display: flex;
				padding: 10upx 0;
				.commodityImg{
					width: 180upx;
					height: 180upx;
					margin-right: 20upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.rightBox{
					display: flex;
					flex-direction: column;
					.shopsName{
						font-size: 30upx;
						color: #282828;
						font-weight: bold;
					}
					.commodityName{
						width: 98%;
						color: #666;
						font-size: 28upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.unitPrice{
						color: #666;
						font-size: 22upx;
					}
				}
			}
			.commodityNum{
				margin: 20upx 0 0 30upx;
				display: flex;
				justify-content: space-between;
				.control{
					width: 20%;
					display: flex;
					justify-content: space-between;
					align-items: center;
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
			.selectTime{
				margin: 20upx 0 0 30upx;
				display: flex;
				align-items: center;
				.left{
					width: 35%;
				}
				.rightBox{
					font-size: 12px;
					width: 65%;
					color: #707070;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
			.remarks{
				margin: 20upx 0 0 30upx;
				display: flex;
				align-items: center;
				.left{
					width: 35%;
				}
				.right{
					width: 65%;
					font-size: 12px;
				}
			}
			.price{
				padding: 20upx 0;
				display: flex;
				justify-content: flex-end;
				
				color: #EC7171;
				font-size: 24upx;
				span{
					color: #000000;
				}
				text{
					font-size: 38upx;
				}
			}
			
		}
		
		.controlBox{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: fixed;
			bottom: 0;
			width: 100%;
			background: #FFFFFF;
			height: 100upx;
			.leftBox{
				display: flex;
				justify-content: flex-end;
				margin-right: 20upx;
				color: #EC7171;
				font-size: 24upx;
				span{
					color: #000000;
				}
				text{
					font-size: 38upx;
				}
			}
			.rightBox{
				display: flex;
				align-items: center;
				background: linear-gradient(to right,#ff7e14,#f35404);
				margin-right: 20upx;
				padding: 10upx 40upx;
				border-radius: 40upx;
				color: #FFFFFF;
			}
		}
	}
</style>
