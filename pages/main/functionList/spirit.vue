<template>
	<view class="container">
		<!-- <view class="gap"></view> -->
		
		<view class="contentBox">
			<view class="controlBox" v-for="(item,index) in list" :key='index' @click="goToPage(item)">
				<view class="imgBox">
					<image :src="item.imgUrl" mode=""></image>
				</view>
				<view class="title">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						title:'听广播',
						imgUrl:'../../../static/imgs/tingguangbo.png',
						webViewUrl:''
					},{
						title:'看视频',
						imgUrl:'../../../static/imgs/kanshipin.png',
						webViewUrl:''
					},{
						title:'听新闻',
						imgUrl:'../../../static/imgs/tingxinwen.png',
						webViewUrl:''
					},{
						title:'购物记录',
						imgUrl:'../../../static/imgs/shop.png',
						webViewUrl:''
					},{
						title:'打开微信',
						imgUrl:'../../../static/imgs/wx.png',
						webViewUrl:''
					},{
						title:'玩游戏',
						imgUrl:'../../../static/imgs/game.png',
						webViewUrl:''
					}
				]
			}
		},
		methods: {
			goToPage(res){
				switch (res.title){
					case '听广播':
						uni.navigateTo({
							url:'../../../pages/functionPage/toBeDeveloped'
						})
						break;
					case '看视频':
					// https://www.bilibili.com/
						uni.navigateTo({
							url:'../../../pages/functionPage/disposeWebView?url='+'https://www.bilibili.com'
						})
						break;
					case '听新闻':
						uni.navigateTo({
							url:'../../../pages/functionPage/toBeDeveloped'
						})
						break;
					case '购物记录':
						uni.navigateTo({
							url:'../../../pages/functionPage/toBeDeveloped'
						})
						break;
					case '打开微信':
						this.openWeiXin()
						break;
					case '玩游戏':
						uni.navigateTo({
							url:'../../../pages/functionPage/disposeWebView?url='+'http://www.4399.com'
						})
						break;
					default:
						break;
				}
			},
			
			openWeiXin(){
				let _this = this;
				// 判断平台  
				if (plus.os.name == 'Android') {  
					plus.runtime.launchApplication(  
						{  
							pname: 'com.tencent.mm'  
						},  
						function(e) {  
							console.log('Open system default browser failed: ' + e.message);  
						}  
					);  
				} 
				else if (plus.os.name == 'iOS') {  
					plus.runtime.launchApplication({ action: 'weixin://' }, function(e) {  
						console.log('Open system default browser failed: ' + e.message);  
					});  
				}  
			}
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	// 间隔行
	.gap{
		height: 20upx;
		background: #f9f9f9;
	}
	.container {
		// padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.contentBox{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
				
			.controlBox{
				width: 32%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 1%;
				.imgBox{
					width: 80upx;
					height: 80upx;
					margin-top: 50upx;
					image{
						width: 100%;
						height: 100%;
					}
				}	
				.title{
					
				}
			}
		}
	}
</style>
