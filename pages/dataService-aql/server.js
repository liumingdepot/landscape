import {get} from '@/common/axios.js'

export const queryShishiAqiAndStaionlist =  async () =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/queryShishiAqiAndStaionlist'
	})
	return res.data
}