<!-- 个人中心 -->
<template>
	<view>
		<!-- 头部 -->
		<view class="head">
			<view class="profilePhoto">
				<view class="timg">
					<image :src="this.userInfo.avatar" class="timgImg"></image>
				</view>
				<!-- <view class="serial">
					{{this.userInfo.name}}
				</view> -->
				<!-- <view class="flowBox" :style="{color:item.color}" v-if="item.show == 0" v-for="(item,index) in flow" :key='index'>
					{{ item.title }}
				</view> -->
				<view class="flowBox1" v-if="this.userInfo.status==0">
					上班
				</view>
				<view class="flowBox2" v-else-if="this.userInfo.status==1">
					休闲
				</view>
				<view class="flowBox3" v-else-if="this.userInfo.status==3">
					下班
				</view>
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
				<view class="withoutRight" v-if="this.userInfo.status==0">
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
			<view class="offDuty" v-if='duty==true' @click="beDuty">
				上班
			</view>
			<view class="offDutys" v-else @click="offDuty ">
				下班
			</view>
		</view>
		<!-- 弹出层 -->
		<view class="">
			<!-- :mask-close-able='close' -->
			<u-popup v-model="show" mode="center" border-radius="30" :closeable='closeable' width="500rpx" height="400rpx">
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
	import { workStatus } from '../../src/ajax.js'
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
			//退出登录
			goOut() {
				// 清除token
				uni.setStorageSync('token', '')
				// 清除userInfo
				uni.setStorageSync("userInfo", '')
				uni.navigateTo({
					url: '../login/login'
				})
			},
			//下班
			offDuty() {
				this.duty = true

			},
			//上班
			beDuty() {
				this.duty = false
				this.show = true
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
		},
		created() {
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			this.userInfo.avatar = 'http://' + this.userInfo.avatar
			console.log(this.userInfo);
		},
		mounted() {},
		onLoad() {

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
	.flowBox1 {
		width: 120rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1upx solid;
		border-radius: 20rpx;
		font-size: 12px;
		line-height: 40rpx;
		margin: 20rpx auto;
			color: #70d95d
	}

	.flowBox2 {
		width: 120rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1upx solid;
		border-radius: 20rpx;
		font-size: 12px;
		line-height: 40rpx;
		margin: 20rpx auto;
		color: #3fbebe;
	}

	.flowBox3 {
		width: 120rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1upx solid;
		border-radius: 20rpx;
		font-size: 12px;
		line-height: 40rpx;
		margin: 20rpx auto;
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
</style>
