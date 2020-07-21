<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
	/* Uview-ui 样式 */
	// @import "uview-ui/index.scss";
			
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	.flex {
	    display: flex;
	}
	
	.j-content {
	    justify-content: space-between;
	}
	
	.j-around {
	    justify-content: space-around;
	}
	
	.j-content-c {
	    justify-content: center;
	}
	
	.a-align {
	    align-items: center;
	}
	
	.wrap {
	    flex-wrap: wrap;
	}

</style>
