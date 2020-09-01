<!-- 拍摄前 -->
<template>
	<view>
		<view class="box">
			<view class="inputOne">
				<u-input v-model="value" type="text" placeholder='请输入位置标题名称'  />
			</view>

			<image src="../../static/imgs/jiahao.png" class="addPic" @tap="addPic"></image>
			<view class="uni-upload-img uni-flex uni-row">
				<view class="flex-item preview_img" v-for="(image,index) in imageList" :key="index">
					<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
					<uni-icons type="clear" size="20" class="img_icon" @tap="delect(index)"></uni-icons>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
    var sourceType = [
            ['camera'],
            ['album'],
            ['camera', 'album']
        ]
    var sizeType = [
        ['compressed'],
        ['original'],
        ['compressed', 'original']
    ]
    export default{
        data() {
            return{
                imageList: [],
                sourceTypeIndex: 2,
                sourceType: ['拍照', '相册', '拍照或相册'],
                sizeTypeIndex: 2,
                sizeType: ['压缩', '原图', '压缩或原图'],
                countIndex: 8,
                count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                imgAllUrl:[],
				value:''
            }
        },
        methods:{
            addPic : function(imgAll){
                this.imgAllUrl = [];
                let url = "路径";
                var that = this;
                uni.chooseImage({
                    sourceType: sourceType[this.sourceTypeIndex],
                    sizeType: sizeType[this.sizeTypeIndex],
                    count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length :
                        this.count[this.countIndex],
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                        var imageData = this.imageList
                        const tempFilePaths = res.tempFilePaths;
                        //上传个数循环拿到每一个照片的路径，然后放到一个数组中
                        for(var i=0;i<imageData.length;i++){
                            //图片上传
                            const uploadTask = uni.uploadFile({
                                url:url,
                                filePath:tempFilePaths[0],
                                name:"pic_name",
                                success:function(data){
                                    const back = JSON.parse(data.data);
                                    var imgUrl = back.data[0].repair_pic_url;
                                    //将图片路径赋值给imgAllUrl
                                    that.imgAllUrl.push(imgUrl)
                                }
                            })
                        }
                      },
                })
            },
            //图片预览
            previewImage: function(e) {
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: this.imageList
                })
            },
            delect(index,e){
                var that = this;
                uni.showModal({
                    title: '提示',
                    content: '是否删除该图片？',
                    success: (res) =>{
                        if (res.confirm) {
                            //删除数组中指定项
                            function removeByValue(arr, val) {
                                for(var i=0; i<arr.length; i++) {
                                    if(arr[i] == val) {
                                        arr.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                            var forImg = that.imgAllUrl[index];
                            var imageUrl = that.imageList.splice(forImg, 1)
                            removeByValue(that.imageList, imageUrl);
                            //重新赋值
                            that.imgAllUrl = that.imageList
                        } 
                    }
                });
            }
        }
    }
</script>
