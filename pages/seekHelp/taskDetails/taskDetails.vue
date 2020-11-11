<!-- 求助任务详情 -->
<template>
	<view class="box">
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

				<view class="underway">
					<view class="underwayLeft">
						巡视时间段:
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

		<view class="underwayItem" v-else>
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

				<view class="underway">
					<view class="underwayLeft">
						任务开始时间:
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

		<!-- 显示刷卡栏 -->
		<view class="base" @click="goto(underway)" v-if="underway.flag==1">
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
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				underway: '',
			}
		},
		methods: {
			goto(res) {
				uni.navigateTo({
					// url: '../registrations/registration',
					url: '../registrations/registration?data=' + JSON.stringify(res)
				})
			}
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
