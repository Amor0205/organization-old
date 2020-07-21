<!-- 设备管理 -->
<template>
	<view>
		<view class="box">
			<view class="device" v-for="(item,index) in device" :key='index' @click="devices(item.id)">
					<view class="imgs">
						<image :src="item.imgs" mode="" :style="item.style"></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				device: [{
					id:1,
					imgs: '../../../static/imgs/zhinengshouhuan.png',
					name: '手环设备管理',
					style: {
						width: '50rpx',
						height: '64rpx',
					}
				}, {
					id:2,
					imgs: '../../../static/imgs/luyouqi.png',
					name: '网关设备管理',
					style: {
						width: '62rpx',
						height: '64rpx',

					}
				}, {
					id:3,
					imgs: '../../../static/imgs/xiangquanjiance.png',
					name: '环境监测设备管理',
					style: {
						width: '64rpx',
						height: '42rpx',
						margin:'12rpx 0'
					}
				}, {
					id:4,
					imgs: '../../../static/imgs/shebeiguanli.png',
					name: '监控设备管理',
					style: {
						width: '64rpx',
						height: '64rpx',

					}
				}]
			}
		},
		methods: {
		devices(res){
			uni.navigateTo({
				url:'./deviceDetails?id='+res
			})
		}
		},
		mounted() {

		},
		onLoad() {

		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 500rpx;

		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 86rpx;
		
	}

	.device {
		width: 218rpx;
		height: 218rpx;
		margin-bottom: 40rpx;
		
	}

	.imgs {
		
		text-align: center;
		margin-top: 50rpx;
		
	}

	.name {
		font-size: 24rpx;
		color: #878BA1;
		text-align: center;
		margin-top: 20rpx;
		
	
	}
</style>
