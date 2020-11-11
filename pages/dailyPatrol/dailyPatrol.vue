<!-- 日常巡视 -->
<template>
	<view class="box">
		<view class="underwayItem" v-for="(item,index) in underway" :key='index'>
			<view class="" @click="goTo(item)">
				<view class="underway">
					<view class="underwayLeft">
						巡视有效时间 :
					</view>
					<view class="underwayRight">
						{{item.time}} 前
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
				<view class="underway">
					<view class="underwayLeft">
						巡视位置:
					</view>
					<view class="underwayRight">
						{{item.place}}
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
	import {getTour} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				userInfo:'',//个人信息
				underway: [{
					flag: 1,
					img: '../../static/imgs/timg.jpg',
					name: '王大爷',
					time: '2020-10-01 18:30',
					genre: '日常巡视',
					state: '未超时/已超时2天2小时30分钟',
					place: '福星楼3楼405号305A床'

				}, {
					flag: 1,
					img: '../../static/imgs/timg.jpg',
					name: '李大爷',
					time: '2020-10-01 18:30',
					genre: '日常巡视',
					state: '未超时/已超时2天2小时30分钟',
					place: '福星楼3楼405号305A床'
				}, {
					flag: 1,
					img: '../../static/imgs/timg.jpg',
					name: '张大爷',
					time: '2020-10-01 18:30',
					genre: '日常巡视',
					state: '未超时/已超时2天2小时30分钟',
					place: '福星楼3楼405号305A床'
				}, {
					flag: 1,
					img: '../../static/imgs/timg.jpg',
					name: '成大妈',
					time: '2020-10-01 18:30',
					genre: '日常巡视',
					state: '未超时/已超时2天2小时30分钟',
					place: '福星楼3楼405号305A床'
				}]
			}
		},
		methods: {
			goTo(res) {
				uni.navigateTo({
					url: '../seekHelp/taskDetails/taskDetails?data=' + JSON.stringify(res)
				})
			},
			// 获取巡视订单列表
			getlist(){
				getTour(
				this.userInfo.regionId,
				this.userInfo.id
				).then(res=>{
					if(res.data.code==2000){
						this.underway=res.data.data.tourOrders
						console.log(this.underway);
					}
				})
			}
		},
		created() {
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
	.box{
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
</style>
