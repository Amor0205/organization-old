<template>
	<view class="container">
		<view class="box" v-for="(item,index) in footerBarData" :key='index' @click="active(item.number)">
			<view class="imgBox" :class="item.number == activeClass ? 'active' : '' ">
				<view  :class="item.number == activeClass ? 'imgActive' : ''">
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
						name:'家人',
						number:'0',
						normalImg:'../../static/imgs/jiaren_n@2x.png',
						activeImg:'../../static/imgs/jiaren@2x.png'
					},
					live:{
						name:'生活服务',
						number:'1',
						normalImg:'../../static/imgs/shenghuofuwu_n@2x.png',
						activeImg:'../../static/imgs/shenghuofuwu@2x.png'
					},
					shopCar:{
						name:'购物车',
						number:'2',
						normalImg:'../../static/imgs/gouwu_n@2x.png',
						activeImg:'../../static/imgs/gouwu@2x.png'
					},
					main:{
						name:'我的',
						number:'3',
						normalImg:'../../static/imgs/wode_n@2x.png',
						activeImg:'../../static/imgs/wode@2x.png'
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
		box-shadow: 0upx -15upx 18upx -12upx rgba(0,0,0,0.2);
		// color: #2B2B33 !important;
		color:#DD524D !important;
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
		box-shadow: 0upx -5upx 10upx rgba(0,0,0,0.2);
		background: #FFFFFF;
		.box{
			// height: 80upx;
			// width: 100upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.imgBox{
				height: 90upx;
				width: 90upx;
				position: absolute;
				top: -10upx;
				border-radius: 50% 50% 0 0;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				
				image{
					object-fit: contain;
					width: 40upx;
					height: 40upx;
					// background: #336;
					display: flex;
					margin-bottom: 4upx;
				}
			
				
			}
			.nameBox{
				width: 100upx;
				position: absolute;
				display: flex;
				justify-content: center;
				top: 76upx;
				color: #666666;
				background: #FFF;
			}
			
		}
	}
	
</style>
