<!-- 个人中心 -->
<template>
	<view>
		<!-- 头部 -->
		<view class="headPortraitBox">
			<view class="imgBox" @click="uploadPic">
				<image :src="this.userInfo.avatar ? this.userInfo.avatar : headPortraitDefault" mode=""></image>
				<view class="iconBox">
					<image src="../../static/imgs/camera_fill.png" mode=""></image>
				</view>
			</view>
		</view>
		<view>
			<view class="flowBox box_1" v-if="this.userInfo.status == 0">
				上班
			</view>
			<view class="flowBox box_2" v-else-if="this.userInfo.status == 1">
				空闲
			</view>
			<view class="flowBox box_3" v-else-if="this.userInfo.status == 2">
				忙碌
			</view>
			<view class="flowBox box_4" v-else-if="this.userInfo.status == 3">
				下班
			</view>
		</view>
		<!-- 中间 -->
		<view class="middle">
			<view class="without">
				<view class="withoutLeft">
					姓名
				</view>
				<view class="withoutRight">
					{{this.userInfo.name}}
				</view>
			</view>
			<view class="without">
				<view class="withoutLeft">
					性别
				</view>
				<view class="withoutRight" v-if="this.userInfo.sex == 1 ">
					女
				</view>
				<view class="withoutRight" v-else>
					男
				</view>
			</view>
			<view class="without">
				<view class="withoutLeft">
					手机号
				</view>
				<view class="withoutRight">
					{{this.userInfo.tel}}
				</view>
			</view>
			<view class="without" v-for="(item,index) in personal" :key='index' @click="goTo(item)">
				<view class="withoutLeft">
					{{item.title}}
				</view>
				<view class="rightwards">
					<image :src="item.imgs" class="rightwardsImg"></image>
				</view>
			</view>
			<!-- <view class="without">
				<view class="withoutLeft">
					关于我们
				</view>
				<view class="rightwards">
					<image src="../../static/imgs/xiangyous.png" class="rightwardsImg"></image>
				</view>
			</view>
			<view class="without">
				<view class="withoutLeft">
					巡视已完成订单
				</view>
				<view class="rightwards">
					<image src="../../static/imgs/xiangyous.png" class="rightwardsImg"></image>
				</view>
			</view>
			<view class="without">
				<view class="withoutLeft">
					求助已完成订单
				</view>
				<view class="rightwards">
					<image src="../../static/imgs/xiangyous.png" class="rightwardsImg"></image>
				</view>
			</view> -->
		</view>
		<!-- 底部 -->
		<view class="base">
			<view class="outlogin" @click="goOut">
				退出登录
			</view>
			<view class="offDuty" v-if='duty == true' @click="beDuty">
				上班
			</view>
			<view class="offDutys" v-else @click="offDuty ">
				下班
			</view>
		</view>
		<!-- 弹出层 -->
		<view class="">

			<u-popup v-model="show" mode="center" border-radius="30" :mask-close-able='close' :closeable='closeable' width="500rpx"
			 height="400rpx">
				<view class="">
					<view class="hint">
						温馨提示
					</view>
					<view class="refresh">请到指定地点进行刷卡上班</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		workStatus,
		getuserinfo
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				userInfo: '', //用户信息
				duty: true,
				show: false,
				closeable: false,
				close: false,
				headPortraitDefault: '../../static/imgs/xiangyous.png', //显示默认图片
				uploadPicData: '', //上传图片数据
				personal: [{
					title: '修改密码',
					imgs: '../../static/imgs/xiangyous.png'
				}, {
					title: '巡视已完成订单',
					imgs: '../../static/imgs/xiangyous.png'
				}, {
					title: '求助已完成订单',
					imgs: '../../static/imgs/xiangyous.png'
				}, {
					title: '关于我们',
					imgs: '../../static/imgs/xiangyous.png'
				}, ]
			}
		},
		methods: {
			// 头像上传
			uploadPic() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						this.userInfo.avatar = tempFilePaths[0]
						this.uploadPicData = tempFilePaths[0]
						var _this = this;
						uni.showLoading({
							title: '上传中'
						});
						// console.log(this.uploadPicData)
						// if(this.uploadPicData){
						uni.uploadFile({
							url: 'http://110.187.88.70:21605/elder/upAvatar', //仅为示例，非真实的接口地址
							filePath: this.uploadPicData,
							name: 'file',
							header: {
								'Authorization': 'Bearer ' + _this.tokens
							},
							formData: {
								type:'0',
								id:this.userInfo.id
							},
							success: (res) => {
								uni.hideLoading()
								if (res.data.code == 2000) {
									console.log(res);
									this.getuser()
									uni.showToast({
										title: '上传成功'
									})
								}
							}
						});
					}
				});
			},
			//退出登录
			goOut() {
				// 清除token
				uni.setStorageSync('token', '')
				// 清除userInfo
				uni.setStorageSync("userInfo", '')
				uni.reLaunch({
					url: '../login/login'
				})
			},
			//下班
			offDuty() {
				var _this = this;
				uni.showModal({
					title: '温馨提示',
					content: '下班',
					success: function(res) {
						if (res.confirm) {
							_this.duty = true
							//改变工作状态 0上班 1空闲 2忙碌 3下班 4上班等待刷卡
							workStatus(
								_this.userInfo.id,
								3
							).then(res => {
								if (res.data.code == 2000) {
									_this.userInfo.status = 3;
									uni.setStorageSync('userInfo', _this.userInfo)
									console.log('上班')
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '取消退出'
							})
						}
					}
				});
			},
			//上班
			beDuty() {
				this.duty = false
				this.show = true

				if (this.duty == false) {
					//改变工作状态 0上班 1空闲 2忙碌 3下班 4上班等待刷卡
					workStatus(
						this.userInfo.id,
						4
					).then(res => {
						if (res.data.code == 2000) {
							_this.userInfo.status = 4;
							uni.setStorageSync('userInfo', this.userInfo)
							console.log('上班')

						}
					})
				}
			},

			// 按钮跳转
			goTo(res) {
				switch (res.title) {
					case '修改密码':
						uni.navigateTo({
							url: '../forget/forget'
						})
						break;
					case '巡视已完成订单':
						uni.navigateTo({
							url: './tour'

						})
						break;
					case '求助已完成订单':
						uni.navigateTo({
							url: './recourse'
						})
						break;
					case '关于我们':
						uni.navigateTo({
							url: './about'
						})
						break;
					default:
						break;
				}
			},
			//重新获取用户信息
			getuser() {
				getuserinfo(
					this.userInfo.id
				).then(res => {
					if (res.data.code == 2000) {
						console.log('获取用户信息')
						this.userInfo = res.data.data.employee
						uni.setStorageSync('userInfo', res.data.data.employee)
					}
				})
			}
		},
		created() {
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			// this.userInfo.avatar = 'http://' + this.userInfo.avatar
			if (this.userInfo.status != 3) {
				this.duty = false;
			}
			console.log(this.userInfo);
			if(this.userInfo==''){
				this.getuser()
			}
			
		},
		mounted() {},
		onLoad() {
			//#ifdef APP-PLUS
			var jyJPush = this.jyJPush;
			var _this = this;
			//监听透传
			jyJPush.addJYJPushCustomReceiveNotificationListener(result => {
				//  监听成功后，若收到推送，会在result返回对应的数据
				var type
				var content
				if (JSON.parse(result.extra).type) {
					type = JSON.parse(result.extra).type
				}
				if (JSON.parse(result.extra).content) {
					content = JSON.parse(result.extra).content
				}
				console.log(result)
				/**
				 * 0巡视订单 1求助报警(普通弹框) 2协助订单(普通弹框)
				 * 3上班刷卡成功 4巡视订单刷卡
				 * 5求助订单刷卡  6协助订单刷卡 
				 */

				// if(type == 3){
				// 	//改变工作状态 0上班 1空闲 2忙碌 3下班 4上班等待刷卡
				// 	workStatus(
				// 		_this.userInfo.id,
				// 		1
				// 	).then(res=>{
				// 		console.log(res)
				// 		if(res.data.code == 2000){
				uni.showToast({
					title: content,
					icon: 'none'
				})
				_this.show = false;
				_this.getuser()

				// 		}
				// 	})
				// }
			})
			//#endif

		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.head {
		width: 100%;
		height: 300rpx;
		// background-color: skyblue;
		position: relative;

		.profilePhoto {
			width: 250rpx;
			height: 250rpx;
			position: absolute;
			top: 50;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;

			.timg {
				width: 150rpx;
				height: 150rpx;
				margin: 0 auto;
				border: 1rpx solid gray;
				border-radius: 50%;

				.timgImg {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}
			}

			.serial {
				text-align: center;
				margin-top: 30rpx;
			}

		}
	}

	//中间部分
	.middle {
		margin-top: 30rpx;
		padding: 0rpx 20rpx 20rpx 20rpx;
		font-size: 34rpx;

		.without {
			width: 100%;
			height: 50rpx;
			border-bottom: 1rpx solid #f0edea;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 50rpx;

			.withoutLeft {
				color: #676666;
			}

			.withoutRight {
				color: #676666;
			}

			.rightwards {
				width: 50rpx;
				height: 50rpx;

				.rightwardsImg {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

	}

	//底部
	.base {

		.outlogin {
			width: 80%;
			height: 80rpx;
			background: #FFE300;
			line-height: 80rpx;
			text-align: center;
			margin: 0 auto;
			border-radius: 50rpx;

		}

		.offDuty {
			width: 80%;
			height: 80rpx;
			background: #FFE300;
			line-height: 80rpx;
			text-align: center;
			margin: 0 auto;
			border-radius: 50rpx;
			margin-top: 50rpx;

		}

		.offDutys {
			width: 80%;
			height: 80rpx;
			background: #c7c7c7;
			line-height: 80rpx;
			text-align: center;
			margin: 0 auto;
			border-radius: 50rpx;
			margin-top: 50rpx;

		}

	}

	//状态显示
	.flowBox {
		width: 120rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1upx solid;
		border-radius: 20rpx;
		font-size: 12px;
		line-height: 40rpx;
		margin: 30rpx auto;
	}

	.box_1 {
		color: #4dbc47
	}

	.box_2 {
		color: #3fbebe;
	}

	.box_3 {
		color: #ff1313;
	}

	.box_4 {
		color: #c3c4c6;
	}

	//弹出层
	.hint {
		text-align: center;
		padding-top: 20rpx;
		font-size: 16px;
	}

	.refresh {
		text-align: center;
		margin-top: 150rpx;
		font-size: 16px;
		font-weight: 700;
		color: #009c00;
	}

	//上传头像
	.headPortraitBox {
		height: 250upx;
		display: flex;
		justify-content: center;
		position: relative;

		.imgBox {
			height: 180upx;
			width: 180upx;
			position: absolute;
			bottom: 30upx;

			image {
				border-radius: 50%;
				width: 100%;
				height: 100%;
			}
		}

		.iconBox {
			width: 60upx;
			height: 60upx;
			background: #FFE300;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 0upx;
			right: 0;

			image {
				border-radius: 0;
				width: 36upx;
				height: 36upx;
			}
		}
	}
</style>
