<!-- 选择服务内容（直接发布） -->
<template>
	<view class="box">
		<!-- 中间部分项目分类 -->
		<view class="centreBox" style="min-height:750rpx;">
			<view class="collapse" >
				<u-collapse  >
					<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled"
					 class="itemList">
						<!-- <u-checkbox-group @change="checkboxGroupChange" v-for="(item1,index1) in item.list" :key="index1">
							<u-checkbox @change="checkboxChange" v-model="item1.checked" :name="item1.name" shape="circle" active-color='#FFE300'
							 class="u-checkbox">
								<view class="contain">
									<view class="name">
										{{item1.name}}
									</view>
								</view>
							</u-checkbox>
						</u-checkbox-group> -->
						
						<!-- 子类 -->
						<view class="childBox" v-for="(item1,index1) in item.list" :key="index1" @click="checkItme(item1,index1,index)">
							<view class="contentBox">
								<view class="circle" :style="{'background': item1.checked == true ? '#adc' : '#fff' }">
									
								</view>
								<view class="title">
									{{item1.name}}<!-- {{ item1 }} -->
								</view>
								
							</view>
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
			<!-- 确认服务分类 -->
			<!-- <view class="baseBox">
				<view class="affirm">
					服务确认
				</view>
				<view class="choice">
					<view :class="{'btn': rSelect.indexOf(index)!=-1}" v-for="(item,index) in number" :key="index" 
					 class="button">
						<view class="names" :style="item.style">
							{{item.name}}
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 提交按钮 -->
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {
		postRelease,
		getcontent
	} from '../../../src/ajax.js'
	export default {
		data() {
			return {

				itemList: [],
				rSelect: [], //点击标签添加的数组
				number: [],
				ids: '', //接收穿过来数据里面的flag
				all: '',
				awarry: [],
				serve: ''
			}
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				// console.log(e);
				if (e.value == true) {
					// console.log(e)//打印下标
					this.number.push(e); //选中添加到数组里
					console.log(this.number);

				} else {
					this.number.splice(this.number.indexOf(e), 1); //取消
				}
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			// checkedAll() {
			// 	this.list.map(val => {
			// 		val.checked = true;
			// 	})
			// }
			//选择服务标签
			// tapInfo(e) {
			// 	if (this.rSelect.indexOf(e) == -1) {
			// 		// console.log(e)//打印下标
			// 		this.rSelect.push(e); //选中添加到数组里
			// 	} else {
			// 		this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
			// 	}
			// },
			submit() {
				this.itemList.map(res=>{
					res.list.filter(res_1=>{
						if(res_1.checked == true){
							this.number.push(res_1)
						}
					})
				})
				this.number.map(item => {
					this.awarry.push(item.name)
					// console.log(this.awarry);
				})
				this.serve = this.awarry.join('/')
				// console.log(this.number);
				// console.log(this.serve);
				if(this.number.length != 0){
					uni.showLoading({
						title: '正在提交'
					})
					postRelease(
						this.all.id,
						this.all.type,
						'',
						this.serve
					).then(res => {
						if (res.data.code == 2000) {
							uni.hideLoading()
							uni.showToast({
								title: '提交成功'
							})
							uni.setStorageSync('number', this.number)
							uni.navigateTo({
								url: '../assist/assist?all=' + JSON.stringify(this.all)
							})

						} else {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: res.data.data.message
							})
						}
					}).catch(err => {
						uni.hideLoading()
						console.log(err);
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请选择服务内容'
					})
				}

			},
			getlist() {
				// uni.showLoading({
				// 	title: "正在加载"
				// })
				// getcontent().then(res => {
				// 	if (res.data.code == 2000) {
				// 		// uni.hideLoading()
				// 		var listData = JSON.parse(res.data.data.menus)
				// 		listData.map(res1 => {
				// 			this.itemList.push({
				// 				head: res1.name,
				// 				list: res1.children,
				// 				checked: res1.checked == false,
				// 				disabled: res1.disabled == false
				// 			}, )
				// 			// console.log(this.itemList);
				// 		})

				// 	}else{
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: res.data.message
				// 		})
				// 	}
				// }).catch(err=>{
				// 	// uni.hideLoading()
				// })
			},
			//切换选中状态
			checkItme(item,index,parentIndex){
				// console.log(item)
				this.itemList[parentIndex].list.filter(res=>{
					if(res.id == item.id ){
						res.checked = !res.checked
					}
				})
				// console.log(this.itemList[0])
			}
			


		},
		created() {
			var list = [
				{
					"children":[
						{
							"id":105,
							"name":"梳头",
							"checked":false
						},
						{
							"id":106,
							"name":"刷牙",
							"checked":false
						},
						{
							"id":107,
							"name":"清洁义齿",
							"checked":false
						},
						{
							"id":108,
							"name":"摘义齿",
							"checked":false
						},
						{
							"id":109,
							"name":"戴义齿",
							"checked":false
						},
						{
							"id":110,
							"name":"漱口",
							"checked":false
						},
						{
							"id":111,
							"name":"洗脸",
							"checked":false
						},
						{
							"id":112,
							"name":"洗手",
							"checked":false
						},
						{
							"id":113,
							"name":"洗脚",
							"checked":false
						},
						{
							"id":114,
							"name":"清洁会阴",
							"checked":false
						},
						{
							"id":115,
							"name":"泡脚",
							"checked":false
						},
						{
							"id":116,
							"name":"擤鼻涕",
							"checked":false
						},
						{
							"id":117,
							"name":"清鼻屎",
							"checked":false
						},
						{
							"id":118,
							"name":"掏耳屎",
							"checked":false
						},
						{
							"id":119,
							"name":"擦面霜",
							"checked":false
						},
						{
							"id":120,
							"name":"擦手霜",
							"checked":false
						},
						{
							"id":121,
							"name":"擦爽身粉",
							"checked":false
						},
						{
							"id":122,
							"name":"洗澡",
							"checked":false
						},
						{
							"id":123,
							"name":"擦洗",
							"checked":false
						},
						{
							"id":124,
							"name":"洗头",
							"checked":false
						},
						{
							"id":125,
							"name":"理发",
							"checked":false
						},
						{
							"id":126,
							"name":"修面",
							"checked":false
						},
						{
							"id":127,
							"name":"剃须",
							"checked":false
						},
						{
							"id":128,
							"name":"剪鼻毛",
							"checked":false
						},
						{
							"id":129,
							"name":"剪耳毛",
							"checked":false
						},
						{
							"id":130,
							"name":"吹头",
							"checked":false
						},
						{
							"id":131,
							"name":"剪手指甲",
							"checked":false
						},
						{
							"id":132,
							"name":"剪脚趾甲",
							"checked":false
						},
						{
							"id":133,
							"name":"剪灰指（趾）甲",
							"checked":false
						}
					],
					"id":88,
					"name":"清洁类"
				},
				{
					"children":[
						{
							"id":134,
							"name":"吃饭",
							"checked":false
						},
						{
							"id":135,
							"name":"饮水",
							"checked":false
						},
						{
							"id":136,
							"name":"鼻饲",
							"checked":false
						},
						{
							"id":137,
							"name":"流食",
							"checked":false
						},
						{
							"id":138,
							"name":"牛奶",
							"checked":false
						},
						{
							"id":139,
							"name":"水果",
							"checked":false
						},
						{
							"id":140,
							"name":"糕点",
							"checked":false
						},
						{
							"id":141,
							"name":"营养品",
							"checked":false
						},
						{
							"id":142,
							"name":"其他",
							"checked":false
						}
					],
					"id":89,
					"name":"饮食类"
				},
				{
					"children":[
						{
							"id":143,
							"name":"口服药",
							"checked":false
						},
						{
							"id":144,
							"name":"含服药",
							"checked":false
						},
						{
							"id":145,
							"name":"外用药（眼、耳、鼻）",
							"checked":false
						},
						{
							"id":146,
							"name":"外敷药（贴剂、碘伏、酒精、邦迪）",
							"checked":false
						},
						{
							"id":147,
							"name":"测血压",
							"checked":false
						},
						{
							"id":148,
							"name":"测血糖",
							"checked":false
						},
						{
							"id":149,
							"name":"测体温",
							"checked":false
						},
						{
							"id":150,
							"name":"注射胰岛素",
							"checked":false
						}
					],
					"id":90,
					"name":"药品类"
				},
				{
					"children":[
						{
							"id":151,
							"name":"起床穿衣裤鞋袜帽围巾手套",
							"checked":false
						},
						{
							"id":152,
							"name":"上床脱衣裤鞋袜帽围巾手套",
							"checked":false
						},
						{
							"id":153,
							"name":"增减床上用品",
							"checked":false
						},
						{
							"id":154,
							"name":"增减衣裤鞋袜帽围巾手套围裙",
							"checked":false
						},
						{
							"id":155,
							"name":"翻身",
							"checked":false
						},
						{
							"id":156,
							"name":"搀扶站立",
							"checked":false
						},
						{
							"id":157,
							"name":"搀扶走动",
							"checked":false
						},
						{
							"id":158,
							"name":"踏脚",
							"checked":false
						}
					],
					"id":91,
					"name":"休息类"
				},
				{
					"children":[
						{
							"id":159,
							"name":"大便",
							"checked":false
						},
						{
							"id":160,
							"name":"小便",
							"checked":false
						},
						{
							"id":161,
							"name":"更换纸尿裤（片）",
							"checked":false
						},
						{
							"id":162,
							"name":"更换集尿袋",
							"checked":false
						},
						{
							"id":163,
							"name":"更换大便袋",
							"checked":false
						},
						{
							"id":164,
							"name":"疏通大小便",
							"checked":false
						}
					],
					"id":92,
					"name":"大小便"
				},
				{
					"children":[
						{
							"id":165,
							"name":"充电暖手（脚）器",
							"checked":false
						},
						{
							"id":166,
							"name":"电取暖器",
							"checked":false
						},
						{
							"id":167,
							"name":"电热毯",
							"checked":false
						},
						{
							"id":168,
							"name":"空调",
							"checked":false
						},
						{
							"id":169,
							"name":"热水袋",
							"checked":false
						},
						{
							"id":170,
							"name":"暖手袋",
							"checked":false
						},
						{
							"id":171,
							"name":"水壶",
							"checked":false
						},
						{
							"id":172,
							"name":"毛毯",
							"checked":false
						}
					],
					"id":93,
					"name":"取暖"
				},
				{
					"children":[
						{
							"id":173,
							"name":"空调",
							"checked":false
						},
						{
							"id":174,
							"name":"电风扇",
							"checked":false
						}
					],
					"id":94,
					"name":"乘凉"
				},
				{
					"children":[
						{
							"id":175,
							"name":"电灭蚊器",
							"checked":false
						},
						{
							"id":176,
							"name":"喷雾剂",
							"checked":false
						},
						{
							"id":177,
							"name":"粘蝇板",
							"checked":false
						}
					],
					"id":95,
					"name":"驱蚊"
				},
				{
					"children":[
						{
							"id":178,
							"name":"制氧机",
							"checked":false
						},
						{
							"id":179,
							"name":"氧气袋",
							"checked":false
						}
					],
					"id":96,
					"name":"吸氧"
				},
				{
					"children":[
						{
							"id":180,
							"name":"楼层至门卫",
							"checked":false
						},
						{
							"id":181,
							"name":"楼层至金顶医院",
							"checked":false
						},
						{
							"id":182,
							"name":"金顶医院至楼层",
							"checked":false
						},
						{
							"id":183,
							"name":"门卫至楼层",
							"checked":false
						},
						{
							"id":184,
							"name":"楼层至庭院",
							"checked":false
						},
						{
							"id":185,
							"name":"庭院至楼层",
							"checked":false
						}
					],
					"id":97,
					"name":"接送"
				},
				{
					"children":[
						{
							"id":186,
							"name":"水果刀",
							"checked":false
						},
						{
							"id":187,
							"name":"剪刀",
							"checked":false
						},
						{
							"id":188,
							"name":"指甲刀",
							"checked":false
						},
						{
							"id":189,
							"name":"打火机",
							"checked":false
						}
					],
					"id":98,
					"name":"危险用具使用"
				},
				{
					"children":[
						{
							"id":190,
							"name":"购物",
							"checked":false
						}
					],
					"id":99,
					"name":"购物"
				},
				{
					"children":[
						{
							"id":191,
							"name":"床上用品",
							"checked":false
						},
						{
							"id":192,
							"name":"门窗帘套",
							"checked":false
						},
						{
							"id":193,
							"name":"衣裤",
							"checked":false
						},
						{
							"id":194,
							"name":"内衣裤",
							"checked":false
						},
						{
							"id":195,
							"name":"鞋袜帽围巾手套围裙",
							"checked":false
						},
						{
							"id":196,
							"name":"毛巾",
							"checked":false
						},
						{
							"id":197,
							"name":"马桶垫",
							"checked":false
						},
						{
							"id":198,
							"name":"公用抹布",
							"checked":false
						},
						{
							"id":199,
							"name":"护理垫",
							"checked":false
						},
						{
							"id":200,
							"name":"餐桌",
							"checked":false
						},
						{
							"id":201,
							"name":"钢架藤椅",
							"checked":false
						},
						{
							"id":202,
							"name":"护理设施（轮椅、浴厕轮椅、助行器、踏脚凳、移位车、束缚带、料理机、饮水杯、饮水机、茶水柜、药品车、储物柜、储物篮、玩具）",
							"checked":false
						}
					],
					"id":100,
					"name":"换洗"
				},
				{
					"children":[
						{
							"id":203,
							"name":"老人房间",
							"checked":false
						},
						{
							"id":204,
							"name":"生活用具",
							"checked":false
						},
						{
							"id":205,
							"name":"休息室",
							"checked":false
						},
						{
							"id":206,
							"name":"护理站",
							"checked":false
						},
						{
							"id":207,
							"name":"护理设施",
							"checked":false
						},
						{
							"id":208,
							"name":"游戏玩具",
							"checked":false
						},
						{
							"id":209,
							"name":"冰箱",
							"checked":false
						}
					],
					"id":101,
					"name":"消毒"
				},
				{
					"children":[
						{
							"id":210,
							"name":"床上用品",
							"checked":false
						},
						{
							"id":211,
							"name":"老人房间物品",
							"checked":false
						},
						{
							"id":212,
							"name":"衣柜",
							"checked":false
						},
						{
							"id":213,
							"name":"鞋柜",
							"checked":false
						},
						{
							"id":214,
							"name":"药品柜",
							"checked":false
						},
						{
							"id":215,
							"name":"床头柜",
							"checked":false
						},
						{
							"id":216,
							"name":"洗刷用品（毛巾、牙膏、牙刷、洗脸盆、卫生纸、移动马桶）",
							"checked":false
						},
						{
							"id":217,
							"name":"冰箱",
							"checked":false
						},
						{
							"id":218,
							"name":"护理站",
							"checked":false
						},
						{
							"id":219,
							"name":"公共卫生间",
							"checked":false
						},
						{
							"id":220,
							"name":"茶水柜",
							"checked":false
						},
						{
							"id":221,
							"name":"储物柜",
							"checked":false
						},
						{
							"id":222,
							"name":"储物篮",
							"checked":false
						},
						{
							"id":223,
							"name":"护理设施（移位车、轮椅、助行器、平板车、餐桌、咋水车）",
							"checked":false
						}
					],
					"id":102,
					"name":"整理"
				},
				{
					"children":[
						{
							"id":224,
							"name":"开窗通风",
							"checked":false
						},
						{
							"id":225,
							"name":"吹风机",
							"checked":false
						},
						{
							"id":226,
							"name":"檀香",
							"checked":false
						},
						{
							"id":227,
							"name":"空气清新剂",
							"checked":false
						},
						{
							"id":228,
							"name":"卫生球",
							"checked":false
						},
						{
							"id":229,
							"name":"消洗灵",
							"checked":false
						},
						{
							"id":230,
							"name":"洁厕王",
							"checked":false
						}
					],
					"id":103,
					"name":"去味除臭"
				},
				{
					"children":[
						{
							"id":231,
							"name":"看电视、视频",
							"checked":false
						},
						{
							"id":232,
							"name":"手指操、健身操",
							"checked":false
						},
						{
							"id":233,
							"name":"唱歌",
							"checked":false
						},
						{
							"id":234,
							"name":"拍球",
							"checked":false
						},
						{
							"id":235,
							"name":"击鼓传花",
							"checked":false
						},
						{
							"id":236,
							"name":"讲笑话、讲故事",
							"checked":false
						}
					],
					"id":104,
					"name":"休闲娱乐"
				}
			]
			var listData = list
			
			listData.map(res1 => {
				this.itemList.push({
					head: res1.name,
					list: res1.children,
					checked: res1.checked == false,
					disabled: res1.disabled == false
				}, )
			})
			
			this.getlist()
		},
		mounted() {
			// this.getlist()
		},
		onLoad(option) {
			// console.log(option);
			this.ids = JSON.parse(option.data)
			// console.log(this.ids);
			this.all = JSON.parse(option.all)
			console.log(this.all);
			// this.exhibits= JSON.parse(option.exhibit)
			// console.log(this.exhibits);


		}

	}
</script>

<style lang="scss">
	.box {
		.centreBox {
			padding: 20rpx;

			.employ {
				// font-size: 60rpx;
				color: #FF9500;
				text-align: center;
				padding-top: 20rpx;
			}

			.initiative {
				// font-size: 60rpx;
				color: #878BA1;
				padding-top: 50rpx;
			}

			.collapse {
				padding: 20rpx 0rpx 20rpx 0rpx;
				font-size: 30px;
				.itemList {
					margin-top: 50rpx;

					.u-checkbox {
						margin-right: 30rpx;
						margin-top: 40rpx;
					}

					.contain {

						.name {
							font-size: 18px;
						}
					}
					
					.childBox{
						.contentBox{
							display: flex; 
							align-items: center;
							font-size: 20px;
							line-height: 34px;
							padding-left: 20rpx;
							.circle{
								width: 30rpx;
								height: 30rpx;
								border-radius: 50%;
								border: 1rpx solid #aaa;
								margin-right: 10rpx;
							}
							.title{
								width: 80%;
							}
						}
					}
				}

			}
		}

		.baseBox {}

		.submit {
			width: 80%;
			height: 100rpx;
			background: #FFE300;
			margin: 40rpx auto;
			text-align: center;
			line-height: 100rpx;
			border-radius: 50rpx;
			font-size: 30rpx;
			font-size: 18px;
		}


	}
</style>
