<!-- 修改密码 -->
<template>
	<view class="box">
		<view class="set">
			请设置新密码
		</view>
		<view class="from">
			<u-form :model="form" ref="uForm">
				<view class="input">
					<u-form-item label="手机" label-position='top' prop="mobile" style="font-size: 18px;">
						<view class="" style="width: 600rpx;height: 80rpx;">
							<u-input v-model="form.mobile" type="mobile" placeholder='请输入手机号' maxlength='11' />
						</view>
					</u-form-item>
				</view>
				<view class="three">
					<u-form-item label="验证码" label-position='top' prop="code" style="font-size: 18px;">
						<view class="" style="width: 340rpx;height: 50rpx; display: flex; align-items: center;margin-top: 20rpx;">
							<u-input v-model="form.code" type="code" placeholder='请输入验证码' />
						</view>
					</u-form-item>
					<view class="get" @tap="getCheckNum()">
						<text>{{!codeTime?'获取验证码':codeTime+'s'}}</text>
					</view>
				</view>
				<view class="">
					<u-form-item label="新密码" label-position='top' prop="password" style="font-size: 18px;">
						<view class="" style="width: 600rpx;height: 80rpx; ">
							<u-input v-model="form.password" type="password" placeholder='请设置新密码' maxlength='11' />
						</view>
					</u-form-item>
				</view>
			</u-form>
			<view class="u-button">
				<view type="success" @click="modification">修改密码</view>
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
				codeTime: 0,
				form: {
					mobile: '',
					password: '',
					code: ''
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

				},
			}
		},
		methods: {
			
			// 获取手机验证码
			getCheckNum() {
				if (this.codeTime > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: "none"
					});
					return;
				} else {
					this.codeTime = 60
					let timer = setInterval(() => {
						this.codeTime--;
						if (this.codeTime < 1) {
							clearInterval(timer);
							this.codeTime = 0
						}
					}, 1000)

					getVerificationCode(this.form.phone).then(res => {
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
			//修改密码
			modification(){
				uni.navigateTo({
					url: '../login/login'
				})
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
	.box {
		padding-right: 30rpx;
	}

	.set {
		font-size: 20px;
		font-weight: 700;
		padding: 20rpx 0rpx 00rpx 20rpx;
	}

	.from {
		margin-top: 50rpx;
		margin-left: 80rpx;

		.input {
			font-size: 20px;

		}
	}


	.three {
		display: flex;
		align-items: center;
	}

	.get {
		width: 130rpx;
		height: 52rpx;
		border: 1rpx solid red;
		text-align: center;
		line-height: 52rpx;
		// color: white;
		border-radius: 50rpx;
		padding: 0rpx 20rpx;
		border: 1rpx solid #878BA1;
		font-size: 24rpx;
		color: #878BA1;
		margin-top: 70rpx;
		margin-left: 100rpx;
	}
	.u-button {
		width: 500rpx;
		height: 100rpx;
		border-radius: 60rpx;
		text-align: center;
		margin: 0 auto;
		margin-top: 60rpx;
		background-color:  #FFE300;
		line-height: 100rpx;
	}
</style>
