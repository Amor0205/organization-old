<template>
	<view class="box">
		<view class="header " ref='header'>
			<!-- 顶部搜索 -->
			<view class="top flex a-align j-around">
				<view class="flex j-content-c a-align">
					<view class="beijing">
						北京市
					</view>
					<view class="">
						<image src="../../static/imgs/xx.png" mode="" class="image"></image>
					</view>
				</view>
				<view class="">
					<u-search placeholder="搜索" v-model="keyword" action-text='' height='80' class='search'></u-search>
				</view>
				<view class="left flex j-around  a-align">
					<view class="name">
						王秀宣
					</view>
					<view class="">
						<image src="../../static/imgs/qiehuan.png" mode="" class="qiehuan"></image>
					</view>
				</view>
			</view>
			<!-- 五个分类 -->
			<view class="five">
				<view class="" v-for="(item,index) in daily" :key='index' @click="goToPage(item)">
					<view class="icon" :style="{background:'linear-gradient(#e6cbd9, '+item.style.backgroundcolor+')' }" style="">
						<image :src="item.imgs" mode="" class="imgs" :style="item.style"></image>
					</view>
					<view class="title" style=";">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="note">
			</view>
		</view>
		<!-- 底部 -->
		<!-- <scroll-view > -->
		<view class="health">
			<!-- 广告 -->
			<scroll-view  scroll-y="true" :style="{ height:listHeight + 'px' }" show-scrollbar='true'>
				<view class="banners">
					<image src="../../static/imgs/banner.png" mode="" class="banner"></image>
				</view>
				<!-- 公司推荐 -->
				<view class="recommend" style="font-size:32rpx;margin: 48rpx 0rpx 0rpx 22rpx; font-weight:700;">
					服务公司推荐
				</view>

				<view class="" style="margin-top: 48rpx;">
									
					<view v-for="(item,index) in synopsis" :key='index' class="synopsis">
						<view class="">
							<image :src="item.imgs" mode="" class="imgss"></image>
						</view>
						<view class="right">
							<view class="" style="font-size: 32rpx;">
								{{item.name}}
							</view>
							<view class="comprehensive">
								<view class="xingxing">
									<image src="../../static/imgs/xingxing.png" mode="" style="width: 20rpx;height: 20rpx;"></image>
								</view>
								<view class="rank">
									{{item.rank}}
								</view>
								<view class="sold">
									已售{{item.sold}}+
								</view>
								<view class="evaluate">
									评价{{item.evaluate}}+
								</view>

							</view>
							<view class="price">
								起价 ￥{{item.price}}
							</view>
							<view class="lable">
								{{item.lable}}
							</view>
						</view>
					</view>
					 <!-- </scroll-view> -->
				</view>
		
			</scroll-view>
		</view>
		<!-- </scroll-view> -->
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
				header:'',		//header高度
				listHeight:'',	//列表高度
				keyword: '',
				daily: [{
					imgs: '../../static/imgs/liliao.png',
					title: '理疗',
					style: {
						width: '40rpx',
						height: '34rpx',
						backgroundcolor: '#E94337',
					}
				}, {
					imgs: '../../static/imgs/tijian.png',
					title: '上门体检',

					style: {
						width: '36rpx',
						height: '40rpx',
						backgroundcolor: '#C77FF8',
					}
				}, {
					imgs: '../../static/imgs/qingjie.png',
					title: '清洁',
					style: {
						width: '42rpx',
						height: '38rpx',
						backgroundcolor: '#FFA600',
					}
				}, {
					imgs: '../../static/imgs/cy.png',
					title: '餐饮',
					style: {
						width: '32rpx',
						height: '40rpx',
						backgroundcolor: '#6BC9F8',
					}
				}, {
					imgs: '../../static/imgs/xunshi.png',
					title: '巡视',
					style: {
						width: '40rpx',
						height: '32rpx',
						backgroundcolor: '#FF7194',
					}
				}, ],
				synopsis: [{
					imgs: '../../static/imgs/one.png',
					name: '新城医疗中心 (良乡)',
					rank: '4.5',
					sold: '2000',
					evaluate: '2000',
					price: '300',
					lable: '“服务好, 人员专业”“很贴心”'
				}, {
					imgs: '../../static/imgs/two.png',
					name: '万合一家医疗中心 (房山)',
					rank: '4.5',
					sold: '2000',
					evaluate: '2000',
					price: '300',
					lable: '“服务好, 人员专业”“很贴心”'
				}, {
					imgs: '../../static/imgs/three.png',
					name: '万合一家医疗中心 (绿地缤纷城)',
					rank: '4.5',
					sold: '2000',
					evaluate: '2000',
					price: '300',
					lable: '“服务好, 人员专业”“很贴心”'
				}]
			}
		},
		methods: {
			//获取元素高度
			async getHeightFun(){
				//获取元素高度
				uni.createSelectorQuery().in(this).select('.header').boundingClientRect(data => {
					this.header = data.height
				}).exec();
			},
			//跳转页面
			goToPage(res){
				uni.navigateTo({
					url:'../../pages/live/level_2_pages/level_2?title='+res.title
				})
			}
		},
		mounted() {
			this.getHeightFun()
			
		},
		onLoad() {

		},
		filters: {

		},
		computed: {

		},
		watch: {
			header:function(){
				var footerBar = uni.getStorageSync('footerBarHeight')
				// 获取设备信息
				uni.getSystemInfo({
					success:(res)=>{
						this.listHeight = res.windowHeight - this.header - footerBar ;
						// console.log(this.header ,this.listHeight ,footerBar)
					}
				})
			}
		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	* {
		margin: 0;
		padding: 0
	}

	.box {
		width: 100%;
		height: 100%;
		background: #FFE300;
	}
	.header {
		width: 100%;
		// height: 360rpx;
		height: 360rpx;
		background: #FFE300;
		position: fixed;
		z-index: 999;
		padding-top: 100upx;
		top: 0;
		.top {
			width: 100%;
			height: 80rpx;
				// margin-top: 60rpx;
			.beijing {
				font-size: 30rpx;
				line-height: 80rpx;
				font-weight: 700;
	
			}
			.image {
				width: 25rpx;
				height: 25rpx;
				margin-left: 10rpx;
			}
			.search {
				display: inline-block;

			}
		}
		.left {
			width: 172rpx;
			height: 66rpx;
			border: 1rpx solid white;
			border-radius: 30rpx;
			.name {
				font-size: 28rpx;
				font-weight: 700;
			}
			.qiehuan {
				width: 46rpx;
				height: 46rpx;
				margin-top: 10rpx;
			}
		}
		.five {
			width: 100%;
			height: 200rpx;
			margin-top: 60rpx;
			display: flex;
			justify-content: space-around;

			.icon {
				width: 84rpx;
				height: 84rpx;
				border-radius: 40%;
				display: flex;
				justify-content: center;
				align-items: center;
				// background-image: linear-gradient(#e6c7d2, #8c91e5)!important;
			}
			.title {
				font-size: 24rpx;
				margin-top: 20rpx;
				text-align: center;
				color: #282828;
			}
		}
		.note {
			width: 20rpx;
			height: 6rpx;
			border-radius: 30%;
			background-color: white;
			margin: 0 auto;
		}
	}
	.health {
		width: 100%;
		background: white;
		// margin-top:50rpx;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		position: absolute;
		top:460rpx;
		/* #ifdef APP-PLUS */
		
		/* #endif */
		.banners {
			display: flex;
			justify-content: center;

			.banner {
				width: 706rpx;
				height: 266rpx;
				margin-top: 22rpx;
			}
		}

		.synopsis {
			width: 700rpx;
			height: 160rpx;
			margin: 0 auto;
			display: flex;
			margin-bottom: 60rpx;
		}

		.imgss {
			width: 156rpx;
			height: 156rpx;
		}

		.comprehensive {
			width: 350rpx;
			height: 30rpx;
			margin-top: 6rpx;
			display: flex;
			align-items: center;
			.xingxing {
				margin-top: -10rpx;
			}

			.rank {
				font-size: 24rpx;
				color: #FEB34A;
				margin-left: 2rpx;
				line-height: 30rpx;
			}

			.sold {
				font-size: 22rpx;
				color: #878BA1;
				margin-left: 12rpx;
				line-height: 30rpx;
			}

			.evaluate {
				font-size: 22rpx;
				color: #878BA1;
				margin-left: 12rpx;
				line-height: 30rpx;
			}

		}

		.price {
			font-size: 22rpx;
			color: #666666;
			margin-top: 6rpx;
		}

		.lable {
			font-size: 20rpx;
			color: #FF9500;
			margin-top: 8rpx;
		}

		.right {
			margin-left: 20rpx;
		}
	}
</style>
