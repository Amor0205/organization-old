<template>
	<view class="boxs">
		<!-- 头部开始 -->
		<view class="box" ref='box'>
			<view class="flex m-top4">
				<view class="right">
					<image src="../../static/imgs/touxiang.png" mode="" class="image"></image>
				</view>
				<view class="middle">
					<view class="name">
						{{!SelectFamily.nikeName ? SelectFamily.phonenum : SelectFamily.nikeName }}
					</view>
					<view class="warning">
						账户余额(元)99.99
					</view>
				</view>
				<view class="family flex j-around a-align " @click="goToPage('../../pages/family/myFamily')">
					<view class="switch">切换家人</view>
					<view class="enter flex a-align">
						<image src="../../static/imgs/enter@2x.png" mode="" class="images"></image>
					</view>
				</view>
			</view>
			<view class="early">
				预警：无/手环求助/求助按钮
			</view>
			<view class="conversation flex j-around a-align">
				<view class="rights">
					<view class="flex a-align">
						<image src="../../static/imgs/phone.png" mode="" class="voice"></image>
					</view>
					<view class="">
						语音通话
					</view>
				</view>
				<view class="">
					<image src="../../static/imgs/sx.png" mode="" class="line"></image>
				</view>
				<view class="">
					<view class="rights">
						<view class="flex a-align">
							<image src="../../static/imgs/phone.png" mode="" class="voice"></image>
						</view>
						<view class="">
							视频通话
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 底部部分 -->
		<view class="health">
			<scroll-view  scroll-y="true"  :style="{height:scrollBoxHeight + 'px'}" show-scrollbar='true'>
			<view class="horm">
				<view class="">
					<image src="../../static/imgs/systemprompt@2x.png" mode="" class="tips"></image>
				</view>
				<view class="pension">
					【养老】到2022年,渝北实现居家养老服务全覆盖
				</view>
			</view>
			<view class="relevant flex j-content">
				<view class="right1">
					相关信息
				</view>
				<view class="flex j-content a-align" @click="departAnimation">
					<image src="../../static/imgs/shuaxin@2x.png"  class="shuaxin" :class=" animationTag?'rotation':'' "></image>
					<view class="update">
						更新数据
					</view>
				</view>
			</view>
			<view class="address">
				四川省眉山市彭山区凤鸣镇伯华路一段12号
			</view>
			<view class="bracelet">
				手环定位
			</view>
			<!-- 分割层 -->
			<view class="gap"></view>
			<view class="balance ">
				<!-- <view class="titleBox" @click="goToPage('../../pages/family/more')"> -->
				<view class="titleBox" @click="goToPage('../../pages/functionPage/toBeDeveloped')">
					<view class="leftBox">
						资讯展示
					</view>
					<view class="rightBox">
						<text style="padding-right: 10upx;font-size: 14px;">更多</text>
						<image src="../../static/imgs/arrows_r@2x.png" style="width: 10upx;height: 20upx;" mode=""></image>
					</view>
				</view>
				<view class="listBox flex j-content">
					<view class="" v-for="(item,index) in cost" :key='index'>
						<view class="costs">
							{{item.costs}}
						</view>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<!-- 分割层 -->
			<view class="gap"></view>
			
			<view class="six">
				<view class="daily" v-for="(item,index) in daily" :key='index'>
					<view class="yuan">
						<view class="icons" @click="goToPage(item.url)" :style="{background:item.backgroundcolor}">
							<image :src="item.imgs" mode="" class="imgs"></image>
						</view>
					</view>
					<view class="line">
						{{item.title}}
					</view>
				</view>
			</view>
		</scroll-view>

		</view>
		
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		name: "",
		components: {
			uniSearchBar,
		},
		props: ['SelectFamily'],
		data() {
			return {
				userInfo:'',		//用户信息
				box:'',
				scrollBoxHeight:'',	//滚动盒子高度
				animationTag:false,	//动画标识
				cost: [{
						costs: '无预警',
						name: '生活数据',

					},
					{
						costs: '100元',
						name: '燃气余额',

					},
					{
						costs: '100元',
						name: '电费余额',

					}
				],
				daily: [{
					imgs: '../../static/imgs/zu3696.png',
					title: '体检档案',
					backgroundcolor: '#F1FAFE',
					url:'../../pages/family/checkUp/checkUp'
				}, {
					imgs: '../../static/imgs/tixing.png',
					title: '推送提醒',
					backgroundcolor: '#E7F8F2',
					url:'../../pages/family/notification/notification'
				}, {
					imgs: '../../static/imgs/jingbao.png',
					title: 'SOS记录',
					backgroundcolor: '#FCEFF0',
					url:'../../pages/family/sosRecord/sosRecord'
				}, {
					imgs: '../../static/imgs/fuwujilu@2x.png',
					title: '服务记录',
					backgroundcolor: '#F6F2FE',
					url:'../../pages/family/service/service'
				}, {
					imgs: '../../static/imgs/appointment.png',
					title: '当前预约',
					backgroundcolor: '#FEF6E8',
						url:'../../pages/family/subscribe/subscribe'
				}, {
					imgs: '../../static/imgs/shouhuan.png',
					title: '设备管家',
					backgroundcolor: '#F8F8F8',
					url:'../../pages/family/hardware/hardware'
						
				}]
			}
		},
		methods: {
			//跳转底部功能模块相关页面
			goToPage(res){
				// console.log(res)
				uni.navigateTo({
					url:res
				})
			},
			//获取元素高度
			async getHeightFun(){
				uni.createSelectorQuery().in(this).select('.box').boundingClientRect(data => {
					this.box = data.height
					// console.log(this.box)
				}).exec();
			},
			//更新数据旋转动画
			departAnimation(){
				if(this.animationTag == false){
					this.animationTag = true;
					console.log(this.animationTag)
					setTimeout(res=>{
						this.animationTag = false;
					},2000)
				}
			}
		
		},
		onShow() {
			
		},
		created() {
			//获取userInfo
			// if(!uni.getStorageSync('userInfo')){
			// 	this.userInfo = uni.getStorageSync('userInfo')
			// }
			// console.log(this.userInfo)
			
			
		},
		mounted() {
			//获取元素高度
			this.getHeightFun()
			
				
			
		},
		onLoad() {

		},
		computed: {

		},
		watch: {
			SelectFamily:function(res){
				// console.log(res)
				this.userInfo = res;
			},
			box:function(){
				var footerBar = uni.getStorageSync('footerBarHeight')
				// 获取设备信息
				uni.getSystemInfo({
					success:(res)=>{
						this.scrollBoxHeight = res.windowHeight - this.box - footerBar;
						console.log(res.windowHeight,this.box ,this.scrollBoxHeight ,footerBar)
					}
				})
			}
			
		},
		directives: {

		}
	}
</script>

<style lang="scss">
	.boxs {
		width: 100%;
		height: 50%; //非正常操作  解决切换底部露出
		background: #FFE300;
	}
	// 间隔行
	.gap{
		height: 20upx;
		background: #f9f9f9;
	}
	// 动画旋转
	@keyframes rotation{
		0%   {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.rotation{
		animation: rotation 1.3s linear 2 ;
	}
	
	.box {
		width: 100%;
		height: 290rpx;
		background: #FFE300;
		padding-top: 100rpx;
		// display: flex;
		position: fixed;
		z-index: 999;
		top: 0;
		// padding-top:100upx ;
		// border: 1rpx solid red;
		
		
		.image {
			width: 106rpx;
			height: 106rpx;
			border-radius: 50%;
			margin-left: 22rpx;
		}

		.middle {
			margin-left: 32rpx;
		}

		.name {
			font-size: 44rpx;

		}

		.warning {
			width: 220rpx;
			height: 32rpx;
			background: #EC7171;
			border-radius: 30rpx;
			font-size: 24rpx;
			text-align: center;
			margin-top: 10rpx;
			color: #FFFFFF;
		}

		.family {
			width: 140rpx;
			height: 56rpx;
			background: white;
			border-top-left-radius: 30rpx;
			border-bottom-left-radius: 30rpx;
			// padding: 5rpx;
			position: absolute;
			top:140rpx;
			right: 0;

		}

		.switch {
			font-size: 20rpx;
			line-height: 50rpx;
			margin-top: 5rpx;
		}

		.images {
			width: 10rpx;
			height: 16rpx;
			margin-top: 6rpx;
		}

		.early {
			font-size: 24rpx;
			margin: 26rpx 22rpx;
		}

		.conversation {
			width: 650rpx;
			height: 93rpx;
			background: #878BA1;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 10rpx 10rpx 0rpx 0rpx;
			font-size: 28upx;
		}

		.rights {
			width: 200rpx;
			height: 80rpx;
			display: flex;
			align-items: center;

			.voice {
				width: 36rpx;
				height: 34rpx;
				padding-right: 25rpx;


			}
		}

		.line {
			width: 2rpx;
			height: 60rpx;
			margin-top: 15rpx;
		}

	}

	.health {
		width: 100%;
		// height: 1500rpx;
		background: white;
		// background: red;
		position: absolute;
		top: 390rpx;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;

		// padding-bottom: 140upx;
		.horm {
			width: 100%;
			height: 30rpx;
			display: flex;
			align-items: center;
			margin: 34rpx 22rpx;

			.tips {
				width: 32rpx;
				height: 30rpx;
				margin-top: 7rpx;
			}

			.pension {
				font-size: 24rpx;
				color: #868686;

			}
		}

		.relevant {
			width: 94%;
			height: 50rpx;
			margin: 0 auto;
			margin-top: 62rpx;

			.right1 {
				font-size: 32rpx;
				line-height: 50rpx;
			}

			.update {
				font-size: 24rpx;
				line-height: 50rpx;
				color: #878BA1;
			}
		}

		.shuaxin {
			width: 26.6rpx;
			height: 26.6rpx;
			margin-right: 16rpx;
		}

		.address {
			font-size: 28rpx;
			margin: 66rpx 0rpx 0rpx 22rpx;
		}

		.bracelet {
			font-size: 24rpx;
			color: #878BA1;
			margin: 10rpx 0rpx 0rpx 22rpx;
		}

		.balance {
			padding: 22upx;
			.titleBox{
				display: flex;
				justify-content: space-between;
				padding-bottom: 30upx;
				font-size: 15px;
				// font-weight: bold;
			}
			.listBox{
				text-align: center;
				.costs {
					font-size: 28rpx;
					color: #282828;
					font-weight: 700;

				}

				.name {
					font-size: 24rpx;
					color: #878BA1;
					margin-top: 10rpx;
				}
			}
		}

		.six {
			margin-top: 40rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;


			.daily {
				width: 26%;
				height: 150rpx;
				// border: 1rpx solid red;
				// padding: 0rpx 30rpx 0rpx 30rpx;
				margin-bottom: 60rpx;
			}

			.yuan {
				display: flex;
				justify-content: center;
				align-items: center;

			}

			.icons {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				.imgs {
					width: 38rpx;
					height: 44rpx;
				}
			}

			.line {
				font-size: 24rpx;
				color: #666666;
				text-align: center;
				margin-top: 10rpx;
			}
		}

	}




	.bookshelf {
		margin-top: 540upx;

		.bookshelf-content {
			white-space: nowrap; // 滚动必须加的属性
			width: 100%;
			height: 280upx;
			padding: 20upx;
			margin: 0 auto;

			.item {
				width: 24%;
				margin-right: 20upx;
				display: inline-block;
				vertical-align: top;

				.img {
					display: inline-block;

					image {
						width: 170upx;
						height: 220upx;
						border-radius: 6upx;
					}
				}

				.item-title {
					display: block; // 让字体换行
					width: 90%;
					font-size: 30upx;
					line-height: 40upx;
				}
			}
		}
	}
</style>
