<template>
	<view class="containerBox">
		<!-- 蒙版 -->
		<view class="mask" v-show="popupShow" @click="showPopup" @touchmove.stop.prevent='moveHandle'></view>
		<!-- 头部 -->
		<view class="titleBox">
			<view class="inputBox" @click="goToPage('search')">
				<view class="centerBox">
					<image src="../../static/imgs/sousuo@2x.png" mode=""></image>
					<text>请输入你想搜索的内容</text>
				</view>
			</view>
			<!-- 查看全部 -->
			<view class="controlBox">
				<view class="topBox">
					<view class="leftBox" @click="showPopup">
						<text>查看全部</text>
				
						<image src="../../static/imgs/xx.png" style="width: 14upx;height: 10upx;margin-left: 4upx;" mode=""></image>
					</view>
					<view class="rightBox">
						{{ locationList[locationIndex] }}
					</view>
				</view>
				
				<view class="bottomBox" v-show="popupShow">
					<text class="title">
						城区筛选
					</text>
					<view class="locationBox">
						<view class="locationList" @click="changeLocation(index)" :class="index == locationIndex?'active':''" v-for="(item,index) in locationList"
						 :key='index'>
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="orderListBox" v-for="(item,index) in orderList" :key='index'>
				<!-- 间隔行 -->
				<u-gap height="14" bg-color="#e5e5e5"></u-gap>
				<view class="outerListBox">
					<view class="topBox">
						<text>{{ item.genre }}</text>
						
					</view>
					<view class="centerBox">
						<view class="listBox">
							<view class="leftBox">服务对象</view>
							<view class="rightBox">{{ item.object }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">约定服务时间</view>
							<view class="rightBox">{{ item.appointTime }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">服务完成时间</view>
							<view class="rightBox">{{ item.endtime }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">商品备注</view>
							<view class="rightBox">{{ item.remark }}</view>
						</view>

					<view class="base">
						<view class="baseBox">
							<view class="speed">
								响应速度
							</view>
							<view class="score">
								<view class="scoreImg">
									<image :src="item.imgs" mode="" class="scoreImgs"></image>
								</view>
								<view class="responsespeed">
									{{ item.responsespeed }}
								</view>
							</view>
						</view>
						<view class="baseBox">
							<view class="speed">
								服务时效
							</view>
							<view class="score">
								<view class="scoreImg">
									<image :src="item.imgs" mode="" class="scoreImgs"></image>
								</view>
								<view class="responsespeed">
									{{ item.responsespeed }}
								</view>
							</view>
						</view>
						<view class="baseBox">
							<view class="speed">
								专业程度
							</view>
							<view class="score">
								<view class="scoreImg">
									<image :src="item.imgs" mode="" class="scoreImgs"></image>
								</view>
								<view class="responsespeed">
									{{ item.responsespeed }}
								</view>
							</view>
						</view>
					</view>

					</view>

				</view>
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
					genre: '打扫卫生',
					orderNumber: 'DABH23244743442342',
					object: '萧蔷',
					appointTime: '2020年02月02日 23:22',
					endtime: '2020年02月03日 23:22',
					remark: '请尽量下午上门，谢谢。',
					responsespeed: '4.8',
					servicetime: '5.0',
					professionalism: '6.0',
					imgs: '../../static/imgs/bf.png'
				}, {
					genre: '打扫卫生',
					orderNumber: 'DABH23244743442342',
					object: '萧蔷',
					appointTime: '2020年02月02日 23:22',
					endtime: '2020年02月03日 23:22',
					remark: '请尽量下午上门，谢谢。',
					responsespeed: '4.8',
					servicetime: '5.0',
					professionalism: '6.0',
					imgs: '../../static/imgs/bf.png',

				}, {
					genre: '打扫卫生',
					orderNumber: 'DABH23244743442342',
					object: '萧蔷',
					appointTime: '2020年02月02日 23:22',
					endtime: '2020年02月03日 23:22',
					remark: '请尽量下午上门，谢谢。',
					responsespeed: '4.8',
					servicetime: '5.0',
					professionalism: '6.0',
					imgs: '../../static/imgs/bf.png',
				}, ],
				locationList: ['城西社区', '凤鸣社区', '西青社区', '青羊区', '郫都区'],
				locationIndex: 0,
			};
		},

		computed: {


		},
		watch: {

		},
		methods: {
			goToPage(e) {
				switch (e) {
					case 'search':
						uni.navigateTo({
							url: '../../pages/three/search'
						})
						break;
					case 'map':
						uni.navigateTo({
							url: '../../pages/map'
						})
						break;
					default:
						break;
				}
			},
		//控制popup的显示
		showPopup(){
			this.popupShow = !this.popupShow
		},
		//处理蒙版显示时不允许屏幕滚动
		moveHandle (){},
		// 切换地点
		changeLocation(index){
			this.locationIndex = index;
		}

		},

		created() {

		},
		mounted() {
			setTimeout(res => {
				uni.createSelectorQuery().in(this).select('.titleBox').boundingClientRect(data => {
					this.topGapHeight = data.height
					// console.log(this.topGapHeight)
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
	.active {
		border: 1px #FFE300 solid !important;
		background: #FFFBDE !important;
		color: #FF9500 !important;

	}

	.containerBox {
		font-size: 14px;
		line-height: 24px;
		// height: 100%;
		position: relative;
		padding-bottom: 140upx;

		//蒙版
		.mask {
			width: 100%;
			height: 100%;
			background: rgba($color: #626262, $alpha: 0.5);
			position: absolute;
			z-index: 299;
		}

		.titleBox {
			padding: 0 2%;
			padding-top: 100upx;
			width: 96%;
			color: #282828;
			position: fixed;
			background: #FFFFFF;
			z-index: 399;

			.inputBox {
				width: 100%;
				background: #E8E8E8;
				border-radius: 30px;
				height: 64upx;
				display: flex;
				align-items: center;
				justify-content: center;

				.centerBox {
					display: flex;
					align-items: center;
					color: #a9a9a9;

					image {
						width: 32upx;
						height: 32upx;
						margin-right: 16upx;
					}
				}
			}

			.controlBox {
				.topBox {
					margin-top: 40upx;
					padding-bottom: 20upx;
					display: flex;
					justify-content: space-between;

					.leftBox {
						display: flex;
						align-items: center;
					}

					.rightBox {
						color: #4d4d4d;
					}
				}

				.bottomBox {
				
					padding-bottom: 40upx;

					.title {
						display: inline-block;
						margin-bottom: 20upx;
					}

					.locationBox {
						display: flex;
						flex-wrap: wrap;

						.locationList {
							margin: 0 0 20upx 2.5%;
							width: 30%;
							line-height: 60upx;
							display: flex;
							align-items: center;
							justify-content: center;
							border: 1px #F2F2F2 solid;
							border-radius: 4px;
							background: #fefefe;
							color: #878787;
						}
					}
				}

			}


		}

		.contentBox {
			padding-top: 272upx;

			.orderListBox {
				.outerListBox {
					padding: 20upx 2%;

					.topBox {
						display: flex;
						justify-content: space-between;
						padding-bottom: 40upx;

						.endTime {
							color: #EC7171;
						}
					}

					.centerBox {
						.listBox {
							display: flex;
							padding-bottom: 20upx;

							.leftBox {
								width: 30%;
								color: #878BA1;
							}

							.rightBox {
								width: 70%;
								color: #282828;
							}
						}
					}



					.bottomBox {
						display: flex;
						justify-content: flex-end;

						.buttonBox {
							color: #666666;
							border: 1upx solid #666666;
							border-radius: 40upx;
							padding: 0 24upx;
							margin-left: 20upx;
						}
					}
				}

			}
		}
	}
	// 评价
.base{
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 30rpx;
	.baseBox {
		display: flex;
	
		.speed {
			color: #878BA1;
		}
	
		.score {
			display: flex;
			justify-content: cenert;
			margin-left: 10rpx;
			.scoreImg {
				width: 20rpx;
				height: 20rpx;
	
				.scoreImgs {
					width: 20rpx;
					height: 20rpx;
				}
			}
	
			.responsespeed {
				font-size: 12rpx;
				color: #FEB34A;
			}
		}
	}
}
</style>
