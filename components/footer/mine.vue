<template>
	<view class="container" >
		<!-- 未到指定距离 隐藏 -->
		<view class="showTitleBox" v-if="scrollTopChild > 40">
			<view class="leftBox">
				昵称
			</view>
			<view class="rightBox" @click="goToPage('set')">
				<!-- <image src="../../static/imgs/set_icon.png" mode=""></image> -->
				设置
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
						<view class="companyName">
							四川省微壹科技发展有限责任公司
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
				<view class="leftBox">
					数据查看
				</view>
				<view class="rightBox">
					<view class="year" @click="changeChart('year')">
						2019年
						<image src="../../static/imgs/xx_1.png" style="width: 14upx;height: 10upx;" mode=""></image>
					</view>
					<view class="all" @click="changeChart('all')">
						全部
					</view>
				</view>
			</view>
			
			<view class="chart">
				<!--#ifdef MP-ALIPAY -->
				<!-- <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchLineA"></canvas> -->
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				<!--#endif-->
			</view>
		</view>
		
		<!-- 分割线 -->
		<!-- <view class="cuttingLine"></view> -->
		
		

			
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	
	var _this;
	var canvaLineA = null;
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
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
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
				
				chartsData:{
					categories:["1月","2月","3月","4月","5月","6月","7月","8月","9月","11月","12月"],
					series:[
						{name:"累计完成","data":[100,80,95,150,112,132,122,422]}
					]
				},
				chartsDataAll:{
					categories:["2013","2014","2015","2016","2017","2018","2019","2020"],
					series:[
						{name:"累计完成","data":[100,80,95,150,182,132,122,233]}
					]
				},
				
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
			},
			//控制图标配置
			showLineA(canvasId,chartData){
				canvaLineA = new uCharts({
					$this:_this,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[15,20,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:true,
					dataPointShape:true,
					background:'#FFFFFF',
					// pixelRatio:_this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						boundaryGap:'justify'
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:10,
						splitNumber:6,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _this.cWidth*_this.pixelRatio,
					height: _this.cHeight*_this.pixelRatio,
					extra: {
						line:{
							type: 'curve'
						}
					}
				});
				//下面是默认选中索引
				let cindex=3;
				//下面是自定义文案
				// let textList=[{text:'我是一个标题',color:null},{text:'自定义3：值3',color:'#f04864'}];
				let textList=[];
				//下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
				let tmpevent={mp:{changedTouches:[{x: 0, y: 80}]}};
				setTimeout(()=>{
					canvaLineA.showToolTip( tmpevent , {
						index:cindex,
						textList:textList
					});
				},200)
			},
			//点击切换内容
			touchLineA(e) {
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data + '单'
					}
				});
			},	
			//切换图表展示内容
			changeChart(e){
				if(e == 'year'){
					this.showLineA("canvasLineA",this.chartsData)	
				}else if(e == 'all'){
					this.showLineA("canvasLineA",this.chartsDataAll)	
				}
			}
				
		},
		
		created() {
			// this.commonColor = this.commonColorAll
			//获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			
			_this = this;
			// #ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_this.pixelRatio =res.pixelRatio;
						_this.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(680);
			this.cHeight=uni.upx2px(400);
			
			
		},
		mounted() {
			
			this.getHeightFun()
		
			this.showLineA("canvasLineA",this.chartsData)	
		
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
		min-height: 100%;
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
				font-size: 16px;
				position: fixed;
				right: 20upx;
				// width: 48upx;
				// height: 48upx;
				// image{
				// 	width: 100%;
				// 	height: 100%;
				// }
			}
		}
		.headBox{
			padding-top:100upx ;
			// height: 280upx;
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
						padding-left:26upx ;
						.username{
							font-size:16px;
							// font-weight: 600;
						}
						.tagBox{
							font-size:12px;
							min-width: 100upx;
							height: 36upx;
							display: flex;
							margin: 8upx 0;
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
						.companyName{
							font-size:12px;
							color: #878BA1;
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
				margin: 40upx 2% 0;
				background-color: #ffe300;
				padding: 20upx;
				border-radius: 16upx;
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
			// height: 220upx;
			background: #fff;
			border-radius:16upx;
			padding: 20upx;
			margin:30upx 2% 0;
			.title{
				font-size:16px;
				color:#282828;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.rightBox{
					display: flex;
					justify-content: space-between;
					font-size: 12px;
					color: #666666;
					width: 40%;
				}
			}
			.chart{
				width:680upx;
				height: 400upx;
				.charts {
					width:680upx;
					height: 400upx;
					background-color: #FFFFFF;
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
