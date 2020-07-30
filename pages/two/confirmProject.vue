<template>
	<view class="container">
		 <view class="content">
		        <view>{{nums}}</view>
		        <view>{{minute}}</view>
		        <view>{{numss}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nums:'',
				minute:'',
				numss:''
			}
		},
		methods: {
			
		},
		created() {
			
		},
		mounted() {
			
		},
		onLoad() {
			var hour, minute, second; /*时 分 秒*/
			            hour = minute = second = 0; //初始化
			            var millisecond = 0; //毫秒
			            this.timer = setInterval(() => {
			                millisecond = millisecond + 50;
			                // console.log("---millisecond----"+millisecond);
			                if (millisecond >= 1000) {
			                    millisecond = 0;
			                    second = second + 1;
			                }
			                if (second >= 60) {
			                    second = 0;
			                    minute = minute + 1;
			                }
			 
			                if (minute >= 60) {
			                    minute = 0;
			                    hour = hour + 1;
			                }
			              
							this.nums = hour+'时'+minute+'分'+second+'秒';
			                this.numss = hour+'时';
							this.minute=minute+'分'
			            }, 50);
			}
		
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
