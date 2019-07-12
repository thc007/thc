import Fly from 'flyio/dist/npm/wx';
const fly = new Fly();
// const host = 'http://172.16.14.208:3000';
const host = 'https://wxreq.hwcor.com';
// const host = 'http://172.16.14.247:80'
// 添加请求拦截器

var loginPath = false;
fly.interceptors.request.use((request) => {
	wx.showLoading({
		title: '加载中',
		mask: true
	})
	if (request.url.split('/')[6] == "wechatAppLogin") {
		loginPath = true
	} else {
		loginPath = false
	}
	if (request.url.split('/')[6] === 'wxAppletLoginWXSrv' || request.url.split('/')[6] === 'getVCode' || request.url.split(
			'/')[6] === 'wechatAppLogin' ||
		request.url.split('/')[6] === "wxAppletDecryptData") {

	} else {
		var uid = wx.getStorageSync('uid');
		var userSessionId = wx.getStorageSync('userSessionId');
		request.url = request.url + `?usid=UID_${uid}&usval=${userSessionId}`;
	}
	// request.headers["X-Tag"] = "flyio";
	// request.headers['content-type']= 'application/json';
	request.headers = {
		'X-Tag': 'flyio',
		'content-type': 'application/json',
		'cookie': wx.getStorageSync("cookie")
	}
	let authParams = {
		// 公共参数
		// 'categoryType': 'SaleGoodsType@sim',
		// 'streamNo': 'wxapp153570682909641893',
		// 'reqSource': 'MALL_H5',
		// 'appid': 'string',
		// 'timestamp': new Date().getTime(),
		// 'sign': 'string'
	}

	request.body && Object.keys(request.body).forEach((val) => {
		if (request.body[val] === '') {
			delete request.body[val]
		};
	})
	request.body = {
		...request.body,
		...authParams
	}
	return request
});
// 添加响应拦截器
fly.interceptors.response.use(
	(response) => {
		wx.hideLoading()
		console.log('response:', response)
		if (response.headers['set-cookie']) {
			wx.setStorageSync("cookie", response.headers['set-cookie'][0])
		}
		if (loginPath) {
			wx.setStorageSync("userSessionId", response.data.userSessionId)
		}
		return response.data // 请求成功之后将返回值返回
	},
	(err) => {
		// 请求出错，根据返回状态码判断出错原因
		console.log("err", err)
		wx.hideLoading()
		if (err.response.data == "error_usersession_failed") {
			getUSID(res => {
				// console.log("userSessionId",res)
				// requestdata(err.request.url.split('?')[0],err.request.body)
				requestdata(err.request.url.split('?')[0],err.request.body,res=>{
					return res.data
				}).catch(err=>{
					return err;
				})

			})
			getUSID()
		}

	}
)

// function requestdata(url, data, callback) {
// 	console.log("url:", url)
// 	console.log(data)
// 	// wx.setStorageSync("userSessionId", res)
// 	let options = {
// 		method: "post",
// 		timeout: "5000",
// 		parseJson: true
// 	}
// 	console.log("fly:", fly)
// 	fly.request("https://wxreq.hwcor.com" + url, data, options).then(res => {
// 		callback(res);
// 	}).catch(e => {
// 		console.log("e,:", e)
// 	})
// }
function getUSID(callback) {
	let phoneNumber = wx.getStorageSync("phoneNumber")
	// console.log("phoneNumber", phoneNumber)
	const url = 'https://wxreq.hwcor.com/v1/r/PCPP/UserServer/WechatAppLoginObj/wechatAppLogin'
	const data = {
		mobile: phoneNumber,
	}
	const options = {
		method: "post",
		timeout: "8000",
		parseJson: true,
	}
	fly.request(url, data, options).then((res) => {
		console.log(1111111111111111111)
					callback(res)
				// resolve(res)
				//输出请求数据
				// console.log("res", res)
				// wx.setStorageSync("userSessionId", res.userSessionId)
				//输出响应头
			}).catch(err => {
				// reject(err)
			})
	// let usid = await test();
	// console.log("usid", usid)
}
// 
// function test() {
// 	return new Promise((resolve, reject) => {
// 		fly.request(url, data, options).then((res) => {
// 			console.log("11111");
// 			resolve(res)
// 			//输出请求数据
// 			// console.log("res", res)
// 			// wx.setStorageSync("userSessionId", res.userSessionId)
// 			//输出响应头
// 		}).catch(err => {
// 			reject(err)
// 		})
// 	})
// }

fly.config.baseURL = host

export default fly
