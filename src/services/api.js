import axios from './axios';


/*
*首页-列表
*@query {[num]} page [页码]
*@return Promise
*/

/**
 * [fetchHomeList description]
 * @param
 * @return {[type]}       [description]
 */


export function fetchHomeList(query){
	return axios.post('/home/List',{
			params: query
	})
}
