import {get} from '@/common/axios.js'

export const fqOnlineJson =  async () =>{
	return await get({
		allurl:'http://113.140.66.227:9777/envinfo_ps/shanshuidata/fqOnlineJson',
	})
}

export const fsOnlineJson =  async () =>{
	return await get({
		allurl:'http://113.140.66.227:9777/envinfo_ps/shanshuidata/fsOnlineJson',
	})
}