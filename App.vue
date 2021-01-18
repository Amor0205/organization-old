<script>
import { receiveOrder } from './src/ajax.js'
export default {
	data() {
		return {
			// timeout: 30000, // 30s
			// timeoutObj: null,
			
			websock: null, //建立的连接
			lockReconnect: false, //是否真正建立连接
			timeout: 20 * 1000, //一次心跳
			timeoutObj: null, //心跳心跳倒计时
			serverTimeoutObj: null, //心跳倒计时
			timeoutnum: null, //断开 重连倒计时、
			showModel:false  ,//控制提示弹框
			
		};
	},
	onLaunch: function() {
		console.log('App Launch');
		// plus.device.getInfo({
		// 	success:function(e){
		// 		console.log('getDeviceInfo success: '+JSON.stringify(e));
		// 	},
		// 	fail:function(e){
		// 		console.log('getDeviceInfo failed: '+JSON.stringify(e));
		// 	}
		// });
		
	},
	onShow: function() {
		console.log('App Show');
		
		var _this = this;
		// if(this.timeoutObj){
		// 	//清除时间
		// 	clearTimeout(this.timeoutObj);
		// 	this.timeoutObj = null; 
		// 	console.log('定时器已经清除')
		// }
		// 打开链接
		this.initWebSocket()	
	},
	onHide: function() {
		if(this.timeoutObj) {  
		    clearInterval(this.timeoutObj);  
		    this.timeoutObj = null;  
		}  
		this.closeSocket()
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
			uni.redirectTo({
				url:'/pages/index/index'
			})
		},
		//协助刷卡成功
		gotoPage_6(content){
			uni.redirectTo({
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
		initWebSocket() {
			var userInfo = uni.getStorageSync('userInfo')
			var _this = this;
			uni.sendSocketMessage({
				data: 'E',
				success: res => {
					// if(userInfo){
					// 	//提示成功
					// 	uni.showModal({
					// 		title:'提示',
					// 		content:'通讯链接正常',
					// 	})
					// } 
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
			uni.closeSocket(); // 确保已经关闭后再重新打开
			uni.connectSocket({
				// url: 'ws://110.187.88.70:21704/webSocket', //测试
				url: 'ws://110.187.88.70:21606/webSocket',
				success(res) {
					console.log('连接成功 connectSocket=', res);
				},
				fail(err) {
					console.log('连接失败 connectSocket=', err);
				}
			});
			this.onSocketOpen() 	//连接成功
			this.onSocketMessage(); // 打开成功监听服务器返回的消息
			this.onSocketError() 	//监听失败
			this.onSocketClose()	//监听 关闭
		},
		//	打开成功监听服务器返回的消息
		onSocketMessage() {
			// 消息
			uni.onSocketMessage(res => {
				console.log(res.data)
				this.getSocketMsg(res.data); // 监听到有新服务器消息
			});
 		},
		//连接成功
		onSocketOpen(){
			var userInfo = uni.getStorageSync('userInfo')
			var _this = this;
			uni.onSocketOpen(res => {
				// if(userInfo && _this.showModel){
				if(userInfo){
					//提示成功
					// if(!_this.showModel){
					// 	uni.showModal({
					// 		title:'提示',
					// 		content:'通讯链接正常。',
					// 	})
					// }else{
						// uni.showToast({
						// 	icon:'none',
						// 	title:'链接成功'
						// })
					// }
				}
				uni.hideLoading() 
				//
				this.sendSocketMessage()
				// //开启心跳
				this.start();
			});
		},
		// 监听到有新服务器消息
		getSocketMsg(reData) {
			// 监听到服务器消息
			console.log('收到服务器消息', reData);
			//重置心跳
			this.reset()
		
			//  监听成功后，若收到推送，会在reData返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
			var _this = this;
			var type 
			var content
			var time
			console.log(JSON.parse(reData))
			//处理类型
			if(JSON.parse(reData).type){
				type = JSON.parse(reData).type
			}
			//处理附带内容
			if(JSON.parse(reData).content){
				content = JSON.parse(reData).content
				// content = JSON.parse(content)
			}
			
			//处理时间
			if(content.createTime){
				console.log(content)
				time = new Date(content.createTime);
				time = this.formatDate(time)
				content.createTime = time
			}
					
			/**
			 * 0巡视订单 1求助报警(普通弹框) 2 协助订单(普通弹框)
			 * 3上班刷卡成功 	4巡视订单刷卡
			 * 5求助订单刷卡  	6协助订单刷卡  7反馈协助者接单 8协助者刷卡成功	9 跳转(包括4,5,6) 
			 */
			var userInfo = uni.getStorageSync('userInfo')
			if(type == 1){
				//提示
				_this.deep()
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
				//上班刷卡
				uni.showToast({
					title: content,
					icon: 'none'
				})
				this.gotoPage_3()
			}else if(type == 6){
				uni.showToast({
					title: content,
					icon: 'none'
				})
				this.gotoPage_6()
			}else if(type == 7){
				//协助接单反馈
				uni.showModal({
				    title: '提示',
				    content: content,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
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
			
		}, 
		//监听 失败
		onSocketError(){
			var _this = this;
			uni.onSocketError(function (res) {
				// 重连
				// _this.reconnect()
			  console.log('WebSocket连接断开，请检查！');
			  _this.$store.commit('changeCueLight',false)
			  _this.reconnect()
			});
		},
		//监听 关闭
		onSocketClose(){
			var _this = this;
			var userInfo = uni.getStorageSync('userInfo') 
			if(userInfo){
				uni.onSocketClose(function (res) {
					console.log('WebSocket 已关闭！');
					_this.$store.commit('changeCueLight',false)
					_this.reconnect()
				});
			}	
		},
		//重新连接
		reconnect(e) {
			var that = this; 
			if(this.timeoutObj){
				that.timeoutnum = setTimeout(function () {
				  //新连接
				  that.initWebSocket();
				}, 5000); 
			}
			if(this.timeoutObj) {
				clearInterval(this.timeoutObj);  
				this.timeoutObj = null;  
			} 
		},
		//关闭socket
		closeSocket(){
			var that = this;
			uni.closeSocket({
				success() {
					console.log('链接已断开')
				},
				fail() {
					console.log('链接断开失败')
				}
			})
		},
		//发送消息
		sendSocketMessage(msg){
			var userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				uni.sendSocketMessage({
					data:'E'+userInfo.id,
					success: res => {
						this.$store.commit('changeCueLight',true)
						console.log('心跳,连接中....' + 'E'+userInfo.id);
					},
					fail: err => {
						console.log('连接失败重新连接....');
						this.openConnection();
					}
				})
			}
			
		},
		reset() {
		  //重置心跳
		  var that = this;
		  //清除时间
		  clearTimeout(that.timeoutObj);
		  //重启心跳
		  that.start();
		},
		// 启动心跳 start
		start() {
			//开启心跳
			var self = this;
			// this.timeoutObj = setInterval(function() {
			this.timeoutObj = setTimeout(function() { 
				self.sendSocketMessage()
				
				// console.log(11) 
				self.reset()
			}, 20000);
		},
		//提示音
		deep(){
			// #ifdef APP-PLUS
			plus.device.beep(3)
			plus.device.vibrate(1000);
			// #endif
		},
		
		  
		
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
