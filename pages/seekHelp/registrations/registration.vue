<!-- 情况登记 -->
<template>
	<view>
		<view class="boxs">
			<view class="information">
				被服务者信息
			</view>
			<!-- 中间个人信息部分 -->
			<view class="underwayItem" v-if="underway.flag==1">

				<!-- 被服务人员信息 -->
				<view class="message">
					<view class="headportrait">
						<image src="../../../static/imgs/timg.jpg" class="headportraitImg"></image>
					</view>
					<view class="serial">
						{{underway.name}}
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
							巡视时间段 :
						</view>
						<view class="underwayRight">
							{{underway.time}}
						</view>
					</view>
					<view class="underway">
						<view class="underwayLeft">
							任务类型:
						</view>
						<view class="underwayRight">
							{{underway.genre}}
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
							{{underway.place}}
						</view>
					</view>
				</view>
			</view>
		
		<view class="underwayItem"   v-else>
		
			<!-- 被服务人员信息 -->
			<view class="message">
				<view class="headportrait">
					<image src="../../../static/imgs/timg.jpg" class="headportraitImg"></image>
				</view>
				<view class="serial">
					{{underway.name}}
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
						任务开始时间 :
					</view>
					<view class="underwayRight">
						{{underway.time}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						任务类型:
					</view>
					<view class="underwayRight">
						{{underway.genre}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						求助方式:
					</view>
					<view class="underwayRight">
						{{underway.way}}
					</view>
				</view>
				<view class="underway">
					<view class="underwayLeft">
						求助位置:
					</view>
					<view class="underwayRights">
						{{underway.place}}
					</view>
				</view>
			</view>
		</view>
				
		
		</view>
		<!-- 服务情况 -->
		<view class="">
			<view class="base">
				<navigator class="options" url="../../index/index">
					无人
				</navigator>
				<view class="options" @click="proceed(underway)">
					进行服务
				</view>
				<view class="options" @click="goTos">
					发起同事协助
				</view>
				<navigator class="options" url="../../index/index">
					正常
				</navigator>
			</view>

		</view>
		<view>
			<u-popup v-model="show" mode="center" width="600rpx" height="150px">
				<view style="margin-top: 30rpx;margin-left: 20rpx;">请您选择协助方式：</view>
				<view class="" style="display: flex; justify-content: space-around; margin-top: 70rpx;">
					<view class="" v-for="(item,index) in classify" :key='index' @click="direct(item)">
						<view class="">
							{{item.title}}
						</view>
					</view>

				</view>
			</u-popup>

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
				show: false,
				underway:'',
				genres: [{
					title: '无人',

				}, {
					title: '进行服务',

				}, {
					title: '发起同事求助',

				}, {
					title: '正常',

				}, ],
				classify: [{
						title: '直接发布',
						id: 2
					},
					{
						title: '指定人员',
						id: 2
					},
				],

			}
		},
		methods: {
			//进行服务按钮
			proceed(res) {
				console.log(res);
				uni.navigateTo({
					url: './write?data=' + JSON.stringify(res)
				})
			},
			//发起同事求助
			goTos() {
				this.show = true
				// uni.setStorageSync('all',this.underway)
			},
			//点击同事求助发起的弹框
			direct(res) {
				switch (res.title) {
					case '直接发布':
						this.show = false
							// uni.setStorageSync('all',this.underway)
						uni.navigateTo({
							// url: `./options?flag=${res.flag}`,
							url:'../options/option2?data=' + JSON.stringify(res)+'&all='+JSON.stringify(this.underway)
						})
					
						break;
					case '指定人员':
						this.show = false
						uni.navigateTo({
							url: './searchs?&all='+JSON.stringify(this.underway)
						})
						break;

					default:
						break;
				}

			},

		},
		mounted() {

		},
		onLoad(option) {

			this.underway = JSON.parse(option.data)
			console.log(this.underway);

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
	.boxs {
			background: #f4f4f4;
	}

	.information {
		font-weight: 700;
		padding-left: 30rpx;
	}

	// 被服务人员信息
	.underwayItem {
		padding: 30rpx 0rpx 20rpx 0rpx;
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

	// 底部四个按钮
	.base {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-top: 50rpx;
		
		.options {
			width: 300rpx;
			height: 100rpx;
			border-radius: 50rpx;
			background: #FFE300;
			text-align: center;
			line-height: 100rpx;
			margin-top: 50rpx;
			margin-bottom: 50rpx;
			font-size: 16px;
		}



	}
</style>
