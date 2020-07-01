import {get} from '@/common/axios.js'

//首页接口
export const queryAppProjectlist_new =  async () =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/queryAppProjectlist_new',
	})
	return res.data
}