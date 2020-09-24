
  <!-- 首页 -->
<template>
	<view class="container" :style="{ height:containerHeight + 'px' }" >
		<family v-if="actives == 0" class="moduleBox"  :SelectFamily = 'familyInfo' ></family>
		<live v-if="actives == 1" class="moduleBox" ref="two"></live>
		<shopCar v-if="actives == 2" class="moduleBox" :scrollTopChild='scrollTopData' :userInfoChild = 'userInfo' ></shopCar>
		<mine v-if="actives == 3" class="moduleBox" :userInfoChild = 'userInfo'></mine>
		
		<footerBar ref='footerBar' class='footerBar' @childActive = "activeData"></footerBar>
	</view>
</template>

<script>
import family from '../../components/footer/one.vue'				//引入家人组件 family
import live from '../../components/footer/two.vue'					//引入生活组件 live
import shopCar from '../../components/footer/three.vue'			//引入购物车组件 shopCar
import mine from '../../components/footer/mine.vue'					//引入我的航组件 mine
import footerBar from '../../components/footer/footerBar.vue'		//引入底部导航组件 footerBar
import { getUserInfo } from '../../src/ajax.js'


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
				scode:'',	//需要用来接收请求成功后的值
				front:'',//拍摄前
				queen:'',//拍摄后
			}
		},
		components:{
			footerBar,
			family,
			shopCar,
			live,
			mine
		},
		methods: {
			//切换页面内容
			activeData(num){
				this.actives = num;
			},
			//改变footerBar
			changeBar(num){
				this.$refs.footerBar.active(num)
				// console.log(this)
			},
			//获取个人信息  并判定token是否过期
			getUserInfoFun(){
				var tokens = uni.getStorageSync('token')
				getUserInfo(
					tokens
				).then(res => {
					// console.log(res.data)
					// 保存用户信息
					// uni.setStorageSync('userInfo',res.data.data.userInfo)
					if(res.data.code == 4000){
						// 清除token
						uni.setStorageSync('token','')
						// 清除userInfo
						uni.setStorageSync("userInfo",'')
						uni.navigateTo({
							url:'../login/login'
						})
					}else if(res.data.code == 2000){
						// if(uni.getStorageSync('userInfo').consId != res.data.data.userInfo.consId ){
						// 	this.userInfo = res.data.data.userInfo;
						// 	// 保存用户信息
						// 	uni.setStorageSync('userInfo',res.data.data.userInfo)
						// 	console.log('更新用户信息')
						// }
						
					}
				})
			}
		},
		
		onLoad() {
			if( uni.getStorageSync('token').length == 0 ){
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
		onShow() {
			 // 进行中订单用户验证
			if(this.$refs.two){
				//用scode=true的值  赋给需要判断的页面
				this.$refs.two.verify = this.scode
				// console.log(this.$refs);
			}
			//进行中订单拍摄服务前视频
			if(this.$refs.two){
				//用front=true的值  赋给需要判断的页面
				this.$refs.two.fronts = this.front
				// console.log(this.$refs);
			}
			//进行中订单拍摄服务后视频
			if(this.$refs.two){
				//用front=true的值  赋给需要判断的页面
				this.$refs.two.queens = this.queen
				// console.log(this.$refs);
			}
			
			
			//获取用户信息
			this.userInfo = uni.getStorageSync('userInfo');
			var selectF = uni.getStorageSync('selectFamily')
			//默认展示登录用户信息  选择后使用选中用户信息
			if(selectF.length == 0){
				this.familyInfo = this.userInfo;
				// console.log(this.familyInfo)
			}else{
				this.familyInfo = selectF;
				// console.log(this.familyInfo)
			}
			this.getUserInfoFun();
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
