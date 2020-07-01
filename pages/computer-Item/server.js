import {get} from '@/common/axios.js'

export const queryprojectleftshow =  async proId =>{
	const res = await get({
		url:'commonservice-system/swagger2/say/queryprojectleftshow',
		data:{
			proId
		}
	})
	if(res.code == 200){
		return res.data
	}else{
		uni.showToast({
		    title: res.msg,
			icon:'none',
		    duration: 2000
		});
		return res.code
	}
}