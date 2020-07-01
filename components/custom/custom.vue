<template>
	<view class="header" :style="{backgroundColor:backgroundColor||'#ffffff'}">
		<view class="nav" 
		:style="{
			backgroundColor:backgroundColor||'#ffffff',
			borderBottom: border?'2rpx solid #e6e6e6':''
		}">
			<view class="top"></view>
			<view class="body">
				<image src="/static/icon/back.png" class="img" @tap="back"></image>
				<view class="title">{{title||''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['title','backgroundColor','border'],
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100vw;
		height: 100rpx;
		position: relative;
		padding-top: $height;
		z-index: 999999;

		.nav {
			z-index: 99999;
			width: 100%;
			position: fixed;
			box-sizing: border-box;
			top: 0;
			left: 0;
			padding: 32rpx 38rpx;

			.body {
				display: flex;
				align-items: center;
				line-height: 38rpx;

				.img {
					width: 38rpx;
					height: 38rpx;
					margin-right: 42rpx;
				}
				
				.title{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.top {
				height: $height;
			}

		}
	}
</style>
