<!-- 服务后 -->
<template>
	<view class="burst-wrap">
	
		<view class="burst-wrap-bg">
			<view>
				<!-- 第一个位置 -->
				<view class="input">
					<u-input v-model="value" type="text" placeholder='请输入位置标题名称' :clearable='clearable' />
				</view>
				<!-- 信息提交 -->
				<view class="burst-info">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<!-- 图片 -->
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="icon iconfont icon-cuo" @tap="delect(index)"></view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage">
									</image>
								</view>
							</block>
							<!-- 视频 -->
							<view class="uni-uploader__file" v-if="src" v-for="(item,index) in src" :key="index">
								<view class="uploader_video">
									<view class="icon iconfont icon-cuo" ></view>
									<image src="../../static/imgs/copy.png" class="copy"  @tap="delectVideo(index)"></image>
									<video :src="item" class="video"></video>
								</view>
							</view>

							<view class="uni-uploader__input-box" v-if="VideoOfImagesShow">
								<view class="uni-uploader__input" @tap="chooseVideoImage">
									<view class="jiahaos">
										<image src="../../static/imgs/jiahaos.png" mode="" class="jiahaosimg"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 第二个位置 -->
				<!-- <view class="input">
					<u-input v-model="value1" type="text" placeholder='请输入位置标题名称' :clearable='clearable' />
				</view> -->
				<!-- 信息提交 -->
				<view class="burst-info">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<!-- 图片 -->
							<!-- <block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="icon iconfont icon-cuo" @tap="delect(index)"></view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage">
									</image>
								</view>
							</block> -->
							<!-- 视频 -->
							<!-- <view class="uni-uploader__file" v-if="src" v-for="(item,index) in src" :key="index">
								<view class="uploader_video">
									<view class="icon iconfont icon-cuo" @tap="delectVideo"></view>
									<video :src="item" class="video"></video>
								</view>
							</view> -->

							<!-- <view class="uni-uploader__input-box" v-if="VideoOfImagesShow">
								<view class="uni-uploader__input" @tap="chooseVideoImage">
									<view class="jiahaos">
										<image src="../../static/imgs/jiahaos.png" mode="" class="jiahaosimg"></image>
									</view>
								</view>
							</view> -->
						</view>
					</view>
				</view>
				<!-- 第三个位置 -->
				<!-- <view class="input">
					<u-input v-model="value1" type="text" placeholder='请输入位置标题名称' :clearable='clearable' />
				</view> -->
				<!-- 信息提交 -->
				<view class="burst-info">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<!-- 图片 -->
							<!-- <block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="icon iconfont icon-cuo" @tap="delect(index)"></view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage">
									</image>
								</view>
							</block> -->
							<!-- 视频 -->
							<!-- <view class="uni-uploader__file" v-if="src" v-for="(item,index) in src" :key="index">
								<view class="uploader_video">
									<view class="icon iconfont icon-cuo" @tap="delectVideo"></view>
									<video :src="item" class="video"></video>
								</view>
							</view> -->

							<!-- <view class="uni-uploader__input-box" v-if="VideoOfImagesShow">
								<view class="uni-uploader__input" @tap="chooseVideoImage">
									<view class="jiahaos">
										<image src="../../static/imgs/jiahaos.png" mode="" class="jiahaosimg"></image>
									</view>
								</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	export default {
		data() {
			return {
				value: '',
				value1: '',
				value2: '',
				clearable: false,
				imageList: [], //图片
				src: [], //视频存放
				sourceTypeIndex: 2,
				checkedValue: true,
				checkedIndex: 0,
				userInfo:'',
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				cameraList: [{
						value: 'back',
						name: '后置摄像头',
						checked: 'true'
					},
					{
						value: 'front',
						name: '前置摄像头'
					},
				],
				cameraIndex: 0,
				VideoOfImagesShow: true,
				location:1
			}
		},
		onUnload() {
			this.src = '',
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍摄', '相册', '拍摄或相册'];
		},
		methods: {
			chooseVideoImage() {
				uni.showActionSheet({
					title: "选择上传类型",
					itemList: ['图片', '视频'],
					success: (res) => {
						console.log(res)
						if (res.tapIndex == 0) {
							this.chooseImages()
						} else {
							this.chooseVideo()
						}
					}
				})
			},
			chooseImages() {
				// 上传图片
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList);
						if (this.imageList.length == 4) {
							this.VideoOfImagesShow = false
						}
					}
				});
			},
			chooseVideo() {
				// 上传视频
				console.log('上传视频')
				uni.chooseVideo({
					maxDuration: 10,
					count: 2,
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePath), '视频')
						// this.src = res.tempFilePath;
						console.log(res.tempFilePath)
						this.src = this.src.concat(res.tempFilePath)
						// this.src = res.tempFilePath
						console.log(this.src)

					}
				})
			},
			previewImage: function(e) {
				//预览图片
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.src
				})
			},
			delect(index) {
				uni.showModal({
					title: "提示",
					content: "是否要删除该图片",
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
						}
					}
				})
			},
			delectVideo(index) {
				uni.showModal({
					title: "提示",
					content: "是否要删除此视频",
					success: (res) => {
						if (res.confirm) {
							this.src.splice(index, 1)
						}
					}
				})
			}
		},
		created() {
			this.userInfo = uni.getStorageSync('userInfo')
			console.log(this.userInfo);
			this.tokens = uni.getStorageSync('token')
			// console.log(this.tokens);
			this.all = uni.getStorageSync('all')
			console.log(this.all);
		},
		onNavigationBarButtonTap(res){
			console.log(res)
			var _this = this;
			// uni.showLoading({
			// 	title:'正在上传信息..'
			// })
			// uni.hideLoading()
			// console.log(this.uploadPicData)
			// if(this.uploadPicData){
			this.src.map((item)=>{
				console.log(item);
				uni.uploadFile({
					url: 'http://110.187.88.70:11801/service/startService', //仅为示例，非真实的接口地址
					filePath:item,
					name: 'files',
					fileType:'video',
					methods:'POST',
					header:{
						'Authorization':'Bearer '+ _this.tokens
					},
					formData:{
					products: _this.value,
					      serviceId: _this.all.id,
					      location: this.location
					},
					success: (res) => {
						// console.log(JSON.parse(res.data));
						if(JSON.parse(res.data).code == 2000){
								uni.setStorageSync('front',true)
							uni.hideLoading()
							uni.showToast({
								title:'上传成功'
							})
							//获取当前页面（返回index页面）
							var pages = getCurrentPages(); //当前页
							//用scode来接收成功的值
							pages[0].$vm.front = true
					
							// console.log(pages)
							setTimeout(() => {
									uni.navigateBack()
							}, 1500)
							
						}
					}
				});	
				
			})
		},
	}
</script>

<style>
	.burst-wrap {
		width: 100%;
		height: 100%;
	}

	/* .burst-wrap .burst-wrap-bg{
    position: relative;
    width: 100%;
    height: 320upx;
    background:linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
    border-bottom-right-radius: 80upx;
    border-bottom-left-radius: 80upx;
} */
	.burst-wrap .burst-wrap-bg>view {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		position: absolute;
		top: 65upx;
		left: 0;
		right: 0;
	}

	.form-item {
		width: 100%;
	}

	.form-item textarea {
		display: block;
		height: 220upx;
		width: 100%;
		color: #AAAAAA;
		font-size: 28upx;
	}

	.uni-uploader__file,
	.uploader_video {
		position: relative;
		z-index: 1;
		width: 200upx;
		height: 200upx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}

	.uni-uploader__img {
		width: 200upx;
		height: 200upx;
	}

	.icon-cuo {
		position: absolute;
		right: 0;
		top: 5upx;
		background: linear-gradient(90deg, rgba(251, 91, 80, 1) 0%, rgba(240, 45, 51, 1) 100%);
		color: #FFFFFF;
		z-index: 999;
		border-top-right-radius: 20upx;
		border-bottom-left-radius: 20upx;
	}

	.video {
		width: 100%;
		height: 100%;
	}

	.login-input-box {
		position: relative;
		border-bottom: 1upx solid #EEEEEE;
	}

	.login-input-box .forget,
	.login-input-box .phone {
		position: absolute;
		top: 0;
		height: 100%;
		z-index: 100;
	}

	.login-input-box .phone {
		width: 100upx;
		left: 0;
		color: #666666;
		font-weight: bold;
	}

	.login-input-box .phone-input {
		padding-left: 100upx;
	}

	.address-wrap,
	.open-info {
		margin-top: 20upx;
	}

	.open-info>view:last-child {
		font-size: 28upx;
		color: #999999;
	}

	.address-wrap .address {
		background: #F2F2F2;
		border-radius: 40upx;
		padding: 0 20upx;
	}

	.user-set-btn {
		margin: 40upx;
		background: linear-gradient(90deg, rgba(251, 91, 80, 1) 0%, rgba(240, 45, 51, 1) 100%);
		color: #FFFFFF;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
	}

	.input {
		margin: 0rpx 0rpx 0rpx 10rpx;
	}

	.uni-uploader__files {
		width: 700rpx;
		display: flex;
		margin-top: 30rpx;

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: space-between;
	}

	.burst-info{
		margin-bottom: 50rpx;
	}

	.jiahaos {
		width: 196rpx;
		height: 196rpx;
		border: 1rpx solid #dfddda;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.jiahaosimg {
		width: 98rpx;
		height: 98rpx;
	}
	.copy {
		position: absolute;
		left: 175rpx;
		top: -20rpx;
			z-index: 9999;
		width: 50rpx;
		height: 50rpx;
	}
</style>
