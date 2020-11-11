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
							求助位置:
						</view>
						<view class="underwayRights">
							{{underway.place}}
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 显示刷卡栏 -->
		<view class="base" @click="gotos" v-if='serves==true'>
			<view class="show">
				<view class="receiving">王护工已接单</view>
				<view class="wait">等待王护工刷卡</view>
			</view>
		</view>
		<view class="base" @click="goto" v-else>
			<view class="show">
				<view class="receiving">已发起同事协助</view>
				<view class="wait">正等待同事接单</view>
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
				underway: '',
				serves:''
			}
		},
		methods: {
			goto() {
					this.serves = !this.serves
			},
			gotos(){
				uni.navigateTo({
					url: '../registrations/write?data=' + JSON.stringify(this.underway)
				})
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
