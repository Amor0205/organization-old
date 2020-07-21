<template>
	<view class="container">
		<view class="topBox">
			<view >
				{{ userInfo.name }}
			</view>
			<view class="ageBox">
				{{ userInfo.age }}岁
			</view>
		</view>
		<view class="centerBox">
			<view class="listBox">
				<view class="title">血压</view>
				<view class="result">{{ userInfo.bloodPressure }}</view>
			</view>
			<view class="listBox">
				<view class="title">血氧</view>
				<view class="result">{{ userInfo.bloodOxygen }}</view>
			</view>
			<view class="listBox">
				<view class="title">血糖</view>
				<view class="result">{{ userInfo.bloodGlucose }}</view>
			</view>
			<view class="listBox">
				<view class="title">体重</view>
				<view class="result">{{ userInfo.weight }}</view>
			</view>
			<view class="listBox">
				<view class="title">心率</view>
				<view class="result">{{ userInfo.heartRate }}</view>
			</view>
		</view>
		<view class="bottomBox">
			<view class="title">
				体检结论
			</view>
			<view class="conclusion">
				{{ userInfo.conclusion }}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					name:'萧蔷',
					age:23,
					bloodPressure:'120mmHg,80mmHg',
					bloodOxygen:'98%',
					bloodGlucose:'5.0 mmol/L',
					weight:'54kg',
					heartRate:'62bpm',
					conclusion:'jio盆里钓鱼和路过的喵咪发生争执,然后没打过被喵咪胖揍一顿而引起的软组织挫伤'
				}
			}
		},
		methods: {
			
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.topBox{
			height: 300upx;
			color: #282828;
			font-size: 40upx;
			font-weight: bold;
			flex-direction: column;
			display: flex;
			justify-content: center;
			align-items: center;
			.ageBox{
				margin-top:10upx;
				font-size:14px;
			}
		}
		.centerBox{
			.listBox{
				display: flex;
				margin-bottom: 40upx;
				.title{
					color: #878BA1;
					margin-right: 100upx;
				}
				.result{
					color: #282828;
				}
			}
		}
		.bottomBox{
			.title{
				color: #282828;
				font-size: 32upx;
				font-weight: bold;
				padding: 20upx 0;
			}
			.conclusion{
				color: #666;
			}
		}
	}
</style>
