import {get} from '@/common/axios.js'

export const queryShishiAqiAndStaionlist =  async () =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/queryShishiAqiAndStaionlist'
	})
	return res.data
}


export const fqOnlineJson =  async () =>{
	const res = await get({
		allurl:'http://113.140.66.227:9777/envinfo_ps/shanshuidata/fqOnlineJson',
	})
	return res.data
}

export const findWaterautoHourdata =  async () =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/findWaterautoHourZuixindata',
	})
	return res.data
}