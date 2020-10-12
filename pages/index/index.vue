<template>
	<view class="box" :style="{'padding-top':statusBarHeights + 'px'}">
		<view class="top">
			<view class="timg">
				<image src="../../static/imgs/timg.jpg" class="timgImg"></image>
			</view>
			<view class="touxiang">
				<image src='../../static/imgs/touxiang.png' class="touxiangImg"></image>
			</view>
		</view>
		<view class="service">
			服务人员管理系统
		</view>
		<!-- 四个按钮 -->
		<view class="button">
			<view class="" v-for="(item,index) in serve" :key='index'>
				<u-button type="primary" shape="circle" class="u-button"  @click="goTo(item)">{{item.title}}</u-button>
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
				serve:[
					{
						title:'进行中订单'
					},{
						title:'老人求助'
					},{
						title:'日常巡视'
					},{
						title:'主动服务'
					},
				]
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
				width: 80rpx;
				height: 80rpx;

				.touxiangImg {
					width: 100%;
					height: 100%;
				}
			}

		}

		.service {
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
			}
		}
	}
</style>
