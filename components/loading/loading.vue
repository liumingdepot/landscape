<template>
	<uni-popup ref="popup" type="center" :maskClick="false">
	    <view class="loading">
	    	<view><text></text></view>
	    	<view><text></text></view>
	    	<view><text></text></view>
	    </view>
	</uni-popup>
</template>

<script>
	export default {
		created() {
			this.$nextTick(function(){
				this.$refs.popup.open()
			})
		}
	}
</script>

<style scoped>
.loading{
    width: 60px;
    height: 60px;
    margin: 0 auto;
    margin-top:100px;
    position: relative;
    animation: load 3s linear infinite;
}
.loading view{
    width: 100%;
    height: 100%;
    position: absolute;
}
.loading text{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #99CC66;
    position: absolute;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
    animation: changeBgColor 3s ease infinite;
}
@keyframes load{
    0%{
        transform: rotate(0deg);
    }
    33.3%{
        transform: rotate(120deg);
    }
    66.6%{
        transform: rotate(240deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
@keyframes changeBgColor{
    0%,100%{
        background: #99CC66;
    }
    33.3%{
        background: #FFFF66;
    }
    66.6%{
        background: #FF6666;
    }
}
.loading view:nth-child(2){
    transform: rotate(120deg);
}
.loading view:nth-child(3){
    transform: rotate(240deg);
}
.loading view:nth-child(2) span{
    animation-delay: 1s;
}
.loading view:nth-child(3) span{
    animation-delay: 2s;
}
</style>
