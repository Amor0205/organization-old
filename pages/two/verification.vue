<!-- 用户验证 -->
<template>
	<view>
		<v-tabs v-model="activeTab" :scroll="false" :tabs="['验证码验证', '刷卡验证']" fontSize='30rpx'>
		</v-tabs>
		<view class="one" v-if="activeTab==0">
			<u-form :model="form" ref="uForm">
				<view class="two">
					<uni-icons type="contact-filled" size="25"></uni-icons>
					<u-form-item label="" prop="phone">
						<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
							<u-input v-model="ids.phone" type="phone" placeholder='请输入手机号' maxlength='11' :disabled='disabled' />
						</view>
					</u-form-item>
				</view>
				<view class="three">
					<view class="all">
						<uni-icons type="email" size="20" style="margin: 40rpx 0rpx 0rpx 9rpx;"></uni-icons>
						<u-form-item label="" prop="code">
							<view class="" style="width: 340rpx;height: 50rpx; display: flex; align-items: center;margin-top: 20rpx;">
								<u-input v-model="form.code" type="code" placeholder='请输入验证码' />
							</view>
						</u-form-item>
					</view>
					<view class="get" @tap="getCheckNum()">
						<text>{{!codeTime?'获取验证码':codeTime+'s'}}</text>
					</view>
				</view>
			</u-form>
			<!-- 底部 -->
			<view class="">
				<button type="default" class="button" @click="submit">发起验证</button>
			</view>
		</view>
		<view class="" v-else>
			<view class="hint">
				温馨提示：
			</view>
			<view class="wiping">
				请先到规定地点进行刷卡,在发起验证!
			</view>
			<view class="sponsor">
				发起验证
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCode,
		getverification
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				activeTab: 0,
				codeTime: 0,
				ids: '',
				disabled: true,
				form: {

					code: '', //验证码
				},
				rules: {
					// phone: [{
					// 		required: true,
					// 		message: '请输入手机号',
					// 		// 可以单个或者同时写两个触发验证方式 
					// 		trigger: ['change', 'blur'],
					// 	},
					// 	{
					// 		// 自定义验证函数，见上说明
					// 		validator: (rule, value, callback) => {
					// 			// 上面有说，返回true表示校验通过，返回false表示不通过
					// 			// this.$u.test.mobile()就是返回true或者false的
					// 			return this.$u.test.mobile(value);
					// 		},
					// 		message: '手机号码格式不正确',
					// 		// 触发器可以同时用blur和change
					// 		trigger: ['change', 'blur'],
					// 	},


					// ],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],


				}
			}
		},
		methods: {
			changeTab(index) {
				console.log('当前选中的项：' + index)
			},
			// 获取手机验证码
			getCheckNum() {
				if (this.codeTime > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: "none"
					});
					return;
				} else {
					this.codeTime = 300
					let timer = setInterval(() => {
						this.codeTime--;
						if (this.codeTime < 1) {
							clearInterval(timer);
							this.codeTime = 0
						}
					}, 1000)
					getCode(this.ids.phone, 7).then(res => {
						if (res.data.code == 2000) {
							uni.showToast({
								title: '获取验证码成功'
							})
						} else if (res.data.code == 4000) {
							uni.showToast({
								icon: "none",
								title: res.data.message
							})
						}
					}).catch(err => {
						uni.showToast({
							icon: "none",
							title: '获取验证码失败'
						})
					})

				}
			},
			// 点击验证
			submit() {
				console.log(this.$refs.uForm)
				this.$refs.uForm.validate(valid => {
					if (valid && this.ids.phone.length != 0 && this.form.code.length != 0) {
						// 验证
						getverification(
							this.ids.phone,
							this.form.code,
							this.ids.id,
						).then(res => {
							console.log(res.data)
							if (res.data.code == 2000) {
								uni.showToast({
									title: '验证成功'
								})
								//获取当前页面（返回index页面）
								var pages = getCurrentPages(); //当前页
								//用scode来接收成功的值
								pages[0].$vm.scode = true
								// console.log(pages)
								setTimeout(() => {
										uni.navigateBack()
								}, 1500)
							} else if (res.data.code == 4000) {
								uni.showToast({
									icon: "none",
									title: res.data.message
								})
							}
						}).catch(err => {
							uni.showToast({
								icon: "none",
								title: '验证失败'
							})
						})


					} else {
						uni.showToast({
							icon: "none",
							title: '请先验证'
						})
					}
				});
			},
		},
		mounted() {

		},
		created() {
			this.ids = uni.getStorageSync('id')
			console.log(this.ids);
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

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	.one {
		margin-top: 20rpx;

		.two {
			width: 90%;
			height: 50rpx;
			margin: 80rpx 0rpx 0rpx 42rpx;
			display: flex;
			align-items: center;
		}

		.three {
			background-color: white;
			width: 700rpx;
			height: 100rpx;
			border-radius: 10rpx;
			// padding: 20rpx 0;
			margin: 40rpx 40rpx;
			// position: relative;
			// border: 1rpx solid red;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.all {
				margin-top: 50rpx;
				display: flex;
				flex-wrap: nowrap;
				// align-items: center;
			}

			.get {
				// position: absolute;
				// top: 20rpx;
				// right: 20rpx;
				// background-color: orange;
				height: 52rpx;
				line-height: 52rpx;
				// color: white;
				border-radius: 50rpx;
				padding: 0rpx 20rpx;
				border: 1rpx solid #878BA1;
				font-size: 24rpx;
				color: #878BA1;
				margin-top: 60rpx;
			}
		}

		.button {
			width: 600rpx;
			height: 80rpx;
			margin: 0 auto;
			margin-top: 120rpx;
			background-color: #FFE300;
			border-radius: 50rpx;
			font-size: 34rpx;
			line-height: 80rpx;
			font-weight: 700;
			text-align: center;
		}
	}

	.hint {
		font-size: 16px;
		margin-left: 30rpx;
		margin-top: 50rpx;

	}

	.wiping {
		font-size: 15px;
		color: #e68617;
		padding-top: 10rpx;
		margin-left: 100rpx;
	}

	.sponsor {
		width: 600rpx;
		height: 80rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		background-color: #FFE300;
		border-radius: 50rpx;
		font-size: 34rpx;
		line-height: 80rpx;
		font-weight: 700;
		text-align: center;
	}
</style>
