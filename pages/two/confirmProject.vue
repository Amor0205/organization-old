<template>
	<view class="box">
		<!-- 顶部订单介绍 -->
		<!-- <view class="topBox">
			<view class="project">
				订单项目
			</view>
			<view class="" style="display: flex;">
				<view v-for="(item,index) in mold" :key='index' class="moldItem">
					{{item}}
				</view>
			</view>
		</view> -->
		<!-- 中间部分项目分类 -->
		<view class="centreBox">
			<!-- <view class="employ">
				使用这些服务
			</view>
			<view class="initiative">
				主动服务
			</view> -->
			<view class="collapse">
				<u-collapse>
					<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled"
					 class="itemList">
						<view class="" v-for="(item1,index1) in item.list" :key="index1">
							<view class="contain">
								<view class="name">
									{{item1.name}}
								</view>
								<view class="">
									<u-checkbox-group @change="checkboxGroupChange">
										<u-checkbox @change="checkboxChange" v-model="item1.checked" :name="item1.name" shape="circle" active-color='#FFE300'></u-checkbox>
									</u-checkbox-group>
								</view>
							</view>
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
			<!-- 确认服务分类 -->
			<view class="baseBox">
				<view class="affirm">
					服务确认
				</view>
				<view class="choice">
					<view :class="{'btn': rSelect.indexOf(index)!=-1}" v-for="(item,index) in number" :key="index" @tap="tapInfo(index)"
					 class="button">
						<view class="names" :style="item.style">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="submit">
			提交
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				mold: ['地面清洁', ' /被套清洗', ' /做菜煮饭', ' /房间收拾', ' /	剪指甲'],
				countersign: ['地面清洁', '被套清洗', '做菜煮饭', '房间收拾', '房间收拾', '剪指甲'],
				itemList: [{
					head: "清洁类",
					list: [{
							name: '地面清洁',
							checked: false,
							disabled: false
						},
						{
							name: '被套清洁',
							checked: false,
							disabled: false
						}, {
							name: '被套清洁',
							checked: false,
							disabled: false
						},

					]
				}, {
					head: "体检类",
					list: [{
							name: '地面清洁',
							checked: false,
							disabled: false
						},
						{
							name: '被套清洁',
							checked: false,
							disabled: false
						}, {
							name: '被套清洁',
							checked: false,
							disabled: false
						},

					],
					open: false,
				}, {
					head: "餐饮类",
					list: [{
							name: '地面清洁',
							checked: false,
							disabled: false
						},
						{
							name: '被套清洁',
							checked: false,
							disabled: false
						}, {
							name: '被套清洁',
							checked: false,
							disabled: false
						},

					],
					open: false,
				}, {
					head: "接送类",
					list: [{
							name: '地面清洁',
							checked: false,
							disabled: false
						},
						{
							name: '被套清洁',
							checked: false,
							disabled: false
						}, {
							name: '被套清洁',
							checked: false,
							disabled: false
						},

					],
					open: false,
				}],
				rSelect: [], //点击标签添加的数组
				number:[]

			}
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
				if (e.value==true) {
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
			tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
					// console.log(e)//打印下标
					this.rSelect.push(e); //选中添加到数组里
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},


		},
		created() {

		},
		mounted() {

		},
		onLoad() {

		}

	}
</script>

<style lang="scss">
	.box {
		padding-bottom: 20rpx;
		.topBox {
			padding: 20rpx;

			.project {
				font-size: 32rpx;
				color: #878BA1;
				;
			}

			.moldItem {
				font-size: 28rpx;
				color: #666666;
				padding-top: 20rpx;
			}
		}

		.centreBox {
			padding: 20rpx;

			.employ {
				font-size: 30rpx;
				color: #FF9500;
				text-align: center;
				padding-top: 20rpx;
			}

			.initiative {
				font-size: 32rpx;
				color: #878BA1;
				padding-top: 50rpx;
			}

			.collapse {
				padding: 20rpx 0rpx 100rpx 0rpx;

				.itemList {
					margin-top: 30rpx;

					.contain {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						width: 97%;

						// height: 100%;
						.name {
							margin-top: 40rpx;
						}
					}
				}

			}
		}

		.baseBox {
			.affirm {
				font-size: 32rpx;
				color: #878BA1;
			}

			.choice {
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-around;
				margin-top: 30rpx;

				.button {
					margin-left: 10rpx;
					margin-bottom: 20rpx;
				}

				.names {
					width: 160rpx;
					height: 56rpx;
					border: 1rpx solid #666666;
					font-size: 28rpx;
					text-align: center;
					line-height: 56rpx;
					border-radius: 40rpx;
					color: #282828;
				}

				.btn {
					font-size: 28rpx;
					text-align: center;
					line-height: 56rpx;
					border-radius: 40rpx;
					background: #FFE300;
				}
			}
		}
		.submit{
			width: 90%;
			height: 70rpx;
			background: #FFE300;
			margin: 0 auto;
			text-align: center;
			line-height: 70rpx;
			margin-top: 50rpx;
			border-radius: 50rpx;
			font-size: 30rpx;
			}
		

	}
</style>
