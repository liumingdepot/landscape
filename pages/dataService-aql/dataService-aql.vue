<template>
	<view class="table">
		<view class="header">
			<!-- 标题 -->
			<view class="top">
				<image src="/static/icon/back.png" class="img" @tap="back"></image>
				<view>AQL站点数据</view>
				<image src="/static/icon/Sort.png" class="img"></image>
			</view>
			<!-- 表头 -->
			<view class="tatle-header">
				<view>站点名称</view>
				<view>AQL</view>
				<view>等级</view>
				<view>PM2.5</view>
				<view>PM10</view>
				<view></view>
				<view>SO2</view>
				<view>NO2</view>
				<view>CO</view>
				<view>O3</view>
			</view>
		</view>
		<view class="main">
			<view v-for="(item,index) in dataList" :key="index" class="table-item">
				<view class="company">{{item.POSITIONNAME}}</view>
				<view class="content">
					<view class="item">
						<view class="_item">{{item.AQI}}</view>
						<view class="_item" style="color: #00CE47;">{{item.QUALITY}}</view>
						<view class="_item">{{item.PM2_5}}</view>
						<view class="_item">{{item.PM10}}</view>
					</view>
					<view class="item">
						<view class="_item">{{item.SO2}}</view>
						<view class="_item">{{item.NO2}}</view>
						<view class="_item">{{item.CO}}</view>
						<view class="_item">{{item.O3}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryShishiAqiAndStaionlist } from './server.js'
	export default {
		data() {
			return {
				dataList: []
			};
		},
		onLoad() {
			this.queryShishiAqi()
		},
		methods: {
			async queryShishiAqi() {
				const data = await queryShishiAqiAndStaionlist();
				this.dataList = data.STATIONLIST
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	page {
		background-color: #ffffff;
	}
</style>
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

			.tatle-header {
				margin-top: 2rpx;
				font-size: 24rpx;
				border-top: 1rpx solid #e1e1e1;
				border-bottom: 1rpx solid #e1e1e1;
				height: 136rpx;
				line-height: 68rpx;
				display: grid;
				text-align: center;
				grid-template-columns: 180rpx repeat(4, 1fr);
			}
		}

		.main {
			font-size: 24rpx;
			padding-top: 228rpx;

			&::before {
				display: block;
				content: '';
				height: $height;
			}

			.table-item {
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #e1e1e1;

				.company {
					width: 180rpx;
					height: 136rpx;
					box-sizing: border-box;
					padding: 0 28rpx;
					line-height: 1.5;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 1rpx solid #e1e1e1;
				}

				.content {
					width: 570rpx;
					line-height: 68rpx;

					.item {
						display: grid;
						text-align: center;
						grid-template-columns: repeat(4, 1fr);
						color: #488df2;

						._item {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>
