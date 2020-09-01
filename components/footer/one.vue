<template>
	<view class="containerBox">
		<!-- 蒙版 -->
		<view class="mask" v-show="popupShow" @click="showPopup" @touchmove.stop.prevent='moveHandle'></view>
		<!-- 头部 -->
		<view class="titleBox">
			<view class="inputBox" @click="goToPage('search')">
				<view class="centerBox">
					<image src="../../static/imgs/sousuo@2x.png" mode=""></image>
					<text>请输入你想搜索的内容</text>
				</view>
			</view>
			<view class="controlBox">
				<view class="topBox">
					<view class="leftBox" @click="showPopup">
						<text>查看全部</text>
						<image src="../../static/imgs/xx.png" style="width: 14upx;height: 12upx;margin-left: 4upx;" mode=""></image>
					</view>
					<view class="rightBox">
						{{ locationList[locationIndex] }}
					</view>
				</view>

				<view class="bottomBox" v-show="popupShow">
					<text class="title">
						城区筛选
					</text>
					<view class="locationBox">
						<view class="locationList" @click="changeLocation(index)" :class="index == locationIndex?'active':''" v-for="(item,index) in locationList"
						 :key='index'>
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="orderListBox" v-for="(item,index) in services" :key='index'>
				<!-- 间隔行 -->
				<u-gap height="14" bg-color="#e5e5e5"></u-gap>
				<view class="outerListBox">
					<view class="topBox">
						<text>{{ item.itemId }}</text>
						<text class="endTime">截止时间{{ item.endTime }}天</text>
					</view>
					<view class="centerBox">
						<view class="listBox">
							<view class="leftBox">服务对象</view>
							<view class="rightBox">{{ item.consumer }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">约定服务时间</view>
							<view class="rightBox">{{ item.date }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">服务内容</view>
							<view class="rightBox">{{ item.products }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">商品备注</view>
							<view class="rightBox" style="color: #FF9500;">{{ item.bz }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">服务约定地址</view>
							<view class="rightBox">{{ item.address }}</view>
						</view>

					</view>
					<view class="bottomBox">
						<view class="buttonBox">提醒上门</view>
						<view class="buttonBox" @click="goToPage('map',item)">地址导航</view>
						<view class="buttonBox" @click="goToPage('makePhone',item)">电话联系</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	const key = 'c6ee414451d3d33edb092eaee05f2d0f';
	const amapFile = require('../../common/amap-uni.js'); //先引入这个sdk
	import {
		getBegin
	} from '../../src/ajax.js'
	export default {
		//获取到顶部高度数据
		props: ['scrollTopChild'],
		data() {
			return {
				scrollTopMsg: 0, //据顶部高度
				commonColor: '', //全局颜色
				popupShow: false, //
				topGapHeight: 0, //顶部间隙
				status: 1,
				currentPage: 1, //当前页数,
				id: '1273804055990304770',
				services: '',
				date: [], // getTime储存从服务器请求回来的数据
				orderList: [{
					orderNumber: 'DABH23244743442342',
					endTime: 1,
					object: '萧蔷',
					appointTime: '2020年02月02日 23:22',
					phoneNum: 13668281737,
					project: '推拿',
					remark: '请准时到',
					serviceSite: "四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				}, {
					orderNumber: 'DABH23244743442342',
					endTime: 1,
					object: '萧蔷',
					appointTime: '2020年02月02日 23:22',
					phoneNum: 13668281737,
					project: '推拿',
					remark: '请准时到',
					serviceSite: "四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				}, {
					orderNumber: 'DABH23244743442342',
					endTime: 1,
					object: '萧蔷',
					appointTime: '2020年02月02日 23:22',
					phoneNum: 13668281737,
					project: '推拿',
					remark: '请准时到',
					serviceSite: "四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				}, ],
				locationList: ['城西社区', '凤鸣社区', '西青社区', '青羊区', '郫都区'],
				locationIndex: 0,
			};
		},

		computed: {


		},
		watch: {

		},
		methods: {
			goToPage(e, data) {

				switch (e) {
					case 'search':
						uni.navigateTo({
							url: '../../pages/one/search'
						})
						break;
					case 'map':
						// uni.navigateTo({
						// 	url:'../../pages/map'
						// })
						this.getLocationFun(data.serviceSite)
						break;
					case 'makePhone':
						uni.makePhoneCall({
							phoneNumber: JSON.stringify(data.phoneNum)
						});

						break;
					default:
						break;
				}
			},
			//控制popup的显示
			showPopup() {
				this.popupShow = !this.popupShow
			},
			//处理蒙版显示时不允许屏幕滚动
			moveHandle() {},
			// 切换地点
			changeLocation(index) {
				this.locationIndex = index;
			},

			//调起高德并定位
			toMapAPP(longitude, latitude, name) {
				let url = "";
				if (plus.os.name == "Android") { //判断是安卓端
					plus.nativeUI.actionSheet({ //选择菜单
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						switch (e.index) {
							//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
							// case 1:
							// 	//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
							// 	url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
							// 	break;
							case 1:
								url =
									`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
								break;
							case 2:
								url =
									`androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url);
							//plus.runtime.openURL(url,function(e){})调起手机APP应用
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})

				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置
					// 在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加
					//（如urlschemewhitelist:["iosamap","baidumap"]）  
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						switch (e.index) {
							case 1:
								url =
									`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
								break;
							case 2:
								url =
									`iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url);
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
			},
			//获取待开始订单
			getStart() {
				getBegin(
					this.id,
					this.status,
					this.currentPage
				).then(res => {
					if (res.data.code === 2000) {
						console.log(res);
						this.services = res.data.data.services.services
						console.log(this.services);
						//把获取到的时间进行转换
						let date=new Date(new Date(new Date(res.data.data.services.services[0].beginTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
						     console.log(date)
					}

				})
			}

		},

		created() {
			this.getStart()
		},
		mounted() {
			setTimeout(res => {
				uni.createSelectorQuery().in(this).select('.titleBox').boundingClientRect(data => {
					this.topGapHeight = data.height
					// console.log(this.topGapHeight)
				}).exec();
			});



		},

		onLoad(option) {
			this.id = option.id
			console.log(this.id);
		},
	


	};
</script>

<style lang="scss">
	.active {
		border: 1px #FFE300 solid !important;
		background: #FFFBDE !important;
		color: #FF9500 !important;

	}

	.containerBox {
		font-size: 14px;
		line-height: 24px;
		// height: 100%;
		position: relative;
		padding-bottom: 140upx;

		//蒙版
		.mask {
			width: 100%;
			height: 100%;
			background: rgba($color: #626262, $alpha: 0.5);
			position: absolute;
			z-index: 299;
		}

		.titleBox {
			padding: 0 2%;
			padding-top: 100upx;
			width: 96%;
			color: #282828;
			position: fixed;
			background: #FFFFFF;
			z-index: 399;

			.inputBox {
				width: 100%;
				background: #E8E8E8;
				border-radius: 30px;
				height: 64upx;
				display: flex;
				align-items: center;
				justify-content: center;

				.centerBox {
					display: flex;
					align-items: center;
					color: #a9a9a9;

					image {
						width: 32upx;
						height: 32upx;
						margin-right: 16upx;
					}
				}
			}

			.controlBox {
				.topBox {
					margin-top: 40upx;
					padding-bottom: 20upx;
					display: flex;
					justify-content: space-between;

					.leftBox {
						display: flex;
						align-items: center;
					}

					.rightBox {
						color: #4d4d4d;
					}
				}

				.bottomBox {
					padding-bottom: 40upx;

					.title {
						display: inline-block;
						margin-bottom: 20upx;
					}

					.locationBox {
						display: flex;
						flex-wrap: wrap;

						.locationList {
							margin: 0 0 20upx 2.5%;
							width: 30%;
							line-height: 60upx;
							display: flex;
							align-items: center;
							justify-content: center;
							border: 1px #F2F2F2 solid;
							border-radius: 4px;
							background: #fefefe;
							color: #878787;
						}
					}
				}

			}


		}

		.contentBox {
			padding-top: 272upx;

			.orderListBox {
				.outerListBox {
					padding: 20upx 2%;

					.topBox {
						display: flex;
						justify-content: space-between;
						padding-bottom: 40upx;

						.endTime {
							color: #EC7171;
						}
					}

					.centerBox {
						.listBox {
							display: flex;
							padding-bottom: 20upx;

							.leftBox {
								width: 30%;
								color: #878BA1;
							}

							.rightBox {
								width: 70%;
								color: #282828;
							}
						}
					}

					.bottomBox {
						display: flex;
						justify-content: flex-end;

						.buttonBox {
							color: #666666;
							border: 1upx solid #666666;
							border-radius: 40upx;
							padding: 0 24upx;
							margin-left: 20upx;
						}
					}
				}

			}
		}
	}
</style>
