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
	// console.log(tokens)
}



// 登录
export function login(userName, password) {
	return http.get('/employee/login', {
		params: {
			userName,
			password
		}
	})
}



//  搜索老人
export function getsearchElder(regionId, searchContent) {
	return http.get('/elder/searchElder', {
		params: {
			regionId, //id
			searchContent //名字
		}
	})
}


//  巡视订单
export function getTour(regionId, employeeId) {
	return http.get('/order', {
		params: {
			regionId, //区域id
			type:0, 
			employeeId,//员工id
		}
	})
}

//  老人求助
export function getSeekhelp(regionId, employeeId) {
	return http.get('/order', {
		params: {
			regionId, //区域id
			type:1, 
			employeeId,//员工id
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

//提交主动服务
export function activeService(beImages, afImages,elderId, employeeId, content) {
	return http.post('/order/genActiveOrder', {
		beImages,
		afImages,
		elderId,
		employeeId,
		content
	})
}


//提交主动服务(巡视)
export function submitService(beImages, afImages,content, type, elderId,orderId) {
	return http.post('/order/submitService', {
		beImages,
		afImages,
		content,
		type,
		elderId,
		orderId
	})
}

//激光推送
export function jPush(employeeId,registrationId) {
	return http.post('/jPush', {
		employeeId,
		registrationId
	})
}

//发起请求协助
export function postRelease(orderId,parentOrderType,content) {
	return http.post('/order/colleagueAssistance', {
		orderId,
		parentOrderType,
		receiveEmpId:null,
		content
	})
}










/* 
	upLoad
 */



// //修改 上传 个人信息
// export function setUserInfo(consId, nikeName, sex) {
// 	return http.upload('/consumer/editConsumerMessage1', {
// 		params: {},
// 		/* 会加在url上 */
// 		files: [], // 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。App、H5（ 2.6.15+）
// 		fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
// 		filePath: '', // 要上传文件资源的路径。
// 		name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
// 		header: {},
// 		/* 会与全局header合并，如有同名属性，局部覆盖全局 */
// 		formData: {
// 			consId,
// 			nikeName,
// 			sex
// 		} // HTTP 请求中其他额外的 form data
// 	})

// }


/* 
	PUT
*/


//更新订单状态
export function putordere(orderId,type,status) {
	return http.put('/order/changeOrderStatus', {
		orderId,
		type,
		status
	})
}

//更新员工状态
export function workStatus(employeeId, status) {
	return http.put('/employee/updateWorkStatus', {
		// params: {
			employeeId,
			status
		// }
	})
}

//接单  单号：前缀加单号  X 巡视  A报警 H协助
export function receiveOrder(orderId, employeeId) {
	return http.put('/order/receiveOrder', {
		orderId,
		employeeId
	})
}




