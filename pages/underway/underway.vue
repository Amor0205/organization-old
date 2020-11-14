<!-- 进行中订单 -->
<template>
	<view class="box">
		<view class="underwayItem" v-for="(item,index) in underway" :key='index'>
			<view class="">
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
						任务开始时间 :
					</view>
					<view class="underwayRight">
						{{item.time}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						任务类型:
					</view>
					<view class="underwayRight">
						{{item.genre}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						任务位置:
					</view>
					<view class="underwayRight">
						{{item.place}}
					</view>
				</view>
			</view>
			<view class="button" @click="goto(item)">
				继续服务
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getunderway
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				underway: [],
				userInfo:'',//用户信息
			}
		},
		methods: {
			goto(res) {
				console.log(res);
				uni.navigateTo({
					// url:`../seekHelp/registrations/write?name=${res.data}`,
					url: '../seekHelp/registrations/registration?data=' + JSON.stringify(res)
				})
			},
			getlist() {
				getunderway(
				this.userInfo.regionId,
				'2',
				this.userInfo.id
				).then(res => {
					if (res.data.code==2000) {
						console.log(res);
					}
				}).catch(err => {
					console.log(err);
				})
			}
		},
		onShow() {
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			// console.log(this.userInfo);
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
		// height: 550rpx;
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
				width: 250rpx;
				height: 50rpx;

			}

			.underwayRight {
				margin-left: 20rpx;
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
			// color: #4b4b4b;
			// border: 1rpx solid gray;
		}
	}
</style>
