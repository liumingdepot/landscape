import {get} from '@/common/axios.js'


export const commonservice =  async data =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/getProlistByareAndtype',
		data
	})
	return res.data
}
