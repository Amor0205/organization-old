<template>
	<view class="container">
		<view class="contentBox">
			<view class="imgBox">
				<image src="../../static/imgs/tea.png" mode=""></image>
			</view>
			<view class="title">
				<!-- 功能待开发中。。。 -->
				{{ title }}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'功能待开发中',
				setInter:null
			}
		},
		methods: {
			timer(){
				var i = 4;
				const updateTime = () => {
					// console.log(i)
					if(i>0){
						this.title += '。';
					}else if(i==0){
						this.title = '功能待开发中';
						i = 4;
					}
					i--;
				};
				this.setInter = setInterval(updateTime,600);
			}
		},
		created() {
			
		},
		mounted() {
			this.timer()
		},
		onUnload(){
			if(this.setInter){
				clearInterval(this.setInter)
				this.setInter = null;
			}
		},
		onHide() {
			// clearInterval(this.timer())
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		line-height: 24px;
		z-index: 999;
		background: #fff;
		.contentBox{
			padding-top:40% ;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.imgBox{
				width: 200upx;
				height: 200upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				// padding: 20upx 0 0 50upx;
				width: 50%;
				padding-top: 20upx;
				margin-left: 20%;
				font-size: 18px;
				font-weight: bold;
				color: #4f4f4f;
			}
		}	
	}
</style>
