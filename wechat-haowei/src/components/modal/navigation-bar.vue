<template>
	<div class="navbar" :style="{height:navigationBarHeight}">
		<div :style="{height:  statusBarHeight}"></div>
		<div class="title-container">
			<div class='capsule' v-if="showback" @click="back">
				<span class="iconfont icon-fanhui"></span>
			</div>
			<div class="header_left">{{left_text}}</div>
			<div class='title' v-if="show_text">{{text}}</div>
			<div class="conter-tabbar" v-if="showtab">
			    <div class="page_button_l">
					有道闸
				</div>
			    <div class="page-button_r">
					无道闸
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				navigationBarHeight:0
			}
		},
		props:["text","showback","left_text","showtab","show_text"],
		methods:{
			back: function () {
				wx.navigateBack({
				  delta: 1
				})
				// wx.redirectTo({
			 //    url: '/pages/scan/main?data=err'
			 //  })
			}
		},
		onLoad() {
			let that = this;
			wx.getSystemInfo({
				success(res) {
					that.statusBarHeight = res.statusBarHeight+ 'px'
					that.navigationBarHeight = (res.statusBarHeight+44)+'px'
				}
			})
		}

	}
</script>

<style scoped="scoped">
	@font-face {
	  font-family: 'iconfont';  /* project id 1251108 */
	  src: url('//at.alicdn.com/t/font_1251108_x3kw7v7idrl.eot');
	  src: url('//at.alicdn.com/t/font_1251108_x3kw7v7idrl.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1251108_x3kw7v7idrl.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1251108_x3kw7v7idrl.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1251108_x3kw7v7idrl.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1251108_x3kw7v7idrl.svg#iconfont') format('svg');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 35rpx;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-fanhui:before {
	  content: "\e682";
	}
	.navbar {
		width: 100vw;
		background-color: #fff;
		position: fixed;
		z-index: 4;
		top:0;
		left:0;
	}

	.title-container {
		width: 692rpx;
		margin: 0rpx auto 20rpx ;
		height: 44px;
		display: flex;
		align-items: center;
		position: relative;
	}

	.capsule {
		width:5%;
		height: 32px;
		border-radius: 16px;
		display: flex;
		align-items: center;
	}

	.capsule>div {
		width: 32px;
		height: 60%;
		position: relative;
	}

	.capsule>div:nth-child(2) {
		border-left: 1px solid #777;
	}

	.capsule img {
		width: 60%;
		height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.title {
		width:40%;
		position: absolute;
		left: 104px;
		right: 104px;
		font-size: 14px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.header_left{
		width:25%;
		color:#333333;
		font-size:26rpx;
		font-weight:700;
	}
	.conter-tabbar{
		background:#FFFFFF;
		border:1rpx solid #2B8CFC;
		border-radius: 10rpx;
		display: flex;
		height:80%;
		width:40%;
		/* align-content: center; */
		align-items: center;
	}
	.tab_active{
		colr:#fff;
		background:#2B8CFC;
	}
	.conter-tabbar div{
		widht:50%;
	}
</style>
