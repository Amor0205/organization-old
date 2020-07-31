<template>
	<view class="box">
		<!-- 顶部订单介绍 -->
		<view class="topBox">
			<view class="project">
				订单项目
			</view>
			<view class="" style="display: flex;">
				<view v-for="(item,index) in mold" :key='index' class="moldItem">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 中间部分项目分类 -->
		<view class="centreBox">
			<view class="employ">
				使用这些服务
			</view>
			<view class="initiative">
				主动服务
			</view>
			<view class="collapse">
				<u-collapse>
					<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled">
						<view class="">
							<view class="">
								{{item.body}}
							</view>
							<!-- <view class="">
								{{item.body.cleanbedding}}
							</view> -->
							
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				mold: ['地面清洁', ' /被套清洗', ' /做菜煮饭', ' /房间收拾', ' /	剪指甲'],
				itemList: [{
					head: "清洁类",
					body: {
						
					},
					open: false,
				
				}, {
					head: "体检类",
					body: "",
					open: false,
				}, {
					head: "餐饮类",
					body: "",
					open: false,
				}, {
					head: "接送类",
					body: "",
					open: false,
				}],
			}
		},
		methods: {

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

		.topBox {
			padding: 20rpx;

			.project {
				font-size: 24rpx;
				color: #878BA1;
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
				font-size: 24rpx;
				color: #878BA1;
				padding-top: 50rpx;
			}
			.collapse{
				padding: 20rpx 0rpx 100rpx 0rpx;
			}
		}

	}
</style>
