<template>
	<view class="box">
		<!-- 头部 -->
		<!-- {{ success }} -->
		<view class="headBox">
			<!-- 头部服务时间 -->
			<view class="headBoxLeft">
				<view class="serviceing" v-show="!rockon">
					暂无服务订单
				</view>
				<view class="serviceing" v-show="rockon">
					正在服务中
				</view>
				<!-- <view class="servicestate">
					当前服务状态(已服务时间)
				</view> -->
			</view>
			<!-- <view class="headBoxright">
				<view class="timer">
					{{hours}}
				</view>
				<view class="" style="line-height: 80rpx;">
					:
				</view>
				<view class="timer">
					{{minutes}}
				</view>
				<view class="" style="line-height: 80rpx;">
					:
				</view>
				<view class="timer">
					{{seconds}}
				</view>

			</view> -->

		</view>
		<!-- 服务详细情况 -->
		<view class="particular">

			<view class="information">
				<!-- v-if="this.jxz.length>0" -->
				<view class="specific">
					<view class="orderList" v-if="this.jxz">
						<view class="orderListTop">
							<view class="orderListLeft">
								<image :src="jxz.beImg" mode="" class="orderListimgs"></image>
							</view>
							<view class="orderListRight">
								<view class="name">
									{{jxz.consumer}}
								</view>
								<view class="serviceSite">
									{{jxz.address}}
								</view>
							</view>
						</view>

						<view class="centerBox">
							<view class="listBox">
								<view class="leftBox">服务内容</view>
								<view class="rightBox">{{jxz.content}}</view>
							</view>
							<view class="listBox">
								<view class="leftBox">约定服务时间</view>
								<view class="rightBox">{{ time }}</view>
							</view>
							<view class="listBox">
								<view class="leftBox">商品备注</view>
								<view class="rightBox">{{ jxz.bz }}</view>
							</view>
							<view class="listBox">
								<view class="leftBox">订单编号</view>
								<view class="rightBox">{{ jxz.id }}</view>
							</view>
						</view>
					</view>
					<view class="available" style="" v-else>
						<view class="availables">
							暂无进行中订单
						</view>
					</view>
				</view>



				<!-- 	<view class="" v-else>
				暂无进行中订单
			</view> -->
			</view>
			<!-- 服务项目记录 -->
			<view class="baseBox">
				<view class="order">
					<view class="orderLeft">
						订单服务状态
					</view>
					<view class="orderRight" @click="departAnimation">
						<view class="refresh">
							<image src="../../static/imgs/shuaxin.png" mode="" class="refreshImg" :class=" animationTag?'rotation':'' "></image>
						</view>
						<view class="renewal">
							更新状态
						</view>
					</view>
				</view>

				<view class="order" @click="goToPage('verification')">

					<view class="orderLeft">
						用户验证
					</view>
					<view class="" style="font-size: 28rpx; color: #00DB39;" v-if="verify==true">
						验证成功
					</view>
					<view class="orderRight" v-else>
						<view class="decided">
							去验证
						</view>
						<view class="arrows">
							<image src="../../static/imgs/arrows_r@2x.png" mode="" class="arrowsImg"></image>
						</view>
					</view>
				</view>
				<view class="" v-if="this.userInfo.flag==1">

				</view>
				<view class="order" @click="goToPage('confirmProject')" v-else>
					<view class="orderLeft">
						确定服务项目
					</view>
					<view class="" style="font-size: 28rpx; color: #00DB39;" v-if="selects==true">
						验证成功
					</view>
					<view class="orderRight" v-else>
						<view class="decided">
							待选择
						</view>
						<view class="arrows">
							<image src="../../static/imgs/arrows_r@2x.png" mode="" class="arrowsImg"></image>
						</view>
					</view>
				</view>

				<view class="order" @click="goToPage('beforeShooting')">
					<view class="orderLeft">
						拍摄服务前视频
					</view>
					<view class="" style="font-size: 28rpx; color: #00DB39;" v-if="fronts==true">
						上传成功
					</view>
					<view class="orderRight" v-else>
						<view class="decided">
							待拍摄
						</view>
						<view class="arrows">
							<image src="../../static/imgs/arrows_r@2x.png" mode="" class="arrowsImg"></image>
						</view>

					</view>
				</view>
				<view class="order" @click="goToPage('selectiveFocus')">
					<view class="orderLeft">
						拍摄服务后视频
					</view>
					<view class="" style="font-size: 28rpx; color: #00DB39;" v-if="queens==true">
						上传成功
					</view>
					<view class="orderRight" v-else>
						<view class="decided">
							待拍摄
						</view>
						<view class="arrows">
							<image src="../../static/imgs/arrows_r@2x.png" mode="" class="arrowsImg"></image>
						</view>

					</view>
				</view>
			</view>
			<view class="refer" v-if='serves==true' @click="present">
				结束服务
			</view>
			<view class="refer" v-else @click="start">
				开始服务
			</view>

		</view>
		<!-- <view class="">
				定位{{nowLocation}}
			</view> -->
	</view>
</template>

<script>
	import {
		getservice,
		getend,
		getFinished
	} from '../../src/ajax.js'
	export default {
		//获取到顶部高度数据
		props: ['scrollTopChild'],
		data() {
			return {
				scrollTopMsg: 0, //据顶部高度
				commonColor: '', //全局颜色
				popupShow: false, //
				topGapHeight: 0, //顶部间隙
				serves: '',
				nums: '',
				rockon: false,
				hours: '',
				minutes: '',
				seconds: '',
				nowLocation: '', //定位
				location: 1,
				tokens: '',
				id: '', //用户id
				time: '', //时间转换
				jxz: {},
				userInfo: '',
				flag: '', //登录身份的区分
				verify: '', //验证码
				fronts: '', //服务前
				queens: '', //服务后
				selects: '', //项目选择
				number:[],  //确定服务项目
				picture:'',//保存服务前的视频
				ids: '',
				animationTag: false, //动画标识
				status: 3,
				currentPage: 1, //当前页数,
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
		methods: {
			//前往页面
			goToPage(res) {
				switch (res) {
					case 'verification':
						//确认项目
						uni.navigateTo({
							url: '../../pages/two/verification'
						})
						break;
					case 'confirmProject':
						// if(this.serves == true){
						//确认项目
						uni.navigateTo({
							url: '../../pages/two/confirmProject'
						})
						// }else{
						// 	uni.showLoading()
						// 	uni.showToast({
						// 		title: '请先开始服务',
						// 		icon: 'none'
						// 	})
						// }

						break;
						// 服务前视频
					case 'beforeShooting':
						// if (this.verify == true) {
						//确认项目
						uni.navigateTo({
							url: '../../pages/two/beforeShooting'
						})
						// } else {
						// 	uni.showLoading()
						// 	uni.showToast({
						// 		title: '请先完成验证',
						// 		icon: 'none'
						// 	})
						// }
						break;
						// 服务后视频
					case 'selectiveFocus':
						if (this.serves == true) {
							uni.navigateTo({
								url: '../../pages/two/selectiveFocus'
							})
						} else {
							uni.showLoading()
							uni.showToast({
								title: '请先开始服务',
								icon: 'none'
							})
						}

						break;

					default:
						break;
				}
			},

			start() {
				if (this.verify == true || this.front == true||this.selects) {
					console.log(111);
					this.serves = !this.serves
					this.rockon = true
					//计时器开始计数
					var hour, minute, second; /*时 分 秒*/
					hour = minute = second = 0; //初始化
					var millisecond = 0; //毫秒
					this.timer = setInterval(() => {
						millisecond = millisecond + 50;
						// console.log("---millisecond----"+millisecond);
						if (millisecond >= 1000) {
							millisecond = 0;
							second = second + 1;
						}
						if (second >= 60) {
							second = 0;
							minute = minute + 1;
						}
						if (minute >= 60) {
							minute = 0;
							hour = hour + 1;
						}
						// this.nums = hour+'时'+minute+'分'+second+'秒';
						this.hours = hour + '时';
						this.minutes = minute + '分';
						this.seconds = second + '秒'
						// console.log(this.seconds);
					}, 50);
					if (this.userInfo.flag == 1) {
						getservice(
							this.jxz.id,
						).then(res => {
							console.log(res);
							if (res.data.code === 2000) {
								uni.setStorageSync('serves', true)
								uni.showLoading()
								uni.showToast({
									title: '开始服务',
									icon: 'none'
								})
							} else {
								uni.showToast({
									icon: "none",
									title: res.data.message
								})
							}
						})
					} else if (this.userInfo.flag == 2) {
						getservice(
							this.jxz.id,
							this.number.name
						).then(res => {
							console.log(res);
							if (res.data.code === 2000) {
								uni.setStorageSync('serves', true)
								uni.showLoading()
								uni.showToast({
									title: '开始服务',
									icon: 'none'
								})
							} else {
								uni.showToast({
									icon: "none",
									title: res.data.message
								})
							}
						})
					}

				} else {
					uni.showLoading()
					uni.showToast({
						title: '请先验证和上传服务前的视频',
						icon: 'none'
					})
				}
			},



			// // 开始服务
			// start() {
			// 	if (this.verify == true || this.front == true || this.select == true) {

			// 		this.serves = !this.serves
			// 		this.rockon = true
			// 		//计时器开始计数
			// 		var hour, minute, second; /*时 分 秒*/
			// 		hour = minute = second = 0; //初始化
			// 		var millisecond = 0; //毫秒
			// 		this.timer = setInterval(() => {
			// 			millisecond = millisecond + 50;
			// 			// console.log("---millisecond----"+millisecond);
			// 			if (millisecond >= 1000) {
			// 				millisecond = 0;
			// 				second = second + 1;
			// 			}
			// 			if (second >= 60) {
			// 				second = 0;
			// 				minute = minute + 1;
			// 			}
			// 			if (minute >= 60) {
			// 				minute = 0;
			// 				hour = hour + 1;
			// 			}
			// 			// this.nums = hour+'时'+minute+'分'+second+'秒';
			// 			this.hours = hour + '时';
			// 			this.minutes = minute + '分';
			// 			this.seconds = second + '秒'
			// 			// console.log(this.seconds);
			// 		}, 50);

			// 		getservice(
			// 			this.jxz.id,
			// 		).then(res => {
			// 			console.log(res);
			// 			if (res.data.code === 2000) {
			// 				uni.setStorageSync('serves', true)
			// 				uni.showLoading()
			// 				uni.showToast({
			// 					title: '开始服务',
			// 					icon: 'none'
			// 				})
			// 			} else {
			// 				uni.showToast({
			// 					icon: "none",
			// 					title: res.data.message
			// 				})
			// 			}
			// 		})


			// 	} else {
			// 		uni.showLoading()
			// 		uni.showToast({
			// 			title: '请先验证和上传服务前的视频',
			// 			icon: 'none'
			// 		})
			// 	}
			// },
			//结束服务
			present() {
				if (this.queens == true) {
					clearInterval(this.timer);
					this.timer = null;
					getend(
						this.jxz.id
					).then(res => {
						if (res.data.code === 2000) {
							console.log(res);
							uni.removeStorageSync('all')
							uni.removeStorageSync('scode')
							uni.removeStorageSync('front')
							uni.removeStorageSync('queen')
							uni.removeStorageSync('serves')
							uni.removeStorageSync('picture')
							uni.removeStorageSync('select')
							uni.removeStorageSync('number')
							uni.removeStorageSync('picture')
							uni.hideLoading()
							uni.showToast({
								title: '提交成功'
							})

							// 获取当前页
							var pages = getCurrentPages(); //当前页
							// console.log(pages);
							// 改变页面（h5页面跟app不一样）
							pages[0].$vm.activeData(2)
							// 改变底部组件index
							pages[0].$vm.changeBar(2)

						}
					})
				} else {
					uni.showToast({
						title: '请先上传服务后的视频',
						icon: 'none'
					})
				}

			},

			//更新数据旋转动画
			departAnimation() {
				if (this.animationTag == false) {
					this.animationTag = true;
					console.log(this.animationTag)
					setTimeout(res => {
						this.animationTag = false;
					}, 2000)
				}
			},
			//获取已完成订单
			getEndS() {
				getFinished(
					this.userInfo.id,
					this.userInfo.belong,
					this.status,
					this.currentPage
				).then(res => {
					if (res.data.code === 2000) {
						// console.log(res);
						this.services = res.data.data.services.services
						console.log(this.services);
						this.time = new Date(new Date(new Date(res.data.data.services.services[0].createTime).toJSON()) + 8 * 3600 *
							1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
						console.log(this.time);
						this.times = new Date(new Date(new Date(res.data.data.services.services[0].beginTime).toJSON()) + 8 * 3600 *
							1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
						console.log(this.times);
					}
				})
			}
		},

		created() {
			//获取验证成功以后的状态
			this.verify = uni.getStorageSync('scode')
			//获取上传服务前视频成功以后的状态
			this.fronts = uni.getStorageSync('front')
			//获取上传服务后视频成功以后的状态
			this.queens = uni.getStorageSync('queen')
			// console.log(this.queens);
			//获取开始服务成功以后的状态
			this.serves = uni.getStorageSync('serves')
			// console.log(this.serves);
			// 获取确定项目成功以后的状态
			this.selects = uni.getStorageSync('select')
			// console.log(this.select);
			//获取保存的视频
			this.picture = uni.getStorageSync('picture')
			console.log(this.picture);
			this.userInfo = uni.getStorageSync('userInfo')
			// console.log(this.userInfo);
			//获取从待开始订单传过来的数据
			this.jxz = uni.getStorageSync('all')
			// console.log(this.jxz);
			this.success = uni.getStorageSync('success')
			// console.log(this.success);
			// this.gethand() // this.getNowLocation()
			this.tokens = uni.getStorageSync('token')
			// console.log(this.tokens);
			this.number = uni.getStorageSync('number')
			console.log(this.number);
			// console.log(this.number.name);
		},
		mounted() {
			setTimeout(res => {
				uni.createSelectorQuery().in(this).select('.headBox').boundingClientRect(data => {
					this.topGapHeight = data.height
					// console.log(this.topGapHeight)
				}).exec();
			})


		},
		onLoad() {
			this.getEndS()
		},
		onShow() {

		},
		watch: {
			topGapHeight: function() {

			}
		},
		onUnload: function() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		// onLoad(option) {
		// 	this.ids = option.id
		// 	console.log(this.ids);
		// },



	};
</script>

<style lang="scss">
	.box {
		padding-bottom: 420upx;

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
					font-size: 30rpx;
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
		}

		.information {
			// margin-top: -10rpx;
			position: relative;
			top: -10rpx;

			.specific {
				width: 92%;
				margin-top: -10rpx;
				background: #f5f5f5;
				margin: 0 auto;
				box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 20px;
				border-radius: 0rpx 0rpx 10rpx 10rpx;
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

	// 动画旋转
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.rotation {
		animation: rotation 1.3s linear 2;
	}

	//暂无订单显示
	.available {
		width: 345rpx;
		height: 500rpx;
		text-align: center;
		line-height: 500rpx;

		.availables {
			width: 345rpx;
			height: 500rpx;
			margin-left: 170rpx;
		}
	}
</style>
