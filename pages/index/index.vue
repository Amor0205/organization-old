<template>
	<view class="box">
		<view class="top">
			<view class="timg">
				<image src="../../static/imgs/timg.jpg" class="timgImg"></image>
			</view>
			<view class="touxiang" @click="personal">
				<image src='../../static/imgs/touxiang.png' class="touxiangImg"></image>
			</view>
		</view>
		<view class="service">
			服务人员管理系统
		</view>
		<!-- 四个按钮 -->
		<view class="button">
			<view class="abc" v-for="(item,index) in serve" :key='index'>
				<u-button type="info" shape="circle"  class="u-button" @click="goTo(item)">{{item.title}}</u-button>
			</view>
		</view>
		
		<!-- #ifdef APP-PLUS -->
		<mUpdateAppTip @updateClose="updateClose" :update_title="update_title" :is_forced_update="is_forced_update"
		 :update_des="update_des" :update_type="update_type" :update_url="update_url" :is_update_app="is_update_app"></mUpdateAppTip>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import mUpdateAppTip from '@/components/maozai-update/updateAppTip.vue' //更新
	export default {
		name: "",
		components: {
			mUpdateAppTip
		},
		props: {},
		data() {
			return {
				userInfo:'',
				statusBarHeights: '',
				serve: [{
					title: '进行中订单',
					flag: ''
				}, {
					title: '老人求助'
				}, {
					title: '日常巡视'
				}, {
					title: '主动服务'
				}, ],
				
				version: '1.0.0',	//版本号
				update_type: 0, //0是热更新，1整包更新
				update_url: '', //更新的地址
				update_title: '',
				update_des: [],
				is_update_app: false,
				is_forced_update: false, //是否强制升级
			}
		},
		methods: {
			// 按钮跳转
			goTo(res) {
				if(this.userInfo.status != 3){
					switch (res.title) {
						case '进行中订单':
							uni.navigateTo({
								url: '../underway/underway'
							})
							break;
						case '老人求助':
							uni.navigateTo({
								url: '../seekHelp/present/present'
							})
							break;
						case '日常巡视':
							uni.navigateTo({
								url: '../dailyPatrol/dailyPatrol'
					
							})
							break;
						case '主动服务':
							uni.navigateTo({
								url: '../initiative/initiative?'
							})
							break;
						default:
							break;
					}
				}else{
					uni.showToast({
						icon:'none',
						title:'请先上班打卡，再进行操作！'
					})
				}
				
			},
			personal() {
				uni.navigateTo({
					url: '../personal/personal'
				})
			},
			
			//版本检测
			updateApp: function() {
				// #ifdef APP-PLUS  
				plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
					this.update_type = 1 //0是热更新，1整包更新
					this.is_update_app = true, ///是否强制更新，不能关闭
					this.update_title = '发现新的版本，请点击升级'
					// this.update_des = ['1.修复前端轮播图无法跳转；', '2.优化个人中心布局；']
				});
				// #endif
			},
			//app取消更新
			updateClose: function() {
				this.is_update_app = false;
			},
			//版本比较
			Version(curV, reqV) {
			    var arr1 = curV.toString().split('.');
			    var arr2 = reqV.toString().split('.');
			    //将两个版本号拆成数字
			    var minL = Math.min(arr1.length, arr2.length);
			    var pos = 0; //当前比较位
			    var diff = 0; //当前为位比较是否相等
			    var flag = false;
			    //逐个比较如果当前位相等则继续比较下一位
			    while(pos < minL) {
			        diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
			        if(diff == 0) {
			            pos++;
			            continue;
			        } else if(diff > 0) {
			            flag = true;
			            break;
			        } else {
			            flag = false;
			            break;
			        }
			    }
			        return flag;
			},
			getUpData(){
				uni.request({
					url: 'http://www.vykj.com.cn:21351/action/ApkInfo/getApkInfo?userkey=I8TLXT4DY1&appkey=I8TLYATOX1', //仅为示例，并非真实接口地址。', //仅为示例，并非真实接口地址。
					data: {},
					method: 'GET',
					success: (res) => {
						// console.log(res.data);
						if(res.statusCode == 200){
							this.update_url = this.getCaption(res.data.downloadPath)
							this.update_des = res.data.updateDescrip.split(',');
							if(this.Version(res.data.versionName,this.version)){
								this.updateApp()
							}
							// else{
								// uni.showToast({
								// 	icon:'none',
								// 	title:'版本为最新版本'
								// })
							// }
						}
					}
				});
			},
			//替换域名
			getCaption(obj){
			    // var index=obj.lastIndexOf("AppManage");
			    var index=obj.indexOf("e");
			    obj=obj.substring(index+1,obj.length);
			//  console.log(obj);
			    return 'http://www.vykj.com.cn:21351' + obj;
			    // return obj;
			}
			
			
		},
		created() {
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res.statusBarHeight);
					this.statusBarHeights = res.statusBarHeight
					// console.log(this.statusBarHeights);
				}
			});
		},
		mounted() {
			this.getUpData()
		},

		onLoad() {
			if( uni.getStorageSync('token').length == 0 ){
				uni.navigateTo({
					url: '../login/login'
				})
			}
			
			//获取版本号
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				this.version = widgetInfo.version;
				console.log(this.version)
			});
			// #endif
		},
		onShow() {
			if(uni.getStorageSync('userInfo')){
				this.userInfo = uni.getStorageSync('userInfo')
			}
		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.box {
		// background-image: url(../../static/imgs/ss.jpg);
		background-size: contain;
		background-repeat:no-repeat;
		// margin-top: 100rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 100rpx 20rpx 0rpx 20rpx;

			.timg {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;

				.timgImg {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.touxiang {
				width: 70rpx;
				height: 70rpx;

				.touxiangImg {
					width: 100%;
					height: 100%;
				}
			}

		}

		.service {
			font-size: 22px;
			font-weight: 700;
			text-align: center;
			margin-top: 100rpx;
		}

		.button {
			margin: 0 auto;
			padding-top: 100rpx;

			.u-button {
				width: 450rpx;
				height: 100rpx;
				font-size: 18px;
				margin-bottom: 80rpx;
				color: black;
				background: #FFE300;
			}
		}
	}
</style>
