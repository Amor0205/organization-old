<template>
	<view class="container">
		
		<view class="headPortraitBox">
			<view class="imgBox" @click="uploadPic">
				<image :src="userInfo.avatar ? userInfo.avatar : headPortraitDefault" mode=""></image>
				<view class="iconBox">
					<image src="../../static/imgs/camera_fill.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="nikeNameBox">
			<input type="text" placeholder="昵称" v-model="userName"   class="titleBox"/>
			<view class="imgBox">
				<image src="../../static/imgs/xiugai.png" mode=""></image>
			</view> 
			
		</view>
		
		<view class="sexBox">
			<view class="selectBox" :class="selectSex == '男' ? '' : 'sexActive' " @click="selectSexFun('男')">	
				<image src="../../static/imgs/nan.png" mode=""></image>
				<text>男</text>
				<!-- 动画 -->
				<view class="animationBox" :class="selectSex == '男' ? 'animation' : '' ">
				</view>
			</view>
			<view class="centerBox">
				or
			</view>
			<view class="selectBox" :class="selectSex == '女' ? '' : 'sexActive' " @click="selectSexFun('女')">
				<image src="../../static/imgs/nv.png" mode=""></image>
				<text>女</text>
				<!-- 动画 -->
				<view class="animationBox" :class="selectSex == '女' ? 'animation' : '' ">
				</view>
			</view>
		</view>
		
		<view class="authenticationBox">
			<view class="titleBox">
				实名认证
			</view>
			<view class="contentBox">
				为了保障您的资金安全，提升订单处理效率，请去填写与您
				身份证一致的信息，否则不回审核通过。
				<view class="flowBox" :style="{color:item.color}" v-if="item.show == true" v-for="(item,index) in flow" :key='index'>
					{{ item.title }}
				</view>
			</view>
		</view>
		<image style="width: 200rpx;height: 200rpx;" :src="imgss" mode=""></image>
		<u-button 
		class="custom-style" 
		type="warning" 
		shape="circle" 
		:ripple="true" 
		@click="submit"
		ripple-bg-color="#ffee00">保存</u-button>
		
			
	</view>
</template>

<script>
	import { setUserInfo } from '../../src/ajax.js'
	export default {
		data() {
			return {
				imgss:'',
				userInfo:'',		//用户信息
				selectSex:'男',		//性别选择
				userName:'',		//用户名
				// headPortrait:'',	//头像
				headPortraitDefault:'../../static/imgs/default_touxiang.png',	//显示默认图片
				uploadPicData:'',	//上传图片数据
				tokens:'',
				flow:[{	
						show:true,
						title:'立即执行',
						color:'#0072FF'
					},{	
						show:false,
						title:'审核中',
						color:'#FFE300'
					},{
						show:false,
						title:'已审核',
						color:'#878BA1'
					}
				]
			}
		},
		methods: {
			//性别选择
			selectSexFun(res){
				this.selectSex = res;
			},
			// 图片上传
			uploadPic(){
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: (res) => {
				        const tempFilePaths = res.tempFilePaths;
						this.userInfo.avatar = tempFilePaths[0]
						this.uploadPicData = tempFilePaths[0]
				    }
				});
			},
			//提交信息
			submit(){
				var _this = this;
				uni.showLoading({
					title:'正在上传信息'
				})
				// console.log(this.uploadPicData)
				// if(this.uploadPicData){
					uni.uploadFile({
						url: 'http://110.187.88.70:11801/consumer/editConsumerMessage1', //仅为示例，非真实的接口地址
						filePath: this.uploadPicData,
						name: 'file',
						header:{
							'Authorization':'Bearer '+ _this.tokens
						},
						formData:{
							consId:_this.userInfo.consId,
							nikeName:_this.userName,
							sex:_this.selectSex
						},
						success: (res) => {
							var data = JSON.parse(res.data)
							uni.hideLoading()
							uni.showToast({
								icon:'none',
								title:data.message
							})
							this.imgss = data.data.consumer.avatar;
							console.log(data.data.consumer.avatar)
							if(data.code == 2000){
								uni.setStorageSync('userInfo',data.data.consumer)
								uni.navigateTo({
									url:'../index/index'
								})
							}
						}
					});			
				// }else{
				// 	uni.uploadFile({
				// 		url: 'http://110.187.88.70:11801/consumer/editConsumerMessage1', //仅为示例，非真实的接口地址
				// 		filePath: '',
				// 		name: 'file',
				// 		header:{
				// 			'Authorization':'Bearer '+ _this.tokens
				// 		},
				// 		formData:{
				// 			consId:_this.userInfo.consId,
				// 			nikeName:_this.userName,
				// 			sex:_this.selectSex
				// 		},
				// 		success: (res) => {
				// 			var data = JSON.parse(res.data)
				// 			uni.hideLoading()
				// 			uni.showToast({
				// 				icon:'none',
				// 				title:data.message
				// 			})
				// 			console.log(data)
				// 			if(data.code == 2000){
				// 				uni.setStorageSync('userInfo',data.data.consumer)
				// 			}
				// 		}
				// 	});		
				// }
			}
			
		},
		created() {
			this.tokens = uni.getStorageSync('token')
			if(uni.getStorageSync('userInfo')){
				//获取userInfo
				this.userInfo = uni.getStorageSync('userInfo');
				this.selectSex = this.userInfo.sex;
				this.userName = this.userInfo.nikeName;
				// this.headPortraitDefault = this.userInfo.avatar;
				console.log(this.userInfo.avatar)
			}
			
		},
		mounted() {
			
		}
	}
</script>

<style scode lang="scss">
	 @keyframes animate {
	        0%{
	            width: 0px;
	            height: 0px;
	            opacity: 0.5;
	        }
	        100%{
	            width: 96px;
	            height: 40px;
	            opacity: 0.8;
	        }
	    }
	.animation{
		animation: animate 0.25s linear 1;
	}
	.sexActive{
		background: #fff !important;
		border: 1px solid #878BA1 !important;
	}
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.headPortraitBox{
			height: 400upx;
			display: flex;
			justify-content: center;
			position: relative;
			.imgBox{
				height: 200upx;
				width: 200upx;
				position: absolute;
				bottom: 60upx;
				image{
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}
			.iconBox{
				width: 60upx;
				height: 60upx;
				background:#FFE300;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				bottom: 0upx;
				right: 0;
				image{
					border-radius:0;
					width: 36upx;
					height: 36upx;
				}
			}
		}
		.nikeNameBox{
			display: flex;
			justify-content: center;
			.titleBox{
				text-align: center;
			}
			.imgBox{
				width: 22upx;
				height: 22upx;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.sexBox{
			padding: 60upx 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 40upx;
				height: 40upx;
			}
			.selectBox{
				width: 180upx;
				height: 80upx;
				padding: 0 30upx;
				border-radius: 50upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				background:#FFE300;
				position: relative;
				.animationBox{
					width: 180upx;
					height: 80upx;
					padding: 0 30upx;
					border-radius: 50upx;
					background:#ffee00;
					position: absolute;
					opacity:0;
				}
			}
			.centerBox{
				font-size: 22px;
				color: #878BA1;
			}
		}
		.authenticationBox{
			padding: 60upx 0 180upx;
			.titleBox{
				color: #282828;
				font-size: 16px;
				font-weight: bold;
				padding: 10upx 0;
			}
			.contentBox{
				color: #878BA1;
				display: flex;
				flex-wrap: wrap;
				.flowBox{
					width: 140upx;
					height: 48upx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1upx solid;
					border-radius: 8upx;
				}
			}
		}
		.custom-style{
			background-color: #FFE300;
			color: #232323;
		}
	}
</style>
