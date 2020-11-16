<!-- 求助任务详情 -->
<template>
	<view class="box">
		<view class="information">
			被服务者信息
		</view>
		<!-- 中间个人信息部分 -->
		<view class="underwayItem" v-if="underway.type==0">
			<!-- 被服务人员信息 -->
			<view class="message">
				<view class="headportrait">
					<image src="../../../static/imgs/timg.jpg" class="headportraitImg"></image>
				</view>
				<view class="serial">
					{{underway.elderName}}
				</view>
			</view>
			<view class="">

				<view class="underway">
					<view class="underwayLeft">
						巡视时间段:
					</view>
					<view class="underwayRight">
						{{underway.tourTime}}前
					</view>
				</view>

				<view class="underway" v-if="underway.type==0">
					<view class="underwayLeft">
						任务类型:
					</view>
					<view class="underwayRight">
						日常巡视
					</view>
				</view>
				<!-- <view class="underway">
					<view class="underwayLeft">
						求助方式:
					</view>
					<view class="underwayRight">
						{{underway.way}}
					</view>
				</view> -->
				<view class="underway">
					<view class="underwayLeft">
						巡视位置:
					</view>
					<view class="underwayRights">
						{{underway.location}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="underwayItem" v-else>
			<!-- 被服务人员信息 -->
			<view class="message">
				<view class="headportrait">
					<image src="../../../static/imgs/timg.jpg" class="headportraitImg"></image>
				</view>
				<view class="serial">
					{{underway.elderName}}
				</view>
			</view>
			<view class="">

				<view class="underway">
					<view class="underwayLeft">
						任务开始时间:
					</view>
					<view class="underwayRight">
						{{underway.beginTime}}
					</view>
				</view>

				<view class="underway">
					<view class="underwayLeft">
						任务类型:
					</view>
					<view class="underwayRight">
						{{underway.typeDesc}}
					</view>
				</view>
				<view class="underway">
				<view class="underwayLeft">
					求助方式:
				</view>
				<view class="underwayRight">
					{{underway.helpMethod}}
				</view>
			</view>
				<view class="underway">
					<view class="underwayLeft">
						求助位置:
					</view>
					<view class="underwayRights">
						{{underway.location}}
					</view>
				</view>
			</view>
		</view>

		<!-- 显示刷卡栏 -->
		<view class="base" @click="goto(underway)" v-if="underway.type==0">
			<view class="show">
				<!-- <view class="receiving">已接单</view> -->
				<view class="wait">等待巡视刷卡</view>
			</view>
		</view>

		<view class="base" @click="goto(underway)" v-else>
			<view class="show">
				<view class="receiving">已接单</view>
				<view class="wait">等待刷卡</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { workStatus } from '../../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				userInfo:'',
				underway: '',
			}
		},
		methods: {
			goto(res) {
				// uni.navigateTo({
				// 	// url: '../registrations/registration',
				// 	url: '../registrations/registration?data=' + JSON.stringify(res)
				// })
			}
		},
		created() {
			
		},
		mounted() {

		},
		onLoad(option) {
			this.underway = JSON.parse(option.data)
			console.log(this.underway);
			
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			//#ifdef APP-PLUS
			var jyJPush = this.jyJPush;
			var _this = this;
			//监听透传
			jyJPush.addJYJPushCustomReceiveNotificationListener(result=> {
			//  监听成功后，若收到推送，会在result返回对应的数据
				var type 
				var content
				if(JSON.parse(result.extra).type){
					type = JSON.parse(result.extra).type
				}
				if(JSON.parse(result.extra).content){
					content = JSON.parse(result.extra).content
				}
				console.log(result)
				/**
				 * 0巡视订单 1求助报警(普通弹框) 2协助订单(普通弹框)
				 * 3上班刷卡成功 4巡视订单刷卡
				 * 5求助订单刷卡  6协助订单刷卡 
				 */
				if(type == 4){
					//改变工作状态 0上班 1空闲 2忙碌 3下班 4上班等待刷卡
					// workStatus(
					// 	_this.userInfo.id,
					// 	2
					// ).then(res=>{
						// console.log(res)
						// if(res.data.code == 2000){
							_this.userInfo.status = 2;
							uni.setStorageSync('userInfo',_this.userInfo)
							uni.showToast({
								title:content+'成功' ,
								icon:'none'
							})
							uni.navigateTo({
								// url: '../registrations/registration',
								url: '../registrations/registration?data=' + JSON.stringify(_this.underway)
							})
						// }
					// })
				}else if(type == 5){
					// console.log(res)
					_this.userInfo.status = 5;
					uni.setStorageSync('userInfo',_this.userInfo)
					uni.showToast({
						title:content+'成功' ,
						icon:'none'
					})
					uni.navigateTo({
						// url: '../registrations/registration',
						url: '../registrations/registration?data=' + JSON.stringify(_this.underway)
					})
				}else if(type == 6){
					uni.redirectTo({
					    url: '../../index/index'
					});
				}
			})	
			//#endif

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
		background: #f4f4f4;
	}

	.information {
		font-weight: 700;
		margin-left: 30rpx;
	}

	.underwayItem {
		padding: 30rpx 0rpx 0rpx 0rpx;
		font-size: 16px;

		.message {
			// width: 100%;
			// height: 200rpx;
			// display: flex;
			// justify-content: center;
			// align-items: center;
			margin: 0 auto;
			margin-bottom: 50rpx;

			.headportrait {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				margin: 0 auto;

				.headportraitImg {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;

				}
			}

			.serial {
				text-align: center;
				margin-top: 20rpx;
			}

		}

		.underway {
			display: flex;
			// margin-bottom: 20rpx;
			padding: 0rpx 10rpx 0rpx 10rpx;
			margin-left: 20rpx;
			margin-bottom: 20rpx;

			.underwayLeft {
				width: 250rpx;
				height: 50rpx;
			}

			.underwayRights {}
		}
	}

	.base {
		display: table;
		width: 100%;
		height: 300rpx;
		background: skyblue;
		margin-top: 80rpx;

		.show {
			//垂直水平居中
			display: table-cell;
			vertical-align: middle;
			text-align: center;
			font-size: 20px;
		}

	}
</style>
