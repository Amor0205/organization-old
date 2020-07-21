<template>
    <view>
      <view class="box">
      	<view class="input_box">
      		<view class="kitchen">厨房（图）</view>
      		<view class="upload_info">
      			<view class="upload_img" v-for="(item, index) of imgs" :key="index">
      				<image :src="item.url" mode="aspectFill"></image>
      				<text class="delete" @click="onDeleteImg(index)"></text>
      			</view>
      			<view class="upload_img upload" @click="onFilesUpload" v-if="imgs.length < 9"></view>
      		</view>
      	</view> 	<view class="input_box">
      		<view class="kitchen">客厅（图）</view>
      		<view class="upload_info">
      			<view class="upload_img" v-for="(item, index) of imgs" :key="index">
      				<image :src="item.url" mode="aspectFill"></image>
      				<text class="delete" @click="onDeleteImg(index)"></text>
      			</view>
      			<view class="upload_img upload" @click="onFilesUpload" v-if="imgs.length < 9"></view>
      		</view>
      	</view>
      	<view class="input_form_box">
      		<view class="input_box">
      			<view class="kitchen">厕所（图）</view>
      			<view class="upload_info">
      				<view class="upload_img" v-for="(item, index) of videos" :key="index">
      					<video :src="item.url" controls></video>
      					<text class="delete" @click="onDeleteVideo(index)"></text>
      				</view>
      				<view class="upload_img upload" @click="onVideosUpload" v-if="videos.length < 9"></view>
      			</view>
      		</view>
      	</view>
      <!-- 	<view class="input_box">
      		<view class="name">上传文件</view>
      		<view class="upload_file_info">
      			<view class="upload_file" v-for="(item, index) of files" :key="index">
      				<view class="upload_url">{{item.url}}</view>
      				<text class="delete" @click="onDeleteFiles(index)">删除</text>
      			</view>
      			<button type="default" class="upload_file_btn" @click="onFilesUpload" v-if="files.length < 9">上传文件</button>
      		</view>
      	</view> -->
      </view>
    </view>
</template>

<script>
export default {
name: "",
components: {

},
props: {},
data () {
  return {
	  imgs: [],
	  files: [],
	  videos: []
    }
  },
  methods: {
	onPageJump(url) {
		uni.navigateTo({
			url: url
		});
		},
		//上传图片
		onImgsUpload(){
			let count = 9 - this.imgs.length;
			this.$http.urlImgUpload("api/common/v1/upload_file",{ 
				count: count,
				onEachUpdate: res => {
					console.log("单张上传成功返回：",res);
				},
				onProgressUpdate: res => {
					console.log("上传进度返回：",res);
				}
			}).then(res => {
				this.imgs = this.imgs.concat(res);
			});
		},
		//删除图片
		onDeleteImg(index) {
			this.imgs.splice(index, 1);
		},
		// 视频
		onVideosUpload(){
			this.$http.urlVideoUpload("api/common/v1/upload_file", {
				onEachUpdate: res => {
					console.log("单张上传成功返回：",res);
				},
				onProgressUpdate: res => {
					console.log("上传进度返回：",res);
				}
			}).then(res => {
				this.videos = this.videos.concat(res);
			});
		},
		//删除视频
		onDeleteVideo(index) {
			this.videos.splice(index, 1);
		},
		// //上传文件
		// onFilesUpload() {
		// 	let count = 9 - this.files.length;
		// 	uni.chooseImage({
		// 		count: count, //默认9
		// 		sizeType:  ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		// 		sourceType: ['album', 'camera'], //从相册选择
		// 		success: (res) => {
		// 			this.$http.urlFileUpload("api/common/v1/upload_file", {
		// 				files: res.tempFiles
		// 			},{
		// 				onEachUpdate: res => {
		// 					console.log("单张上传成功返回：",res);
		// 				},
		// 				onProgressUpdate: res => {
		// 					console.log("上传进度返回：",res);
		// 				}
		// 			}).then(res => {
		// 				this.files = this.files.concat(res);
		// 			});
		// 		}
		// 	});
		// },
		// //删除文件
		// onDeleteFiles(index) {
		// 	this.files.splice(index, 1);
		// },
  },
  mounted () {

  },
  onLoad () {

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

.box{
	padding: 0rpx 22rpx 0rpx 22rpx;
	.kitchen{
		font-size: 28rpx;
		margin-top: 76rpx;
	}
	.upload_img {
	width: 200upx;
	height: 200upx;
	background-color: #ffffff;
	border-radius: 4upx;
	margin-right: 16upx;
	margin-bottom: 16upx;
	overflow: hidden;
	position: relative;}
	}
</style>
