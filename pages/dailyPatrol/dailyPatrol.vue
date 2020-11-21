<!-- 日常巡视 -->
<template>
	<view class="box">
		<view class="hint" v-if="!underway.length">
			暂无巡视任务
		</view>
		<view class="underwayItem" v-for="(item,index) in underway" :key='index'>
			<view class="" @click="goTo(item)">
				<view class="underway">
					<view class="underwayLeft">
						巡视有效时间 :
					</view>
					<view class="underwayRight">
						{{item.createTime}} 前
					</view>
				</view>
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
						当前状态:
					</view>
					<view class="underwayRight" v-if="item.state == '未超时' ">
						{{item.state}}
					</view>
					<view class="underwayRight" v-else style="color: #cf441e;">
						{{item.state}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						巡视位置:
					</view>
					<view class="underwayRight">
						{{item.location}}
					</view>
				</view>
			</view>
			<!-- <view class="underway">
					<view class="underwayLeft">
						求助方式:
					</view>
					<view class="underwayRight">
						{{item.way}}
					</view>
				</view> -->


		</view>
	</view>
</template>

<script>
	import {
		getTour,
		receiveOrder
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				userInfo: '', //个人信息
				underway: [],
				currentPage: 1,
				pullTag: true,
				time: '', //当前时间戳
				timer: [], //循环的时间
			}
		},
		methods: {
			goTo(res) {
				// uni.navigateTo({
				// 	url: '../seekHelp/taskDetails/taskDetails?data=' + JSON.stringify(res)
				// })

				//接单  单号：前缀加单号  X 巡视  A报警 H协助
				uni.showLoading({
					title: '正在接取任务'
				})
				console.log('X' + res.id,this.userInfo.id);
				receiveOrder(
					'X' + res.id,
					this.userInfo.id
				).then(res_1 => {
					uni.hideLoading()
					if (res_1.data.code == 2000) {
						uni.navigateTo({
							url: '../seekHelp/taskDetails/taskDetails?data=' + JSON.stringify(res)
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res_1.data.message
						})
					}
				})

			},
			// 获取巡视订单列表
			getlist() {
				getTour(
					this.userInfo.regionId,
					'0',
					this.userInfo.id,
					this.currentPage
				).then(res => {
					if (res.data.code == 2000) {
						console.log(res);
						if (res.data.data.tourOrders != 0) {
							this.underway = this.underway.concat(res.data.data.tourOrders)
							this.underway.map(item => {
								// this.timer.push(item.createTime)
								// console.log(this.timer);
								var timestamp3 = new Date(item.createTime).getTime(); // 结果：1477808630404 ，通过原型方法直接获得当前时间的毫秒值，准确
								console.log(timestamp3);
								//当前时间与接口时间作对比
								if (this.time > timestamp3) {
									item.state = '超时'
								} else {
									item.state = '未超时'
								}
							})
						} else if (res.data.data.tourOrders.length == 0 ) {
							this.pullTag = false;
							uni.showToast({
								icon: 'none',
								title: '没有更多任务了＞﹏＜'
							})
						}


						// console.log(this.underway);

					}
				})
			},
	


		},
		created() {
	


		},
		onShow() {
			this.underway = []
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			// console.log(this.userInfo);
			this.currentPage = 1;
			this.getlist()
			//获取的当前时间戳
			this.time = Math.round(new Date())
			console.log(this.time);



		},
		mounted() {


		},
		onLoad() {

		},
		onReachBottom() {
			if (this.pullTag) {
				this.currentPage++
				this.getlist()
			}


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
		// width:98%;
		// height: 500rpx;
		background-color: #f2f2f3;
		margin-bottom: 30rpx;
		font-size: 16px;
		border-radius: 30rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 30rpx;

		.underway {
			display: flex;
			margin-bottom: 20rpx;
			padding-top: 10rpx;
			border-radius: 13rpx;

			.underwayLeft {
				width: 250rpx;
				height: 50rpx;
				// border: 1rpx  solid red;
			}

			.underwayRight {
				// margin-left: 20rpx;
			}
		}

		.button {
			width: 300rpx;
			height: 50rpx;
			font-size: 16px;
			margin: 0 auto;
			padding-top: 20rpx;
			line-height: 50rpx;
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
