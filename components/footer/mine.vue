<template>
	<view class="container" >
		<!-- 未到指定距离 隐藏 -->
		<view class="showTitleBox" v-if="scrollTopChild > 40">
			<view class="leftBox">
				昵称
			</view>
			<view class="rightBox" @click="changeBottomControl">
				<image src="../../static/imgs/set_icon.png" mode=""></image>
			</view>
		</view>
		<!-- 头部neirong -->
		<view class="headBox" ref='headBox'>
			<!-- 头部上方容器 -->
			<view class="headTopBox">
				<view class="leftBox">
					<view class="imgbox" @click="goToPage('manageAccount')">
						<image :src="headPortraitDefault" mode=""></image>
					</view>
					<view class="titleBox">
						<view class="username" @click="goToPage('manageAccount')">
							{{ userInfo.nikekName == null ? '点击头像设置昵称' : userInfo.nikekName }}
						</view>
						<view class="tagBox">
							<view class="tag_1 common">
								巡查人员
							</view>
							<view class="tag_2 common">
								· 上班
							</view>
						</view>
					</view>
				</view>
				<view class="rightBox" @click="goToPage('set')">
					<view class="imgBox">
						<image src="../../static/imgs/set_icon.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 头部下方容器 -->
			<view class="headBottomBox">
				<view class="contentBox" v-for="(item,index) in headList" :key='index'>
					<view class="numberBox">
						{{ item.number }}
					</view>
					<view class="titleBox">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 中间内容 -->
		<view class="centerBox" ref='centerBox'>
			<view class="title" >
				我的订单
			</view>
			
			<view class="centerNavBox">
				<view class="navBox" v-for="(item,index) in centerNavList" :key='index'>
					<view class="imgBox">
						<image :src="item.imgUrl" mode=""></image>
					</view>
					<view class="nameBox">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 分割线 -->
		<view class="cuttingLine"></view>
		
		<!-- 功能列表 -->
		<scroll-view class="functionListContainer" scroll-y="true" >
			<view class="functionListBox">
				<view class="functionList" v-for="(item,index) in functionList" :key='index' @click="goToPage(item.url)">
					<view class="leftBox">
						<view class="imgBox">
							<image :src="item.imgUrl" mode=""></image>
						</view>
						<view class="nameBox">
							{{ item.name }}
						</view>
					</view>
					
					<view class="arrowsBox">
						<image src="../../static/imgs/arrows_r@2x.png" mode=""></image>
					</view>
				</view>
			</view>
		</scroll-view>
			
		
	</view>
</template>

<script>
	export default {
		//获取到顶部高度数据
		props:['scrollTopChild'],
		data() {
			return {
				userInfo:'',		//用户信息
				headPortraitDefault:'../../static/imgs/default_touxiang.png',  //默认头像
				functionListHeight:200,
				headBox:0,
				centerBox:0,
				headList:{
					collect:{
						name:'好评',
						number:21
					},
					attention:{
						name:'中评',
						number:18
					},
					redPacket:{
						name:'差评',
						number:9
					}
				},
				
				centerNavList:{
					waitPay:{
						name:'待支付',
						imgUrl:'../../static/imgs/qianbao@2x.png'
					},
					waitService:{
						name:'待服务',
						imgUrl:'../../static/imgs/daifuwu@2x.png'
					},
					waitvaluate:{
						name:'待评价',
						imgUrl:'../../static/imgs/daipingjia@2x.png'
					},
					accomplish:{
						name:'已完成',
						imgUrl:'../../static/imgs/yiwanchengdingdan@2x.png'
					},
					unsubscribe:{
						name:'退订服务',
						imgUrl:'../../static/imgs/tuiding@2x.png'
					}
				},
				
				functionList:{
					health:{
						name:'健康养身',
						imgUrl:'../../static/imgs/yangsheng@2x.png',
						url:''
						},
					spirit:{
						name:'精神文化',
						imgUrl:'../../static/imgs/zongjiao@2x.png',
						url:'../../pages/main/functionList/spirit'
						},
					news:{
						name:'综合新闻',
						imgUrl:'../../static/imgs/xinwen@2x.png',
						url:''
						},
					activity:{
						name:'优惠活动',
						imgUrl:'../../static/imgs/youhuihuodong-2@2x.png',
						url:''
						},
					vip:{
						name:'会员中心',
						imgUrl:'../../static/imgs/huiyuanzhongxin@2x.png',
						url:''
						},
					homeland:{
						name:'亲情家园',
						imgUrl:'../../static/imgs/-jiaren@2x.png',
						url:''
						},
					donate:{name:'爱心捐赠',
						imgUrl:'../../static/imgs/gongyi@2x.png',
						url:''
						},
					topUp:{
						name:'账号充值',
						imgUrl:'../../static/imgs/chongzhi@2x.png',
						url:''
						}
				}
			}
		},
		methods: {
			goToPage(res){
				if(res == 'set'){
					uni.navigateTo({
						url:'../../pages/set/set'
					})					
				}else if(res == 'manageAccount'){
					uni.navigateTo({
						url:'../../pages/set/manageAccount'
					})	
				}else{
					uni.navigateTo({
						url:res
					})
				}
			},
			async getHeightFun(){
				//获取元素高度
				uni.createSelectorQuery().in(this).select('.headBox').boundingClientRect(data => {
					this.headBox = data.height
					// console.log('headBox：'+this.headBox)
				}).exec();
				await uni.createSelectorQuery().in(this).select('.centerBox').boundingClientRect(data => {
					this.centerBox = data.height
					// console.log('centerBox：'+this.centerBox)
				}).exec();
			}
		},
		created() {
			// this.commonColor = this.commonColorAll
			//获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			
		},
		mounted() {
			this.getHeightFun()
			
			
		},
		watch:{
			//监听
			centerBox:function(){
				var footerBar = uni.getStorageSync('footerBarHeight')
				// 获取设备信息
				uni.getSystemInfo({
					success:(res)=>{
						this.functionListHeight = res.windowHeight - this.headBox - this.centerBox - footerBar ;
						// console.log(this.headBox ,this.centerBox ,footerBar)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		// height: 100%;
		background: #ebeadf;
		.showTitleBox {
			width: 96%;
			// width: 100%;
			height: 100upx;
			top: 0upx;
			color: #282828;
			background: rgba(235,234,223,1);
			position: fixed;
			display: flex;
			justify-content: center;
			// justify-content: space-around;
			align-items: flex-end;
			padding: 20upx 2%;
			z-index: 999;
			.leftBox {
				font-weight: 600;
				font-size: 18px;
			}
			.rightBox{
				position: fixed;
				right: 20upx;
				width: 48upx;
				height: 48upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.headBox{
			padding-top:100upx ;
			height: 280upx;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			// 头部上方容器
			.headTopBox{
				display: flex;
				justify-content: space-between;
				.leftBox{
					display: flex;
					margin-left: 22upx;
					.imgbox{
						width: 128upx;
						height: 128upx;
						// background: #aaa;
						// border-radius: 50%;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.titleBox{
						display: flex;
						flex-direction: column;
						justify-content: center;
						.username{
							font-size:16px;
							// font-weight: 600;
							margin: 0 0 10upx 26upx;
						}
						.tagBox{
							font-size:12px;
							min-width: 100upx;
							height: 36upx;
							display: flex;
							margin-left: 26upx;
							// align-items: center;
							// align-self: flex-start;
							// padding: 0 15upx;
							// border-radius: 20upx;
							// background: #EC7171;
							// color: #FFFFFF;
							.common{
								border-radius: 6upx;
								padding: 0 14upx;
							}
							.tag_1{
								background-color: #FEB34A;
								color: #fff;
								margin-right: 10upx;
								
							}
							.tag_2{
								background-color: #FFFFFF;
								color: #2284FF;
								border: 1px solid #2284FF;
							}
						}
					}
				}
				.rightBox{
					width: 48upx;
					height: 48upx;
					margin-right: 22upx;
					.imgBox{
						width: 48upx;
						height: 48upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}	
			
			// 头部上方容器
			.headBottomBox{
				display: flex;
				justify-content: space-around;
				margin: 40upx 0 0 26upx;
				background-color: #ffe300;
				padding: 20upx;
				border-radius: 16upx 0 0 16upx;
				.contentBox{
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 25%;
					height: 100upx;
					font-size: 12px;
					.numberBox{
						color: #282828;
						font-size:20px;
						font-weight:bold;
					}
				}
			}
		}
		// 中间内容
		.centerBox{
			height: 220upx;
			background: #fff;
			border-radius:20upx 20upx 0 0;
			padding: 24upx 36upx;
			.title{
				font-size:16px;
				font-weight:600;
				color:#282828;
			}
			.centerNavBox{
				display: flex;
				justify-content: space-between;
				margin-top:40upx ;
				.navBox{
					display: flex;
					flex-direction: column;
					align-items: center;
					.imgBox{
						width: 60upx;
						height: 60upx;
						background: #fff300;
						border-radius: 50%;
						margin-bottom: 24upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 50%;
							height: 50%;
						}
					}
					.nameBox{
						width: 100upx;
						font-size:12px;
						font-weight:400;
						color: #878BA1;
						text-align: center;
					}
				}
			}
			
		}
		
		// 分割线
		.cuttingLine{
			height: 18upx;
			background: #f9f9f9;
		}
		
		//功能列表
		.functionListContainer{
			// padding: 0 24upx;
			// height: 100%;
			background: #FFFFFF;
			.functionListBox{
				height: 100%;
				font-size:14px;
				color: #282828;
				.functionList{
					padding: 30upx 24upx;
					display: flex;
					justify-content: space-between;
					.leftBox{
						display: flex;
						.imgBox{
							width:40upx;
							height: 40upx;
							margin-right:32upx ;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
					.arrowsBox{
						
						width:10upx;
						height: 20upx;
						margin-right:32upx ;
						image{
							width: 100%;
							height: 100%;
						}
					}
						
				}
			}
			
		}
	}
</style>
