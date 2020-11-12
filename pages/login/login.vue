<template>

	<view class="">
		<view class="scripts">
			福利院员工系统
		</view>
		<view class="from">
			<u-form :model="form" ref="uForm">
				<view class="input">
					<u-form-item label="账号" label-position='top' prop="mobile" style="font-size: 18px;">
						<view class="" style="width: 600rpx;height: 80rpx;">
							<u-input v-model="form.mobile" type="mobile" placeholder='请输入登录账号' maxlength='11' class="input" />
						</view>
					</u-form-item>
				</view>
				<view class="">
					<u-form-item label="密码" label-position='top' prop="password" style="font-size: 18px;">
						<view class="" style="width: 600rpx;height: 80rpx;  ">
							<u-input v-model="form.password" type="password" placeholder='请输入密码' maxlength='11' />
						</view>
					</u-form-item>
				</view>
				<!-- 	<view class="">
					<u-form-item label="单位" label-position='top' prop="sex" style="font-size: 18px;">
						<view class="" style="width: 600rpx;height: 80rpx;">
							<u-input type="select" :select-open="actionSheetShow" v-model="form.sex" placeholder="请选择单位" @click="actionSheetShow = true"></u-input>
						</view>
					</u-form-item>
				</view> -->
			</u-form>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		</view>
		<view class="forget">
			<view class="">
			</view>
			<view class="forget" @click="forget">
				忘记密码？
			</view>
		</view>
		<view class="u-button">
			<view type="success" @click="submit">登录</view>
		</view>

	</view>

</template>

<script>
	import {
		login
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				actionSheetShow: false, //选择单位弹框

				form: {
					mobile: '17608130109',
					password: '123456',

				},

				actionSheetList: [{
						text: '峨眉山市民政福利院'
					},
					{
						text: '成都高新福利院'
					},
					{
						text: '儿童福利院'
					}
				],
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
							message: '请输入正确的手机号',
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
					sex: [{
						required: true,
						message: '请选择单位',
						trigger: 'change'
					}, ],
				},
			}
		},
		methods: {
			// 点击actionSheet回调（单位选择)
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.form.sex = this.actionSheetList[index].text;
			},

			//点击登录
			submit() {
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
								this.form.password
							).then(res => {
								if (res.data.code == 2000) {
									uni.hideLoading()
									uni.showToast({
										title:'登录成功'
									})
									//保存token
									uni.setStorageSync('token', res.data.data.token)
									// 保存用户信息
									uni.setStorageSync('userInfo', res.data.data.info)
									// 登录成功 且没有特殊要求前往首页  tag = 0 返回上一页
									if (this.tag == '' || this.tag == undefined) {
										uni.reLaunch({
											url: '../index/index'
										})
									} else if (this.tag == 0) {
										uni.navigateBack({
											delta: 1
										})
									}
								} else if (res.data.code == 4000) {
									uni.showToast({
										icon: "none",
										title: res.data.message
									})
									return res.data
								}
								console.log(res);
							}).catch(err => {
								uni.showToast({
									icon: "none",
									title: '网络错误'
								})
							})

						});
					}
				})


			},
			// 忘记密码
			forget() {
				uni.navigateTo({
					url: '../forget/forget'
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
	.scripts {
		text-align: center;
		font-size: 22px;
		margin-top: 150rpx;
		font-weight: 700;
	}

	.from {
		margin-top: 100rpx;
		margin-left: 80rpx;

	}

	.forget {
		margin-top: 30rpx;
		margin-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.u-button {
		width: 500rpx;
		height: 100rpx;
		border-radius: 60rpx;
		text-align: center;
		margin: 0 auto;
		margin-top: 60rpx;
		background-color: #FFE300;
		line-height: 100rpx;
	}
</style>
