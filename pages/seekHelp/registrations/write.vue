<!-- 服务内容 -->
<template>
	<view class="box">
		<!-- 上传照片 -->
		<view class='uploadPictures'>
			<view style="padding:20rpx">服务前照片：</view>
			<mk-upload :imgList="imgList" @onDelete="onDelete" @onChoose="onChoose" :maxCount='maxCount' />
			<view style="padding:20rpx">服务后照片：</view>
			<mk-upload :imgList="imgLists" @onDelete="onDeletes" @onChoose="onChooses" :maxCount='maxCount' />
		</view>
		<!-- 选择服务对象部分 -->
		<view class="" v-if="this.all.type==1">
			<!-- 选择服务对象 -->
			<view class="session">
				<view class="">
					请选择接受服务的对象:
				</view>
				<view class="" @click="Others">
					搜索其他人？
				</view>
			</view>
			<!-- 单选 -->
			<view class="radio">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.elderName" :disabled="item.disabled"
					 active-color='#FFE300' icon-size='40px'>
						<view class="list">
							<text>{{item.elderName}}</text>
							<!-- (<text>{{item.bed}}</text>) -->
						</view>
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<!-- 选择服务内容 -->
		<view class="select" @click="changes">
			选择服务内容
		</view>
		<!-- 服务对象 -->
		<!-- <view class="serviceObject">
			服务对象：{{alls.elderName}}
		</view> -->
		<!-- 当前已选择的服务 -->
		<view class="base">
			<view class="affirm">
				当前已选:
			</view>
			<view class="choice">
				<view v-for="(item,index) in number" :key="index" class="button">
					<view class="names" :style="item.style">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<!-- <view class="u-button" @click="submit"> -->
		<!-- <view class="u-button" @click="submit">
			提交
		</view> -->
		<u-button
			shape="circle" 
			class="u-button" 
			@click="submit"
			:hair-line="false" 
			:disabled="forbidden">
			提交</u-button>
		
		
	</view>
</template>

<script>
	import mkUpload from "../../../components/mk-upload/mk-upload.vue"
	import {
		activeService,
		submitService,
		getold
	} from '../../../src/ajax.js'
	function debounce(func, wait=600){
		let timeout;
		return function(event){
			clearTimeout(timeout)
			timeout = setTimeout(()=>{
				func.call(this, event)
			},wait)
		}	
	}
	export default {
		
		components: {
			mkUpload
		},
		props: {},
		data() {
			return {
				all: "", //底部服务对象
				value: '', //单选
				names: '',
				number: '', //选择服务内容
				imgList: [], //服务前
				imgLists: [], //服务后
				imageList: [], //拼接的数组
				awarry: [],
				maxCount: 3,
				userInfo: '', //用户信息
				tokens: '',
				img: [], //服务前上传成功
				imgs: [], //服务后上传成功
				serve: '',
				list: [], //房间老人列表
				abc: [],
				oldid: '',
				old: '',
				antiShake:true, //防抖
				forbidden:false
			}
		},
		methods: {
			onDelete(index) {
				// console.log(index)
				//删除成功回调后执行 只做演示
				uni.showLoading({
					title: '删除中'
				});
				setTimeout(() => {
					this.imgList.splice(index, 1);
					this.imgs.splice(index, 1);
					wx.showToast({
						title: '删除成功',
						icon: 'success',
						duration: 1000
					});
				}, 1000);
			},
			onChoose(e) {
				console.log(e)
				//上传成功后回调执行push  只做演示
				uni.showLoading({
					title: '上传中'
				});
				setTimeout(() => {
					const tempFilePaths = e.tempFilePaths;
					this.imgList.push(tempFilePaths[0]);
					console.log(this.imgList);

					var _this = this;
					uni.uploadFile({
						// url: 'http://110.187.88.70:21605/serviceContent/upImage', //仅为示例，非真实的接口地址
						url: 'http://110.187.88.70:21706/serviceContent/upImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						methods: 'POST',
						header: {
							'Authorization': 'Bearer ' + _this.tokens
						},
						formData: {
							type: 0,
						},
						success: (res) => {
							console.log(res);
							uni.hideLoading()
							if (JSON.parse(res.data).code == 2000) {
								uni.showToast({
									title: '上传成功'
								})
								var img = (JSON.parse(res.data)).data.url
								this.img.push(img)
								console.log(this.img);

							}
						}
					});
				}, 1000);
			},
			onPreviewTake(index) {
				console.log(index)
				wx.showActionSheet({
					itemList: ['预览图片', '删除图片'],
					success(res) {
						console.log(res.tapIndex)
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			},
			// 服务后
			onDeletes(index) {
				console.log(index)
				//删除成功回调后执行 只做演示
				uni.showLoading({
					title: '删除中'
				});
				setTimeout(() => {
					this.imgLists.splice(index, 1);
					this.imgs.splice(index, 1);
					wx.showToast({
						title: '删除成功',
						icon: 'success',
						duration: 1000
					});
				}, 1000);
			},
			onChooses(e) {
				console.log(e)
				//上传成功后回调执行push  只做演示
				uni.showLoading({
					title: '上传中'
				});
				setTimeout(() => {
					const tempFilePaths = e.tempFilePaths;
					this.imgLists.push(tempFilePaths[0]);
					// console.log(this.imgLists);

					var _this = this;
					uni.uploadFile({
						// url: 'http://110.187.88.70:21605/serviceContent/upImage', //仅为示例，非真实的接口地址
						url: 'http://110.187.88.70:21706/serviceContent/upImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						methods: 'POST',
						header: {
							'Authorization': 'Bearer ' + _this.tokens
						},
						formData: {
							type: 0,
						},
						success: (res) => {
							console.log(res);
							uni.hideLoading()
							if (JSON.parse(res.data).code == 2000) {
								console.log(JSON.parse(res.data));
								uni.showToast({
									title: '上传成功'
								})
								var imgs = (JSON.parse(res.data)).data.url
								this.imgs.push(imgs)
								console.log(this.imgs)

							}
						}
					});

				}, 1000);
			},


			// 单选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);

			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			//选择其他人
			Others() {
				uni.navigateTo({
					url: './search'
				})
			},
			// 选择服务内容
			changes() {
				uni.navigateTo({
					url: '../options/option1'
				})
			},
			// 提交
			// submit:debounce(function(e){
			submit(){
				var befimg = this.img.join('|')
				var afimg = this.imgs.join('|')
				console.log(this.all)
				if (this.all.type == 0) {
					//日常巡视
					// if( befimg !=='' && afimg !=='' && this.number !=='' ){
					if( this.number !=='' ){
						//禁用按钮
						this.forbidden = true;
						this.number.map(item => {
							this.awarry.push(item.name)
							// console.log(this.awarry);
						})
						this.serve = this.awarry.join('/')
						uni.showLoading({
							title: "正在提交"
						})
						var _this = this;
						uni.uploadFile({
							url: 'http://110.187.88.70:21605/order/submitService', //仅为示例，非真实的接口地址
							// url: 'http://110.187.88.70:21706/order/submitService', //仅为示例，非真实的接口地址
							filePath: '',
							name: 'file',
							methods: 'POST',
							header: {
								'Authorization': 'Bearer ' + _this.tokens
							},
							formData: {
								beImages: befimg,
								afImages: afimg,
								content: this.serve,
								type: this.all.type,
								elderId: 0,
								orderId: this.all.id,
							},
							success: (res) => {
								console.log(JSON.parse(res.data));
								//解放按钮
								this.forbidden = false;
								uni.hideLoading()
								if (JSON.parse(res.data).code == 2000) {
									uni.showToast({
										title: '提交成功'
									})
									uni.hideLoading()
									uni.setStorageSync('number', '')
									uni.setStorageSync('all', '')
									uni.setStorageSync('old', '')
									uni.setStorageSync('alls', '')
									uni.reLaunch({
										url: '../../index/index'
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								}
							}
						});
					}else{
						uni.showToast({
							icon: 'none',
							title: '请先完善服务内容'
						})
					}
				} else if (this.all.type == 1) {
					//禁用按钮
					this.forbidden = true;
					this.list.map(item => {
						this.abc.push(item.elderId)
					})
					this.oldid = this.abc.join('')
					// 老人求助
					if ( this.abc.length != 0  && this.number != '') {
						uni.showLoading({
							title: "正在提交"
						})
						// var befimg = this.img.join('|')
						// var afimg = this.imgs.join('|')
						this.list.map(item => {
							this.abc.push(item.elderId)
						})
						this.oldid = this.abc.join('')
						this.number.map(item => {
							this.awarry.push(item.name)
							// console.log(this.awarry);
						})
						this.serve = this.awarry.join('/')
						console.log(this.serve);
						var _this = this;
						uni.uploadFile({
							url: 'http://110.187.88.70:21605/order/submitService', //仅为示例，非真实的接口地址
							// url: 'http://110.187.88.70:21706/order/submitService', //仅为示例，非真实的接口地址
							filePath: '',
							name: 'file',
							methods: 'POST',
							header: {
								'Authorization': 'Bearer ' + _this.tokens
							},
							formData: {
								beImages: befimg,
								afImages: afimg,
								content: this.serve,
								type: this.all.type,
								elderId: this.oldid,
								orderId: this.all.id,
							},
							success: (res) => {
								console.log(res);
								//解放按钮
								this.forbidden = false;
								uni.hideLoading()
								if (JSON.parse(res.data).code == 2000) {
									uni.showToast({
										title: '提交成功'
									})
									uni.hideLoading()
									uni.setStorageSync('number', '')
									uni.setStorageSync('all', '')
									uni.setStorageSync('old', '')
									uni.reLaunch({
										url: '../../index/index'
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								}
							}
						});
					}else{
						
						uni.showToast({
							icon: 'none',
							title: '请先完善服务内容'
						})
					}
				} else {
				// 主动服务
					if(befimg!=''&&afimg!=''&this.number!=''){
						//禁用按钮
						this.forbidden = true;
						// var befimg = this.img.join('|')
						// var afimg = this.imgs.join('|')
						this.number.map(item => {
							this.awarry.push(item.name)
						})
						this.serve = this.awarry.join('/')
						uni.showLoading({
							title: "正在提交"
						})
						var _this = this;
						uni.uploadFile({
							url: 'http://110.187.88.70:21605/order/genActiveOrder', //仅为示例，非真实的接口地址
							// url: 'http://110.187.88.70:21706/order/genActiveOrder', //仅为示例，非真实的接口地址
							filePath: '',
							name: 'file',
							methods: 'POST',
							header: {
								'Authorization': 'Bearer ' + _this.tokens
							},
							formData: {
								beImages: befimg,
								afImages: afimg,
								elderId: this.all.elderId,
								employeeId: this.userInfo.id,
								content: this.serve
							},
							success: (res) => {
								//解放按钮
								this.forbidden = false;
								// console.log(res);
								uni.hideLoading()
								if (JSON.parse(res.data).code == 2000) {
									uni.showToast({
										title: '提交成功'
									})
									uni.hideLoading()
									uni.setStorageSync('number', '')
									uni.setStorageSync('all', '')
									uni.setStorageSync('old', '')
									uni.reLaunch({
										url: '../../index/index'
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								}
							}
						});
					}else{
						uni.showToast({
							icon: 'none',
							title: '请先完善服务内容'
						})
					}
				}


			// }),
			},
			
			//获取房间内老人
			// oldlist() {
			// 	getold(
			// 		this.all.id
			// 	).then(res => {
			// 		if (res.data.code == 2000) {
			// 			this.list = res.data.data.elders
			// 			console.log(this.list);
			// 		}
			// 	})
			// },
		},
		mounted() {

		},
		onLoad(option) {

			//保存服务对象详情
			// this.alls = uni.getStorageSync('alls')
			// console.log(this.alls);
			// this.oldlist()
			// 获取userInfo
			this.userInfo = uni.getStorageSync('userInfo')
			this.tokens = uni.getStorageSync('token')
			if (option.search) {
				//搜索页面传过来的数据
				this.arrays = JSON.parse(option.search)
				// console.log(this.arrays);

				// console.log(this.list);
			} else if (option.data) {
				//服务对象详情
				this.all = JSON.parse(option.data)
				console.log(this.all);
				// this.all.map(item => {
				this.list.push(this.all)
				// })
				console.log(this.list);

			}



		},
		created() {


		},
		onShow() {
			//接收服务内容
			this.number = uni.getStorageSync('number')
			console.log(this.number)
			if (uni.getStorageSync('old')) {
				this.old = uni.getStorageSync('old')
				this.list = this.list.concat(this.old)
				console.log(this.list);

			} else {

			}


		},
		onHide() {
			uni.setStorageSync('old', '')
		},
		onUnload() {
			uni.setStorageSync('old', '')
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
		padding: 10rpx 10rpx 50rpx 20rpx;

		// 上传图片
		.uploadPictures {
			.After {
				margin-top: 200rpx;
			}
		}

		.session {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 50rpx;
		}

		// 单选
		.radio {
			margin-top: 20rpx;

			.list {
				font-size: 30rpx;
				font-weight: 700;
				margin: 0 auto;
				margin-bottom: 20rpx;
				margin-top: 25rpx;
			}
		}

		// 选择服务内容
		.select {
			width: 90%;
			height: 80rpx;
			background-color: #FFE300;
			margin: 0 auto;
			margin-top: 30rpx;
			border-radius: 20rpx;
			line-height: 80rpx;
			text-align: center;
		}

		.serviceObject {
			margin-top: 30rpx;
		}

		// 当前已选择的服务
		.base {
			margin-top: 30rpx;

			// .selected {}
			// .change {
			// 	margin-right: 20rpx;
			// 	margin-top: 10rpx;
			// }
			.affirm {}

			.choice {
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-around;
				margin-top: 30rpx;

				.button {
					margin-left: 10rpx;
					margin-bottom: 20rpx;
				}

				.names {
					// width: 160rpx;
					// height: 56rpx;
					border: 1rpx solid #818181;
					font-size: 28rpx;
					text-align: center;
					line-height: 56rpx;
					border-radius: 40rpx;
					// color: #000000;
					background: #c0c3bc;
					padding: 0rpx 20rpx 0rpx 20rpx;
				}


			}
		}

		// 提交按钮
		.u-button {
			width: 400rpx;
			height: 100rpx;
			background-color: #FFE300;
			margin: 0 auto;
			margin-top: 100rpx;
			border-radius: 20rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			border: none;
		}


	}
</style>
