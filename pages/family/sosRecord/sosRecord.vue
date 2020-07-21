<template>
	<view class="container">
		<view class="soslistBox" v-for="(item,index) in sosLsit" :key='index'>
			<view class="soslist">
				<view class="leftBox">求助人姓名</view>
				<view class="rightBox">{{ item.alarmName }}</view>
			</view>
			<view class="soslist">
				<view class="leftBox">SOS发起时间</view>
				<view class="rightBox">{{ item.createTime }}</view>
			</view>
			<view class="soslist">
				<view class="leftBox">处理完成时间</view>
				<view class="rightBox">{{ item.updateTime }}</view>
			</view>
			<view class="soslist">
				<view class="leftBox">求助方式</view>
				<view class="rightBox">{{ item.alarmType }}</view>
			</view>
			<view class="soslist">
				<view class="leftBox">处理方式</view>
				<view class="rightBox">{{ item.treatment }}</view>
			</view>
			<view class="soslist">
				<view class="leftBox">处理人</view>
				<view class="rightBox">{{ item.handler }}</view>
			</view>
			<view class="soslist">
				<view class="leftBox">备注</view>
				<view class="rightBox">{{ item.bz }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { get_sos_list } from '../../../src/ajax.js'
	export default {
		data() {
			return {
				userInfo:'',
				sosLsit:[
					// {
					// 	name:'萧蔷',
					// 	startingTime:'2020年02月02日  23:18',
					// 	terminalTime :'2020年02月02日 05:23',
					// 	seekHelpWay:'手环报警',
					// 	salvationWay:'人员上门',
					// 	handler:'乐山市养老院/理疗师/王衣衣',
					// 	serviceProject:'医院陪护'
					// }
				]
			}
		},
		methods: {
			//处理时间
			disposeTime(list){
				for (let i in list) {
					this.sosLsit[i].createTime = this.sosLsit[i].createTime.substring(0,19).replace('T',' ');
					this.sosLsit[i].updateTime = this.sosLsit[i].updateTime.substring(0,19).replace('T',' ');
				}
			}
		},
		created() {
			// this.userInfo = uni.getStorageSync('userInfo')
			// console.log(this.userInfo)
			
			//请求 -- 获取sos记录列表
			get_sos_list(
				15892716645
			).then(res=>{
				console.log(res)
				if(res.data){
					this.sosLsit = res.data
					this.disposeTime(this.sosLsit)
				}else{
					uni.showToast({
						icon:"none",
						title:res.data.message
					})
				}
				
			})
		},
		mounted() {
			
			
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.soslistBox{
			margin-bottom: 40upx;
			.soslist{
				display: flex;
				padding: 16upx 0;
				.leftBox{
					color: #878BA1;
					width: 35%;
				}
				.rightBox{
					
				}
			}
			
		}
	}
</style>
