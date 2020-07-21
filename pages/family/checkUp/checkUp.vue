<template>
	<view class="container">
		<view class="checkupListBox">
			<view class="checkupList" v-for="(item,index) in this.checkupList" :key='index'>
				<!-- title -->
				<view class="titleBox">
					<view class="titleLeftBox">
						<view class="imgBox">
							<image src="../../../static/imgs/hospital.png" mode=""></image>
						</view>
						<view class="hospitalName">
							{{ item.checkupHospital }}
						</view>
					</view>
					<view class="titleRightBox">
						{{ item.checkupDate }}
					</view>
				</view>
				<!-- content -->
				<view class="contentBox">
					<view class="contentTop">
						<view class="userInfo">
							姓名 <text class="textBox"> {{ item.userNmae }} </text>
						</view>
						<view class="userInfo">
							年龄 &nbsp;<text class="textBox"> {{ item.age }}岁 </text>
						</view>
					</view>
					<view class="contentMain">
						体检结论：{{ item.conclusion }}
					</view>
				</view>
				<view class="bottomControl" @click="goToPage(item.userId)">
					<view class="leftBox">
						查看详情
					</view>
					<image style="width:10upx;height: 20upx;" src="../../../static/imgs/arrows_r@2x.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkupList:[
					{	
						userId:1,
						checkupHospital:'中桥医院',
						checkupDate:'2020年5月8日',
						userNmae:'萧蔷',
						age:23,
						conclusion:'胡豆吃多导致胃部胀气,排除病理性胃胀气和肝腹水的可能,嘱咐：下次少吃点胡豆'
					},
					{	
						userId:2,
						checkupHospital:'中桥医院',
						checkupDate:'2020年5月8日',
						userNmae:'萧蔷',
						age:23,
						conclusion:'胡豆吃多导致胃部胀气,排除病理性胃胀气和肝腹水的可能,嘱咐：下次少吃点胡豆'
					},
					{	
						userId:3,
						checkupHospital:'中桥医院',
						checkupDate:'2020年5月8日',
						userNmae:'萧蔷',
						age:23,
						conclusion:'胡豆吃多导致胃部胀气,排除病理性胃胀气和肝腹水的可能,嘱咐：下次少吃点胡豆'
					},
					{	
						userId:4,
						checkupHospital:'成都第四精神病医院',
						checkupDate:'2020年6月22日',
						userNmae:'李忠恒',
						age:25,
						conclusion:'jio盆里钓鱼和路过的喵咪发生争执,然后没打过被喵咪胖揍一顿而引起的软组织挫伤'
					}
				]
			}
		},
		methods: {
			goToPage(res){
				uni.navigateTo({
					url:'./checkupDetail?id=' + res
				})
			}
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 14px;
		line-height: 24px;
		.checkupListBox{
			.checkupList{
				padding: 32upx 22upx;
				.titleBox{
					display: flex;
					justify-content: space-between;
					.titleLeftBox{
						display: flex;
						.hospitalName{
							color: #282828;
						}
						.imgBox{
							width: 44upx;
							height: 44upx;
							margin-right: 10upx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
					.titleRightBox{
						color: #878BA1;
					}
				}
				
				.contentBox{
					.contentTop{
						color: #666666;
						display: flex;
						margin-top: 40upx;
						.userInfo{
							margin-right: 60upx;
							.textBox{
								color: #282828;
								font-weight: bold;
								font-size: 32upx;
								margin-left: 10upx;
							}
						}
						
					}
					.contentMain{
						color: #878BA1;
						margin: 20upx 0upx 40upx 0upx;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:3;
						overflow:hidden;
					}
				}
				
				.bottomControl{
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
