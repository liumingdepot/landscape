<template>
	<view class="computer">
		<view class="header">
			<ms-dropdown-menu>
				<ms-dropdown-item v-model="dataFrom.areName" :list="region" @input="changeValue"></ms-dropdown-item>
				<ms-dropdown-item v-model="dataFrom.classifytype" :list="classification" @input="changeValue"></ms-dropdown-item>
			</ms-dropdown-menu>
		</view>
	<!-- 	<view class="label" v-if="dataFrom.areName != 0">
			<view class="label-item" @click="chearValue">{{dataFrom.areName}}&nbsp;&nbsp;x</view>
		</view> -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<view class="main">
				<view class="item" v-for="(item,index) in dataList" :key="index" @tap="goToComputerItem(item)">
					<image class="item-img" src="../../static/image/f.png"></image>
					<view class="box">
						<view class="title">{{item.PRO_NAME}}</view>
						<view class="tags">
							<view class="left">
								<view class="city">{{item.AREA_NAME||'铜川市'}}</view>
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
		</mescroll-body>
	</view>
</template>

<script>
	import { commonservice } from './server.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				dataList: [],
				// 上拉加载的配置(可选)
				upOption: {
					noMoreSize:20
				},
				dataFrom: {
					classifytype: 0,
					areName: 0,
				},
				classification: [
					{ text: '全部分类', value: 0 },
					{ text: '水土流失综合治理', value: 1 },
					{ text: '农田生态系统提升工程', value: 2 },
					{ text: '水资源保护与综合利用', value: 3 },
					{ text: '废弃矿山综合整治', value: 4 },
					{ text: '农村面源污染整治', value: 5 }
				],
				region: [
					{ text: '全部区域', value: 0 },
					{ text: '耀州区', value: '耀州区' },
					{ text: '王益区', value: '王益区' },
					{ text: '印台区', value: '印台区' },
					{ text: '宜君县', value: '宜君县' },
				]
			}
		},
		methods: {
			//下拉刷新
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			//上拉加载
			async upCallback(page) {
				this.dataList = await commonservice(this.dataFrom)
				this.mescroll.endByPage(this.dataList.length, 1);
			},
			//切换数据
			changeValue() {
				this.mescroll.triggerUpScroll()
			},
			//清楚选择
			// chearValue(){
			// 	this.dataFrom.areName = 0
			// 	this.mescroll.triggerUpScroll()
			// },
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
	.computer {
		line-height: 1;
		width: 100vw;

		.header {
			background-color: #ffffff;
			height: 98rpx;
			width: 100%;
		}

		.label {
			height: 94rpx;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding: 0 40rpx;

			.label-item {
				width: 186rpx;
				height: 52rpx;
				background: #d8eefc;
				color: #0285db;
				line-height: 52rpx;
				text-align: center;
			}
		}

		.main {
			margin: 10rpx 0;
			text-align: center;

			.item {
				width: 100%;
				padding: 40rpx 30rpx;
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
							
							.tag0{
								color: #dd6673;
								padding: 8rpx 12rpx;
								background-color: #f9e3e6;
							}
							
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
