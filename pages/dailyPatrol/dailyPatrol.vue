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
						{{item.tourTime}} 前
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
					<view class="underwayRight">
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
				currentPage:1,
				pullTag:true,
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
				receiveOrder(
					'X'+res.id,
					this.userInfo.id
				).then(res_1=>{
					if(res_1.data.code == 2000){
						uni.navigateTo({
							url: '../seekHelp/taskDetails/taskDetails?data=' + JSON.stringify(res)
						})
					}else{
						uni.hideLoading()
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
						if(res.data.data.tourOrders != 0){
							this.underway = this.underway.concat(res.data.data.tourOrders) 
						}else if(res.data.data.tourOrders.length == 0){
							this.pullTag = false;
							uni.showToast({
								icon:'none',
								title:'已经到底了＞﹏＜' 
							})
						}
						
						
						// console.log(this.underway);
					
					}
				})
			},
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				console.log(timer);
				return timer;


			},
			
		},
		created() {
		
			this.getTime()


		},
		onShow() {
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			// console.log(this.userInfo);
			this.currentPage = 1;
			this.getlist()
		},
		mounted() {


		},
		onLoad() {

		},
		onReachBottom() {
			if(this.pullTag){
				this.currentPage ++
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
</style>
