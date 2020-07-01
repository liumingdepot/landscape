import {get} from '@/common/axios.js'

//首页接口
export const getAppindexdataShow =  async () =>{
	return await get({
		url:'commonservice-system/swagger2/say/getAppindexdataShow',
	})
}