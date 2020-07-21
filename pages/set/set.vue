<template>
	<view class="container">
		<view class="" v-for="(item,index) in functionList" :key='index'>
			<navigator :url="item.url" class="functionBox" >
				<view class="titleBox">
					{{ item.title }}
				</view>
				<view class="imgBox">
					<image src="../../static/imgs/arrows_r@2x.png" mode=""></image>
				</view>
			</navigator>
		</view>
		
		<navigator url=""  class="bottomControl">切换账户</navigator>
		<view class="bottomControl" @click="goToPage()">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				functionList:[
					{title:'常用地址',url:'../../pages/set/site'},
					{title:'账号管理',url:'../../pages/set/manageAccount'},
					{title:'问题反馈',url:'../../pages/set/feedback'},
					{title:'通用设置',url:'../../pages/set/commonSet'},
					{title:'关于孝敬邦',url:'../../pages/set/about'}
					]
			}
		},
		methods: {
			goToPage(){
				// 清除token
				uni.setStorageSync('token','')
				// 清除userInfo
				uni.setStorageSync("userInfo",'')
				//清空
				uni.setStorageSync('selectFamily','')
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.container {
		background: #f9f9f9;
		// margin: 20px;
		font-size: 14px;
		line-height: 24px;
		.functionBox{
			padding: 26upx;
			display: flex;
			justify-content: space-between;
			.imgBox{
				
				image{
					height: 20upx;
					width: 10upx;
				}
			}
		}
		.bottomControl{
			// margin-top: 30upx;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
