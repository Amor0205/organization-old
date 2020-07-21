<template>
	<view class="container">
		<view class="gap"></view>
		<!-- 提醒类型弹框 -->
		<u-select :default-value="defaultValue" :list="remindList" title="选择提醒类型" mode="single-column" v-model="show"  @confirm="remindTypeFun"></u-select>
		
		<!-- 提醒类型 -->
		<view class="remindType" @click="showPopup('show')">
			<!-- 弹出层 -->
			<view class="leftBox">
				{{ remindType }}
			</view>
			<view class="rightBox">
				<image src="../../../static/imgs/arrows_r@2x.png" style="width: 10upx;height: 20upx;" mode=""></image>
			</view>
		</view>
		<view class="gap"></view>
		
		<!-- 循环方式 -->
		<view class="repititionWay">
			<view class="titleBox">
				请选择重复方式
			</view>
			<view class="repititionWayListBox" >
				<view class="repititionWayList" @click="selectTime(index)" :class="item.value == true ? 'active' : '' " v-for="(item,index) in repetitionWayList" :key='index' >
					{{ item.label }}
				</view>
			</view>
			<view class="gap"></view>
		</view>
		
		<!-- 提醒时间弹出层 -->
		<!-- <u-select :default-value="defaultValue" :list="remindList" title="选择提醒类型" mode="single-column" v-model="show"  @confirm="remindTypeFun"></u-select> -->
		<u-picker mode="time" v-model="showTime" :params="params" @confirm="remindTimeFun" title='选择提醒时间'></u-picker>
		
		<!-- 提醒时间 -->
		<view class="remindTime" @click="showPopup('showTime')">
			<!-- 弹出层 -->
			<view class="leftBox">
				{{ remindTime }}
			</view>
			<view class="rightBox">
				<image src="../../../static/imgs/arrows_r@2x.png" style="width: 10upx;height: 20upx;" mode=""></image>
			</view>
		</view>
		<view class="gap"></view>
		
		<!-- 提醒内容 -->
		<view class="remindContentBox">
			<view class="titleBox">
				提醒内容
			</view>
			<view class="contentBox">
				<textarea v-model="remindContent" value="" placeholder="请点击并输入提醒内容" style=" width: 100%; " />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,		//控制
				showTime:false,		//控制时间弹出层
				popupFlag:'',			//popup 编号
				defaultValue: [1],		//select 默认选中项 （index）
				maskc_lose_able:false,		//是否允许点击屏幕关闭 popup
				remindType:'服药提醒',		//提醒类型
				remindTime:'中午 12:00',		//提醒时间
				remindContent:'',		//提醒内容
				remindList: [
					{
						value: false,
						label: '散步提醒'
					},
					{
						value: '2',
						label: '服药提醒'
					},
					{
						value: '3',
						label: '运动提醒'
					},
					{
						value: '4',
						label: '休息提醒'
					},
					{
						value: '5',
						label: '其他提醒'
					}
				],
				
				repetitionWayList:[
					{
						value: true,
						label: '一'
					},
					{
						value: true,
						label: '二'
					},
					{
						value: true,
						label: '三'
					},
					{
						value: true,
						label: '四'
					},
					{
						value: false,
						label: '五'
					},
					{
						value: false,
						label: '六'
					},
					{
						value: false,
						label: '日'
					}
				],
				
				params: {
					year: false,
					month: false,
					day: false,
					hour: true,
					minute: true,
					second: false
				},
			}
		},
		methods: {
			//控制popup的显隐
			showPopup(res){
				this.popupFlag = res
				if(this.popupFlag == "show"){
					this.show = !this.show;
				}else if(this.popupFlag == "showTime"){
					this.showTime = !this.showTime
				}
				
			},
			
			//提醒类型回调
			remindTypeFun(res){
				this.remindType = res[0].label
			},
			
			// 提醒时间回调
			remindTimeFun(res){
				var section = '';		//时间区间（上午，中午，下午）
				var Hour = parseInt(res.hour);	//时间 小时
				
				if(Hour > 2 && Hour < 5 ){
					section = '凌晨'
				}else if( Hour >= 5 && Hour < 8  ){
					section = '早晨'
				}else if( Hour >= 8 && Hour < 12  ){
					section = '上午'
				}else if( Hour >= 12 && Hour < 14  ){
					section = '中午'
				}else if( Hour >= 14 && Hour < 18  ){
					section = '下午'
				}else if( Hour >= 18 && Hour < 22  ){
					section = '晚上'
				}else if( Hour >= 22 && Hour <= 24 || Hour <= 2 ){
					section = '深夜'
				}
			
				this.remindTime = section + " " + res.hour + ":" + res.minute
			},
			
			//选择循环时间
			selectTime(index){
				this.repetitionWayList[index].value = this.repetitionWayList[index].value == true ? false : true ; 
			},
			
			
		},
		onNavigationBarButtonTap(res){
			console.log(res)
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	// 间隔行
	.gap{
		height: 20upx;
		background: #f9f9f9;
	}
	// 时间激活类
	.active{
		background: #FF9500 !important;
	}
	.container {
		font-size: 14px;
		line-height: 24px;
		.remindType{
			padding: 0 20upx;
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.repititionWay{
			padding: 20upx;
			.titleBox{
				font-size: 12px;
				color: #878BA1;
			}
			.repititionWayListBox{
				height: 120upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.repititionWayList{
					width: 60upx;
					height: 60upx;
					background: #E6E6E6;
					border-radius: 50%;
					display: flex;
					justify-content: space-around;
					align-items: center;
				}
			}
		}
		
		.remindTime{
			padding: 0 20upx;
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.remindContentBox{
			padding: 20upx;
			.titleBox{
				color: #282828;
				}
			.contentBox{
				min-height:300upx;
				padding: 20upx;
				background-color: #F9F9F9;
			}
		}
	}
	
</style>
