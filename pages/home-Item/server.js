import {get} from '@/common/axios.js'


export const queryhomeClassifidata_new =  async fiveState =>{
	return await get({
		url:'commonservice-system/swagger2/say/queryAppfenleishowAndXmlb',
		data:{
			fiveState
		}
	})
}
