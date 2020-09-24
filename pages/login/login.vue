<!-- 登录页面 -->
<template>
	<view class="box">
		<view class="top" :style="{height:windowHeights*0.36 + 'px'}">
			<image src="../../static/imgs/theme.png" mode="" class="img"></image>
		</view>
		<view class="foot" :style="{height:windowHeights*0.64 + 'px'}">
			<view class="middle">
				<view class="platform">
					欢迎使用，孝兴邦居家养老平台!
				</view>
				<view class="login">
					请输入账号密码进行登录
				</view>
			</view>
			<!-- 输入框 -->
			<view class="">
				<u-form :model="form" ref="uForm">
					<view class="input">
						<uni-icons type="contact-filled" size="25"></uni-icons>
						<u-form-item label="" prop="mobile">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input v-model="form.mobile" type="mobile" placeholder='用户账号' maxlength='11' />
							</view>
						</u-form-item>
					</view>
					<view class="inputs">
						<uni-icons type="locked" size="25"></uni-icons>
						<u-form-item label="" prop="password">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center; ">
								<u-input v-model="form.password" type="password" placeholder='密码' />
							</view>
						</u-form-item>
					</view>
				</u-form>
			</view>
			<view class="sign">
				<view class="two">
					<text>还没账号？</text>
					<text class="register" @click="register">去注册</text>
				</view>
				<view class="forges" @click="forgetPassword">
					忘记密码？
				</view>
			</view>
			<button type="default" class="logins" @click="submit">登录</button>
			<!-- 登录身份选项 -->
			<view class="radio-group">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled"
					 shape="circle">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {
		login,
		getUserInfo
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {
			// uniIcons,

		},
		props: {},
		data() {

			return {
				windowHeights: 0,
				tag: '', //控制登录结束后前往的页面（ 0 前往上级页面
				client_id: '',
				form: {

					mobile: '13778887148',
					password: '123456'
				},
				rules: {
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机为11位数字',
							trigger: ['change', 'blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							pattern: /[A-Za-z0-9]+$/,
							// 正则检验前先将值转为字符串
							message: '密码不正确'
						},
					],
				},
				list: [{
					name: '工作人员',
					disabled: false,

				}, {
					name: '志愿者',
					disabled: false,

				}],
				value: 'employee/volunteer',
			}
		},
		methods: {
			// 跳转找回密码页面
			forgetPassword() {
				uni.navigateTo({
					url: '../retrieve/retrieve'
				})
			},
			// 跳转手机注册页面
			register() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			// 登录身份选择
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				console.log(e);
				if (this.value === '工作人员') {
					this.client_id = 'employee'
				} else {
					this.client_id = "volunteer"
				}
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
				
			},

			//点击登录
			submit() {
				if (this.value !== '') {

					this.$refs.uForm.validate(valid => {
						if (valid && this.form.mobile.length != 0 && this.form.password.length != 0) {
							var ajaxPromise = new Promise(function(resolve, reject) {
								resolve();
							});
							uni.showLoading({
								title: '登录中'
							})
							ajaxPromise.then(() => {
								//请求 -- 登录
								return login(
									this.form.mobile,
									this.form.password,
									this.client_id

								).then(res => {
									if (res.data.code == 2000) {
										return res.data
									} else if (res.data.code == 4000) {
										uni.showToast({
											icon: "none",
											title: res.data.message
										})
										return res.data
									}
								}).catch(err => {
									uni.showToast({
										icon: "none",
										title: '网络错误'
									})
								}).then((res) => {
									// console.log(res)
									if (res.code === 2000) {
										// 保存token getUserInfo
										uni.setStorageSync('token', res.data.token)
										//判断登录的身份
										uni.setStorageSync('flag', res.data.data)
										// uni.setStorageSync('flag', res.data.data.userInfo)
										//请求 -- 获取用户信息
										return getUserInfo(
											res.data.token
										).then(res => {
											console.log(res.data)
											uni.hideLoading()
											//判断登录的身份
											uni.setStorageSync('flag', res.data.data.userInfo.flag)
											// 保存用户信息
											uni.setStorageSync('userInfo', res.data.data.userInfo)
											//登录成功 且没有特殊要求前往首页  tag = 0 返回上一页
											if (this.tag == '' || this.tag == undefined) {
												uni.reLaunch({
													url: '../index/index'
												})
											} else if (this.tag == 0) {
												uni.navigateBack({
													delta: 1
												})
											}
										})
									}
								})
							});
						}
					})

				} else {
					uni.showModal({
						content: '请选择身份类型',
						showCancel: false
					})
				}
			},



		},
		onLoad(option) {
			if (option.tag) {
				this.tag = option.tag
			}
			// // 清除token
			// uni.setStorageSync('token','')
			// // 清除userInfo
			// uni.setStorageSync("userInfo",'')
			// //清空
			// uni.setStorageSync('selectFamily','')
		},
		created() {
			//获取userInfo
			if (uni.getStorageSync('userInfo')) {
				console.log(1)
				uni.redirectTo({
					url: '../index/index'
				})
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeights = res.windowHeight - res.statusBarHeight - 44;
					// console.log(res,res.windowHeight )
				}
			})
		},
		computed: {

		},
		watch: {

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	* {
		margin: 0;
		padding: 0
	}

	.box {
		// z-index: 9999;
		// width: 100vw;
		// position: relative;
		width: 100%;
		height: 100%;
	}

	.top {
		// width: 100%;
		// height: 40%;

	}

	.img {
		width: 100%;
		height: 100%;
	}

	.foot {
		height: 64%;
		width: 100%;
		// position: absolute;
		// top: 500rpx;
		background: white;
		// border-top-right-radius: 20rpx;
		// border-top-left-radius: 20rpx;
		// padding-bottom: 30upx;
	}

	.middle {
		padding: 50rpx;

		.platform {
			font-size: 36rpx;
			font-weight: 700;
		}

		.login {
			font-size: 28rpx;
			margin-top: 20rpx;
			color: gray;
		}
	}

	.icons {
		line-height: 100rpx;

	}

	.password {
		width: 70%;
		height: 100rpx;
		font-size: 28rpx;
		line-height: 100rpx;
		color: gray;
		margin-left: 30rpx;
	}

	.iconss {
		line-height: 100rpx;

	}

	.passwords {
		width: 70%;
		height: 100rpx;
		font-size: 28rpx;
		line-height: 100rpx;
		color: gray;
		margin-left: 30rpx;
	}

	.forget {
		margin-right: 30rpx;
		color: gray;
		margin-top: 60rpx;
		font-size: 28rpx;
	}

	.logins {
		width: 90%;
		height: 80rpx;
		background-color: skyblue;
		border-radius: 40rpx;
		margin: 40rpx 36rpx;

		line-height: 80rpx;
		font-size: 26rpx;
	}

	.two {
		// text-align: center;
		font-size: 28rpx;

		// margin-top: 60rpx;
		// margin-left: 50rpx;
		.register {
			color: skyblue;
		}
	}

	.sign {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 20rpx 30rpx 0rpx 30rpx;
	}

	.forges {
		font-size: 28rpx;
	}

	.input {
		height: 100rpx;
		margin-left: 50rpx;
		display: flex;
		align-items: center;
	}

	.inputs {
		height: 150rpx;
		display: flex;
		align-items: center;
	}

	.inputs {
		height: 150rpx;
		margin-left: 50rpx;
		font-size: 28rpx;
	}

	//登录身份选项
	.radio-group {
		text-align: center;
		margin-top: 40rpx;
	}
</style>
