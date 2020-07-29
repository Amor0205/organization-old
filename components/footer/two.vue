<template>
	<view class="box">
		<!-- 头部 -->
		<view class="headBox">
			<!-- 头部服务时间 -->
			<view class="headBoxLeft">
				<view class="serviceing">
					正在服务中
				</view>
				<view class="servicestate">
					当前服务状态(已服务时间)
				</view>
			</view>
			<view class="headBoxright">
				<view class="timer">
					00
				</view>
				<view class="" style="line-height: 80rpx;">
					:
				</view>
				<view class="timer">
					00
				</view>
			</view>

		</view>
		<!-- 服务详细情况 -->
		<view class="particular">
			<view class="cylinder">
			</view>
			<view class="specific" v-for="(item,index) in orderList" :key='index'>
				<view class="orderList">
					<view class="orderListTop">
						<view class="orderListLeft">
							<image :src="item.imgs" mode="" class="orderListimgs"></image>
						</view>
						<view class="orderListRight">
							<view class="name">
								{{item.name}}
							</view>
							<view class="serviceSite">
								{{item.serviceSite}}
							</view>
						</view>
					</view>

					<view class="centerBox">
						<view class="listBox">
							<view class="leftBox">服务内容</view>
							<view class="rightBox">{{ item.genre }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">约定服务时间</view>
							<view class="rightBox">{{ item.appointTime }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">商品备注</view>
							<view class="rightBox">{{ item.remark }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">订单编号</view>
							<view class="rightBox">{{ item.orderNumber }}</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 服务项目记录 -->
			<view class="baseBox">
				<view class="order">
					<view class="orderLeft">
						订单服务状态
					</view>
					<view class="orderRight">
						<view class="refresh">
							<image src="../../static/imgs/shuaxin.png" mode="" class="refreshImg"></image>
						</view>
						<view class="renewal">
							更新状态
						</view>
					</view>
				</view>

				<view class="order">
					<view class="orderLeft">
						定位
					</view>
					<view class="" style="font-size: 28rpx; color: #00DB39;">
						定位成功
					</view>
				</view>
				<view class="order">
					<view class="orderLeft">
						确定服务项目
					</view>
					<view class="orderRight">
						<view class="decided">
							待确定
						</view>
						<view class="arrows">
							<image src="../../static/imgs/arrows_r@2x.png" mode="" class="arrowsImg"></image>
						</view>

					</view>
				</view>
				<view class="order">
					<view class="orderLeft">
						拍摄服务前照片
					</view>
					<view class="orderRight">
						<view class="decided">
							待拍摄
						</view>
						<view class="arrows">
							<image src="../../static/imgs/arrows_r@2x.png" mode="" class="arrowsImg"></image>
						</view>

					</view>
				</view>
			</view>

			<view class="refer">
				提交服务
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		//获取到顶部高度数据
		props: ['scrollTopChild'],
		data() {
			return {
				scrollTopMsg: 0, //据顶部高度
				commonColor: '', //全局颜色
				popupShow: false, //
				topGapHeight: 0, //顶部间隙
				// active:false,
				orderList: [{
					imgs: '../../static/imgs/photo.png',
					orderNumber: 'DABH23244743442342',
					name: '萧蔷',
					genre: '打扫卫生',
					appointTime: '2020年02月02日 23:22',
					remark: '请尽量下午上门，谢谢。',
					serviceSite: "四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				}],


			};
		},

		computed: {


		},
		watch: {

		},
		methods: {},
		created() {

		},
		mounted() {
			setTimeout(res => {
				uni.createSelectorQuery().in(this).select('.headBox').boundingClientRect(data => {
					this.topGapHeight = data.height
					console.log(this.topGapHeight)
				}).exec();
			})

		},
		watch: {
			topGapHeight: function() {

			}
		}



	};
</script>

<style lang="scss">
	.box {
		padding-bottom: 450upx;

		.headBox {
			width: 94%;
			height: 300rpx;
			background: #FFE300;
			padding: 100rpx 3% 0 3%;
			display: flex;
			justify-content: space-between;
			position: absolute;

			.headBoxLeft {

				.serviceing {
					font-size: 36rpx;
				}

				.servicestate {
					font-size: 24rpx;
				}
			}

			.headBoxright {
				display: flex;

				.timer {
					width: 80rpx;
					height: 80rpx;
					background: #FFE300;
					border: 5rpx solid #D0BA00;
					border-radius: 10rpx;
					line-height: 80rpx;
					text-align: center;
				}
			}
		}

	}

	//服务对象信息
	.particular {
		position: relative;
		top: 250rpx;

		.cylinder {
			width: 96%;
			height: 20rpx;
			background: #D6C200;
			margin: 0 auto;
			border-radius: 30rpx;
			box-shadow: darkgrey 0px 0px 1px 2px; //边框阴影
			z-index: 999;
		}

		.specific {
			width: 92%;
			margin-top: -10rpx;
			background: #f5f5f5;
			margin: 0 auto;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 20px;
			border-radius: 10rpx;
			opacity: 1;

			.orderList {
				.orderListTop {
					display: flex;
					padding: 30rpx 0rpx 0rpx 20rpx;

					.orderListLeft {
						width: 100rpx;
						height: 100rpx;

						.orderListimgs {
							width: 100rpx;
							height: 100rpx;
						}
					}

					.orderListRight {
						margin-left: 20rpx;

						.name {
							font-size: 36rpx;
						}

						.serviceSite {
							font-size: 28rpx;
							color: #878BA1;
						}
					}
				}

				.centerBox {
					padding: 60rpx 0rpx 0rpx 20rpx;

					.listBox {
						display: flex;
						padding-bottom: 60upx;

						.leftBox {
							width: 35%;
							color: #878BA1;
							font-size: 28rpx;
						}

						.rightBox {
							width: 70%;
							color: #282828;
							font-size: 28rpx;
						}
					}
				}

			}
		}
	}

	// 底部服务项目记录
	.baseBox {
		width: 92%;
		margin: 0 auto;
		padding-top: 70rpx;

		.order {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 60rpx;

			.orderLeft {
				font-size: 32rpx;
			}

			.orderRight {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.refresh {
					width: 28rpx;
					height: 28rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-right: 10rpx;

					.refreshImg {
						width: 28rpx;
						height: 28rpx;
						color: #878BA1;

					}
				}

				.renewal {
					font-size: 24rpx;
					color: #878BA1;
				}
			}
		}

		.decided {
			font-size: 28rpx;
			margin-right: 20rpx;
			color: #878BA1;
		}

		.arrows {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 10rpx;
			height: 20rpx;

			.arrowsImg {
				width: 10rpx;
				height: 20rpx;
			}
		}
	}

	.refer {
		width: 90%;
		height: 100rpx;
		background: #E6E6E6;
		margin: 0 auto;
		line-height: 100rpx;
		text-align: center;
		border-radius: 50rpx;
	}
</style>
