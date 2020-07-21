<template>
	<view class="container">
		<!-- 广告 -->
		<view class="bannerBox">
			<image src="../../../static/imgs/banner.png" mode=""></image>
		</view>
		<!-- 弹出层 -->
		<u-select @click="show = true" :default-value="defaultValue" :list="list" title="循环方式" mode="single-column" v-model="show"  @confirm="confirm"></u-select>
		<!-- 提醒内容 -->
		<view class="remindRecordBox" v-for="(item,index) in remindList" :key="index">
			<view class="remindTypeBox">
				<view class="leftBox">
					{{ item.remindType }}
				</view>
				<view class="rightBox" @click="deleteFun(item,index)">
					删除
				</view>
			</view>
			<view class="circulationWay">
				<view class="titleBox">
					循环方式
				</view>

				<view class="contentBox"  @click="showPopup(index)">
					<view class="leftBox">
						{{ item.circulationWay }}
					</view>
					<view class="rightBox">
						<image src="../../../static/imgs/arrows_r@2x.png" style="width: 10upx;height: 20upx;" mode=""></image>
					</view>
				</view>
				<!-- </view> -->
			</view>
			<view class="remindTime">
				<view class="titleBox">
					提醒时间
				</view>
				<view class="timeBox">
					<view style="margin-right: 30upx;" v-for="(item1,index1) in item.remindTime" :key='index1'>
						{{ item1 }}
					</view>
				</view>
			</view>
			<view class="remindContet">
				<view class="titleBox">
					提醒时间
				</view>
				<view class="contentBox">
					{{ item.remindContet }}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,		//popup 显隐控件
				defaultValue: [1],		//select 默认选中项 （index）
				maskc_lose_able:false,		//是否允许点击屏幕关闭 popup
				circulationWayIndex:'',		//提醒列表index 循环方式
				list: [
					{
						value: '1',
						label: '单次提醒'
					},
					{
						value: '2',
						label: '每天一次'
					},
					{
						value: '3',
						label: '每周一次'
					},
					{
						value: '4',
						label: '每月一次'
					}
				],
				remindList:[
					{
						remindType:'服药提醒',
						circulationWay:'单次提醒',
						remindTime:["08:00","18:00","20:00"],
						remindContet:'老爸，饭后记得按时吃药！不要吃辛辣油腻的东西，少吃含糖量高的东西，多吃水果（香蕉除外，香蕉含果糖含量太高'
					},
					{
						remindType:'玩耍提醒',
						circulationWay:'单次提醒',
						remindTime:["08:00","18:00","20:00"],
						remindContet:'老爸，饭后记得按时吃药！空间的空间还撤回了较大和厂家年华快乐才喜欢卡是拉回家了可'
					},
					{
						remindType:'运动提醒',
						circulationWay:'单次提醒',
						remindTime:["08:00","18:00","20:00"],
						remindContet:'老爸，饭后记得按时吃药！空间的空间还撤回了较大和厂家年华快乐才喜欢卡是拉回家了可'
					}
				]
				
			}
		},
		computed:{
			
		},
		methods: {
			deleteFun(item,index){
				let that = this
				uni.showModal({
					title:'确定取消该提醒？',
					success: function (res) {
						if (res.confirm) {
							// 用户点击确定
							console.log(item,index)
							that.remindList = that.remindList.filter((item1,index1)=>{
								return index != index1
							})
						} else if (res.cancel) {
							// 用户点击取消
						}
					}
				})
			},
			//更改循环方式
			confirm(res) {
				var index = this.circulationWayIndex ;
				this.remindList[index].circulationWay = res[0].label
			},
			//控制显隐  保存点击列表的index
			showPopup(index){
				this.show = !this.show;
				this.circulationWayIndex = index;
			}
		},
		onNavigationBarButtonTap(res){
			// console.log(res)
			uni.navigateTo({
				url:'./addNotification'
			})
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20upx;
		font-size: 14px;
		// line-height: 24px;
		.bannerBox{
			height: 266upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.remindRecordBox{
			padding: 32upx 0;
			.titleBox{
				color: #878BA1;
				font-size: 12px;
				padding: 10upx 0;
			}
			.remindTypeBox{
				display: flex;
				justify-content: space-between;
				padding-bottom: 30upx;
				.leftBox{
					color: #282828;
					font-size: 15px;
					font-weight: bold;
				}
				.rightBox{
					padding: 2upx 20upx;
					background-color: #EC7171;
					color: #FFFFFF;
					border-radius: 40upx;
				}
			}
			.circulationWay{
				padding-bottom: 30upx;
				.contentBox{
					padding: 0 !important;
					color: #666;
					display: flex;
					justify-content: space-between;
				}
			}
			.remindTime{
				padding-bottom: 30upx;
				.timeBox{
					color: #666;
					display: flex;
				}
			}
			.remindContet{
				.contentBox{
					color: #666;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:3;
					overflow:hidden;
				}
			}
		}
	}
</style>
