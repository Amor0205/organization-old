<!-- 选择服务内容（直接发布） -->
<template>
	<view class="box">
		<!-- 中间部分项目分类 -->
		<view class="centreBox">
			<view class="collapse">
				<u-collapse>
					<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled"
					 class="itemList">
						<u-checkbox-group @change="checkboxGroupChange" v-for="(item1,index1) in item.list" :key="index1">
							<u-checkbox @change="checkboxChange" v-model="item1.checked" :name="item1.name" shape="circle" active-color='#FFE300'
							 class="u-checkbox">
								<view class="contain">
									<view class="name">
										{{item1.name}}
									</view>
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</u-collapse-item>
				</u-collapse>
			</view>
			<!-- 确认服务分类 -->
			<!-- <view class="baseBox">
				<view class="affirm">
					服务确认
				</view>
				<view class="choice">
					<view :class="{'btn': rSelect.indexOf(index)!=-1}" v-for="(item,index) in number" :key="index" 
					 class="button">
						<view class="names" :style="item.style">
							{{item.name}}
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 提交按钮 -->
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {
		postRelease
	} from '../../../src/ajax.js'
	export default {
		data() {
			return {

				itemList: [{
					head: "卫生",
					list: [{
							name: '吃饭1',
							checked: false,
							disabled: false
						},
						{
							name: '饮水2',
							checked: false,
							disabled: false
						}, {
							name: '被套清洁3',
							checked: false,
							disabled: false
						},

					]
				}, {
					head: "清洁",
					list: [{
							name: '打游戏',
							checked: false,
							disabled: false
						},
						{
							name: '上网',
							checked: false,
							disabled: false
						}, {
							name: '洗衣服',
							checked: false,
							disabled: false
						},

					],
					open: false,
				}, {
					head: "饮食",
					list: [{
							name: '品古董',
							checked: false,
							disabled: false
						},
						{
							name: '京东',
							checked: false,
							disabled: false
						}, {
							name: '淘宝',
							checked: false,
							disabled: false
						},

					],
					open: false,
				}, {
					head: "药品",
					list: [{
							name: '爱奇艺',
							checked: false,
							disabled: false
						},
						{
							name: '优酷',
							checked: false,
							disabled: false
						}, {
							name: '腾讯',
							checked: false,
							disabled: false
						},

					],
					open: false,
				}],
				rSelect: [], //点击标签添加的数组
				number: [],
				ids: '', //接收穿过来数据里面的flag
				all: '',
				awarry: [],
				serve: ''
			}
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				// console.log(e);
				if (e.value == true) {
					// console.log(e)//打印下标
					this.number.push(e); //选中添加到数组里
					console.log(this.number);

				} else {
					this.number.splice(this.number.indexOf(e), 1); //取消
				}
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			// checkedAll() {
			// 	this.list.map(val => {
			// 		val.checked = true;
			// 	})
			// }
			//选择服务标签
			// tapInfo(e) {
			// 	if (this.rSelect.indexOf(e) == -1) {
			// 		// console.log(e)//打印下标
			// 		this.rSelect.push(e); //选中添加到数组里
			// 	} else {
			// 		this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
			// 	}
			// },
			submit() {
				// var select=true
				// //获取当前页面（返回index页面）
				// var pages = getCurrentPages(); //当前页
				// //用scode来接收成功的值
				// pages[0].$vm.select = true
				// console.log(pages[0].select);
				// setTimeout(() => {
				// 		uni.navigateBack()
				// }, 1500)
					console.log(111);
				this.number.map(item => {
					this.awarry.push(item.name)
					console.log(this.awarry);
				})
				this.serve = this.awarry.join('/')
				console.log(this.number);
				console.log(this.serve);
				// postRelease(
				// 	this.all.id,
				// 	this.all.type,
				// 	'',
				// 	this.serve
				// ).then(res => {
				// 	if (res.data.code == 2000) {
				// 		uni.showToast({
				// 			title:'提交成功'
				// 		})
				// 		uni.setStorageSync('number', this.number)
				// 		uni.navigateTo({
				// 			url: '../assist/assist?all='+JSON.stringify(this.all)
				// 		})
						
				// 	} else {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: res.data.data.message
				// 		})
				// 	}
				// }).catch(err => {
				// 	console.log(err);
				// })


				// if (this.ids.id == 2) {


				// } else  {
				// 	uni.setStorageSync('number', this.number)
				// 	uni.navigateTo({
				// 		url: './write'
				// 	})

				// }


			}


		},
		created() {

		},
		mounted() {

		},
		onLoad(option) {
			// console.log(option);
			this.ids = JSON.parse(option.data)
			// console.log(this.ids);
			this.all = JSON.parse(option.all)
			console.log(this.all);
			// this.exhibits= JSON.parse(option.exhibit)
			// console.log(this.exhibits);

		}

	}
</script>

<style lang="scss">
	.box {
		.centreBox {
			padding: 20rpx;

			.employ {
				// font-size: 60rpx;
				color: #FF9500;
				text-align: center;
				padding-top: 20rpx;
			}

			.initiative {
				// font-size: 60rpx;
				color: #878BA1;
				padding-top: 50rpx;
			}

			.collapse {
				padding: 20rpx 0rpx 20rpx 0rpx;
				font-size: 20px;

				.itemList {
					margin-top: 50rpx;

					.u-checkbox {
						margin-right: 30rpx;
						margin-top: 40rpx;
					}

					.contain {

						.name {
							font-size: 16px;
						}
					}
				}

			}
		}

		.baseBox {}

		.submit {
			width: 80%;
			height: 100rpx;
			background: #FFE300;
			margin: 0 auto;
			text-align: center;
			line-height: 100rpx;
			margin-top: 50rpx;
			border-radius: 50rpx;
			font-size: 30rpx;
			font-size: 18px;
		}


	}
</style>
