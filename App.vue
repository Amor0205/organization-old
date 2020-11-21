<script>
import { receiveOrder } from './src/ajax.js'
export default {
	onLaunch: function() {
		console.log('App Launch');
		// const synth = window.speechSynthesis;
		// const msg = new SpeechSynthesisUtterance();
		
		// console.log(this)
		var _this = this;
		
		// #ifdef APP-PLUS
		// android_isNotificationEnabled() {
			// const jyJPush = uni.requireNativePlugin('JY-JPush');
			const jyJPush = this.jyJPush
			
			//判定是否 正常链接
			jyJPush.android_isNotificationEnabled(result => {
				console.log(JSON.stringify(result));
			});
		// },
		
		//安卓检查是否开启通知权限
		jyJPush.android_isNotificationEnabled(result=> {
			/*
			status = 0，关闭
			status = 1, 开启
			status = -1, 检测失败
			*/
			// console.log(JSON.stringify(result));
			if(result.status == 0){
				jyJPush.android_goToAppNotificationSettings(result=> {
					console.log(JSON.stringify(result));
				});
			}
		});
		
		// //获取registrationID
		// jyJPush.getRegistrationID(result => {
		// 	console.log(JSON.stringify(result));
		// 	uni.showToast({
		// 		icon: 'none',
		// 		title: JSON.stringify(result)
		// 	})
		// });
		
		//监听消息推送事件(普通消息)
		jyJPush.addJYJPushReceiveNotificationListener(result=> {
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
					content:`求助人：${content.elderName};\n地点：${content.location};\n时间：${content.createTime};\n`,
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
					content:`求助人：${content.elderName};\n地点：${content.location};\n服务内容：${content.content};\n时间：${content.createTime};\n`,
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
			
			console.log('收到消息'+ JSON.stringify(result));
			// uni.showToast({
			// 	icon:'none',
			// 	title: JSON.stringify(result)
			// })
			
			
		});
		
		// //监听推送消息点击事件
		// jyJPush.addJYJPushReceiveOpenNotificationListener(result=> {
		// //  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
		// 	console.log('点击消息'+ JSON.stringify(result));
		// 	uni.showToast({
		// 		icon:'none',
		// 		title: JSON.stringify(result)
		// 	})
		// });
		
		//监听自定义消息（穿透消息）
		jyJPush.addJYJPushCustomReceiveNotificationListener(result => {
			var data =  JSON.stringify(result)
			console.log('穿透消息'+ JSON.stringify(result));
			uni.showToast({
				icon: 'none',
				title: JSON.stringify(result)
			})
		});
		
		//监听消息点击事件
		jyJPush.addJYJPushReceiveNewOpenNotificationListener(result => {
			uni.showToast({
				icon: 'none',
				title: JSON.stringify(result)
			})
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
		
		formatDate(now) { 
			var year=now.getFullYear();  //取得4位数的年份
			var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
			var date=now.getDate();      //返回日期月份中的天数（1到31）
			var hour=now.getHours();     //返回日期中的小时数（0到23）
			var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
			var second=now.getSeconds(); //返回日期中的秒数（0到59）
			return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
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
