<template>
	<div class="container">
		<navigation left_text="订单详情" showback="true"></navigation>
		<div :style="{height:navigationBarHeight}"></div>
		<div class="detail_info_wrap">
			<div class="order_payed">
				<img src="../../../../static/images/detail_bg.png" alt="">
				<div v-if="payed" class="ic_payed">已支付</div>
				<div  v-if="unpaid"  class="ic_overtime">已超时</div>
				<div v-if="finish" class="ic_finish">已完成</div>
			</div>
			<div class="parking_info">
				<div class="address">生态科技园10栋B座停车场</div>
				  <div class="center">
				    <i class="icon"><img src="../../../../static/images/@2x2.png"></i><div class="parking_name">深圳市南山区生态科技园科技南路10号</div>
				    <div class="placeNo">
				      <!-- <div class="site">{{payFeeArgs.parkName}}</div>-->
				      车位号：<span style="color:#157FFE;font-size:32rpx;"> 负一层A区02135号</span>
				    </div>
				  </div>
			</div>
			<div class="pay_wrap">
				<ul>
					<li class="plyed_fee">已支付</li>
					<li class="parking_fee"><span>停车费</span><span>￥30</span></li>
					<li v-if="finish" class="parking_fee"><span>超时停车费</span><span>￥30</span></li>
					<li class="discounts_rule"><span>活动优惠 </span><span>-￥20</span></li>
					<li class="practical_amount"><span>实付金额</span><span>￥10</span></li>
				</ul>
			</div>
			<div class="unpaid_wrap" v-if="unpaid">
				<ul>
					<li><span class="color_8F8F8F" style="font-size:30rpx;font-weight:bold;">待支付</span><span></span></li>
					<li><span class="color_gray">停车费</span><span class="color_8F8F8F">￥6</span></li>
					<li style="height:96rpx;"><span></span><span style="font-size:40rpx;color:#FF3C0A;">￥6</span></li>
				</ul>
			</div>
			<div class="bill_status"  v-if="finish" >
				<span style="color:#444444;font-size: 30rpx;font-family:'PingFang-SC-Bold';font-weight:700;">开票状态</span>
				<span class="color_gray">未开票</span>
			</div>
			<div class="order_info">
				<ul>
					<li class="orderNO "><span class="color_gray">订单编号</span><div class="color_8F8F8F">1235 4225 5266 5522 2 &nbsp; <span class="copy" @click="copyorderNO">复制</span></div></li>
					<li class="enter_time "><span class="color_gray">入位时间</span><span  class="color_8F8F8F">2019.01.18 19:44:13 &nbsp; <span v-if="finish" class="appeal" @click="appealorderNO">申诉</span></span></li>
					<li class="billing_time "  v-if="finish"  ><span class="color_gray">离位时间</span><span class="color_8F8F8F">2019.01.18 19:44:13</span></li>
					<li class="billing_time "><span class="color_gray">计费开始时间</span><span class="color_8F8F8F">2019.01.18 19:44:13</span></li>
					<li class="billing_time "  v-if="finish" ><span class="color_gray">计费结束时间</span><span class="color_8F8F8F">2019.01.18 19:44:13</span></li>
				</ul>
			</div>
			<div style="height:120rpx;"></div>
			<div v-if="unpaid" style="width: 100%;background: #fff;position:fixed;left:0rpx;bottom:0px;">
				<div class="pay">去支付</div>
			</div>
		</div>
	</div>
</template>
<script>
	import navigation from "../../../components/modal/navigation-bar"
	export default {
		components: {
			navigation
		},
		data() {
			return {
				navigationBarHeight: 0,
				finish:true,//订单是否完成
				unpaid:false,//超时订单
				payed:false,//已支付
				copy:""
			}
		},
		methods:{
			copyorderNO(){
				const that = this
				wx.setClipboardData({
					data: that.copy.toString()
				})
			}
		},
		onLoad() {
			const that = this
			wx.getSystemInfo({
				success(res) {
					that.navigationBarHeight = (res.statusBarHeight + 44) + 'px'
				}
			})
		}
	}
</script>
<style lang="stylus" scoped="scoped">
	.container {
		width: 100%;
		background: #fff;
	}

	.detail_info_wrap {
		width: 100%;
		height: 100%;
		background: #F2F3F5;
		padding-top:20rpx;
	}

	.order_payed {
		position:relative;
		width: 690rpx;
		height: 197rpx;
		margin: 0 auto 20rpx;
		border-radius:15rpx;
		padding:26rpx 32rpx;
		box-sizing:border-box;
		font-size:48rpx;
		line-height:48rpx;
		color:#fff;
	}
	.order_payed img{
		position:absolute;
		left:0;
		top:0;
		width:690rpx;
		height:197rpx;
	}
	.order_payed div{
		position:absolute;
		left:32rpx;
		top:26rpx;
		font-size:40rpx;
		line-height:48rpx;
		height:48rpx;
	}
	.order_payed .ic_overtime:before{
		background:url(../../../../static/images/ic_overtime.png) no-repeat;
	}
	.order_payed .ic_finish:before{
		background:url(../../../../static/images/ic_finish.png) no-repeat;
	}
	.order_payed .ic_payed:before{
		background:url(../../../../static/images/ic_money.png) no-repeat;
	}
	.order_payed div:before{
		content:"";
		display:inline-block;
		width:48rpx;
		height:48rpx;
		margin-right:30rpx;
		background-position:center;
		background-size: 48rpx 48rpx;
		vertical-align: bottom;
	}

	.parking_info{
		position:relative;
		width:692rpx;
		height: 261rpx;
		margin: 20rpx auto 20rpx ;
		background:#fff;
		border-radius:15rpx;
		padding:26rpx 32rpx;
		box-sizing:border-box;
	}
	.address{
		height:31rpx;
		font-size:32rpx;
		font-family:"PingFang-SC-Bold";
		font-weight:bold;
		color:rgba(68,68,68,1)
		padding:20rpx 0;
		
	}
	.parking_name{

		display:inline-block;
		color:#777777;
		font-size:26rpx;
	}
	.icon{
		  display: inline-block;
		  width:48rpx;
		  height: 48rpx;
		  vertical-align:middle;
	}
	.icon img{
		width:90%;
		height:90%;
	}
	.placeNo{
		color:#8f8f8f;
		font-size:28rpx;
		margin-top:32rpx;
		border-top:2rpx solid #F2F3F5;
		padding-top:32rpx;
	}
	.position{
		position:relative;
	}
	.pay_wrap{
		width:690rpx;
		// height:341rpx;
		background:#fff;
		margin: 20rpx auto;
		padding:0rpx 32rpx;
		box-sizing:border-box;
		border-radius:15rpx;

	}
	.pay_wrap li{
		border-bottom:2rpx solid #F2F3F5;
		height:85rpx;
		display:flex;
		line-height:85rpx;
		justify-content:space-between;
	}
	.pay_wrap .plyed_fee{
		font-size:30rpx;
		font-family:"PingFang-SC-Bold";
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.pay_wrap .parking_fee{
		width:624rpx;
		font-size:28rpx;
		font-family:"PingFang-SC-Medium";
		font-weight:500;
		color:rgba(147,147,147,1);
	}
	.pay_wrap .practical_amount{
		font-size:30rpx;
		font-family:"PingFang-SC-Medium";
		font-weight:500;
		color:rgba(60,60,60,1);
	}
	.pay_wrap .discounts_rule{
		font-size:28rpx;
		font-family:"PingFang-SC-Medium";
		font-weight:500;
		color:rgba(60,60,60,1);
	}
	.pay_wrap .discounts_rule span:first-child:after{
		content:'';
		display:inline-block;
		width :48rpx;
		height:48rpx;
		background:url(../../../../static/images/bottom.png) no-repeat;	
		background-position:25rpx 25rpx;
		background-size:25rpx 25rpx;
	}
	.pay_wrap .practical_amount span:first-child:after{
		content:'';
		display:inline-block;
		width :48rpx;
		height:48rpx;
		background:url(../../../../static/images/bottom.png) no-repeat;	
		background-position:25rpx 25rpx;
		background-size:25rpx 25rpx
	}
	.order_info{
		width:690rpx;
		// height:198rpx;
		background:#fff;
		margin: 20rpx auto;
		border-radius:15rpx;
		padding:20rpx 32rpx;
		box-sizing:border-box;
	}
	.order_info li{
		// border-bottom:2rpx solid #F2F3F5;
		height:66rpx;
		color:26rpx;
		display:flex;
		line-height:66rpx;
		justify-content:space-between;
	}
	.order_info .copy{
		display: inline-block;border:1px solid  rgba(0, 0, 0, 0.26);width: 85rpx;height:41rpx;text-align: center;position:relative;top:5%;line-height:22px;
		border-radius:5rpx;
		cursor:pointer;
		font-size:26rpx;
	}
	.order_info .appeal{
		display: inline-block;border:1px solid  #1E64E1;width: 85rpx;height:41rpx;text-align: center;position:relative;top:5%;line-height:22px;
		border-radius:5rpx;
		font-size:26rpx;
		color:#1E64E1;
	}
	.color_gray{
		color:#939393;
		font-size:26rpx;
	}
    .color_8F8F8F{
		color:#444444;
	}
	.bill_status{
		width:690rpx;
		height:86rpx;
		margin:20rpx auto;
		padding:30rpx 31rpx;
		box-sizing:border-box;
		background:#fff;
		display:flex;
		justify-content:space-between;
	}
	.unpaid_wrap{
		width:690rpx;
		// height:341rpx;
		background:#fff;
		margin: 20rpx auto;
		padding:0rpx 32rpx;
		box-sizing:border-box;
		border-radius:15rpx;
	}
	.unpaid_wrap li{
		border-bottom:2rpx solid #F2F3F5;
		height:85rpx;
		display:flex;
		line-height:85rpx;
		justify-content:space-between;
	}
	.pay{
		border-radius:6rpx;
		font-size:30rpx;
		width:482rpx;
		color: #fff;
		border-radius:6rpx;
		font-weight:500;
		height:80rpx;
		line-height:80rpx;
		background:linear-gradient(270deg,rgba(30,101,225,1),rgba(0,160,255,1));
		font-family:"PingFang-SC-Medium";
		margin:20rpx auto;
	    font-weight:500;
		text-align:center;
	}
		
</style>
