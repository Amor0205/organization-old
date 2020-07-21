<!-- 身份证注册页面 -->
<template>
	<view class="box">
		<!-- 头部 -->
		<view class="theme">
			<image src="../../static/imgs/theme.png" mode="" class="image"></image>
		</view>
		<view class="foot">
			<view class="establish">
				创建平台账号
			</view>
			<view class="start">
				开始创建孝兴邦居养老账号
			</view>
			<!-- 输入框 -->
			<view class="">
				<u-form :model="form" ref="uForm">
					<view class="one">
						<!-- <u-icon name="account"></u-icon> -->
						<uni-icons type="contact" size="25"></uni-icons>
						<u-form-item label="" prop="name">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input v-model="form.name" type="name" placeholder='姓名' />
							</view>
						</u-form-item>
					</view>
					<view class="two">
						<!-- <u-icon name="account"></u-icon> -->
						<uni-icons type="contact-filled" size="25"></uni-icons>
						<u-form-item label="" prop="phone">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input v-model="form.phone" type="phone" placeholder='请输入手机号' maxlength='11'/>
							</view>
						</u-form-item>
					</view>
					<view class="two">
						<!-- <u-icon name="account"></u-icon> -->
						<uni-icons type="image" size="23"></uni-icons>
						<u-form-item label="" prop="idcard">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input v-model="form.idcard" type="idcard" placeholder='身份证号码' />
							</view>
						</u-form-item>
					</view>
					<view class="two">
						<!-- <u-icon name="lock"></u-icon> -->
						<uni-icons type="locked" size="25"></uni-icons>
						<u-form-item label="" prop="password">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input type="password" v-model="form.password" placeholder="请设置密码"></u-input>

							</view>
						</u-form-item>
					</view>
					<view class="two">
						<!-- <u-icon name="lock"></u-icon> -->
						<uni-icons type="locked" size="25"></uni-icons>
						<u-form-item label="" prop="rePassword">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex; align-items: center;">
								<u-input type="password" v-model="form.rePassword" placeholder="请确认密码"></u-input>
							</view>
						</u-form-item>
					</view>
				</u-form>
			</view>
			<!-- 底部 -->
			<view class="">
				<button type="default" class="button" @click="submit">注册</button>
			</view>

			<view class="phone" @click="phoneLogin">
				手机号码注册
			</view>
			<view class="footer">
				<text style="color: #878BA1;">已经有账户?</text>
				<text style="color: #0072FF;" @click="backLogin">返回登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		name: "",
		components: {
			uniIcons
		},
		props: {},
		data() {
			return {
				form: {
					phone: '',
					name: '',
					password: '',
					rePassword: '',
					idcard: ''
				},

				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 5,
							message: '姓名长度在3到5个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						},
					],
					phone: [{
							required: true,
							message: '请输入手机号',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码格式不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						},
					],
					idcard:[
						{
								required: true,
								message: '请输入身份证号',
								// 可以单个或者同时写两个触发验证方式 
								trigger: ['change', 'blur'],
							},
							{
								
								pattern: /^\d{17}(\d|X)$/i,
								message: '请输入正确的身份证号',
								trigger: ['change','blur'],
							}
					],
					password: [
						
						{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change','blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.form.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				}

			}
		},
		methods: {
			//跳转手机号注册页面
			phoneLogin() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			//跳转登录页面
			backLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			// 点击注册
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
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
		position: relative;

		.theme {
			width: 100%;
			height: 490rpx;

			.image {
				width: 100%;
				height: 490rpx;

			}
		}

		.foot {
			width: 100%;
			// height: 1000rpx;
			background: white;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			position: absolute;
			top: 160rpx
		}

		.establish {
			font-size: 36rpx;
			font-weight: 700;
			margin: 108rpx 0rpx 0rpx 38rpx;
		}

		.start {
			font-size: 28rpx;
			margin: 20rpx 0rpx 0rpx 38rpx;
			color: #555969;
		}

		.one {
			width: 90%;
			height: 50rpx;
			margin: 92rpx 0rpx 0rpx 42rpx;
			display: flex;
			align-items: center;
		}

		.two {
			width: 90%;
			height: 50rpx;
			margin: 90rpx 0rpx 0rpx 42rpx;
			display: flex;
			align-items: center;
		}

		.button {
			width: 706rpx;
			height: 100rpx;
			margin: 0 auto;
			margin-top: 80rpx;
			background-color: #FFE300;
			border-radius: 50rpx;
			font-size: 28rpx;
			line-height: 100rpx;
			font-weight: 700;
		}

		.phone {
			width: 200rpx;
			height: 30rpx;
			font-size: 28rpx;
			color: #878BA1;
			margin: 0 auto;
			margin-top: 70rpx;
		}

		.footer {
			text-align: center;
			font-size: 28rpx;
			margin-top: 70rpx;
			padding-bottom: 30upx;
		}
	}
</style>
