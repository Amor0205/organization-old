<template>
	<view class="container">
		<view class="listBox" v-for="(item,index) in familyList" :key='index'>
			<view class="gap"></view>
			<view class="contentBox">
				<view class="titleBox">
					<text>{{ item.nikeName }}</text>
					<text>{{ item.phoneNum }}</text>
				</view>
				<view class="idBox">
					证件号：{{ item.idNum }}
				</view>
				<u-radio-group class="bottomBox" v-model="value" >
					<u-radio
					shape="circle" 
					activeColor="#FFE300" 
					icon-size="36"
					:name="item.nikeName"
					@change="checkFamily(item)"
					>
						使用中
					</u-radio>
					<view class="rightBox">
						<view class="control">
							编辑
						</view>
						<view class="control" @click="deleteFamily(item)" style="color: #dd0000;border:1upx solid #dd0000;">
							删除
						</view>
					</view>
				</u-radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				familyList:[
					{
						nikeName:'萧蔷',
						phoneNum:'1398284657',
						idNum:'11546784646464464884',
						disabled:false
					},{
						nikeName:'晓雅',
						phoneNum:'1398846757',
						idNum:'11546784646464464884',
						disabled:false
					},{
						nikeName:'蒙滴答',
						phoneNum:'1392846757',
						idNum:'11546784646464464884',
						disabled:false
					},{
						nikeName:'垃圾帆',
						phoneNum:'1398284675',
						idNum:'11546784646464464884',
						disabled:false
					},{
						nikeName:'带线男刀',
						phoneNum:'1398284677',
						idNum:'11546784646464464884',
						disabled:false
					}
				],
				value:'',		//默认选中项
			}
		},
		methods: {
			//选中
			checkFamily(res){
				//本地存储选择的家人
				uni.setStorageSync('selectFamily',res)
			},
			//删除
			deleteFamily(res){
				let _this = this;
				uni.showModal({
				    content: '确定删除该家人吗',
				    success: function (e) {
				        if (e.confirm) {
							//返回需要保留list
				           _this.familyList = _this.familyList.filter( (data,index) =>{
								return res.phoneNum != data.phoneNum
				           })
						   //清空保存的家人信息
						   uni.setStorageSync('selectFamily','')
						   //提示
						   uni.showToast({
							title:"删除成功"
						   })
						   
				        } else if (e.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		
		},
		onNavigationBarButtonTap(res){
			
			let _this = this;
			
			//监听事件
			this.$eventHub.$on('child', function(data) {
				let newData = {...data}
				if(newData){
					_this.familyList.push(newData)
					uni.showToast({
						icon:"none",
						title:'添加成功'
					})
				}
				//清除监听，不清除会消耗资源
				_this.$eventHub.$off('child');
			});

			uni.navigateTo({
				url: './addFamily'
			});
		},
		created() {
			
			if(uni.getStorageSync('selectFamily') == ''){
				//处理默认选中项
				this.value = this.familyList[0].nikeName;
				uni.setStorageSync('selectFamily',this.familyList[0])
			}else{
				//处理有选中的情况
				this.value = this.familyList.filter(res=>{
					return res.phoneNum == uni.getStorageSync('selectFamily').phoneNum
				})[0].nikeName
			}
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	// 间隔行
	.gap{
		height: 20upx;
		background: #f9f9f9;
	}
	.container {
		font-size: 14px;
		line-height: 24px;
		background: #f9f9f9;
		min-height:100% ;
		.listBox{
			background: #fff;
			.contentBox{
				padding: 20upx;
				.titleBox{
					display: flex;
					justify-content: space-between;
				}
				.idBox{
					padding: 20upx;
					font-size: 12px;
					color: #a2a2a2;
				}
				.bottomBox{
					display: flex;
					justify-content: space-between;
					.rightBox{
						display: flex;
						.control{
							margin-left: 10upx ;
							padding: 0 30upx;
							border-radius: 40upx;
							border: 1px solid #bcbcbc;
							color: #bcbcbc;
						}
					}
				}
			}
		}
	}
</style>
