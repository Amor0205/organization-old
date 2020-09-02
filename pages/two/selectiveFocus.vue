<!-- 服务后 -->
<template>
	<view class="box">
		<view class="uploading">
			<view class="input">
				<u-input v-model="value1" type="text" placeholder='请输入位置标题名称' :clearable='clearable' />
			</view>
			<view class="easy-upload">
				<easy-upload :dataList="imageList" uploadUrl="http://localhost:3000/upload" :types="category" deleteUrl='http://localhost:3000/upload'
				 :uploadCount="6" @successImage="successImage" @successVideo="successvideo"></easy-upload>
			</view>
		</view>
		<view class="uploading">
			<view class="input">
				<u-input v-model="value2" type="text" placeholder='请输入位置标题名称' :clearable='clearable' />
			</view>
			<view class="easy-upload">
				<easy-upload :dataList="imageLists" uploadUrl="http://localhost:3000/upload" :types="category" deleteUrl='http://localhost:3000/upload'
				 :uploadCount="6" @successImage="successImage" @successVideo="successvideo"></easy-upload>
			</view>
		</view>
		<view class="uploading">
			<view class="input">
				<u-input v-model="value3" type="text" placeholder='请输入位置标题名称' :clearable='clearable' />
			</view>
			<view class="easy-upload">
				<easy-upload :dataList="imageListss" uploadUrl="http://localhost:3000/upload" :types="category" deleteUrl='http://localhost:3000/upload'
				 :uploadCount="6" @successImage="successImage" @successVideo="successvideo"></easy-upload>
			</view>
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
				value1: '',
				value2: '',
				value3: '',
				imageList: [],
				imageLists: [],
				imageListss: [],
				clearable: false,
				category: 'image'
			}
		},
		methods: {
			successImage(e) {
				uni.showModal({
					content: '上传成功,详细信息请看控制台'
				})
				console.log(e)
			},
			successvideo(e) {
				console.log(e)
			}
		},
		mounted() {},

		onLoad() {
			uni.request({
				url: 'http://localhost:3000/upload',
				method: 'GET',
				data: {
					category: this.category
				},
				success: res => {
					this.imageList = res.data
					this.imageLists = res.data
					this.imageListss = res.data
					console.log(this.imageList);
				},
				fail(err) {
					// console.log(err)
				}
			});
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'../../components/footer/two'
			})
				
		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {}
	}
</script>

<style scoped lang="scss">
	.input {
		margin: 20rpx 0rpx 0rpx 10rpx;
	}

	.easy-upload {
		margin-top: 20rpx;
	}
	.uploading{
		margin-top: 30rpx;
	}
</style>
