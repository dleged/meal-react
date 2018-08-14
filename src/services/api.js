import axios from './axios';

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
