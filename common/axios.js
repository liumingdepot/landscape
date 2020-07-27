import {
	apiUrl
} from './config.js'

export const axios = ({
	url,
	data,
	method,
	header
}) => {
	const dataValue = { ...data
	}
	for (let key in dataValue) {
		//如果参数为空 不传此参数
		if (dataValue[key] === undefined || dataValue[key] === null || dataValue[key] === 0) {
			delete dataValue[key]
		}
	}
	return uni.request({
		url,
		data: dataValue,
		method,
		header
	});
}

export const get = async ({
	allurl,
	url,
	data
}) => {
	const [err, res] = await axios({
		method: 'get',
		url: url ? apiUrl + url : allurl,
		data
	})
	if (err) {
		return err
	}
	return res.data
}

export const post = async ({
	allurl,
	url,
	data,
	parames
}) => {
	const header = parames ? {
		"Content-Type": "application/x-www-form-urlencoded"
	} : {};
	const dataValue = data ? data : parames
	const [err, res] = await axios({
		method: 'post',
		url: url ? apiUrl + url : allurl,
		data: dataValue,
		header
	})
	if (err) {
		return err
	}
	return res.data
}
