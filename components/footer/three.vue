<template>
	<view class="containerBox" >
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
						<image src="../../static/imgs/xx.png" style="width: 14upx;height: 10upx;margin-left: 4upx;" mode=""></image>
					</view>
					<view class="rightBox">
						西城社区
					</view>
				</view>

				<view class="bottomBox" v-show="popupShow">
					<text class="title">
						城区筛选
					</text>
				</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="orderListBox" v-for="(item,index) in orderList" :key='index'>
				<u-gap height="16" bg-color="#bbb"></u-gap>
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
						<view class="rightBox">{{ item.remark }}</view>
					</view>
					<view class="listBox">
						<view class="leftBox">服务约定地址</view>
						<view class="rightBox">{{ item.serviceSite }}</view>
					</view>
					
				</view>
				<view class="bottomBox">
					
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
export default {
	//获取到顶部高度数据
	props:['scrollTopChild'],
	data() {
		return {
			scrollTopMsg:0,			//据顶部高度
			commonColor: '',		//全局颜色
			popupShow:false,		//
			orderList:[
				{
					orderNumber:'DABH23244743442342',
					endTime:1,
					object:'萧蔷',
					appointTime:'2020年02月02日 23:22',
					project:'推拿',
					remark:'请准时到',
					serviceSite:"四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				},{
					orderNumber:'DABH23244743442342',
					endTime:1,
					object:'萧蔷',
					appointTime:'2020年02月02日 23:22',
					project:'推拿',
					remark:'请准时到',
					serviceSite:"四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				},{
					orderNumber:'DABH23244743442342',
					endTime:1,
					object:'萧蔷',
					appointTime:'2020年02月02日 23:22',
					project:'推拿',
					remark:'请准时到',
					serviceSite:"四川省眉山市彭山区凤鸣镇丽景苑二栋二单元2204"
				},
			]
		};
	},
	
	computed:{
		
		
	},
	watch:{
		
	},
	methods: {
		goToPage(e){
			switch (e){
				case 'search':
					// uni.navigateTo({
					// 	url:'../../pages/three/search'
					// })
					break;
				default:
					break;
			}
		},
		//控制popup的显示
		showPopup(){
			this.popupShow = !this.popupShow
		}
		
	},
	
	created() {
		
		
		
	},
	
	mounted() {
		
	}
	
	
	
};
</script>

<style lang="scss">
.containerBox {
	font-size: 14px;
	line-height: 24px;
	// height: 100%;
	position: relative;
	background-color: #9d9d9d;
	.titleBox {
		padding: 0 2%;
		padding-top:100upx ;
		// height: 80upx;
		color: #282828;
		// background: #FFE300;
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
				color: #a9a9a9;
				image{
					width: 32upx;
					height: 32upx;
					margin-right:16upx;
				}
			}
		}
		.controlBox{
			.topBox{
				margin-top: 40upx;
				padding-bottom:20upx ;
				display: flex;
				justify-content: space-between;
				.leftBox{
					display: flex;
					align-items: center;
				}
				.rightBox{
					color: #4d4d4d;
				}
			}
			
		}
		
		
	}
	
	.contentBox{
		.orderListBox{
			
		}
	}
}
</style>
