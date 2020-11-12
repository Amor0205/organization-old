<!-- 老人求助 -->
<template>
	<view class="box">
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
						{{item.time}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						任务类型:
					</view>
					<view class="underwayRight">
						{{item.taskType}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						求助方式:
					</view>
					<view class="underwayRight">
						{{item.helpMethod}}
					</view>
				</view>
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
	import {getSeekhelp} from '../../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				userInfo:'',//个人信息
				underway: [],//求助列表
			}
		},
		methods: {
			goTo(res) {
				uni.navigateTo({
					// url:`../taskDetails/taskDetails?all=${res.item}`,
					// url: '../taskDetails/taskDetails',
					url: '../taskDetails/taskDetails?data=' + JSON.stringify(res)

				})
			},
			// 获取求助列表
			getlist(){
				getSeekhelp(
				this.userInfo.regionId,
				this.userInfo.id
				).then(res=>{
					if(res.data.code==2000){
						this.underway=res.data.data.alarmLogs
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
	line-height:80rpx;
	border-radius: 40rpx;
	color: #4b4b4b;
		}
	}
</style>
