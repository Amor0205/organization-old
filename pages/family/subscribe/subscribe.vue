<!-- 预约记录 -->


<template>
	<view>
		<view class="">
			<view class="subscribe" v-for="(item,index) in subscribe" :key='index'>
				<view class="top">
					<view class="place">
						{{item.place}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="middle">
					<view class="img">
						<image :src="item.imgs" mode="" class="imgs"></image>
					</view>
					<view class="right">
						<view class=" seat">
							{{item.seat}}
						</view>
						<view class="estimate">
							<view class="xx">
								<image src="../../../static/imgs/bf.png" mode="" class="xingxing"></image>
							</view>
							<view class="rank">
								{{item.rank}}
							</view>
						</view>
						<view class="price">
							单价 {{item.price}}
						</view>
						<view class="order">
							订单号:{{item.order}}
						</view>
					</view>
				</view>
				<view class="explain">
				说明：{{item.explain}}
				</view>
			</view>
			
		</view>
		
		<view class="">
			<view class="subscribe" v-for="(item,index) in subscribe" :key='index'>
				<view class="top">
					<view class="place">
						{{item.place}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="middle">
					<view class="img">
						<image :src="item.imgs" mode="" class="imgs"></image>
					</view>
					<view class="right">
						<view class=" seat">
							{{item.seat}}
						</view>
						<view class="estimate">
							<view class="xx">
								<image src="../../../static/imgs/bf.png" mode="" class="xingxing"></image>
							</view>
							<view class="rank">
								{{item.rank}}
							</view>
						</view>
						<view class="price">
							单价 {{item.price}}
						</view>
						<view class="order">
							订单号:{{item.order}}
						</view>
					</view>
				</view>
				<view class="explain">
				说明：{{item.explain}}
				</view>
			</view>
			
		</view>
		
		
		<view class="">
			<view class="subscribe" v-for="(item,index) in subscribe" :key='index'>
				<view class="top">
					<view class="place">
						{{item.place}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="middle">
					<view class="img">
						<image :src="item.imgs" mode="" class="imgs"></image>
					</view>
					<view class="right">
						<view class=" seat">
							{{item.seat}}
						</view>
						<view class="estimate">
							<view class="xx">
								<image src="../../../static/imgs/bf.png" mode="" class="xingxing"></image>
							</view>
							<view class="rank">
								{{item.rank}}
							</view>
						</view>
						<view class="price">
							单价 {{item.price}}
						</view>
						<view class="order">
							订单号:{{item.order}}
						</view>
					</view>
				</view>
				<view class="explain">
					说明：{{item.explain}}
				</view>
			</view>
			
		</view>
		
<view class="">
	<view class="subscribe" v-for="(item,index) in subscribe" :key='index'>
		<view class="top">
			<view class="place">
				{{item.place}}
			</view>
			<view class="time">
				{{item.time}}
			</view>
		</view>
		<view class="middle">
			<view class="img">
				<image :src="item.imgs" mode="" class="imgs"></image>
			</view>
			<view class="right">
				<view class=" seat">
					{{item.seat}}
				</view>
				<view class="estimate">
					<view class="xx">
						<image src="../../../static/imgs/bf.png" mode="" class="xingxing"></image>
					</view>
					<view class="rank">
						{{item.rank}}
					</view>
				</view>
				<view class="price">
					单价 {{item.price}}
				</view>
				<view class="order">
					订单号:{{item.order}}
				</view>
			</view>
		</view>
		<view class="explain">
			说明：{{item.explain}}
		</view>
	</view>
	
</view>
		
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				subscribe: [{
					place: '彭山市新城医院',
					time: '2020年04月18日 12:00',
					imgs: '../../../static/imgs/hua.png',
					seat: '基础体检血压血糖检测常规检测',
					rank: '4.8',
					price: '50￥/2次',
					order: '1DSS1325SADA2511',
					explain: '1年12次体检 , 支持预约时间'
				}]
			}
		},
		methods: {

		},
		mounted() {

		},
		onLoad() {

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
	.subscribe {
		margin-top: 90rpx;
		

		.top {
			display: flex;
			justify-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			padding: 0rpx 22rpx 0rpx 22rpx;
			.place {
				font-weight: 700;
			}
			.time {
				color: #878BA1;
			}
		}
		.middle {
			width: 100%;
			height: 156rpx;
			margin-top: 58rpx;
			display: flex;
			padding: 0rpx 22rpx 0rpx 22rpx;
			.img {
				width: 156rpx;
				height: 156rpx;
				.imgs {
					width: 156rpx;
					height: 156rpx;
				}
			}
			.right {
				margin-left: 20rpx;
				.seat {
					font-size: 28rpx;
					font-weight: 700;
				}
				.estimate {
					width: 100%;
					height: 25rpx;
					display: flex;
					justify-items: center;
					align-items: center;
					line-height: 25rpx;
					margin-top: 10rpx;
					.xx {
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.xingxing {
						width: 20rpx;
						height: 20rpx;
					}
					.rank {
						font-size: 24rpx;
						color: #FEB34A;
						margin-left: 5rpx;
					}
				}
				.price {
					font-size: 22rpx;
					color: #666666;
					margin-top: 10rpx;
				}
				.order {
					font-size: 22rpx;
					color: #666666;
					margin-top: 10rpx;
			
				}
			}
		}
		.explain{
			font-size: 26rpx;
			color: #666666;
			margin-top: 70rpx;
			padding-left:22rpx;
		}

	}
</style>
