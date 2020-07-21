<template>
	<view>
		<view class="box">
			<view class="tips">
				请认真填写以下信息，以使平台更好的为您提供服务
			</view>
			<view class="party">
				<text style="margin-right: 40upx;">用户账号：</text>
				<input type="number" value="" v-model="phoneNum" placeholder="请输入用户电话号码" placeholder-style="font-size:12px;color:#878BA1;"/>
			</view>
			<view class="serial">
				<view class="identifier">
					<text style="margin-right: 40upx;">设备编号：</text>{{ devCode }}
				</view>
				<view class="img" @click="qrCode">
					<image src="../../../static/imgs/saoma.png" mode="" class="saoma"></image>
				</view>
			</view>

			<view class="birthday" @click="show = true">
				<view class="right">
					生日：
				</view>
				<view class="u-demo-area">
					<view class="xhibit">{{ input ? input : '点击选择日期' }}</view>
					<view class="" style="font-size: 28rpx;">
						<u-picker :mode="mode" :defaultTime="defaultTime" v-model="show" :params="params" @confirm="confirm" title="选择提醒时间"
						 cancel-color='#EC7171'></u-picker>
					</view>
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#878BA1" size="20"></u-icon>
				</view>


			</view>

			<view class="birthday">
				<view class="right">
					服务地址：
				</view>
				<view class="pickerAddress">
					<pickerAddress @change="change">{{ location ? location : '点击选择区域' }}</pickerAddress>
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#878BA1" size="20"></u-icon>
				</view>
			</view>
			<view class="explicit">
				<view class="">
					详细地址：
				</view>
				<u-input v-model="value" placeholder=''  input-align='center'  :placeholder='placeholder' />
			</view>
			<button type="default" class="button" @click="submit">提交信息</button>
		</view>
		<view>
		</view>
	</view>
</template>

<script>
	import pickerAddress from '../../../components/wangding-pickerAddress/wangding-pickerAddress.vue'
	import { diviceBind } from '../../../src/ajax.js'
	export default {
		name: "",
		components: {
			pickerAddress,
			diviceBind
		},
		props: {},
		data() {
			return {
				phoneNum:'',		//用户账号（电话号码）
				devCode:'',			//设备码
				input:'',			//时间
				location:'',		//地址
				value:'',			//详细地址
				
				params: {
					year: true,
					month: true,
					day: true,
					city: true,
					area: true,
					province: true,
					timestamp: true
				},
				show: false,
				shows: false,
				inputs: '',
				mode: 'time',
				mode1: 'region',
				defaultTime: '',		//弹框默认选中时间
				defaultSelector: [],		//弹框默认选中地址
				placeholder:'请输入详细地址'

			}
		},
		methods: {
			//点击扫描
			qrCode() {
				var _this = this
				uni.scanCode({
					success: function(res) {
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
						_this.devCode = res.result;
					}
				});

			},
			// 时间选择,回调参数为包含多个元素的数组，每个元素分别反应每一列的选择情况
			confirm(e) {
				console.log(e);
				this.input = '';
				this.inputs = '';
				if (this.mode == 'time') {
					if (this.params.year) this.input += e.year;
					if (this.params.month) this.input += '-' + e.month;
					if (this.params.day) this.input += '-' + e.day;
				} else if (this.mode1 == 'region') {
					this.inputs = e.province.label + '-' + e.city.label + '-' + e.area.label;
				}
				// Date.parse(new Date('2020/6/30') //转换成时间戳
			},

			change(data) {
				this.location = data.data.join('')
				console.log(data.data.join(''))
			},
			
			//提交数据
			submit(){
				diviceBind(
					this.phoneNum,
					this.devCode,
					this.location + this.value,
					this.input
				).then(res=>{
					console.log(res.data)
					if(res.data.code == 40001){
						uni.navigateTo({
							url:'../../login/login?tag=0'	//tag = 0 表示登录成功后返回上一级
						})
					}
					uni.showToast({
						icon:'none',
						title:res.data.message
					})
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
		padding: 0rpx 22rpx 0rpx 22rpx;

		.tips {
			font-size: 24rpx;
			color: #878BA1;
			margin-top: 78rpx;
		}

		.party {
			font-size: 28rpx;
			color: #878BA1;
			margin-top: 62rpx;
			display: flex;
			align-items: center;
		}

		.serial {
			margin-top: 62rpx;
			display: flex;
			justify-content: space-between;
			justify-items: center;

			.identifier {
				font-size: 28rpx;
				color: #878BA1;
			}

			.img {
				width: 32rpx;
				height: 28rpx;

				.saoma {
					width: 32rpx;
					height: 28rpx;
				}
			}
		}

		.birthday {
			margin-top: 74rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				font-size: 28rpx;
				color: #878BA1;
			}

			.icon {
				display: flex;
				align-items: center;
			}
		}

		.explicit {

			font-size: 28rpx;
			color: #878BA1;
			margin-top: 54rpx;
			display: flex;
			justify-items: center;
			align-items: center;
		}

		.button {
			width: 706rpx;
			height: 88rpx;
			background: #FFE300;
			border-radius: 40rpx;
			color: #282828;
			font-size: 28rpx;
			font-weight: 700;
			line-height: 88rpx;
			margin-top: 104rpx;
		}

		.xhibit {
			font-size: 28rpx;
			color: #878BA1;
		}

		.pickerAddress {
			font-size: 28rpx;
			color: #878BA1;
			align-items: center;
		}
			
	}
</style>
