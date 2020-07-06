<template>
	<view class="table">
		<view class="header">
			<!-- 标题 -->
			<view class="top">
				<image src="/static/icon/back.png" class="img" @tap="back"></image>
				<view>水质监测</view>
				<view></view>
				<!-- <image src="/static/icon/Sort.png" class="img"></image> -->
			</view>
			<view class="tatle-header">
				<view>监测时间</view>
				<view>高锰酸盐</view>
				<view>氨氮</view>
				<view>总磷</view>
				<view>溶解氧</view>
			</view>
		</view>
		<view class="main">
			<view v-for="(item,index) in dataList" :key="index" class="table-item">
				<view class="company">{{item.MONITORTIME}}</view>
				<view class="content">
					<view class="item">
						<view class="_item">{{item.GMSYZS}}</view>
						<view class="_item">{{item.AD}}</view>
						<view class="_item">{{item.ZL}}</view>
						<view class="_item">{{item.RJY}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { findWaterautoHourdata } from './server.js'
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
				uni.showLoading({
					title:'加载中'
				})
				const data = await findWaterautoHourdata();
				this.dataList = data
				setTimeout(()=>{
					uni.hideLoading()
				},1000)
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
				line-height: 68rpx;
				display: grid;
				text-align: center;
				grid-template-columns: 200rpx repeat(4, 1fr);
			}
		}

		.main {
			font-size: 24rpx;
			padding-top: 160rpx;

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
					width: 200rpx;
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
					width: 550rpx;
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
