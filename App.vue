<script>
import { receiveOrder } from './src/ajax.js'
export default {
	data() {
		return {
			timeout: 30000, // 30s
			timeoutObj: null
		};
	},
	onLaunch: function() {
		console.log('App Launch');
		
		var _this = this;
		
		// .判断是否已连接
		this.checkOpenSocket();
		
		// #ifdef APP-PLUS
		// const jyJPush = this.jyJPush
		// const jyJPush = uni.requireNativePlugin('JY-JPush');
		var jyJPush = uni.requireNativePlugin('JY-JPush');
		//安卓检查是否开启通知权限
		jyJPush.android_isNotificationEnabled(result=> {
			/*
			status = 0，关闭
			status = 1, 开启
			status = -1, 检测失败
			*/
			console.log(JSON.stringify(result));
			if(result.status == 0){
				jyJPush.android_goToAppNotificationSettings(result=> {
					console.log(JSON.stringify(result));
				});
			}
		});
		
		//APP进程被杀死后，消息还存在通知栏的时候，点击消息会出触发
		jyJPush.getLastPushInfo(result => {
			console.log('进程被杀死收到消息'+ JSON.stringify(result));
		});
		
		//监听消息推送事件(普通消息)
		jyJPush.addJYJPushReceiveNotificationListener(result=> {
			console.log('收到消息'+ JSON.stringify(result));
			//  监听成功后，若收到推送，会在result返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
			var type 
			var content
			var time
			//处理类型
			if(JSON.parse(result.notificationExtras).type){
				type = JSON.parse(result.notificationExtras).type
			}
			//处理附带内容
			if(type != 3){
				if(JSON.parse(result.notificationExtras).content){
					content = JSON.parse(result.notificationExtras).content
					content = JSON.parse(content)
				}
			}else {
				if(JSON.parse(result.notificationExtras).content){
					content = JSON.parse(result.notificationExtras).content
				}
			}
			//处理时间
			if(type != 3){
				time = new Date(content.createTime);
				time = this.formatDate(time)
				content.createTime = time
			}
					
			/**
			 * 0巡视订单 1求助报警(普通弹框) 2 协助订单(普通弹框)
			 * 3上班刷卡成功 	4巡视订单刷卡
			 * 5求助订单刷卡  	6协助订单刷卡  	9 跳转(包括4,5,6) 
			 */
			var userInfo = uni.getStorageSync('userInfo')
			if(type == 1){
				uni.showModal({
					title: '老人求助',
					content:`求助人：${content.elderName}\n地点：${content.location}\n时间：${content.createTime}\n`,
					// showCancel:false,
					confirmText:'确认接单',
					cancelText:'暂无时间',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							uni.showLoading({
								title:'正在接单'
							})
							//接单  单号：前缀加单号  X 巡视  A报警 H协助
							receiveOrder(
								'A'+content.id,
								userInfo.id
							).then(res_1=>{
								uni.hideLoading()
								if(res_1.data.code == 2000){
									_this.gotoPage(content)
								}else{
									uni.showToast({
										icon:'none',
										title:res_1.data.message
									})
								}
							}).catch(err => {
								uni.hideLoading()
								console.log(err);
								if(err.data.sataus == 500){
									receiveOrder(
										'H'+content.id,
										userInfo.id
									).then(res_1=>{
										uni.hideLoading()
										if(res_1.data.code == 2000){
											_this.gotoPage(content)
										}else{
											uni.showToast({
												icon:'none',
												title:res_1.data.message
											})
										}
									}).catch(err => {
										console.log(err);
										if(err.data.sataus == 500){
											uni.showToast({
												title:'网络错误请重试',
												icon:'none'
											})
										}
									})
								}
							})
						}else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}else if(type == 2){
				uni.showModal({
					title: '同事求助',
					content:`求助人：${content.elderName}\n地点：${content.location}\n服务内容：${content.content}\n时间：${content.createTime}\n`,
					confirmText:'确认求助',
					cancelText:'暂无时间',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							uni.showLoading({
								title:'正在接单'
							})
							//接单  单号：前缀加单号  X 巡视  A报警 H协助
							receiveOrder(
								'H'+content.id,
								userInfo.id,
								// content.parentOrderType
							).then(res_1=>{
								uni.hideLoading()
								if(res_1.data.code == 2000){
									_this.gotoPage(content)
								}else{
									uni.showToast({
										icon:'none',
										title:res_1.data.message
									})
								}
							}).catch(err => {
								uni.hideLoading()
								console.log(err);
								if(err.data.sataus == 500){
									receiveOrder(
										'H'+content.id,
										userInfo.id,
										// content.parentOrderType
									).then(res_1=>{
										uni.hideLoading()
										if(res_1.data.code == 2000){
											_this.gotoPage(content)
										}else{
											uni.showToast({
												icon:'none',
												title:res_1.data.message
											})
										}
									}).catch(err => {
										console.log(err);
										if(err.data.sataus == 500){
											uni.showToast({
												title:'网络错误请重试',
												icon:'none'
											})
										}
									})
								}
							})
						}else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}else if(type == 3){
				uni.showToast({
					title: content,
					icon: 'none'
				})
				this.gotoPage_3()
			}else if (type == 4) {
					uni.showToast({
						title: result.message,
						icon: 'none'
					})
					uni.redirectTo({
						url: '../registrations/registration?data=' + JSON.stringify(_this.underway)
					})
				} else if (type == 5) {
					uni.showToast({
						title: result.message,
						icon: 'none'
					})
					uni.redirectTo({
						url: '../registrations/registration?data=' + JSON.stringify(_this.underway) + '&flag=5'
					})
				} else if (type == 6) {
					uni.redirectTo({
						url: '../../index/index'
					});
				}else if(type == 9){
					//刷卡跳转
					// 	//改变工作状态 0上班 1空闲 2忙碌 3下班 4上班等待刷卡
					uni.showToast({
						title: '刷卡成功',
						icon: 'none'
					})
					_this.gotoPage_9(content)
				}
			
		
		});
		
		//监听推送消息点击事件
		jyJPush.addJYJPushReceiveOpenNotificationListener(result=> {
		//  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
			console.log('点击消息'+ JSON.stringify(result));
			//  监听成功后，若收到推送，会在result返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
			var type 
			var content
			var time
			if(JSON.parse(result.notificationExtras).type){
				type = JSON.parse(result.notificationExtras).type
			}
			if(JSON.parse(result.notificationExtras).content){
				content = JSON.parse(result.notificationExtras).content
				content = JSON.parse(content)
			}
			
			time = new Date(content.createTime); 
			time = this.formatDate(time)
			content.createTime = time
						
			/**
			 * 0巡视订单 1求助报警(普通弹框) 2协助订单(普通弹框)
			 * 3上班刷卡成功 4巡视订单刷卡
			 * 5求助订单刷卡  6协助订单刷卡 
			 */
			
			console.log(result)
			if(type == 1){
				var userInfo = uni.getStorageSync('userInfo')
				uni.showModal({
					title: '老人求助',
					content:`求助人：${content.elderName}\n地点：${content.location}\n时间：${content.createTime}\n`,
					// showCancel:false,
					confirmText:'确认接单',
					cancelText:'暂无时间',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							uni.showLoading({
								title:'正在接单'
							})
							//接单  单号：前缀加单号  X 巡视  A报警 H协助
							receiveOrder(
								'A'+content.id,
								userInfo.id
							).then(res_1=>{
								uni.hideLoading()
								if(res_1.data.code == 2000){
									
									_this.gotoPage(content)
								}else{
									uni.showToast({
										icon:'none',
										title:res_1.data.message
									})
								}
							}).catch(function(error) {
								uni.hideLoading()
								console.log(error);
							}); 
						}else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}else if(type == 2){
				var userInfo = uni.getStorageSync('userInfo')
				uni.showModal({
					title: '同事求助',
					content:`求助人：${content.elderName}\n地点：${content.location}\n服务内容：${content.content}\n时间：${content.createTime}\n`,
					confirmText:'确认求助',
					cancelText:'暂无时间',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							uni.showLoading({
								title:'正在接单'
							})
							//接单  单号：前缀加单号  X 巡视  A报警 H协助
							receiveOrder(
								'H'+content.id,
								userInfo.id,
								// content.parentOrderType
							).then(res_1=>{
								uni.hideLoading()
								if(res_1.data.code == 2000){
									_this.gotoPage(content)
								}else{
									uni.showToast({
										icon:'none',
										title:res_1.data.message
									})
								}
							}).catch(function(error) {
								uni.hideLoading()
								console.log(error);
							}); 
							
						}else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		});
		
		//获取registrationID
		// jyJPush.getRegistrationID(result => {
		// 	console.log(JSON.stringify(result));
		// 	uni.showToast({
		// 		icon: 'none',
		// 		title: JSON.stringify(result)
		// 	})
		// });
		
		//监听自定义消息（穿透消息）
		// jyJPush.addJYJPushCustomReceiveNotificationListener(result => {
		// 	var data =  JSON.stringify(result)
		// 	console.log('穿透消息'+ JSON.stringify(result));
		// 	// uni.showToast({
		// 	// 	icon: 'none',
		// 	// 	title: JSON.stringify(result)
		// 	// })
		// });
		
		//监听消息点击事件
		jyJPush.addJYJPushReceiveNewOpenNotificationListener(result => {
			console.log('点击' + JSON.stringify(result))
			// uni.showToast({
			// 	icon: 'none',
			// 	title: JSON.stringify(result)
			// })
		});
		
		//#endif
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		gotoPage(content){
			//接单  单号：前缀加单号  X 巡视  A报警 H协助
			uni.navigateTo({
				url: '/pages/seekHelp/taskDetails/taskDetails?data=' + JSON.stringify(content)
			})
		},
		//上班刷卡
		gotoPage_3(content){
			uni.navigateTo({
				url:'/pages/index/index'
			})
		},
		//领取订单刷卡
		gotoPage_9(content){
			uni.navigateTo({
				url: '/pages/seekHelp/registrations/registration?data=' + JSON.stringify(content) + '&flag=5'
			})
		},
		
		formatDate(now) { 
			var year=now.getFullYear();  //取得4位数的年份
			var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
			var date=now.getDate();      //返回日期月份中的天数（1到31）
			var hour=now.getHours();     //返回日期中的小时数（0到23）
			var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
			var second=now.getSeconds(); //返回日期中的秒数（0到59）
			return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
		},
		
		// 判断是否已连接
		checkOpenSocket() {
			uni.sendSocketMessage({
				data: 'ping',
				success: res => {
					return;
				},
				fail: err => {
					// 未连接打开websocket连接
					this.openConnection();
				}
			});
		},
		
		openConnection() {
			// 打开连接
			// uni.closeSocket(); // 确保已经关闭后再重新打开
			uni.connectSocket({
				url: 'ws:........',
				success(res) {
					console.log('连接成功 connectSocket=', res);
				},
				fail(err) {
					console.log('连接失败 connectSocket=', err);
				}
			});
			uni.onSocketOpen(res => {
				console.log('连接成功');
			});
			this.onSocketMessage(); // 打开成功监听服务器返回的消息
		},
		//	打开成功监听服务器返回的消息
		onSocketMessage() {
			// 消息
			this.timeout = 30000;
			this.timeoutObj = null;
			uni.onSocketMessage(res => {
				console.log(res)
				this.getSocketMsg(res.data); // 监听到有新服务器消息
			});
		},
		// 监听到有新服务器消息
		getSocketMsg(reData) {
			// 监听到服务器消息
			console.log('收到服务器消息', reData);
			this.reset();  // 检测心跳reset,防止长时间连接导致连接关闭
		},
		// 检测心跳reset
		reset() {
			clearInterval(this.timeoutObj);
			this.start(); // 启动心跳
		},
		// 启动心跳 start
		start() {
			this.timeoutObj = setInterval(function() {
				uni.sendSocketMessage({
					data: 'ping',
					success: res => {
						console.log('连接中....');
					},
					fail: err => {
						console.log('连接失败重新连接....');
						this.openConnection();
					}
				});
			}, this.timeout);
		}
	}
};
</script>

<style lang="scss">
	/* Uview-ui 样式 */
	// @import "uview-ui/index.scss";
			
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	.flex {
	    display: flex;
	}
	
	.j-content {
	    justify-content: space-between;
	}
	
	.j-around {
	    justify-content: space-around;
	}
	
	.j-content-c {
	    justify-content: center;
	}
	
	.a-align {
	    align-items: center;
	}
	
	.wrap {
	    flex-wrap: wrap;
	}

</style>
