<template>
	<view class="containerBox" >
		<view class="titleBox">
			<view class="inputBox">
				<view class="centerBox">
					<text>请输入你想搜索的内容</text>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
export default {
	//获取到顶部高度数据
	props:['scrollTopChild'],
	data() {
		return {
			scrollTopMsg:0,			//据顶部高度
			commonColor: '',		//全局颜色
			bottomControl:true,		//顶部控件 负责切换底部结算/删除控件
			checkAll: false,		//是否选中全选
			commodityListHeight: 0, //商品容器高度
			favoriteList:[],		//收藏夹列表
			
		};
	},
	
	computed:{
		
		
	},
	watch:{
		
	},
	methods: {
		
	},
	
	created() {
		
		
		
	},
	
	mounted() {
		
	}
	
	
	
};
</script>

<style lang="scss">
.containerBox {
	font-size: 14px;
	line-height: 24px;
	// height: 100%;
	position: relative;
	
	.titleBox {
		padding: 0 2%;
		padding-top:100upx ;
		height: 80upx;
		color: #282828;
		background: #FFE300;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.inputBox{
			background: #E8E8E8;
			.centerBox{
				
			}
		}
	}
	
	
}
</style>
