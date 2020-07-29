<template>
	<view class="containerBox" >
		<!-- 头部 -->
		<view class="titleBox">
			<view class="imgBox" @click="goToPage('goBack')">
				<image src="../../static/imgs/goback.png" mode=""></image>
			</view>
			<view class="inputBox">
				<view class="centerBox">
					<image src="../../static/imgs/sousuo@2x.png" mode=""></image>
					<input 
					style="color: #282828;width: 400upx;"
					placeholder="请输入你想搜索的内容" 
					placeholder-style="font-size:28upx" 
					confirm-type='search'
					v-model="inputValue"
					@input="inputFun"
					@confirm="confirm"
					></input>
					<image @click="deleteValue" v-if="showDeletd" src="../../static/imgs/delete.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="contentBox" >
			<view class="orderListBox" v-for="(item,index) in orderList" :key='index'>
				<!-- 间隔行 -->
				<u-gap height="14" bg-color="#e5e5e5" ></u-gap>
				<view class="outerListBox">
					<view class="topBox">
						<text>{{ item.orderNumber }}</text>
						<text class="endTime">截止时间{{ item.endTime }}天</text>
					</view>
					<view class="centerBox">
						<view class="listBox">
							<view class="leftBox">服务对象</view>
							<view class="rightBox">{{ item.object }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">约定服务时间</view>
							<view class="rightBox">{{ item.appointTime }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">服务内容</view>
							<view class="rightBox">{{ item.project }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">商品备注</view>
							<view class="rightBox" style="color: #FF9500;">{{ item.remark }}</view>
						</view>
						<view class="listBox">
							<view class="leftBox">服务约定地址</view>
							<view class="rightBox">{{ item.serviceSite }}</view>
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
export default {
	//获取到顶部高度数据
	props:['scrollTopChild'],
	data() {
		return {
			scrollTopMsg:0,			//据顶部高度
			commonColor: '',		//全局颜色
			topGapHeight:0,			//顶部间隙
			inputValue:'',			//input数据
			showDeletd:false,
			orderList:[
				// {
				// 	orderNumber:'DABH23244743442342',
				// 	endTime:1,
				// 	object:'萧蔷',
				// 	appointTime:'2020年02月02日 23:22',
				// 	phoneNum:13668281737,
				// 	project:'推拿',
				// 	remark:'请准时到',
				// 	serviceSite:"四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				// },{
				// 	orderNumber:'DABH23244743442342',
				// 	endTime:1,
				// 	object:'萧蔷',
				// 	appointTime:'2020年02月02日 23:22',
				// 	phoneNum:13668281737,
				// 	project:'推拿',
				// 	remark:'请准时到',
				// 	serviceSite:"四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				// },{
				// 	orderNumber:'DABH23244743442342',
				// 	endTime:1,
				// 	object:'萧蔷',
				// 	appointTime:'2020年02月02日 23:22',
				// 	phoneNum:13668281737,
				// 	project:'推拿',
				// 	remark:'请准时到',
				// 	serviceSite:"四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				// },
			],
		};
	},
	
	computed:{
		
		
	},
	watch:{
		
	},
	methods: {
		goToPage(e,data){
			switch (e){
				case 'goBack':
					uni.navigateBack()
					break;
				case 'map':
					this.getLocationFun(data.serviceSite)
					break;
				case 'makePhone':
					// #ifndef APP-PLUS
						uni.makePhoneCall({
							phoneNumber: JSON.stringify(data.phoneNum) 
						});
					// #endif
					break;
				default:
					break;
			}
		},
		//input的内容发生变化触发
		inputFun(e){
			this.inputValue.length == 0 ? this.showDeletd = false : this.showDeletd = true;
		},
		//点击 X 清空输入框的数据
		deleteValue(){
			this.inputValue = "";
			this.showDeletd = false;
		},
		//点击搜索触发
		confirm(e){
			if(this.inputValue.leng != 0){
				console.log(e.target.value)
				uni.hideKeyboard();//隐藏软键盘
			}
		},
		//获取地址经纬度
		getLocationFun(site){
			uni.request({
			    url: 'http://restapi.amap.com/v3/geocode/geo', //仅为示例，并非真实接口地址。
			    data: {
			        key: '698bd4e0ca6ef47bd4f84da21cc4d8fd',
					s:'rsv3',
					city:35,
					address:site
			    },
			    header: {
			        
			    },
			    success: (res) => {
					var locations = res.data.geocodes[0].location
					var longitude = locations.match(/(\S*),/)[1] //经度
					var latitude = locations.match(/,(\S*)/)[1] 	//纬度
					this.toMapAPP(longitude,latitude,site)
			    }
			});
		},
		//调起高德并定位
		toMapAPP(longitude,latitude,name){
			let url = "";
			if (plus.os.name == "Android") {//判断是安卓端
				plus.nativeUI.actionSheet({//选择菜单
					title: "选择地图应用",
					cancel: "取消",
					buttons: [{title: "腾讯地图"},{title: "百度地图"}, {title: "高德地图"}]
				}, function(e) {
					switch (e.index) {
						//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
						case 1:
							//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
							url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
							break;
						case 2:
							url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
							break;
						case 3:
							url = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
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
					buttons: [{title: "腾讯地图"},{title: "百度地图"}, {title: "高德地图"}]
				}, function(e) {
					switch (e.index) {
						case 1:
							url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
							break;
						case 2:
							url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
							break;
						case 3:
							url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
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
		}
		
	},
	
	created() {
		
	},
	mounted() {
		setTimeout(res=>{
				uni.createSelectorQuery().in(this).select('.titleBox').boundingClientRect(data => {
				this.topGapHeight = data.height
				// console.log(this.topGapHeight)
			}).exec();
		});
		
		
		
	},
	watch:{
		
	}
	
	
	
};
</script>

<style lang="scss">

.containerBox {
	font-size: 14px;
	line-height: 24px;
	// height: 100%;
	position: relative;
	padding-bottom: 20upx;
	.titleBox {
		padding: 0 2%;
		padding-top:100upx ;
		width: 96%;
		color: #282828;
		position: fixed;
		background: #FFFFFF;
		z-index: 399;
		display: flex;
		align-items: center;
		.imgBox{
			width: 50upx;
			height: 40upx;
			margin-right:20upx ;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.inputBox{
			width: 100%;
			background: #E8E8E8;
			border-radius: 30px;
			height: 64upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.centerBox{
				display: flex;
				align-items: center;
				// justify-content: space-between;
				color: #a9a9a9;
				width: 75%;
				image{
					width: 32upx;
					height: 32upx;
					margin-right:16upx;
				}
			}
		}	
	}
	
	.contentBox{
		padding-top: 200upx;
		.orderListBox{
			.outerListBox{
				padding: 20upx 2%;
				.topBox{
					display: flex;
					justify-content: space-between;
					padding-bottom: 40upx;
					.endTime{
						color: #EC7171;
					}
				}
				.centerBox{
					.listBox{
						display: flex;
						padding-bottom: 20upx;
						.leftBox{
							width: 30%;
							color: #878BA1;
						}
						.rightBox{
							width: 70%;
							color: #282828;
						}
					}
				}
				.bottomBox{
					display: flex;
					justify-content: flex-end;
					.buttonBox{
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
