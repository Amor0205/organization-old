<template>
	<view class="box">
		<!-- 投诉类型 -->
		<view class="">
			<view class="complaints">
				投诉类型
			</view>
			<view class="cut" v-for="(item,index) in cut" :key="index">
				<view class="contain">
					<view class="name">
						{{item.name}}
					</view>
					<view class="">
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.name" shape="circle" active-color='#FFE300'></u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<!-- 投诉原因 -->
		<view class="">
			<view class="complaints">
				投诉原因
			</view>
			<view class="cut" v-for="(item,index) in cause" :key="index">
				<view class="contain">
					<view class="name">
						{{item.name}}
					</view>
					<view class="">
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.name" shape="circle" active-color='#FFE300'></u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<!-- 输入框 -->
		<view class="form">
			<u-form :model="form" ref="uForm">
				<view class="">
					<u-form-item>
						<u-input v-model="form.intro" placeholder='详细描述' />
					</u-form-item>
				</view>
			</u-form>
		</view>
		<!-- 提交按钮 -->
			<button type="default" class="button">提交</button>
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
				cut: [{
						isSelect: false,
						name: '商家服务',
					},
					{
						isSelect: false,
						name: '平台服务',
					}
				],
				cause: [{
					isSelect: false,
					name: '态度恶劣'
				}, {
					isSelect: false,
					name: '虚假服务'
				}, {
					isSelect: false,
					name: '服务不安全'
				}, {
					isSelect: false,
					name: '服务不专业'
				}, {
					isSelect: false,
					name: '服务过程中推销产品'
				}, {
					isSelect: false,
					name: '服务客服差'
				}],
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
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
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
		padding: 0rpx 22rpx 0rpx 22rpx;

		.complaints {
			font-size: 24rpx;
			color: #878BA1;
			margin-top: 92rpx;
		}

		.cut {
			font-synthesis: 28rpx;
			// margin-top: 64rpx;
		}

		.name {
			font-size: 28rpx;
		}
		.form{
			margin-top: 40rpx;
		}
		.button {
			width: 706rpx;
			height: 88rpx;
			background: #FFE300;
			border-radius: 40rpx;
			color: #282828;
			font-size: 28rpx;
			font-weight: 700;
			line-height: 88rpx;
			margin-top: 104rpx;
		}
	}

	.contain {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 50rpx;
		margin-top: 40rpx;
	}

	.right {
		width: 300rpx;
		height: 50rpx;
		border: 1rpx solid #FFE300;
		border-radius: 50%;
		text-align: center;
		line-height: 30rpx;
	}
</style>
