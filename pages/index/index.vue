<template>
	<view class="box">
		<view class="top">
			<view class="timg">
				<image src="../../static/imgs/timg.jpg" class="timgImg"></image>
			</view>
			<view class="touxiang" @click="personal">
				<image src='../../static/imgs/touxiang.png' class="touxiangImg"></image>
			</view>
		</view>
		<view class="service">
			服务人员管理系统
		</view>
		<!-- 四个按钮 -->
		<view class="button">
			<view class="abc" v-for="(item,index) in serve" :key='index'>
				<u-button type="info" shape="circle"  class="u-button" @click="goTo(item)">{{item.title}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {


		},
		props: {},
		data() {
			return {
				statusBarHeights: '',
				serve: [{
					title: '进行中订单',
					flag: ''
				}, {
					title: '老人求助'
				}, {
					title: '日常巡视'
				}, {
					title: '主动服务'
				}, ]
			}
		},
		methods: {
			// 按钮跳转
			goTo(res) {
				switch (res.title) {
					case '进行中订单':
						uni.navigateTo({
							url: '../underway/underway'
						})
						break;
					case '老人求助':
						uni.navigateTo({
							url: '../seekHelp/present/present'
						})
						break;
					case '日常巡视':
						uni.navigateTo({
							url: '../dailyPatrol/dailyPatrol'

						})
						break;
					case '主动服务':
						uni.navigateTo({
							url: '../initiative/initiative?'
						})
						break;
					default:
						break;
				}
			},
			personal() {
				uni.navigateTo({
					url: '../personal/personal'
				})
			}
		},
		created() {
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res.statusBarHeight);
					this.statusBarHeights = res.statusBarHeight
					// console.log(this.statusBarHeights);



				}
			});
		},
		mounted() {

		},

		onLoad() {

		},
		onShow() {

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
	.box {
		// background-image: url(../../static/imgs/ss.jpg);
		background-size: contain;
		background-repeat:no-repeat;
		// margin-top: 100rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 100rpx 20rpx 0rpx 20rpx;

			.timg {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;

				.timgImg {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.touxiang {
				width: 70rpx;
				height: 70rpx;

				.touxiangImg {
					width: 100%;
					height: 100%;
				}
			}

		}

		.service {
			font-size: 22px;
			font-weight: 700;
			text-align: center;
			margin-top: 100rpx;
		}

		.button {
			margin: 0 auto;
			padding-top: 100rpx;

			.u-button {
				width: 450rpx;
				height: 100rpx;
				font-size: 18px;
				margin-bottom: 80rpx;
				color: black;
				background: #FFE300;
			}
		}
	}
</style>
