<template>
	<view class="computerItem">
		<v-custom :title="xmjsData.xmName" border />
		<!-- 头部导航 -->
		<view class="nav">
			<view v-for="(item,index) in nav" :key="index" :class="current == index ? 'item':''" @tap="changeNav(index)">{{item}}</view>
		</view>
		<!-- 主要内容 -->
		<swiper class="swiper" :current="current" @change="changeCurrent">
			<!-- 项目简介 -->
			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%;">
					<!-- 轮播图 -->
					<swiper class="swiper-img" autoplay :interval='2000' :circular="true">
						<swiper-item v-for="(item,index) in xmjsData.xmcgPhoto" :key="index">
							<image class="img" :src="imgUrl + item.materialPath"></image>
						</swiper-item>
					</swiper>
					<!-- 表格数据 -->
					<view class="main">
						<view class="list">
							<view class="left">项目所在地</view>
							<view class="right">{{xmjsData.xmArea}}</view>
						</view>
						<view class="list">
							<view class="left">实施年限</view>
							<view class="right">{{xmjsData.xmTime}}</view>
						</view>
						<view class="list">
							<view class="left">项目状态</view>
							<view class="right">{{xmjsData.xmStatus}}</view>
						</view>
						<view class="list">
							<view class="left">总投资额</view>
							<view class="right">{{xmjsData.xmjsZtz||0}}万元</view>
						</view>
						<view class="list">
							<view class="left">主体单位</view>
							<view class="right">{{xmjsData.xmPlace}}</view>
						</view>
						<view class="list">
							<view class="left">涵盖分类</view>
							<view class="_right">
								<view class="tag tag1" v-if="xmFivetype.includes(3)">水资源保护</view>
								<view class="tag tag2" v-if="xmFivetype.includes(1)">水土保持</view>
								<view class="tag tag3" v-if="xmFivetype.includes(4)">矿山修复</view>
								<view class="tag tag1" v-if="xmFivetype.includes(2)">农田生态系统</view>
								<view class="tag tag2" v-if="xmFivetype.includes(5)">面源污染</view>
							</view>
						</view>
					</view>
					<view class="content">
						<view class="title">项目概述</view>
						<view class="text" v-for="(item,index) in xmjsData.xmjsText" :key="index">{{item}}</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 总体布局 -->
			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%;">
					<!-- 轮播图 -->
					<swiper class="swiper-img" autoplay :interval='2000' :circular="true">
						<swiper-item v-for="(item,index) in xmjsData.xmcgPhoto" :key="index">
							<image class="img" :src="imgUrl + item.materialPath"></image>
						</swiper-item>
					</swiper>
					<!-- 总体布局文字 -->
					<view class="content">
						<view class="title">总体布局</view>
						<view class="text">{{xmzbjData.xmzbjText}}</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 效益分析 -->
			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%;">
					<!-- 总体布局文字 -->
					<view class="content">
						<view class="title">经济效益</view>
						<view class="text">{{xyfxData.jjxyText}}</view>
					</view>
					<!-- 总体布局文字 -->
					<view class="content">
						<view class="title">社会效益</view>
						<view class="text">{{xyfxData.shxyText}}</view>
					</view>
					<!-- 总体布局文字 -->
					<view class="content">
						<view class="title">生态效益</view>
						<view class="text">{{xyfxData.stxyText}}</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 项目成果 -->
			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%;"  class="swiper-item3">
					<block v-for="(item,index) in xmcgData" :key="index">
						<block v-if="item.list.length>0">
							<view class="table-item-header">{{item.name}}</view>
							<view class="tatle-header">
								<view>类型</view>
								<view>数量</view>
								<view>单位</view>
							</view>
							<view v-for="(val,i) in item.list" :key="i" class="table-item">
								<view>{{val.CLASSIFY_NAME}}</view>
								<view>{{val.OUTCOME_COUNT}}</view>
								<view>{{val.OUTCOME_UNIT}}</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { imgUrl } from '@/common/globe.js'
	import { queryprojectleftshow } from './server.js'
	export default {
		data() {
			return {
				current: 0,
				xmjsData: {},
				xmzbjData: {},
				xyfxData: {},
				xmcgData: {},
				xmFivetype: '',
				nav: ['项目介绍', '总体布局', '效益分析', '项目成果'],
				imgUrl: imgUrl
			};
		},
		onLoad(option) {
			this.initData(option.id)
		},
		methods: {
			//获取数据
			async initData(id) {
				uni.showLoading({
					title: '加载中'
				})
				const data = await queryprojectleftshow(id)
				if (data == 500) {
					return
				}
				data.xmjsData.xmjsText = data.xmjsData.xmjsText.split('\n')
				this.xmFivetype = data.xmFivetype
				//项目介绍
				this.xmjsData = data.xmjsData
				//总体布局
				this.xmzbjData = data.xmzbjData
				//效益分析
				this.xyfxData = data.xyfxData
				//项目成果
				const xmcgData = [
					{ name: '农田生态系统提升工程', list: [] },
					{ name: '废弃矿山综合整治', list: [] },
					{ name: '废弃移民搬迁区整治', list: [] },
					{ name: '水土流失综合治理', list: [] },
					{ name: '水资源保护与综合利用', list: [] }
				]
				for (let xmcg of xmcgData) {
					for (let item of data.xmcgData) {
						if (item.ROOTNAME == xmcg.name) {
							xmcg.list.push(item)
						}
					}
				}
				this.xmcgData = xmcgData
				uni.hideLoading()
			},
			//点击tab切换
			changeNav(index) {
				this.current = index;
			},
			changeCurrent(e) {
				this.current = e.detail.current
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
	.computerItem {
		background-color: #ffffff;
		width: 100vw;
		line-height: 1;

		.nav {
			padding-top: $height;
			position: fixed;
			width: 100%;
			height: 106rpx;
			font-size: 28rpx;
			color: #808080;
			background-color: #ffffff;
			z-index: 9999;
			padding: 0 56rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: bold;

			.item {
				color: #5d99f3;
			}
		}

		.swiper {
			padding-top: 106rpx;
			height: calc(100vh - 260rpx);

			.swiper-item3 {
				font-size: 24rpx;
				text-align: center;

				.table-item-header {
					height: 68rpx;
					line-height: 68rpx;
					font-weight: bolder;
				}

				.tatle-header {
					background-color: #f8f8f8;
					margin-top: 2rpx;
					border-top: 1rpx solid #e1e1e1;
					border-bottom: 1rpx solid #e1e1e1;
					height: 68rpx;
					line-height: 68rpx;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
				}

				.table-item {
					border-bottom: 1rpx solid #e1e1e1;
					height: 68rpx;
					line-height: 68rpx;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
				}

			}
		}

		.aaa {
			overflow: auto;
		}

		.swiper-img {
			width: 750rpx;
			height: 392rpx;

			.img {
				width: 720rpx;
				height: 366rpx;
				padding: 0 15rpx 26rpx 15rpx;
			}
		}

		.main {
			margin: 0 15rpx;
			border: 1rpx solid #e5e5e5;
			font-size: 28rpx;

			.list {
				display: flex;
				align-items: center;
				padding: 0 40rpx;
				line-height: 78rpx;
				border-bottom: 1rpx solid #e5e5e5;

				&:nth-last-child(1) {
					border-bottom: none;
				}

				.left {
					color: #808080;
					width: 256rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;
					color: #333333;
				}

				._right {
					display: flex;
					flex-wrap: wrap;
					color: #333333;
					margin-top: 20rpx;

					.tag {
						line-height: 1;
						font-size: 24rpx;
						color: #ffffff;
						padding: 6rpx 15rpx;
						border-radius: 4rpx;
						margin: 0 20rpx 20rpx 0;
					}

					.tag1 {
						background-color: #5ebaf7;
					}

					.tag2 {
						background-color: #e0807a;
					}

					.tag3 {
						background-color: #b866f4;
					}
				}
			}
		}

		.content {
			width: 674rpx;
			padding: 0 38rpx 70rpx 38rpx;
			font-size: 28rpx;

			.title {
				font-size: 34rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				line-height: 126rpx;

				&::before {
					content: '';
					display: block;
					background-color: #2878f0;
					width: 10rpx;
					height: 36rpx;
					margin-right: 20rpx;
				}
			}

			.text {
				line-height: 1.5;
				color: #6f6f6f;
			}
		}
	}
</style>
