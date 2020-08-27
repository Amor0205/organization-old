<!-- 手机号注册 -->
<template>
	<view class="box">
		<view class="top">
			<image src="../../static/imgs/theme.png" mode="" class="img"></image>
		</view>
		<view class="next">
			<view class="establish">
				创建平台账号
			</view>
			<view class="start">
				开始创建孝兴邦居养老账号
			</view>
			<!-- 输入框 -->
			<view class="">
				<u-form :model="form" ref="uForm">
					<view class="two">
						<uni-icons type="contact-filled" size="25"></uni-icons>
						<u-form-item label="" prop="phone">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input v-model="form.phone" type="phone" placeholder='请输入手机号' maxlength='11'/>
							</view>
						</u-form-item>
					</view>
					<view class="two">
						<uni-icons type="locked" size="25"></uni-icons>
						<u-form-item label="" prop="password">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input  type="password" v-model="form.password" placeholder="请设置密码"></u-input>
							</view>
						</u-form-item>
					</view>
					<view class="two">
						<uni-icons type="locked" size="25"></uni-icons>
						<u-form-item label="" prop="rePassword">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex; align-items: center;">
								<u-input  type="password" v-model="form.rePassword" placeholder="请确认密码"></u-input>
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
			</view>
			<!-- 底部 -->
			<view class="">
				<button type="default" class="button" @click="submit">注册</button>
			</view>

			<view class="footer">
				<text style="color: #878BA1;">手机号码已被注册?</text>
				<text style="color: #0072FF;" @click="goTocard">使用身份证注册</text>
			</view>
			<view class="footer">
				<text style="color: #878BA1;">已经有账户?</text>
				<text style="color: #0072FF;" @click="backLogin">返回登录</text>
			</view>
	
		</view>
		
	</view>
</template>

<script>
	
import { 
	getVerificationCode,
	register
} from '../../src/ajax.js'
	
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {

				codeTime: 0,
				form: {
					phone: '',
					code: '',		//验证码
					password: '',
					rePassword: '',
				},
				rules: {
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
					code: [{
						required: true, 
						message: '请输入验证码',
						trigger: ['change','blur'],
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change','blur'],
					}],

				}
			}
		},
		methods: {
			// 跳转身份证号码注册
			goTocard() {
				uni.navigateTo({
					url: "../card/card"
				})
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
					
					getVerificationCode(this.form.phone,1).then(res => {
						if(res.data.code == 2000){
							uni.showToast({
								title:'获取验证码成功'
							})
						}else if(res.data.code == 4000){
							uni.showToast({
								icon:"none",
								title:res.data.message
							})
						}	
					}).catch(err => {
						uni.showToast({
							icon:"none",
							title:'获取验证码失败'
						})
					})	
						
				}
			},
			submit() {
				console.log(this.$refs.uForm)
				this.$refs.uForm.validate(valid => {
					if (valid && this.form.phone.length != 0 && this.form.password.length != 0 && this.form.code.length != 0 ) {
						// 请求 -- 注册
						register(
							this.form.phone,
							this.form.password,
							this.form.code
						).then(res => {
							console.log(res.data)
							if(res.data.code == 2000){
								uni.showToast({
									title:res.data.message
								})
								setTimeout(()=>{
									uni.navigateTo({
										url: '../login/login'
									})
								},1500)
							}else if(res.data.code == 4000){
								uni.showToast({
									icon:"none",
									title:res.data.message
								})
							}	
						}).catch(err => {
							uni.showToast({
								icon:"none",
								title:'注册失败'
							})
						})	
						
						
					} else {
						uni.showToast({
							icon:"none",
							title:'请完善您的信息'
						})
					}
				});
			},
			//返回登录页面
			backLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
		

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
		position: relative;

		.top {
			width: 760rpx;
			height: 590rpx;
		}

		.img {
			width: 760rpx;
			height: 590rpx;
		}

		.next {
			width: 100%;
			background: white;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			position: absolute;
			top: 300rpx;
			padding-bottom: 30upx;
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
			margin: 110rpx 0rpx 0rpx 42rpx;
			display: flex;
			align-items: center;
		}

		.two {
			width: 90%;
			height: 50rpx;
			margin: 80rpx 0rpx 0rpx 42rpx;
			display: flex;
			align-items: center;
		}

		.button {
			width: 706rpx;
			height: 100rpx;
			margin: 0 auto;
			margin-top: 100rpx;
			background-color: #FFE300;
			border-radius: 50rpx;
			font-size: 28rpx;
			line-height: 100rpx;
			font-weight: 700;
		}

		.phone {
			font-size: 28rpx;
			color: #878BA1;
			text-align: center;
			margin-top: 80rpx;
		}

		.footer {
			text-align: center;
			font-size: 28rpx;
			margin-top: 78rpx;
		}
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

	}

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
</style>
