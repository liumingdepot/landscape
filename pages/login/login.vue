<template>
	<view class="login">
		<view class="title">欢迎登录</view>
		<view class="text">铜川市山水林田湖生态修复综合展示系统</view>
		<view class="item" :style="{'border-bottom-color': borderColor1}">
			<image src="/static/login/1.png" mode=""></image>
			<input type="text" v-model="username" placeholder="请输入用户名" :placeholder-style="{color:'#aaaaaa'}"
			@focus="borderColor1 = '#568fe4'" @blur="borderColor1 = '#e5e5e5'"/>
		</view>
		<view class="item" :style="{'border-bottom-color': borderColor2}">
			<image src="/static/login/2.png" mode=""></image>
			<input :type="type" v-model="password" placeholder="请输入密码" :placeholder-style="{color:'#aaaaaa'}"
			@focus="borderColor2 = '#568fe4'" @blur="borderColor2 = '#e5e5e5'"/>
			<image :src="type == 'password'?'/static/login/3.png':'/static/login/4.png'" 
			@tap="type = type == 'text'?'password':'text'"></image>
		</view>
		<image src="/static/login/5.png" class="btn" @tap="applogin"></image>
		<view class="back" @tap="back">
			<image src="/static/login/back.jpg" mode=""></image>
			<view>退出登录</view>
		</view>
	</view>
</template>

<script>
	import {
		Applogin
	} from './server.js'
	export default {
		data() {
			return {
				borderColor1:'#e5e5e5',
				borderColor2:'#e5e5e5',
				type:'password',
				username: uni.getStorageSync('username'),
				password: uni.getStorageSync('password'),
			};
		},
		methods: {
			applogin() {
				Applogin({
					username: this.username,
					password: this.password
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						uni.setStorageSync('username', this.username)
						uni.setStorageSync('password', this.password)
						uni.setStorageSync('token', res.token)
						uni.switchTab({
							url:'/pages/home/home'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			back(){
				this.username = ''
				this.password =  ''
				uni.clearStorageSync();
			}
		}
	}
</script>
<style>
	page{
		background-color: #ffffff;
	}
</style>
<style lang="scss" scoped>
.login{
	width: 100%;
	box-sizing: border-box;
	padding: $height 50rpx;
	.title{
		font-size: 46rpx;
		padding: 60rpx 0 38rpx 0;
		font-weight: bolder;
	}
	.text{
		font-size: 32rpx;
		padding-bottom: 72rpx;
		color: #568fe4;
	}
	.item{
		height: 120rpx;
		border-bottom: 2rpx solid #e5e5e5;
		display: grid;
		align-items: center;
		grid-template-columns: 100rpx auto 100rpx;
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}
	.btn{
		display: block;
		margin: 54rpx auto;
		width: 200rpx;
		height: 200rpx;
	}
	.back{
		position: fixed;
		width: 650rpx;
		bottom: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #568fe4;
		image{
			margin-right: 20rpx;
			width: 40rpx;
			height: 20rpx;
		}
	}
}
</style>
