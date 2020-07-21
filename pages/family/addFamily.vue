<template>
	<view class="container">
		<u-form :model="form" ref="uForm">
			<!-- 间隔行 -->
			<view class="gap"></view>
			<u-form-item :labelWidth="labelWidth" prop="nikeName" label="姓名" ><u-input placeholder="请输入姓名"  v-model="form.nikeName" /></u-form-item>
			<u-form-item :labelWidth="labelWidth" prop="IDcard" label="身份证号"><u-input placeholder="请输入身份证号" v-model="form.IDcard" /></u-form-item>
			
			<!-- 间隔行 -->
			<view class="gap"></view>
			<u-form-item :labelWidth="labelWidth" prop="phoneNum" label="手机号"><u-input placeholder="请输入手机号" v-model="form.phoneNum" /></u-form-item>
			<u-form-item :labelWidth="labelWidth" prop="captcha" label="验证码">
				<u-input v-model="form.captcha" placeholder="请输入验证码" />
				<view class="captchaBox" @tap="getCheckNum()">
					{{ !number?'获取验证码': number + "s" }}
				</view>
			</u-form-item>
			
			<u-button style="margin-top: 60upx;" type="success" shape="circle" @click="submit">提交</u-button>
		</u-form>
	</view>
</template>

<script>
import { getVerificationCode } from '../../src/ajax.js'
	
	export default {
		data() {
			return {
				labelWidth:180,
				number:0,
				form: {
					nikeName: '',
					IDcard: '',
					phoneNum: '',
					captcha:'',
					disabled:false	//选择标识
				},
				rules: {
					nikeName: [
						{
							required: true,
							message: '请输入姓名',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						},
					],
					IDcard:[
						{
							required: true,
							message: '请输入身份证号',
							trigger: ['change', 'blur'],
						},
						{
							pattern: /^\d{17}(\d|X)$/i,
							message: '请输入正确的身份证号',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
					phoneNum: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '请输入正确的手机号',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						},
					],
					captcha:[
						{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						}
					]
				}	
			}
		},
		methods: {
			//获取验证码
			getCheckNum(){
				if (this.number > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: "none"
					});
					return;
				} else {
					this.number = 300
					let timer = setInterval(() => {
						this.number--;
						if (this.number < 1) {
							clearInterval(timer);
							this.number = 0
						}
					}, 1000)
					
					getVerificationCode(this.form.phoneNum).then(res => {
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
			
			submit(res){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						//先记录值，下面this指向会不一样
						let parent = this.form;
						//将数据发射到父级监听事件中
						this.$eventHub.$emit('child',parent);
						//关闭当前窗口
						uni.navigateBack({});
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			//opt是传过来的queryString对象
			// this.form = option.id;
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	// 间隔行
	.gap{
		height: 20upx;
		background: #f9f9f9;
	}
	.container {
		padding: 0 20upx;
		font-size: 14px;
		line-height: 20px;
		.captchaBox{
			font-size: 12px;
			height: 50upx;
			min-width: 60upx;
			padding: 0 30upx;
			border: 1px solid #878BA1;
			color: #878BA1;
			border-radius: 40upx;
			display: flex;
			align-items: center;
		}
	}
</style>
