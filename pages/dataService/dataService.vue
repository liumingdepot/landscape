<template>
	<view class="dataService">
		<!-- AQL -->
		<view class="title">
			<view>铜川市AQL</view>
			<view style="color: #488df2;" @tap="navTo('dataService-aql')">站点数据</view>
		</view>
		<view class="gauge">
			<u-charts v-if="gauge" chartType="gauge" :chartData="chartData" canvasId="gauge" :cWidth="screenWidth" cHeight="230"
			 :opts="{}" />
			<view class="level level1" v-if="QUALITY.includes('优')">{{QUALITY}}</view>
			<view class="level level2" v-else-if="QUALITY.includes('良')">{{QUALITY}}</view>
			<view class="level level3" v-else-if="QUALITY.includes('中')">{{QUALITY}}</view>
			<view class="level level4" v-else-if="QUALITY.includes('差')">{{QUALITY}}</view>
			<view class="level level5" v-else-if="QUALITY.includes('重')">{{QUALITY}}</view>
		</view>
		<view class="scroll-view">
			<view class="scroll-view-item" v-for="(item,index) in weather" :key="index">
				<view class="p1">{{item.PRETIME}}</view>
				<view class="p2">{{item.LIBAI}}</view>
				<view class="scroll-view-box item1" v-if="item.AQILEVEL.includes('优')">{{item.AQILEVEL}}</view>
				<view class="scroll-view-box item2" v-else-if="item.AQILEVEL.includes('良')">{{item.AQILEVEL}}</view>
				<view class="scroll-view-box item3" v-else-if="item.AQILEVEL.includes('中')">{{item.AQILEVEL}}</view>
				<view class="scroll-view-box item4" v-else-if="item.AQILEVEL.includes('差')">{{item.AQILEVEL}}</view>
				<view class="scroll-view-box item5" v-else-if="item.AQILEVEL.includes('重')">>{{item.AQILEVEL}}</view>
			</view>
		</view>

		<view class="pollution">
			<!-- 企业污染源 -->
			<view class="title2">
				<view>企业污染源</view>
				<view style="color: #488df2;" @tap="navTo('dataService-pollution')">企业列表</view>
			</view>
			<view class="grid">
				<view class="item">正常</view>
				<view class="item">超标</view>
				<view class="item">停产</view>
				<view class="item">故障</view>
				<view class="item">25</view>
				<view class="item">0</view>
				<view class="item">0</view>
				<view class="item">0</view>
			</view>
			<view class="foot">数据发布日期 {{date}}</view>
		</view>

		<view class="waterPollution">
			<view class="title2">
				<view>水污染检测</view>
				<view style="color: #488df2;" @tap="navTo('dataService-waterPollution')">更多</view>
			</view>
			<view class="grid">
				<view class="item">名称</view>
				<view class="item">河流</view>
				<view class="item">岔口</view>
				<view class="item">{{waterPollution.AREANAME}}</view>
				<view class="item">{{waterPollution.RIVERNAME}}</view>
				<view class="item">{{waterPollution.MNNAME}}</view>
				<view class="item">电导率</view>
				<view class="item">总磷</view>
				<view class="item">PH（无量纲）</view>
				<view class="item">{{waterPollution.DDL}}</view>
				<view class="item">{{waterPollution.ZD}}</view>
				<view class="item">{{waterPollution.PH}}</view>
				<view class="item">溶解氧</view>
				<view class="item">浊度</view>
				<view class="item">水温</view>
				<view class="item">{{waterPollution.RJY}}</view>
				<view class="item">{{waterPollution.SD}}</view>
				<view class="item">{{waterPollution.WATERTEMP}}</view>
			</view>
			<view class="foot">数据发布日期 {{waterPollution.MONITORTIME}}</view>
		</view>
	</view>
</template>

<script>
	import {
		queryShishiAqiAndStaionlist,
		findWaterautoHourdata
	} from './server.js'
	export default {
		data() {
			return {
				screenWidth: '',
				gauge: false,
				chartData: {},
				QUALITY: '',
				today: {},
				weather: [],
				date: '',
				waterPollution: {}
			};
		},
		async onLoad() {
			const info = uni.getSystemInfoSync()
			this.screenWidth = info.screenWidth
			const date = new Date()
			this.date = date.toLocaleDateString()
			const waterPollution = await findWaterautoHourdata()
			this.waterPollution = waterPollution[0]
		},
		onShow() {
			this.getWeather()
		},
		methods: {
			//获取天气
			async getWeather() {
				uni.showLoading({
					title: '加载中'
				})
				this.gauge = false
				const data = await queryShishiAqiAndStaionlist();
				this.chartData = {
					categories: [{
						value: data.AQI / 500,
						color: '#4bbd4e'
					}, {
						value: 1,
						color: '#eaeaea'
					}],
					series: [{
						name: 'AQL空气质量',
						data: data.AQI / 500,
						num: data.AQI
					}]
				}
				this.QUALITY = data.QUALITY
				const week = {
					['1']: '周一',
					['2']: '周二',
					['3']: '周三',
					['4']: '周四',
					['5']: '周五',
					['6']: '周六',
					['7']: '周日',
				}
				for (let item of data.YUBAOLIST) {
					item.LIBAI = week[item.LIBAI]
					item.PRETIME = item.PRETIME.replace('-', '/')
				}
				this.weather = data.YUBAOLIST
				this.gauge = true
				uni.hideLoading()
			},
			navTo(url) {
				uni.navigateTo({
					url: `/pages/${url}/${url}`,
					animationType: 'slide-in-right',
					animationDuration: 0
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dataService {
		font-size: 28rpx;

		.title {
			background-color: #ffffff;
			position: fixed;
			width: 738rpx;
			box-sizing: border-box;
			margin: 0 6rpx;
			padding: 0 42rpx;
			height: 98rpx;
			border-bottom: 1rpx solid #e1e1e1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 999;
		}

		.gauge {
			background-color: #ffffff;
			padding-top: 100rpx;
			text-align: center;
			border-bottom: 1rpx solid #e1e1e1;
			position: relative;

			.level {
				position: absolute;
				bottom: 100rpx;
				left: 320rpx;
				width: 110rpx;
				height: 60rpx;
				font-size: 28rpx;
				line-height: 60rpx;
				color: #ffffff;
			}

			.level1 {
				background-color: #4bbd4e;
			}

			.level2 {
				background-color: #87c624;
			}

			.level3 {
				background-color: #f2660b;
			}

			.level4 {
				background-color: #eb2e29;
			}

		}

		.scroll-view {
			background-color: #ffffff;
			margin-bottom: 26rpx;
			width: 100%;
			height: 190rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.scroll-view-item {
				width: 136rpx;
				text-align: center;

				.p1 {
					line-height: 78rpx;
				}

				.p2 {
					padding-bottom: 22rpx;
				}

				.scroll-view-box {
					margin: 0 auto;
					width: 90rpx;
					height: 40rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #ffffff;
				}

				.item1 {
					background-color: #4bbd4e;
				}

				.item2 {
					background-color: #87c624;
				}

				.item3 {
					background-color: #f2660b;
				}

				.item4 {
					background-color: #eb2e29;
				}
			}
		}

		.pollution {
			background-color: #ffffff;

			.title2 {
				width: 750rpx;
				position: relative;
				box-sizing: border-box;
				padding: 0 42rpx;
				height: 98rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&::after {
					position: absolute;
					bottom: 0;
					left: 8rpx;
					width: 738rpx;
					height: 1rpx;
					background: #e1e1e1;
					content: '';
					display: block;
				}
			}

			.grid {
				margin-top: 36rpx;
				display: grid;
				padding: 0 28rpx;
				background-color: #ffffff;
				grid-template-columns: 1fr 1fr 1fr 1fr;
				grid-template-rows: 58rpx 100rpx;

				.item {
					text-align: center;
					line-height: 100rpx;
					border: 1rpx solid #e1e1e1;

					&:nth-of-type(1) {
						line-height: 58rpx;
						border-top: 6rpx solid #6dcd0a;
					}

					&:nth-of-type(2) {
						line-height: 58rpx;
						border-top: 6rpx solid #f54949;
					}

					&:nth-of-type(3) {
						line-height: 58rpx;
						border-top: 6rpx solid #808080;
					}

					&:nth-of-type(4) {
						line-height: 58rpx;
						border-top: 6rpx solid #feb64a;
					}
				}
			}

			.foot {
				line-height: 132rpx;
				background-color: #ffffff;
				padding-left: 40rpx;
				color: #aaaaaa;
				margin-bottom: 30rpx;
			}
		}

		.waterPollution {
			background-color: #ffffff;

			.title2 {
				width: 750rpx;
				position: relative;
				box-sizing: border-box;
				padding: 0 42rpx;
				height: 98rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&::after {
					position: absolute;
					bottom: 0;
					left: 8rpx;
					width: 738rpx;
					height: 1rpx;
					background: #e1e1e1;
					content: '';
					display: block;
				}
			}

			.grid {
				margin-top: 36rpx;
				display: grid;
				padding: 0 28rpx;
				background-color: #ffffff;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: 58rpx 100rpx 58rpx 100rpx 58rpx 100rpx;

				.item {
					text-align: center;
					line-height: 100rpx;
					border: 1rpx solid #e1e1e1;

					&:nth-of-type(1),
					&:nth-of-type(8),
					&:nth-of-type(15),{
						line-height: 58rpx;
						border-top: 6rpx solid #6dcd0a;
					}

					&:nth-of-type(2),
					&:nth-of-type(9),
					&:nth-of-type(13){
						line-height: 58rpx;
						border-top: 6rpx solid #f54949;
					}

					&:nth-of-type(3),
					&:nth-of-type(7),
					&:nth-of-type(14){
						line-height: 58rpx;
						border-top: 6rpx solid #808080;
					}
				}
			}

			.foot {
				line-height: 132rpx;
				background-color: #ffffff;
				padding-left: 40rpx;
				color: #aaaaaa;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
