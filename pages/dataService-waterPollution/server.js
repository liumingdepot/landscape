import {get} from '@/common/axios.js'

export const findWaterautoHourdata =  async () =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/findWaterautoHourdata',
	})
	return res.data
}