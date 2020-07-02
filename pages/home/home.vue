<template>
	<view class="home">
		<!-- 头部 -->
		<view class="header">
			<image src="../../static/image/title.png" class="title-bg"></image>
			<view class="subtitle">【铜川市】</view>
			<view class="statistics">
				<view class="item">
					<view class="item-number">{{xmdata.XMSL}}</view>
					<view class="item-text">项目数量</view>
				</view>
				<view class="item">
					<view class="item-number">{{xmdata.XMJE}}<text style="font-size: 28rpx;margin-left: 6rpx;">亿</text></view>
					<view class="item-text">项目金额</view>
				</view>
				<view class="item">
					<view class="item-number">{{xmdata.XMJGS}}</view>
					<view class="item-text">已竣工</view>
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="title">六大类项目统计</view>
		<!-- 主要内容 -->
		<view class="main">
			<view class="item" @tap="goTohomeItem(flData.szybhData.SZYBH,3)">
				<image class="img" src="../../static/image/e1.png"></image>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;">
					<view class="text">水资源保护</view>
					<view style="color: #999999;font-size: 26rpx;">{{flData.szybhData.SZYBHJD}}%</view>
				</view>
				<progress :percent="flData.szybhData.SZYBHJD" activeColor="#87c6ef" stroke-width="4" />
			</view>
			<view class="item" @tap="goTohomeItem(flData.stlsData.STLS,1)">
				<image class="img" src="../../static/image/e2.png"></image>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;">
					<view class="text">水土保持</view>
					<view style="color: #999999;font-size: 26rpx;">{{flData.stlsData.STLSJD}}%</view>
				</view>
				<progress :percent="flData.stlsData.STLSJD" activeColor="#87c6ef" stroke-width="4" />
			</view>
			<view class="item" @tap="goTohomeItem(flData.ncmyData.NCMY,5)">
				<image class="img" src="../../static/image/e5.png"></image>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;">
					<view class="text">农村面源</view>
					<view style="color: #999999;font-size: 26rpx;">{{flData.ncmyData.NCMYJD}}%</view>
				</view>
				<progress :percent="flData.ncmyData.NCMYJD" activeColor="#87c6ef" stroke-width="4" />
			</view>
			<view class="item" @tap="goTohomeItem(flData.ntstData.NTST,2)">
				<image class="img" src="../../static/image/e3.png"></image>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;">
					<view class="text">农田生态</view>
					<view style="color: #999999;font-size: 26rpx;">{{flData.ntstData.NTSTJD}}%</view>
				</view>
				<progress :percent="flData.ntstData.NTSTJD" activeColor="#87c6ef" stroke-width="4" />
			</view>
			<view class="item" @tap="goTohomeItem(flData.fqksData.FQKS,4)">
				<image class="img" src="../../static/image/e6.png"></image>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;">
					<view class="text">废弃矿山</view>
					<view style="color: #999999;font-size: 26rpx;">{{flData.fqksData.FQKSJD}}%</view>
				</view>
				<progress :percent="flData.fqksData.FQKSJD" activeColor="#87c6ef" stroke-width="4" />
			</view>
			<view class="item">
				<image class="img" src="../../static/image/e4.png"></image>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;">
					<view class="text">机制创新</view>
					<view style="color: #999999;font-size: 26rpx;">85.5%</view>
				</view>
				<progress :percent="85.5" activeColor="#87c6ef" stroke-width="4" />
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="login">
				<view class="item">
					<view class="title">用户名</view>
					<input type="text" placeholder-class="input" v-model="username" placeholder="请输入用户名" />
				</view>
				<view class="item">
					<view class="title">密码</view>
					<input type="password" placeholder-class="input" v-model="password" placeholder="请输入密码" />
				</view>
				<view class="primary" @tap="applogin">登录</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getAppindexdataShow,
		Applogin
	} from './server.js'
	export default {
		data() {
			return {
				xmdata: {},
				flData: {
					fqksData: {
						FQKS: "废弃矿山综合整治",
						FQKSJD: 87.75
					},
					ncmyData: {
						NCMY: "农村面源污染整治",
						NCMYJD: 85.5
					},
					ntstData: {
						NTST: "农田生态系统提升工程",
						NTSTJD: 91
					},
					stlsData: {
						STLS: "水土流失综合治理",
						STLSJD: 89.5
					},
					szybhData: {
						SZYBH: "水资源保护与综合利用",
						SZYBHJD: 88.4
					},
				}
			};
		},
		async onLoad() {
			const data = await getAppindexdataShow()
			this.xmdata = data.xmdata
			this.flData = data.flData
		},
		onHide() {
			const token = uni.getStorageSync('token');
			if (!token) {
				uni.switchTab({
					url: '/pages/home/home'
				});
				this.$refs.popup.open()
			}
		},
		methods: {
			goTohomeItem(title, id) {
				uni.navigateTo({
					url: `/pages/home-Item/home-Item?title=${title}&id=${id}`,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			applogin() {
				Applogin({
					username: this.username,
					password: this.password
				}).then(res => {
					if(res.code == 0){
						uni.showToast({
							title:'登录成功',
							icon:'none'
						})
						uni.setStorageSync('token',res.token)
						this.$refs.popup.close()
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 750rpx;
		line-height: 1;
		background: url(../../static/image/bg.png) no-repeat;
		background-size: 100% 448rpx;

		.header {
			width: 100%;
			height: 448rpx;
			text-align: center;
			color: #ffffff;
			background-image: url(../../static/image/bg1.png);
			background-size: 50% 50%;
			background-repeat: no-repeat;
			background-position: 200rpx 0;
			border-radius: 0 0 26rpx 26rpx;

			.title-bg {
				padding: 106rpx 0 44rpx 0;
				height: 40rpx;
				width: 574rpx;
			}

			.subtitle {
				font-size: 28rpx;
				font-weight: bold;
			}

			.statistics {
				margin-top: 66rpx;
				border-top: 2rpx solid #3a9edf;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.item {

					.item-number {
						font-weight: bold;
						font-size: 40rpx;
						padding: 34rpx 0 26rpx 0;
					}

					.item-text {
						font-size: 26rpx;
					}
				}
			}
		}

		.title {
			font-size: 30rpx;
			line-height: 110rpx;
			font-weight: bolder;
			padding-left: 40rpx;
		}

		.main {
			background-color: #f2f2f2;
			margin: 0 16rpx 32rpx 16rpx;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 4rpx;

			&::after {
				display: block;
				height: 50rpx;
			}

			.item {
				background-color: #ffffff;
				height: 264rpx;
				box-sizing: border-box;
				padding: 24rpx;

				.img {
					margin: 24rpx 0 52rpx 16rpx;
					width: 68rpx;
					height: 68rpx;
				}

				.text {
					font-size: 30rpx;
					font-weight: bolder;
				}

				.content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 26rpx;

					.percentage {
						font-size: 26rpx;
						color: #999999;
					}
				}
			}
		}

		.login {
			width: 600rpx;
			background-color: #ffffff;
			border-radius: 10rpx;

			.item {
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #e5e5e5;

				.title {
					width: 4em;
				}
			}

			.primary {
				width: 100%;
				line-height: 80rpx;
				text-align: center;
				background-color: #3a9edf;
				border-radius: 0 0 10rpx 10rpx;
				color: #fff;
			}
		}
	}
</style>
