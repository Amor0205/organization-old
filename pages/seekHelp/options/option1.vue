<!-- 选择服务内容 -->
<template>
	<view class="box">
		<!-- 中间部分项目分类 -->
		<view class="centreBox">
			<view class="collapse">
				<u-collapse>
					<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled"
					 class="itemList">
						<u-checkbox-group @change="checkboxGroupChange" v-for="(item1,index1) in item.list" :key="index1">
							<u-checkbox @change="checkboxChange" v-model="item1.checked" :name="item1.name" shape="circle" active-color='#FFE300' class="u-checkbox">
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
		<view class="submit" @click="submit()">
			提交
		</view>
	</view>
</template>

<script>
	import{ getcontent } from '../../../src/ajax.js'
	export default {
		data() {
			return {
				itemList: [
				],
				rSelect: [], //点击标签添加的数组
				number: [],
				ids: '', //接收穿过来数据里面的flag
				all: '',

			}
		},
		methods: {
			// change(){
			// 	console.log(123);
			// },
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
				if (e.value == true) {
					// console.log(e)//打印下标
					this.number.push(e); //选中添加到数组里

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
				uni.showToast({
					title:'提交成功'
				})
				uni.setStorageSync('number', this.number)
				// uni.navigateTo({
				// 	url:'../registrations/write'
				// })
				uni.navigateBack({

				})
			},
			getlist(){
				getcontent().then(res=>{
					if(res.data.code==2000){
						console.log(res);
						res.data.data.menus.map(res1=>{
							this.itemList.push({head:res1.name,list:res1.children,checked:res1.checked==false,disabled:res1.disabled==false},)
							console.log(this.itemList);
						})
						
					}
				})
			}


		},
		created() {
			this.getlist()
		},
		mounted() {
	
		},
		onLoad() {


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
				
					.u-checkbox{
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

		.baseBox {
			
		}

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
