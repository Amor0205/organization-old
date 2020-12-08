<!-- 老人求助 -->
<template>
	<view class="box">
		<view class="hint" v-if="!underway.length">
			暂无求助任务
		</view>
		<view class="underwayItem" v-for="(item,index) in underway" :key='index'>
			<view class="">
				<view class="underway">
					<view class="underwayLeft">
						名字 :
					</view>
					<view class="underwayRight">
						{{item.elderName}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						求助时间 :
					</view>
					<view class="underwayRight">
						{{item.createTime}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						任务类型:
					</view>
					<view class="underwayRight">
						{{item.content}}
					</view>
				</view>
				<!-- <view class="underway">
					<view class="underwayLeft">
						求助方式:
					</view>
					<view class="underwayRight">
						{{item.helpMethod}}
					</view>
				</view> -->
				<view class="underway">
					<view class="underwayLeft">
						求助位置:
					</view>
					<view class="underwayRight">
						{{item.location}}
					</view>
				</view>
			</view>
			<view class="button" @click="goTo(item)">
				服务
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getSeekhelp,
		receiveOrder
	} from '../../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				userInfo: '', //个人信息
				underway: [], //求助列表
			}
		},
		methods: {
			goTo(res) {
				uni.showLoading({
					title: '正在接取任务'
				})
				//接单  单号：前缀加单号  X 巡视  A报警 H协助
				receiveOrder(
					'A' + res.id,
					this.userInfo.id
				).then(res_1 => {
					// uni.hideLoading()
					if (res_1.data.code == 2000) {
						uni.hideLoading()
						uni.navigateTo({
							// url:`../taskDetails/taskDetails?all=${res.item}`,
							// url: '../taskDetails/taskDetails',
							url: '../taskDetails/taskDetails?data=' + JSON.stringify(res)
						})
					} else {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: res_1.data.message
						})
					}
				})

			},
			// 获取求助列表
			getlist() {
				uni.showLoading({
					title: "正在加载"
				})
				getSeekhelp(
					this.userInfo.regionId,
					'1',
					this.userInfo.id
				).then(res => {
					uni.hideLoading()
					if (res.data.code == 2000) {
						this.underway = res.data.data.alarmLogs
						console.log(this.underway);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err);
				})
			}
		},
		created() {
			// 获取userInfo
			// this.userInfo = uni.getStorageSync('userInfo')
			// // console.log(this.userInfo);
			// // this.getlist()
		},
		onShow() {
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			this.getlist()
		},
		mounted() {

		},
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
	.box {
		padding: 20rpx 20rpx 0rpx 20rpx;
	}

	.underwayItem {
		// width: 100%;
		// height: 600rpx;
		background-color: #f2f2f3;
		margin-bottom: 30rpx;
		font-size: 16px;
		border-radius: 30rpx;
		padding: 20rpx;

		.underway {
			display: flex;
			margin-bottom: 20rpx;
			// padding: 20rpx 20rpx 0rpx 20rpx;
			padding-top: 10rpx;

			.underwayLeft {
				width: 180rpx;
				height: 50rpx;

			}

			.underwayRight {
				// margin-left: 20rpx;

			}
		}

		.button {
			width: 300rpx;
			height: 80rpx;
			font-size: 16px;
			margin: 0 auto;
			margin-top: 50rpx;
			background: #FFE300;
			text-align: center;
			line-height: 80rpx;
			border-radius: 40rpx;
			color: #4b4b4b;
		}
	}
	//暂无订单
	.hint{
		font-size: 50rpx;
		font-weight: bold;
		text-align: center;
		color: #cecece;
		width: 400rpx;
		position: absolute;
		top: 35%;
		left: 50%;
		margin-left: -200rpx;
	}
</style>
