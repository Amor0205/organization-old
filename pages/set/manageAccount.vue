<template>
	<view class="container">
		<view class="headPortraitBox">
			<view class="imgBox" @click="uploadPic">
				<image :src="headPortrait.length == 0 ? headPortraitDefault : headPortrait " mode=""></image>
				<view class="iconBox">
					<image src="../../static/imgs/camera_fill.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="nikeNameBox">
			<input type="text" placeholder="昵称" :value="userInfo.nikekName == null ? userInfo.phonenum : userInfo.nikekName"  class="titleBox"/>
			<view class="imgBox">
				<image src="../../static/imgs/xiugai.png" mode=""></image>
			</view>
			
		</view>
		
		<view class="sexBox">
			<view class="selectBox" :class="selectSex == 'man' ? '' : 'sexActive' " @click="selectSexFun('man')">	
				<image src="../../static/imgs/nan.png" mode=""></image>
				<text>男</text>
				<!-- 动画 -->
				<view class="animationBox" :class="selectSex == 'man' ? 'animation' : '' ">
				</view>
			</view>
			<view class="centerBox">
				or
			</view>
			<view class="selectBox" :class="selectSex == 'woman' ? '' : 'sexActive' " @click="selectSexFun('woman')">
				<image src="../../static/imgs/nv.png" mode=""></image>
				<text>女</text>
				<!-- 动画 -->
				<view class="animationBox" :class="selectSex == 'woman' ? 'animation' : '' ">
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
		
		<u-button class="custom-style" type="warning" shape="circle" :ripple="true" ripple-bg-color="#ffee00">保存</u-button>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',		//用户信息
				selectSex:'man',	//性别选择
				headPortrait:'',	//头像
				headPortraitDefault:'../../static/imgs/default_touxiang.png',
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
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						this.headPortrait = tempFilePaths[0]
						
						// console.log(chooseImageRes)
						// console.log(tempFilePaths)
				        // uni.uploadFile({
				        //     url: 'http://110.187.88.70:11801', //仅为示例，非真实的接口地址
				        //     filePath: tempFilePaths[0],
				        //     name: 'file',
				        //     formData: {
				        //         'user': 'test'
				        //     },
				        //     success: (uploadFileRes) => {
				        //         console.log(uploadFileRes.data);
				        //     }
				        // });
				    }
				});
				
				
			}
			
		},
		created() {
			//获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
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
