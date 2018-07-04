//# See https://www.kancloud.cn/yunye/axios/234845 for more axios.
import axios from 'axios'
let BASEURL;

//自定义配置新建一个 axios 实例
process.env.NODE_ENV === 'development'
 ? BASEURL = '/'
 : BASEURL = 'http://47.94.234.96:5050/';

//@return 拥有默认配置的axios实例
export default axios.create({
		baseURL: BASEURL,
		responseType: 'json',
	  timeout: 5000,
		maxContentLength: 2000,
		headers: {
			"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	  },
		headers: {'X-Custom-Header': 'foobar'}
});
