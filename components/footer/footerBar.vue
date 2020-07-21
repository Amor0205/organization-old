<template>
	<view class="container">
		<view class="box" v-for="(item,index) in footerBarData" :key='index' @click="active(item.number)">
			<view class="imgBox" :class="item.number == activeClass ? 'active' : '' ">
				<!-- <view  :class="item.number == activeClass ? 'imgActive' : ''"> -->
				<view >
					<image :src=" item.number == activeClass ? item.activeImg : item.normalImg " mode=""></image>	
				</view>
			</view>
			<view class="nameBox" :class="item.number == activeClass ? 'active' : '' " style="box-shadow:none">
				{{ item.name }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeClass:0, 		//激活类默认为0
				footerBarData:{
					family:{
						name:'待开始订单',
						number:'0',
						normalImg:'../../static/imgs/activity.png',
						activeImg:'../../static/imgs/activity_fill.png'
					},
					live:{
						name:'进行中订单',
						number:'1',
						normalImg:'../../static/imgs/order.png',
						activeImg:'../../static/imgs/order_fill.png'
					},
					shopCar:{
						name:'已完成订单',
						number:'2',
						normalImg:'../../static/imgs/task.png',
						activeImg:'../../static/imgs/task_fill.png'
					},
					main:{
						name:'我的',
						number:'3',
						normalImg:'../../static/imgs/people.png',
						activeImg:'../../static/imgs/people_fill.png'
					},
				}
			};
		},
		computed:{
			
		},
		methods: {
			//切换激活类
			active(Num){
				this.activeClass = Num;
				
				//传值给父组件
				this.$emit("childActive",Num)
			}
		},
		created() {
			
		},
		mounted() {
			
		}
		
	}
</script>

<style lang="scss">
	//激活样式
	.active{
		// box-shadow: 0upx -15upx 18upx -12upx rgba(0,0,0,0.2);
		// color: #2B2B33 !important;
		color:#000 !important;
		background:#FFFFFF;
	}
	.imgActive{
		width: 70upx;
		height: 70upx;
		background:#FFE300;
		display: flex;
		justify-content: center;
		
		align-items: center;
		position: absolute;
		top: 10upx;
		border-radius: 50%;
	}
	.container{
		height: 140upx;
		width: 100%;
		font-size: 24upx;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0upx -5upx 10upx rgba(0,0,0,0.2);
		background: #FFFFFF;
		.box{
			height: 100upx;
			// width: 100upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.imgBox{
				// position: absolute;
				// top: -10upx;
				// border-radius: 50% 50% 0 0;
				height: 60upx;
				width: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image{
					object-fit: contain;
					width: 40upx;
					height: 40upx;
					// background: #336;
					display: flex;
				}
			
				
			}
			.nameBox{
				// position: absolute;
				// top: 76upx;
				// width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				color: #666666;
				background: #FFF;
			}
			
		}
	}
	
</style>
