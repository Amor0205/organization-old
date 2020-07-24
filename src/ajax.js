import { http } from '@/common/service.js' 

/* 
	GET
	
	//http.get(' 接口路径 ', {
	    params: {userName: 'name', password: '123456'}, //会加在url上 
	    header: {}, //会与全局header合并，如有同名属性，局部覆盖全局 
	    dataType: 'json',
	    custom: {auth: true}, //可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	    自定义验证器。statusCode必存在。非必填
	    validateStatus: function validateStatus(statusCode) {
			return statusCode >= 200 && statusCode < 300
	    }
	//})
 
 */
var tokens;

if(uni.getStorageSync){
	tokens = uni.getStorageSync('token')
}
	


// 获取验证码
export function getVerificationCode(phone) {
	return http.get('/consumer/sendVerifyCode', {
		params: {
			phone
		}
	})
}

// 获取用户信息
export function getUserInfo(token) {
	return http.get('/consumer/getInfo', {
		params: {
			
		},
		header:{
			Authorization:token
		}
	})
}


// 获取sos记录
export function get_sos_list(phone) {
	return http.get('/hard/alarmLog/list', {
		params: {
			phone
		},
		header:{
			Authorization:'Bearer ' + tokens
		}
	})
}







/* 

	POST
	
	
	// 局部修改配置，局部配置优先级高于全局配置
	http.post('/user/login', {userName: 'name', password: '123456'}, {
	    params: {}, // 会加在url上 
	    header: {}, //会与全局header合并，如有同名属性，局部覆盖全局 
	    dataType: 'json',
		custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	    // 自定义验证器。statusCode必存在。非必填
	    validateStatus: function validateStatus(statusCode) {
			return statusCode >= 200 && statusCode < 300
	    }
	})
 */

//注册
export function register(phone,password,verifyCode){
	return http.post('/oauth/regist',{
		phone,
		password,
		verifyCode,
		clientId:'app'
	})
}

//登录
export function login(username,password){
	return http.post('/oauth/login',{
		username,
		password,
		client_id:'app',
		client_secret:'123456',
		grant_type:'password'
		},{
			header:{
				'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
			},
		})
}

//设备绑定
export function diviceBind(phone,devCode,devAddress,birthday){
	return http.post('/hard/device/diviceBind',{
			phone,
			devCode,
			devAddress,
			birthday
		},{
			header:{
				Authorization:'Bearer ' + tokens
			}
		})
}