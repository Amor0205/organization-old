import Vue from 'vue'
import App from './App'
import { http } from '@/common/service.js' // 全局挂载引入请求处理
import ajax from 'src/ajax.js'

Vue.config.productionTip = false;

Vue.prototype.$http = http;

Vue.prototype.$eventHub = new Vue();

//全局 主题色
Vue.prototype.commonColorAll = '#FFE300';

//挂载 推送实列
Vue.prototype.jyJPush = uni.requireNativePlugin('JY-JPush');

// // 引入全局uView
import uView from 'uview-ui'

Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
