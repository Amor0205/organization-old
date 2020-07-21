<template>
	<view class="container">
		<view class="wrap">
			<u-swiper :list="list" mode="number" :autoplay="false" indicator-pos='bottomRight' height="600"></u-swiper>
		</view>
		<view class="commodityIntro">
			<view class="titleBox">
				<view class="leftBox">
					￥<text>{{ commodityInfo.price }}</text>
				</view>
				<view class="rightBox">
					<image src="../../../static/imgs/fenxiang@2x.png" mode=""></image>
					分享
				</view>
			</view>
			<view class="content">
				<view class="title">
					{{ commodityInfo.productName }}
				</view>
				<view class="contents">
					{{ commodityInfo.productPresentation }}
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="selectBox">
			选择<text>已选：</text>
		</view>
		<view class="gap"></view>
		<!-- 评论 -->
		<view class="commentBox">
			<view class="titleBox">
				<text>商品评论</text>
				<view class="tabBarBox">
					<view class="tabBar" :class="activeNum == index ? 'active' : '' "  v-for="(item,index) in commentTabBar" :key='index' @click="changeBar(index)">
						{{ item }}999+
					</view>
				</view>
			</view>
			<view class="commentList" v-for="(item,index) in commentList" :key='index'>
				<view class="topBox">
					<view class="imgBox">
						<image :src="item.headPortrait" mode=""></image>
					</view>
					<view class="rightBox">
						<view class="">
							{{ item.userName }}
						</view>
						<view class="">
							{{ item.times }}
						</view>
					</view>
				</view>
				<view class="centerBox">
					{{ item.content }}
				</view>
				<view class="bottomBox">
					<text>相应速度:{{ item.grade[0] }}分</text>
					<text>时效:{{ item.grade[1] }}分</text>
					<text>专业:{{ item.grade[2] }}分</text>
				</view>
			</view>
		</view> 
		<!-- 控件 -->
		<view class="controlBox">
			<view class="leftBox">
				<view class="service">
					<image src="../../../static/imgs/service.png" mode=""></image>
					<text>客服</text>
				</view>
				<view class="collect">
					<image src="../../../static/imgs/collect.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="rightBox">
				<view class="button_l" @click="goToPage('shopCar')">
					加入购物车
				</view>
				<view class="button_r" @click="goToPage('buy')">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				optionData:'',		//
				activeNum:0,		//激活类选择项
				list: [
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				commodityInfo:{
					price:79.8,
					productName:'基础体检血压血糖检测常规体检',
					productPresentation:'检查血液常规，尿液常规，大便常规的检查，肝功能，血脂，血糖等检查。血压，脉搏，体温的正常测量。腹部B超的检查如肝，胆，肾脏',
				},
				commentTabBar:['好评','中评','差评'],
				commentList:[
					{
						userId:1,
						userName:'逮猫儿的shark',
						headPortrait:'../../../static/imgs/three.png',
						times:'三天前',
						content:'一大早服务人员就按照预定的时间上门了，服务过程很专业老年人也很配合，张医生很耐心，我家父亲问的许多健康问题，也都建议的很清楚',
						grade:[5,6,4]
					},{
						userId:1,
						userName:'逮猫儿的shark',
						headPortrait:'../../../static/imgs/three.png',
						times:'三天前',
						content:'一大早服务人员就按照预定的时间上门了，服务过程很专业老年人也很配合，张医生很耐心，我家父亲问的许多健康问题，也都建议的很清楚',
						grade:[5,6,4]
					},{
						userId:1,
						userName:'逮猫儿的shark',
						headPortrait:'../../../static/imgs/three.png',
						times:'三天前',
						content:'一大早服务人员就按照预定的时间上门了，服务过程很专业老年人也很配合，张医生很耐心，我家父亲问的许多健康问题，也都建议的很清楚',
						grade:[5,6,4]
					},
				]
			}
		},
		methods: {
			//切换评价
			changeBar(res){
				this.activeNum = res
			},
			//点击处理
			goToPage(res){
				switch (res){
					case 'shopCar':
						uni.showToast({
							icon:'none',
							title:'已添加至购物车'
						})
						break;
					case 'buy':
						uni.navigateTo({
							url:'../../../pages/live/level_2_pages/orderFrom'
						})
						break;	
					default:
						break;
				}
			}
		},
		onLoad(option) {
			this.optionData = JSON.parse(option.data)
		},
		created() {
			
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:this.optionData.name
			})
		}
	}
</script>

<style lang="scss">
	// 间隔行
	.gap{
		height: 18upx;
		background: #f9f9f9;
	}
	//激活类
	.active {
		&:after {
			content: '';
			position: absolute;
			bottom: -20upx;
			// top: 0;
			left: 50%;
			margin-left: -18upx;
			height: 4upx;
			width: 36upx;
			background-color: #ffe300;
		}
	}
	.container {
		/* padding: 20px; */
		font-size: 14px;
		line-height: 24px;
		padding-bottom: 140upx;
		.commodityIntro{
			padding: 20upx;
			.titleBox{
				display: flex;
				justify-content: space-between;
				.leftBox{
					color: #EC7171;
					text{
						font-size: 32px;
					}
				}
				.rightBox{
					display: flex;
					align-items: center;
					color:#878BA1;
					font-size:12px;
					image{
						height: 24upx;
						width: 24upx;
						padding-right: 12upx;
					}
				}
			}
			.content{
				.title{
					font-size: 15px;
					color: #282828;
					line-height: 80upx;
				}
				.contents{
					font-size: 13px;
					color: #666666;
				}
			}
		}
		.selectBox{
			padding: 20upx;
			color: #878BA1;
			text{
				color: #282828;
				padding-left: 20upx;
			}
			
		}
		.commentBox{
			padding: 20upx;
			color: #282828;
			.titleBox{
				display: flex;
				justify-content: space-between;
				padding-bottom: 46upx;
				.tabBarBox{
					display: flex;
					.tabBar{
						position: relative;
						width: 140upx;
						padding-left: 30upx;
					}
				}
			}
			.commentList{
				padding-bottom:30upx ;
				.topBox{
					display: flex;
					align-items: center;
					.imgBox{
						width: 56upx;
						height: 56upx;
						padding-right: 12upx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.rightBox{
						:last-child{
							font-size: 12px;
							color: #878BA1;
						}
					}
				}
				.centerBox{
					color: #666666;
				}
				.bottomBox{
					text{
						padding-right: 20upx;
					}
				}
			}
		}
		.controlBox{
			width: 92%;
			padding: 0 4%;
			background: #fff;
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 999;
			height: 140upx;
			.leftBox{
				font-size: 12px;
				color: #707070;
				display: flex;
				.service{
					padding: 0 20upx;
					display: flex;
					flex-direction: column;
				}
				.collect{
					padding: 0 20upx;
					display: flex;
					flex-direction: column;
				}
				image{
					width: 36upx;
					height: 36upx;
				}
			}
			.rightBox{
				display: flex;
				color:#fff;
				line-height: 68rpx;
				*{
					text-align: center;
					width: 220upx;
				}
				.button_l{
					background: #FF9500;
					border-radius: 40upx 0 0 40upx;
				}
				.button_r{
					background: #EC7171;
					border-radius: 0 40upx 40upx 0;
				}
			}
		}
	}
</style>
