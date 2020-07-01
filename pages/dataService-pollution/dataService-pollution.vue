<template>
	<view class="table">
		<view class="header">
			<!-- 标题 -->
			<view class="top">
				<image src="/static/icon/back.png" class="img" @tap="back"></image>
				<view>企业污染源数据</view>
				<image src="/static/icon/Sort.png" class="img"></image>
			</view>
			<!-- 选项卡 -->
			<view class="nav">
				<view class="tags">
					<view class="tag" :class="tag == 0 ? 'active-tag':''" @click="changeTag(0)">污水企业</view>
					<view class="tag" :class="tag == 1 ? 'active-tag':''" @click="changeTag(1)">废气企业</view>
				</view>
				<view class="text">{{tag == 0?'单位 mg/m3':'单位 mk/m3'}}</view>
			</view>
			<!-- 表头 -->
			<view class="tatle-header">
				<view>企业名称</view>
				<view>排口</view>
				<view>{{tag == 0 ?'氨氮':'烟尘'}}</view>
				<view>{{tag == 0 ?'化学需氧量':'氮氧化物'}}</view>
				<view>{{tag == 0 ?'化学需氧量':'SO2'}}</view>
			</view>
		</view>
		<view class="main">
			<view v-for="(data,i) in dataList" :key="i" class="table-item">
				<view class="company">{{data.name}}</view>
				<view class="content">
					<view class="item" v-for="(item,index) in data.list" :key="index">
						<view class="list1">{{item.name}}</view>
						<view class="list">{{item.list1}}</view>
						<view class="list">{{item.list2}}</view>
						<view class="list">{{item.list3}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { fqOnlineJson, fsOnlineJson } from './server.js'
	export default {
		data() {
			return {
				tag: 0,
				dataList: []
			};
		},
		onLoad() {
			this.getFsOnlineJson()
		},
		methods: {
			async getFsOnlineJson() {
				const data = await fsOnlineJson()
				const arr = []
				for (let item of data) {
					if (!arr.includes(item.QYMC)) {
						arr.push(item.QYMC)
					}
				}
				const newArr = arr.map(val => {
					return {
						name: val,
						list: []
					}
				})
				for (let item of data) {
					for (let val of newArr) {
						if (val.name == item.QYMC) {
							val.list.push({
								name: item.DIANNAME,
								list1: item.AD,
								list2: item.CODR,
								list3: item.PH,
							})
						}
					}
				}
				this.dataList = newArr
			},
			async getFqOnlineJson() {
				const data = await fqOnlineJson()
				const arr = []
				for (let item of data) {
					if (!arr.includes(item.QYMC)) {
						arr.push(item.QYMC)
					}
				}
				const newArr = arr.map(val => {
					return {
						name: val,
						list: []
					}
				})
				for (let item of data) {
					for (let val of newArr) {
						if (val.name == item.QYMC) {
							val.list.push({
								name: item.DIANNAME,
								list1: item.YC,
								list2: item.DYHW,
								list3: item.SO2,
							})
						}
					}
				}
				this.dataList = newArr
			},
			back() {
				uni.navigateBack()
			},
			changeTag(tag) {
				this.tag = tag
				if (tag == 0) {
					this.getFsOnlineJson()
				} else {
					this.getFqOnlineJson()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table {
		background-color: #ffffff;

		.header {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			padding-top: $height;
			background-color: #ffffff;

			.top {
				font-size: 32rpx;
				padding: 0 32rpx;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.img {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.nav {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tags {
					font-size: 26rpx;
					display: flex;

					.tag {
						width: 182rpx;
						height: 76rpx;
						text-align: center;
						line-height: 76rpx;
						position: relative;
					}

					.active-tag {
						color: #488df2;

						&::after {
							position: absolute;
							bottom: 0;
							left: 66rpx;
							content: '';
							width: 50rpx;
							height: 6rpx;
							background-color: #488df2;
						}
					}
				}

				.text {
					margin-right: 10rpx;
					width: 204rpx;
					height: 50rpx;
					line-height: 50rpx;
					background-color: #f2f2f2;
					text-align: center;
					color: #333;
					font-size: 28rpx;
					border-radius: 2rpx;
				}
			}


			.tatle-header {
				margin-top: 2rpx;
				font-size: 24rpx;
				border-top: 1rpx solid #e1e1e1;
				border-bottom: 1rpx solid #e1e1e1;
				height: 68rpx;
				line-height: 68rpx;
				display: grid;
				text-align: center;
				grid-template-columns: 180rpx 180rpx 70rpx 160rpx 160rpx;
			}
		}

		.main {
			font-size: 24rpx;
			margin-top: 228rpx;
			padding-top: $height;

			.table-item {
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #e1e1e1;

				&:nth-child(2n) {
					background-color: #f1f1f1;

					.content {
						background-color: #ffffff;
					}
				}

				.company {
					width: 180rpx;
					box-sizing: border-box;
					padding: 0 28rpx;
					line-height: 1.5;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.content {
					border-left: 1rpx solid #e1e1e1;
					line-height: 168rpx;
					.item {
						display: grid;
						text-align: center;
						grid-template-columns: 180rpx 70rpx 160rpx 160rpx;
						border-top: 1rpx solid #e1e1e1;

						&:nth-of-type(1) {
							border-top: none;
						}

						.list {
							color: #488df2;
						}

						.list1 {
							color: #000000;
							line-height: 1.5;
							height: 168rpx;
							padding: 0 28rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}
		}
	}
</style>
