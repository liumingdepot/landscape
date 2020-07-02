import {get,post} from '@/common/axios.js'

//首页接口
export const getAppindexdataShow =  async () =>{
	return await get({
		url:'commonservice-system/swagger2/say/getAppindexdataShow',
	})
}

//登录接口
export const Applogin =  async parames =>{
	return await post({
		url:'commonservice-system/sys/Applogin',
		parames
	})
}