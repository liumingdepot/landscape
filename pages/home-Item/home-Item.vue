<template>
	<view class="homeItem">
		<v-custom :title="title" backgroundColor="#dae0e9" />
		<image v-if="id" :src="'/static/image/a' + id + '.jpg'" class="title-bg" style="width: 100%;height: 480rpx;"></image>
		<view class="main">
			<view class="lists">
				<view class="list">
					<view class="num" style="color: #6699cc;">{{xmgkData.xmsl}}</view>
					<view class="text">项目数量</view>
				</view>
				<view class="list">
					<view class="num" style="color: #dd8671;">{{xmgkData.xmzje}}<text style="font-size: 28rpx;margin-left: 6rpx;">亿</text></view>
					<view class="text">投入资金</view>
				</view>
				<view class="list">
					<view class="num" style="color: #40bf80;">{{xmgkData.xmzjd}}%</view>
					<view class="text">资金占比</view>
				</view>
			</view>
			<view class="charts" v-for="(item,index) in chartDataList" :key="index">
				<view class="title">
					<view class="left">
						<view style="font-size: 30rpx;font-weight: bold;">{{item.name}}</view>
					</view>
					<view style="font-size: 30rpx;font-weight: bold;">列表</view>
				</view>
				<!-- 柱状图 -->
				<!-- <u-charts v-if="cWidth>200 && item.chartData.series[0].data.length>3" chartType="column" :chartData="item.chartData" :canvasId="'chart'+index" :cWidth="cWidth" cHeight="250" :opts="opts" class="histogram-chart" /> -->
				<!-- 柱状图2 -->
				<view class="box">
					<view class="item" v-for="(val,i) in item.data" :key="i">
						<view class="name">{{val.name}}</view>
						<progress :percent="val.bi" stroke-width="10" :activeColor="colors[index]" style="margin: 0 10rpx;"/>
						<view style="text-align: right;font-weight: bolder;width: 80rpx;">{{val.val}}</view>
					</view>
				</view>
			</view> 
		</view>
		<!-- 项目列表 -->
		<view class="project">
			<view class="project-title">项目列表（{{xmgkData.xmsl}}）</view>
			<view class="project-list" v-for="(item,index) in dataList" :key="index" @tap="goToComputerItem(item)">
				<image class="item-img" src="../../static/image/f.png"></image>
				<view class="box">
					<view class="title">{{item.PRO_NAME}}</view>
					<view class="tags">
						<view class="left">
							<view class="city">{{item.AREA_NAME}}</view>
							<view class="date">{{item.STAANDEND}}</view>
						</view>
						<view class="right">
							<view v-if="item.PRO_STATUS == '建设中'" class="tag1">{{item.PRO_STATUS}}</view>
							<view v-if="item.PRO_STATUS == '中标'" class="tag0">{{item.PRO_STATUS}}</view>
							<view v-if="item.PRO_STATUS == '项目完成'" class="tag2">{{item.PRO_STATUS}}</view>
							<view v-if="item.PRO_STATUS == '验收合格'" class="tag3">{{item.PRO_STATUS}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryhomeClassifidata_new, commonservice } from './server.js'
	export default {
		data() {
			return {
				id:'',
				title: '',
				xmgkData: {},
				dataList: [],
				//charts配置
				opts: {},
				cWidth:0,
				chartDataList: [],
				colors:['#66cc99', '#02cac9', '#57a3ec', '#66cc99', '#02cac9', '#57a3ec']
			};
		},
		onLoad(option) {
			this.title = option.title
			this.id = option.id
			this.queryhome(option.id)
			this.createSelectorQuery()
		},
		methods: {
			createSelectorQuery(){
				this.$nextTick(()=>{
				    let query = uni.createSelectorQuery().in(this);
				    query.select('.main').boundingClientRect(data => {
						if(data.width>200){
							this.cWidth = data.width
						}else{
							this.createSelectorQuery()
						}
				    }).exec()
				})
			},
			async queryhome(id) {
				const data = await queryhomeClassifidata_new(id)
				this.xmgkData = data.xmgkData
				this.dataList = data.xmlbData
				if(!data.data){
					return
				}
				const arr = []
				for (let item of data.data.shujuData) {
					if (!arr.includes(item.PNAME)) {
						arr.push(item.PNAME)
					}
				}
				const newArr = arr.map(val => {
					return {
						name: val,
						data: [],
					}
				})
				for (let item of data.data.shujuData) {
					for (let val of newArr) {
						if (val.name == item.PNAME) {
							const bi = item.OUTCOME_COUNT*100/Number((item.OUTCOME_COUNT * (1 + Math.random())).toPrecision(4))
							const num = Number(item.OUTCOME_COUNT.toFixed(2)) + item.OUTCOME_UNIT
							val.data.push({
								name:item.CLASSIFYNAME,
								val:num,
								bi
							})
						}
					}
				}
				this.chartDataList = newArr
			},
			//跳转详情
			goToComputerItem(item) {
				uni.navigateTo({
					url: `/pages/computer-Item/computer-Item?id=${item.PRO_ID}`,
					animationType: 'slide-in-right',
					animationDuration: 0
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.homeItem {
		.main {
			box-sizing: border-box;
			margin: 28rpx 14rpx 0 14rpx;
			background-color: #ffffff;

			.lists {
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 62rpx 40rpx 58rpx 40rpx;

				.list {
					.num {
						font-size: 36rpx;
						font-weight: bolder;
					}

					.text {
						margin-top: 24rpx;
						width: 132rpx;
						height: 38rpx;
						line-height: 38rpx;
						font-size: 24rpx;
						background-color: #f2f2f2;
						color: #7b7b7b;
					}
				}
			}

			.charts {
				padding-bottom: 50rpx;
				border-top:1rpx solid #e5e5e5;
				&:nth-child(1){
					border-top:none;
				}

				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 40rpx;

					.left {
						display: flex;
						align-items: center;
					}
				}

				.box {
					color: #666666;
					font-size: 24rpx;

					.item {
						height: 68rpx;
						padding: 0 46rpx;
						line-height: 68rpx;
						display: grid;
						grid-template-columns: 120rpx auto 100rpx;
						overflow: hidden;
						white-space: nowrap;
						
						.name{
							overflow: hidden;
							white-space: nowrap;
						}
					}
				}
			}
		}

		.project {
			.project-title {
				padding: 40rpx 50rpx;
				font-size: 32rpx;
				font-weight: bolder;
			}

			.project-list {
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				background-color: #ffffff;
				display: flex;
				text-align: left;
				justify-content: space-between;
				border-bottom: 2rpx solid #eaeaea;

				&:nth-last-of-type(1) {
					border-bottom: none;
				}

				.item-img {
					margin-top: 10rpx;
					width: 56rpx;
					height: 56rpx;
				}

				.box {
					font-size: 30rpx;
					width: 600rpx;

					.title {
						line-height: 1.5;
						margin-bottom: 20rpx;
						font-weight: bolder;
					}

					.tags {
						font-size: 24rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.left {
							display: flex;

							.city,
							.date {
								color: #737373;
								padding: 8rpx 12rpx;
								// background-color: #eeeeee;
								margin-right: 28rpx;
							}
						}

						.right {
							.tag1 {
								color: #dd6673;
								padding: 8rpx 12rpx;
								background-color: #f9e3e6;
							}

							.tag2 {
								color: #32abab;
								padding: 8rpx 12rpx;
								background-color: #d0f2f2;
							}

							.tag3 {
								color: #48a5f9;
								padding: 8rpx 12rpx;
								background-color: #def2fe;
							}
						}
					}
				}
			}

		}
	}
</style>
