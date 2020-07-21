<!-- 找回密码 -->
<template>
	<view class="box">
		<view class="top">
			<image src="../../static/imgs/theme.png" mode="" class="img"></image>
		</view>
		<view class="foot">

			<view class="phone">
				手机验证码
			</view>
			<view class="lable">
				手机验证码找回密码
			</view>
			<!-- 输入框 -->
			<view class="input">
				<u-form :model="form" ref="uForm">

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
						<uni-icons type="locked" size="25"></uni-icons>
						<u-form-item label="" prop="password">
							<view class="" style="width: 550rpx;height: 50rpx; display: flex;align-items: center;">
								<u-input  type="password" v-model="form.password" placeholder="请设置密码"></u-input>
							
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
				<button type="default" class="button" @click="submit">确定</button>
			</view>
			<view class="footer">
				<text style="color: #878BA1;">已经记起密码?</text>
				<text style="color: #0072FF;" @click="goTologin">返回登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getVerificationCode} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				containerHeight:0,	//window高度
				codeTime: 0,
				form: {
					phone: '',
					code: '',
					password: '',
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
					
					getVerificationCode(this.form.phone).then(res => {
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
			// 返回登录页面
			goTologin() {
				uni.navigateTo({
					url: '../login/login'
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

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	.box {
		background: #FFE300;

		.top {
			width: 760rpx;
			height: 500rpx;

			.img {
				width: 760rpx;
				height: 500rpx;
			}
		}

		.foot {
			width: 100%;
			// height: 1000rpx;
			background: white;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			padding: 30upx 0;
		}

		.foot {
			// position: fixed;

			.phone {
				font-size: 36rpx;
				font-weight: 700;
				color: #282828;
				padding: 0 38rpx;
			}

			.lable {
				font-size: 28rpx;
				color: #555969;
				margin: 20rpx 0rpx 0rpx 38rpx;
			}

		}

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
			margin: 40rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
		}

		.all {
			margin-top: 50rpx;
			display: flex;
			flex-wrap: nowrap;
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

		.input {
			margin-top: 100rpx;
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

		.footer {
			text-align: center;
			font-size: 28rpx;
			margin-top: 78rpx;
		}
	}
</style>
