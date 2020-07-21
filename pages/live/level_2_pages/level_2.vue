<template>
	<view class="container">
		<view class="topBox">
			<view class="leftBox">
				<view class="tagBox" :class="activeClass == index ? 'active' : ''" v-for="(item, index) in topTag" :key="index" @click="changeTag(item, index)">
					{{ item.name }}
				</view>
			</view>
			<view class="rightBox">
				<view class="controlBox" @click="show = true">
					<image src="../../../static/imgs/shaixuan@2x.png" mode=""></image>
					<text>筛选</text>
				</view>
			</view>
		</view>
		<view class="bottomBox">
			<view class="goodsBox" v-for="(item, index) in companysList" :key="index" @click="goToPage(item)">
				<view class="leftBox"><image :src="item.imgUrl" mode=""></image></view>
				<view class="rightBox">
					<view class="goodsName">{{ item.name }}</view>
					<view class="goodsStar">
						<view class="gradeBox">
							<image src="../../../static/imgs/bf.png" mode=""></image>
							{{ item.grade }}
						</view>
						<text>{{ '已售' + item.sales + '+' }}</text>
						<text>{{ '评价' + item.comment + '+' }}</text>
					</view>
					<view class="price">起价 {{ '￥' + item.price }}</view>
					<view class="typeBox">
						<view class="type" v-for="(data, index2) in item.type" :key="index2">{{ data }}</view>
					</view>
					<view class="appraiseBox">
						<view class="appraise" v-for="(data, index3) in item.appraise" :key="index3">{{ '“' + data + '”' }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 筛选弹出层 -->
		<u-popup class="popup" v-model="show" mode="right" border-radius="26" width="70%" :closeable="true">
			<view class="popupBox">
				<view class="caption">筛选</view>
				<view class="contentBox"></view>

				<view class="cotrol"><u-button class="custom-style" type="warning" shape="circle" :ripple="true" ripple-bg-color="#ffee00">确定</u-button></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '', //顶部导航标题
			activeClass: 0, //选项卡默认激活项
			show: false, //弹出层控制
			topTag: [
				{
					name: '综合排名'
				},
				{
					name: '信用排名'
				},
				{
					name: '销量'
				}
			],

			companysList: [
				{
					name: '新城医疗中心（良乡）',
					imgUrl: '../../../static/imgs/one.png',
					grade: '4.3',
					price: 300,
					sales: 213,
					comment: 233,
					type: ['体检', '医疗', '交流'],
					appraise: ['服务好，专业', '很贴心'],
					certification:['执业许可','医师证','卫生许可证']
				},
				{
					name: '新城医疗中心（良乡）',
					imgUrl: '../../../static/imgs/three.png',
					grade: '4.3',
					price: 300,
					sales: 213,
					comment: 233,
					type: ['体检', '医疗', '交流'],
					appraise: ['服务好，专业', '很贴心'],
					certification:['执业许可','医师证','卫生许可证']
				},
				{
					name: '新城医疗中心（良乡）',
					imgUrl: '../../../static/imgs/three.png',
					grade: '4.3',
					price: 300,
					sales: 213,
					comment: 233,
					type: ['体检', '医疗', '交流'],
					appraise: ['服务好，专业', '很贴心'],
					certification:['执业许可','医师证','卫生许可证']
				},
				{
					name: '万合一家医疗中心（房山）',
					imgUrl: '../../../static/imgs/one.png',
					grade: '4.3',
					price: 300,
					sales: 213,
					comment: 233,
					type: ['体检', '医疗', '交流'],
					appraise: ['服务好，专业', '很贴心'],
					certification:['执业许可','医师证','卫生许可证']
				},
				{
					name: '万合一家医疗中心（绿地缤纷城）',
					imgUrl: '../../../static/imgs/three.png',
					grade: '4.3',
					price: 300,
					sales: 213,
					comment: 233,
					type: ['体检', '医疗', '交流'],
					appraise: ['服务好，专业', '很贴心'],
					certification:['执业许可','医师证','卫生许可证']
				},
				{
					name: '万合一家医疗中心（绿地缤纷城）',
					imgUrl: '../../../static/imgs/three.png',
					grade: '4.3',
					price: 300,
					sales: 213,
					comment: 233,
					type: ['体检', '医疗', '交流'],
					appraise: ['服务好，专业', '很贴心'],
					certification:['执业许可','医师证','卫生许可证']
				}
			]
		};
	},
	methods: {
		changeTag(res, index) {
			this.activeClass = index;
		},
		goToPage(res){
			uni.navigateTo({
				url:'../../../pages/live/level_2_pages/company?data=' + JSON.stringify(res)
			})
		}
	},
	onLoad(option) {
		this.title = option.title;
	},
	created() {
		
	},
	mounted() {
		uni.setNavigationBarTitle({
			title: this.title
		});
	}
};
</script>

<style lang="scss">
.active {
	font-weight: bold;
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		top: auto;
		left: 50%;
		margin-left: -18upx;
		height: 4upx;
		width: 36upx;
		background-color: #ffe300;
	}
}
//弹出层
.popup {
	height: 96%;
	top: 2%;
	.popupBox {
		height: 88%;
		padding: 10% 4% 0;
		.caption {
			color: #afafaf;
		}
		.contentBox {
		}
	}
	.cotrol {
		width: 92%;
		position: fixed;
		display: flex;
		bottom: 2%;
		.custom-style {
			width: 400upx;
			height: 70upx;
			background: #ffe300;
			color: #000000;
		}
	}
}

.container {
	padding: 0 20px;
	font-size: 14px;
	line-height: 20px;
	.topBox {
		width: 90%;
		display: flex;
		position: fixed;
		background: #ffffff;
		z-index: 999;
		.leftBox {
			width: 70%;
			display: flex;
			justify-content: space-between;
			.tagBox {
				display: flex;
				align-items: center;
				height: 100upx;
				// border-bottom: 2px solid #FFE300;
				position: relative;
			}
		}
		.rightBox {
			width: 30%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.controlBox {
				display: flex;
				align-items: center;
				image {
					width: 28upx;
					height: 28upx;
					margin-right: 16upx;
				}
			}
		}
	}
	.bottomBox {
		padding-top: 130upx;
		.goodsBox {
			padding-bottom: 40upx;
			display: flex;
			.leftBox {
				margin-right: 20upx;
				width: 200upx;
				height: 200upx;
				image {
					height: 100%;
					width: 100%;
				}
			}
			.rightBox {
				font-size: 12px;
				color: #878ba1;
				.goodsName {
					width: 450upx;
					font-size: 16px;
					color: #2b2b33;
					overflow: hidden; //超出的文本隐藏
					text-overflow: ellipsis; //溢出用省略号显示
					white-space: nowrap; //溢出不换行
				}
				.goodsStar {
					display: flex;
					:not(:first-child) {
						margin-left: 20upx;
					}
					.gradeBox {
						color: #ff9500;
						image {
							width: 20upx;
							height: 20upx;
						}
					}
				}
				.typeBox {
					display: flex;
					:first-child {
						padding-right: 20upx;
					}
					:not(:first-child) {
						padding: 0 20upx;
						border-left: 1px solid #878ba1;
					}
					.type {
						line-height: 24upx;
						margin: 6upx 0;
					}
				}
				.appraiseBox {
					display: flex;
					color: #ff9500;
					.appraise {
					}
				}
			}
		}
	}
}
</style>
