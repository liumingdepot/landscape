import {get,post} from '@/common/axios.js'

//登录接口
export const Applogin =  async parames =>{
	return await post({
		url:'commonservice-system/sys/Applogin',
		parames
	})
}