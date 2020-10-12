import {
	http
} from '@/common/service.js'

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

if (uni.getStorageSync) {
	tokens = uni.getStorageSync('token')
	console.log(tokens)
}
// 获取验证码 1:用户注册 2:求助设备绑定 3:手环绑定 4:添加家人
export function getVerificationCode(phone, type) {
	return http.get('/consumer/sendVerifyCode', {
		params: {
			phone,
			type: 1
		}
	})
}
// 获取用户信息
export function getUserInfo(token) {
	return http.get('/consumer/userInfo', {
		params: {

		},
		header: {
			Authorization: 'Bearer ' + token
		}
	})
}
// 待开始订单
export function getBegin(uId,belongId, status, currentPage) {
	return http.get('/service/selectService', {
		params: {
			uId,
			belongId,
			status,
			currentPage,
			pageSize: 20
		}
	})
}




// 进行中订单
export function getProceed(serviceId) {
	return http.get('/service/serviceGoing', {
		params: {
			serviceId
		}
	})
}


// 已完成订单
export function getFinished(uId,belongId, status, currentPage) {
	return http.get('service/selectService', {
		params: {
			uId,
			belongId,
			status,
			currentPage,
			pageSize: 20

		}
	})
}


// 我的
export function mine(year, empId,belong) {
	return http.get('/service/myData', {
		params: {
			year,
			empId,
			belong
		}
	})
}


// 获取验证码 type：7
export function getCode(phone, type) {
	return http.get('/consumer/sendVerifyCode', {
		params: {
			phone,
			type
		}
	})
}
// 用户验证
export function getverification(phone, code, serviceId) {
	return http.get('/service/locationChecck/code', {
		params: {
			phone,
			code,
			serviceId
		}
	})
}

//开始服务
export function getservice( serviceId,products) {
	return http.get('/service/startService', {
		params: {
			serviceId,
			products
		}
	})
}

//结束服务
export function getend( serviceId) {
	return http.get('/service/submitService', {
		params: {
			serviceId,
			
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
export function register(phone, password, verifyCode) {
	return http.post('/oauth/regist', {
		phone,
		password,
		verifyCode,
		clientId: 'app'
	})
}




//登录
export function login(username, password, client_id) {
	return http.post('/oauth/login', {
		username,
		password,
		client_id,
		client_secret: '123456',
		grant_type: 'password'
	}, {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
	})
}



/* 
	upLoad
 */



//修改 上传 个人信息
export function setUserInfo(consId, nikeName, sex) {
	return http.upload('/consumer/editConsumerMessage1', {
		params: {},
		/* 会加在url上 */
		files: [], // 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。App、H5（ 2.6.15+）
		fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
		filePath: '', // 要上传文件资源的路径。
		name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
		header: {},
		/* 会与全局header合并，如有同名属性，局部覆盖全局 */
		formData: {
			consId,
			nikeName,
			sex
		} // HTTP 请求中其他额外的 form data
	})

}
