<!--协助任务详情 -->
<template>
	<view>
		<view class="boxs">
			<view class="information">
				被服务者信息
			</view>
			<!-- 中间个人信息部分 -->
			<view class="underwayItem">

				<!-- 被服务人员信息 -->
				<view class="message">
					<view class="headportrait">
						<image :src="underway.avatar?underway.avatar:imgUrl" class="headportraitImg"></image>
					</view>
					<view class="serial">
						{{underway.elderName}}
					</view>
				</view>
				<view class="">
					<!-- <view class="underway">
						<view class="underwayLeft">
							名字 :
						</view>
						<view class="underwayRight">
							{{underway.name}}
						</view>
					</view> -->
					<view class="underway">
						<view class="underwayLeft">
							任务时间 :
						</view>
						<view class="underwayRight">
							{{underway.createTime}}
						</view>
					</view>
					<view class="underway" v-if='underway.type==0'>
						<view class="underwayLeft">
							任务类型:
						</view>
						<view class="underwayRight">
							{{underway.content}}
						</view>
					</view>
					<view class="underway" v-else-if='underway.type==1'>
						<view class="underwayLeft">
							任务类型:
						</view>
						<view class="underwayRight">
							{{underway.content}}
						</view>
					</view>
					<view class="underway" v-else-if='underway.type==2'>
						<view class="underwayLeft">
							任务类型:
						</view>
						<view class="underwayRight">
							{{underway.content}}
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
							求助位置:
						</view>
						<view class="underwayRights">
							{{underway.location}}
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 显示刷卡栏 -->
		<!-- <view class="base" @click="gotos" v-if='serves==true'>
			<view class="show">
				<view class="receiving">{{ helper }}</view>
			</view>
		</view> -->
		<view class="base">
			<view class="show">
				<view class="receiving">已发起同事协助</view>
				<view class="wait">正等待同事接单刷卡</view>
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
				imgUrl: '../../../static/imgs/tou.png',
				underway: '',
				serves: '',
				userInfo: '',
				helper: '',
			}
		},
		methods: {
			goto() {
				// this.serves = !this.serves
			},
			gotos() {
				// uni.navigateTo({
				// 	url: '../registrations/write?data=' + JSON.stringify(this.underway)
				// })
			}
		},
		mounted() {

		},
		created() {
			// this.all=uni.getStorageInfoSync('all')
			// console.log(this.all);
		},
		onLoad(option) {
			this.underway = JSON.parse(option.all)
			console.log(this.underway);
		// },	
		// onShow() {
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			// //#ifdef APP-PLUS
			// // const jyJPush = this.jyJPush
			// // const jyJPush = uni.requireNativePlugin('JY-JPush');
			// var jyJPush = uni.requireNativePlugin('JY-JPush');
			// var _this = this;
			// //监听透传 
			// jyJPush.addJYJPushCustomReceiveNotificationListener(result => { 
			// //普通消息
			// // jyJPush.addJYJPushReceiveNotificationListener(result => {	
			// 	console.log('收到消息'+ JSON.stringify(result))
			// 	//  监听成功后，若收到推送，会在result返回对应的数据
			// 	var type
			// 	var content
			// 	//透传处理
			// 	if (JSON.parse(result.extra).type) {
			// 		type = JSON.parse(result.extra).type
			// 	}
			// 	if (JSON.parse(result.extra).content) {
			// 		content = JSON.parse(result.extra).content
			// 		content = JSON.parse(content)
			// 	}
			// 	//普通处理
			// 	// if(JSON.parse(result.notificationExtras).type){
			// 	// 	type = JSON.parse(result.notificationExtras).type
			// 	// }
			// 	// if(JSON.parse(result.notificationExtras).content){
			// 	// 	content = JSON.parse(result.notificationExtras).content
			// 	// 	content = JSON.parse(content)
			// 	// }
				
			// 	console.log(result)
			// 	/**
			// 	 * 0巡视订单 1求助报警(普通弹框) 2协助订单(普通弹框)
			// 	 * 3上班刷卡成功 4巡视订单刷卡
			// 	 * 5求助订单刷卡  6协助订单刷卡 7反馈协助者接单 8协助者刷卡成功
			// 	 */
			// 	if (type == 0) {
			// 		//改变工作状态 0上班 1空闲 2忙碌 3下班 4上班等待刷卡
			// 		workStatus(
			// 			_this.userInfo.id,
			// 			2
			// 		).then(res => {
			// 			console.log(res)
			// 			if (res.data.code == 2000) {
			// 				_this.userInfo.status = 2;
			// 				uni.setStorageSync('userInfo', _this.userInfo)
			// 				uni.showToast({
			// 					title: content + '成功',
			// 					icon: 'none'
			// 				})
			// 				uni.redirectTo({
			// 					// url: '../registrations/registration',
			// 					url: '../registrations/registration?data=' + JSON.stringify(_this.underway)
			// 				})
			// 			}
			// 		})
			// 	} else if (type == 7) {
			// 		_this.serves = true;
			// 		_this.helper = content;
			// 		console.log(content, '协助接单');
			// 		// uni.navigateTo({
			// 		// 	url: '../registrations/write?data=' + JSON.stringify(this.underway)
			// 		// })
			// 	} else if (type == 8) {
			// 		console.log(content, '协助刷卡成功')
			// 		uni.redirectTo({
			// 			// url: '../registrations/registration',
			// 			url: '../registrations/registration?data=' + JSON.stringify(_this.underway)
			// 		})
			// 	}
			// })
			// //#endif
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
		background: #acacac;
	}

	.information {
		font-weight: 700;
		padding-left: 70rpx;
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

			.receiving {
				font-size: 18px;
			}

			.wait {
				font-size: 18px;
			}
		}

	}
</style>
