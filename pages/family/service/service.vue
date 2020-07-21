<!-- 服务记录 -->
<template>
	<view>

		<view class="box">
			<view class="" v-for="(item,index) in service" :key='index'>
				<view class="top">
					<view class="hygiene">
						打扫卫生
					</view>
					<view class="evaluate">
						待评价
					</view>
				</view>

				<view class="middle">
					<view class="right">
						<view class="six">
							服务对象
						</view>
						<view class="">
							服务开始时间
						</view>
						<view class="">
							服务结束时间
						</view>
						<view class="">
							服务订单号
						</view>
						<view class="">
							定购方式
						</view>
						<view class="">
							服务人员
						</view>

					</view>
					<view class="centre">
						<view class="">
							{{item.target}}
						</view>
						<view class="">
							{{item.starttime}}
						</view>
						<view class="">
							{{item.endtime}}
						</view>
						<view class="">
							{{item.OddNumbers}}
						</view>
						<view class="">
							{{item.order}}
						</view>
						<view class="">
							{{item.personnel}}
						</view>
					</view>
					<view class="copy">
						复制
					</view>
				</view>
				<!-- 三个按钮 -->
				<view class="three">
					<view class="" @click="show = true">
						评价服务
					</view>
					<view class="" @click="voucher">
						服务凭证
					</view>
					<view class="" @click="complaint">
						发起投诉
					</view>
				</view>
				<!-- popup 弹出层 -->
				<view class="popup">
					<u-popup v-model="show" mode="bottom" width="500rpx" height="600px" border-radius="30">
						<view class=" headpiece">
							<view class="cancel" @click="cancel">
								取消
							</view>
							<view class="services">
								服务评价
							</view>
							<view class="refer">
								提交
							</view>
						</view>
						<view class="" v-for="(item,index) in grade " :key='index'>
							<view class="contain">
								<view class="speed">
									{{item.speed}}
								</view>
								<view class="rate">
									<uni-rate max="5" :value="item.rank" size='15' gutter="40" margin='15'></uni-rate>
								</view>

							</view>
						</view>


						<view class="choice">
							<view :class="{'btn': rSelect.indexOf(index)!=-1}" v-for="(item,index) in button" :key="index" @tap="tapInfo(index)"
							 class="button">
								<view class="name" :style="item.style">
									{{item.name}}
								</view>
							</view>
						</view>

						<u-form :model="form" ref="uForm">

							<view class="">
								<u-form-item>
									<u-input v-model="form.intro" placeholder='请填写评论' />
								</u-form-item>
							</view>

						</u-form>
					</u-popup>
				</view>



			</view>

		</view>





	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		name: "",
		components: {
			uniRate
		},
		props: {},
		data() {
			return {
				service: [{
					target: '张倩倩',
					starttime: '2020年02月02日 23:22',
					endtime: '2020年02月02日 23:22',
					OddNumbers: 'LD12313215463211321',
					order: '自主定购',
					personnel: '乐山养老院/理疗师/王衣衣'
				}],
				show: false,
				safe: true,
				grade: [{
					speed: '相应速度',
					rank: 4
				}, {
					speed: '服务时效',
					rank: 3
				}, {
					speed: '专业程度',
					rank: 5
				}],

				button: [{
						isSelect: false,
						name: '服务不错',
						style: {
							width: '160rpx',
							height: '52rpx',

						}
					}, {
						isSelect: false,
						name: '服务很准时',
						style: {
							width: '180rpx',
							height: '52rpx',

						}
					}, {
						isSelect: false,
						name: '服务态度很好',
						style: {
							width: '200rpx',
							height: '52rpx',
						}
					}, {
						isSelect: false,
						name: '服务人员很专业',
						style: {
							width: '240rpx',
							height: '52rpx',
						}
					}, {
						isSelect: false,
						name: '服务很不错',
						style: {
							width: '200rpx',
							height: '52rpx',
						}
					}, {
						isSelect: false,
						name: '服务很准时',
						style: {
							width: '180rpx',
							height: '52rpx',

						}
					}

				],
				rSelect: [],
				form: {
					intro: '',
				},
				rules: {

					intro: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				}

			}
		},
		methods: {
			confirm(e) {
				console.log(e);
			},


			tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
					// console.log(e)//打印下标
					this.rSelect.push(e); //选中添加到数组里
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			// 点击弹出层取消按钮
			cancel() {
				this.show = false;
			},
			// 发起投诉按钮跳转页面
			complaint() {
				uni.navigateTo({
					url: './complaint'
				})
			},
			// 服务凭证按钮跳转页面
			voucher() {
				uni.navigateTo({
					url: './voucher'
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
	.box {
		margin-top: 66rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		padding: 0rpx 22rpx 0rpx 22rpx;

		.hygiene {
			font-size: 28rpx;
			font-weight: 700;
		}

		.evaluate {
			font-size: 28rpx;
			color: #FF9500;
		}
	}

	.middle {
		display: flex;
		margin: 70rpx 0rpx 0rpx 22rpx;

		.right {
			font-size: 28rpx;
			color: #878BA1;

		}

		.centre {
			margin-left: 60rpx;
			font-size: 28rpx;
			color: #282828;

		}

		.right view {
			margin-bottom: 40rpx;
		}

		.centre view {
			margin-bottom: 40rpx;
		}

		.copy {
			width: 100rpx;
			height: 48rpx;
			border: 1rpx solid #FFE300;
			text-align: center;
			font-size: 24rpx;
			color: #FF9500;
			line-height: 48rpx;
			border-radius: 30rpx;
			margin-left: 45rpx;
		}

	}

	.three {
		display: flex;
		font-size: 28rpx;
		color: #666666;

		margin-left: 150rpx;

	}

	.three view {
		width: 172rpx;
		height: 64rpx;
		border: 1rpx solid #666666;
		text-align: center;
		line-height: 64rpx;
		margin-left: 16rpx;
		border-radius: 40rpx;
	}

	.headpiece {
		display: flex;
		justify-content: space-between;
		padding: 22rpx 22rpx 0rpx 22rpx;

		.cancel {
			font-size: 14px;
			color: #EC7171;
		}

		.services {
			font-size: 15px;
			font-weight: 700;
		}

		.refer {
			font-size: 14px;
			color: #0072FF;
		}
	}

	.contain {
		margin: 46rpx 0rpx 0rpx 22rpx;
		display: flex;
		align-items: center;
		margin-bottom: 60rpx;

		.speed {
			font-size: 14px;
			color: #878BA1;

		}

		.rate {
			margin-left: 20rpx;
			margin-top: 10rpx;
		}
	}

	.choice {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;


	}

	.name {
		border: 1rpx solid #FFE300;
		font-size: 28rpx;
		text-align: center;
		line-height: 52rpx;
		border-radius: 40rpx;
		padding: 10rpx;
		color: #282828;

	}

	.btn {
		font-size: 28rpx;
		text-align: center;
		line-height: 52rpx;
		border-radius: 40rpx;
		color: #282828;
		background: #FFE300;
	}

	.button {
		margin-bottom: 40rpx;
	}
</style>
