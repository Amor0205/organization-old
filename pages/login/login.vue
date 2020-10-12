<template>
	<view>
		<view class="script">
			福利院员工系统
		</view>
		<view class="input">
			<u-form :model="form" ref="uForm">
				<view class="">
					<view class="">
						账号
					</view>
					<u-form-item label="" prop="mobile">
						
							<u-input v-model="form.mobile" type="mobile" placeholder='请输入登录账号' maxlength='11' />
					
					</u-form-item>
				</view>
				<view class="">
					<view class="">
						密码
					</view>
					<u-form-item label="" prop="password">
						<view class="">
							<u-input v-model="form.password" type="password" placeholder='请输入密码' maxlength='11' />
						</view>
					</u-form-item>
				</view>
				<view class="">
					<view class="">
						单位
					</view>
					<u-form-item>
						<u-input v-model="form.sex" type="select" placeholder='请选择单位' />
					</u-form-item>
				</view>
			</u-form>
		</view>
		<view class="forget">
			<view class="">
				
			</view>
			<view class="forget">
				忘记密码
			</view>
		</view>
		<view class="u-button">
			<u-button type="success" @click="login">登录</u-button>
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
				form: {
					mobile: '',
					password: '',
					sex: '',
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
			}
		},
		methods: {
		login(){
			uni.navigateTo({
				url:'../index/index'
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
	.script {
		text-align: center;
		font-size: 20px;
		margin-top: 150rpx;
	}

	.input {
		margin-top: 100rpx;
		margin-left: 50rpx;
	}
	.forget{
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.u-button{
		width: 400rpx;
		text-align: center;
		margin: 0 auto;
		margin-top: 100rpx;
	}
</style>
