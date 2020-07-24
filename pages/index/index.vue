
  <!-- 首页 -->
<template>
	<view class="container" :style="{ height:containerHeight + 'px' }" >
		<one v-if="actives == 0" class="moduleBox" :SelectFamily = 'familyInfo' ></one>
		<two v-if="actives == 1" class="moduleBox" ></two>
		<three v-if="actives == 2" class="moduleBox" :scrollTopChild='scrollTopData' ></three>
		<mine v-if="actives == 3" class="moduleBox" :scrollTopChild='scrollTopData'></mine>
		
		<footerBar ref='footerBar' class='footerBar' @childActive = "activeData"></footerBar>
	</view>
</template>

<script>
import one from '../../components/footer/one.vue'					//引入组件 one
import two from '../../components/footer/two.vue'					//引入组件 two
import three from '../../components/footer/three.vue'				//引入组件 three
import mine from '../../components/footer/mine.vue'					//引入我的航组件 mine
import footerBar from '../../components/footer/footerBar.vue'		//引入底部导航组件 footerBar


// var src = 'https://cdn.staticfile.org/eruda/1.5.8/eruda.min.js';
// var script = document.createElement('script');
// script.setAttribute('src', src);
// document.body.appendChild(script);
// script.onload = function () {
// 	eruda.init()
// }


	export default {
		data() {
			return{
				actives:0,				//默认激活类为0 及的一项
				containerHeight:0,		//window高度
				scrollTopData:0,		//据顶部高度
				userInfo:'',			//用户信息
				familyInfo:'',			//家人信息		
			}
		},
		components:{
			footerBar,
			one,
			three,
			two,
			mine
		},
		methods: {
			//切换页面内容
			activeData(num){
				this.actives = num;
			}
		},
		
		onLoad() {
			if( uni.getStorageSync('token').length == 0 ){
				uni.navigateTo({
					url: '../login/login'
				})
			}
			//获取用户信息
			this.userInfo = uni.getStorageSync('userInfo');
		},
		onShow() {
			var selectF = uni.getStorageSync('selectFamily')
			//默认展示登录用户信息  选择后使用选中用户信息
			if(selectF.length == 0){
				this.familyInfo = this.userInfo;
				// console.log(this.familyInfo)
			}else{
				this.familyInfo = selectF;
				// console.log(this.familyInfo)
			}
		},
		created() {
			
		},
		mounted() {
			//保存footerBar元素高度
			// uni.setStorageSync('footerBarHeight',this.$refs.footerBar.$el.clientHeight)
			
		　　uni.createSelectorQuery().in(this).select('.footerBar').boundingClientRect(res => {
				uni.setStorageSync('footerBarHeight',res.height)
		　　}).exec()
			
			// 获取设备信息
			uni.getSystemInfo({
				success:(res)=>{
					// 获取设备可使用高度(res.windowHeight)
					this.containerHeight = res.windowHeight - uni.getStorageSync('footerBarHeight');
					// console.log(res.windowHeight)
				}
			})
			
			
		},
		onPageScroll(e) {
			this.scrollTopData = e.scrollTop;
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0;
		margin: 0;
		.moduleBox{
			// padding-top: 100upx;
		}
	}
	/* #ifdef APP-PLUS */
	
	/* #endif */
	
</style>
