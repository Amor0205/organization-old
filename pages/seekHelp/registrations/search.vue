<!-- 其他人搜索 -->
<template>
	<view class="containerBox">
		<!-- 头部 -->
		<view class='head'>
			请输入对象姓名或房间号：
		</view>
		<view class="titleBox">
			<view class="inputBox">
				<view class="centerBox">
					<image src="../../../static/imgs/sousuo@2x.png" mode=""></image>
					<input style="color: #282828;width: 400upx;" placeholder="请输入你想搜索的内容" placeholder-style="font-size:28upx"
					 confirm-type='search' v-model="inputValue" @input="inputFun" @confirm="confirm"></input>
					<image @click="deleteValue" v-if="showDeletd" src="../../../static/imgs/delete.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="Exhibition">
			<view class="" v-for="(item,index) in exhibit" :key='index'>
				<view class="exhibit" @click="goto(item)">
					<view class="text">
						姓名：{{item.name}}
					</view>
					<view class="text">
						房间/床位：{{item.bed}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				inputValue: '', //input数据
				showDeletd: false,
				exhibit: [{
					name: '张先生',
					bed: "501A床",
					disabled: false
				}, {
					name: '李先生',
					bed: "502A床",
						disabled: false
				}, {
					name: '代先生',
					bed: "503A床",
							disabled: false
				}, ],
				array: [], //点击添加的新数组
			};
		},

		computed: {


		},
		watch: {

		},
		methods: {
			goToPage(e, data) {
				switch (e) {
					case 'goBack':
						uni.navigateBack()
						break;
					default:
						break;
				}
			},
			//input的内容发生变化触发
			inputFun(e) {
				this.inputValue.length == 0 ? this.showDeletd = false : this.showDeletd = true;
			},
			//点击 X 清空输入框的数据
			deleteValue() {
				this.inputValue = "";
				this.showDeletd = false;
			},
			//点击搜索触发
			confirm(e) {
				if (this.inputValue.leng != 0) {
					console.log(e.target.value)
					uni.hideKeyboard(); //隐藏软键盘
				}
			},
			//点击跳转到填写服务详情页面
			goto(res) {
				// console.log(res);
				// this.array.push(res);
				// console.log(this.array);
				// uni.setStorageSync('array', res)
				uni.navigateTo({
					url: './write?search=' + JSON.stringify(res)	
				
				})
			}
		},

		created() {

		},
		mounted() {




		},
		watch: {

		}



	};
</script>

<style lang="scss">
	.containerBox {
		.head {
			padding: 20rpx 0rpx 0rpx 20rpx;
		}

		font-size: 14px;
		line-height: 24px;
		// height: 100%;
		position: relative;
		padding-bottom: 20upx;

		.titleBox {
			padding: 0 2%;
			padding-top: 50upx;
			width: 96%;
			color: #282828;
			position: fixed;
			background: #FFFFFF;
			z-index: 399;
			display: flex;
			align-items: center;

			.imgBox {
				width: 50upx;
				height: 40upx;
				margin-right: 20upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.inputBox {
				width: 100%;
				background: #E8E8E8;
				border-radius: 30px;
				height: 64upx;
				display: flex;
				align-items: center;
				justify-content: center;

				.centerBox {
					display: flex;
					align-items: center;
					// justify-content: space-between;
					color: #a9a9a9;
					width: 75%;

					image {
						width: 32upx;
						height: 32upx;
						margin-right: 16upx;
					}
				}
			}
		}

		// 搜索显示
		.Exhibition {
			padding: 200upx 20rpx 0rpx 20rpx;

			.exhibit {
				width: 100%;
				height: 150rpx;
				background: #e5e5e5;
				margin-bottom: 50rpx;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// margin-left: 50rpx;
			}

			.text {
				margin-left: 20rpx;
			}
		}
	}
</style>
