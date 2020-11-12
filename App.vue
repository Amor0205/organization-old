<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		
		
		// const synth = window.speechSynthesis;
		// const msg = new SpeechSynthesisUtterance();
		
		// console.log(this)
		
		
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
			console.log(JSON.stringify(result));
			if(result.status == 0){
				jyJPush.android_goToAppNotificationSettings(result=> {
					console.log(JSON.stringify(result));
				});
			}
		});
		
		//获取registrationID
		jyJPush.getRegistrationID(result => {
			console.log(JSON.stringify(result));
			uni.showToast({
				icon: 'none',
				title: JSON.stringify(result)
			})
		});
		
		//监听消息推送事件
		jyJPush.addJYJPushReceiveNotificationListener(result=> {
		//  监听成功后，若收到推送，会在result返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
			var type 
			var content
			if(JSON.parse(result.notificationExtras).type){
				type = JSON.parse(result.notificationExtras).type
				content = JSON.parse(result.notificationExtras).content
			}
			
			//type   0老人求助 1同事求助
			if(type == 0){
				uni.showModal({
					title: '老人求助',
					content,
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				})
			}else if(type == 1){
				uni.showModal({
					title: '同事求助',
					content,
					confirmText:'确认求助',
					cancelText:'暂无时间',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
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
		
		
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
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
