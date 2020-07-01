<script>
	import {get} from '@/common/axios.js'
	export default {
		onLaunch() {},
		async onShow() {
			const res = await get({
				url:'commonservice-system/swagger2/say/queryAppProjectlist_new',
			})
			const data = res.data
			const markers = data.map(item => {
				return {
					id: item.proId,
					latitude: Number(item.latitudeAndLongitude.split(',')[1]),
					longitude: Number(item.latitudeAndLongitude.split(',')[0]),
					iconPath:'/static/icon/bj.png',
					width:20,
					height:20,
					callout: {
						content: item.proName.length > 18 ? item.proName.slice(0,18) + '...' : item.proName,
						display: 'ALWAYS',
						color: '#666',
						borderColor: '#e1e1e1',
						padding: 2,
						borderRadius: 4,
						borderWidth: 1
					}
				}
			})
			uni.setStorageSync('markers', JSON.stringify(markers) );
		},
		onHide() {}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	page{
		background: #eff8fe;
		line-height: 1;
		width: 100vw;
	}
	/* #endif */
</style>
