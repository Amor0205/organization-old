<!-- 巡视已完成订单 -->
<template>
	<view class="box">
		<view class="underwayItem" v-for="(item,index) in underway" :key='index' >
			<view class="" @click="goTo(item)">
				<view class="underway">
					<view class="underwayLeft">
						巡视时间 :
					</view>
					<view class="underwayRight">
						{{item.time}}
					</view>
				</view>
					<view class="underway">
						<view class="underwayLeft">
							刷卡时间:
						</view>
						<view class="underwayRight">
							{{item.times}}
						</view>
					</view>
				<view class="underway">
					<view class="underwayLeft">
						名字 :
					</view>
					<view class="underwayRight">
						{{item.name}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						当前状态:
					</view>
					<view class="underwayRight">
						{{item.state}}
					</view>
				</view>
		
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
				underway: [{
					name: '王大爷',
					time: '2020-10-01 18:30',
					times: '2020-10-01 18:30',
					genre: '老人求助/日常巡视',
					state: '未超时/已超时2天2小时30分钟',

				}, {
					name: '王大爷',
					time: '2020-10-01 18:30',
					times: '2020-10-01 18:30',
					genre: '老人求助/日常巡视',
					state: '未超时/已超时2天2小时30分钟',
				}, {
					name: '王大爷',
					time: '2020-10-01 18:30',
					times: '2020-10-01 18:30',
					genre: '老人求助/日常巡视',
					state: '未超时/已超时2天2小时30分钟',
				}, {
					name: '王大爷',
					time: '2020-10-01 18:30',
					times: '2020-10-01 18:30',
					genre: '老人求助/日常巡视',
					state: '未超时/已超时2天2小时30分钟',
				}]
			}
		},
		methods: {
			goTo(res) {
				console.log(res);
				uni.navigateTo({
					url:'../seekHelp/taskDetails/taskDetails?data=' + JSON.stringify(res)
				})
			}
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
	.box{
		padding: 20rpx 10rpx 0rpx 10rpx;
	}
	.underwayItem {
		width: 100%;
		height: 400rpx;
		background-color: #e5e5e5;
		margin-bottom: 30rpx;
		font-size: 16px;
			border-radius: 30rpx;
		.underway {
			display: flex;
			margin-bottom: 20rpx;
			padding: 20rpx 20rpx 0rpx 20rpx;

			.underwayLeft {
				width: 250rpx;
				height: 50rpx;
				// border: 1rpx  solid red;
			}

			.underwayRight {
				margin-left: 20rpx;
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
</style>
