<template>
	<div class="oder_wrap">
		<div class="navbar">
			<div :style="{height:  statusBarHeight}"></div>
			<div class="title-container">
				<div class='capsule' @click="back">
					<span class="iconfont icon-fanhui"></span>
				</div>
				<div class="header_left">临时停车</div>
				<div class="conter-tabbar">
						<div class="page_button_l" :class="{tab_active: !tab_active}" @click="page_button_l">
						有道闸
					</div>
						<div class="page-button_r"  :class="{tab_active: tab_active}" @click="page_button_r">
						无道闸
					</div>
				</div>
		
			</div>
			<div class="order_status">
				<div>
					<div class="order_status_l" :class="{order_status_active: order_status}" @click="order_status_l(1)">
						进行中
					</div>
				</div>
				<div>
					<div class="porder_status_r"  :class="{order_status_active: !order_status}" @click="order_status_r(2)">
						已完成
					</div>
				</div>
			</div>
		</div>
		<div :style="{height:navigationBarHeight}" style="background:pink;"></div>
		<div class="container_wrap">
			<div v-if="!tab_active" style="position: absolute; top:50%;left: 50%;right:50%;bottom:50%;color:#2B8CFC;">有道闸暂未开放</div>
			<div class="order_container" v-if="tab_active">
				<div class="order_list_item" @click="BillDetailInfo(item)">
					<ul>
						<li class="address">
							<div :class="{order_finish:!order_status}">
							深圳市南山区深圳湾生态科技园10栋B座停车场{{parkName}}
							</div>
							<div class="order_sum" v-if="!order_status">￥5</div>
						</li>
						<li class="placeNo">
								车位号：{{placeNo}}
						</li>
						<li class="startTime">
								开始时间：{{startTime}}
						</li>
					</ul>
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
				navigationBarHeight:0,
				tab_active:true,//默认是无道闸
				order_status:true,//默认是进行中
				billType:1,//1进行中2已完成
				uid:wx.getStorageSync("uid"),
				recordID:"",//记录ID
				plateNo:"",    //车牌号码
				parkName:"",//停车场name
				serviceType:0,//服务类型
				startTime:"",//开始时间
				curPage:1
			}
		},
		methods:{
			back: function () {
				wx.redirectTo({
			    url: '/pages/scan/main?data=err'
			  })
			},
			page_button_l(){
				this.tab_active=!this.tab_active
			},
			page_button_r(){
				this.tab_active=!this.tab_active
			},
			order_status_l(billType){
				this.order_status=!this.order_status
				this.curPage = 0;
				this.queryRecord(billType)
			},
			order_status_r(billType){
				this.order_status=!this.order_status
				this.queryRecord(billType)
			},
			//进入订单详情页
			BillDetailInfo(order_info){
				if(this.tab_active&&this.order_status){
					wx.navigateTo({
						url:"../orderdetail/main"
					})
				}else if(this.tab_active && !this.order_status){
					wx.navigateTo({
						url:"../orderfinishiofo/main"
					})
				}
			},
			// 查询订单记录
			queryRecord(billType){
				const that  = this
				const url   = "/v1/r/PCPP/BillServer/QueryRecordObj/queryRecord"
				let options = {
					method:"post",
					timeout:"5000",
					parseJson:true
				}
				let data    = {
					uid : that.uid,
					serviceType:0,//业务类型
					pageNumber:10,//每页显示个数
					curPage:that.curPage,//当前页码
					billType:billType
				}
				that.$fly.request(url,data,options).
				then(res=>{
					that.curPage++
					console.log("查询订单记录",res)
					
				}).catch(err=>{
					
				})
				
			}
			
		},
		onLoad() {
			let that = this;
			wx.getSystemInfo({
				success(res) {
					that.statusBarHeight = res.statusBarHeight+ 'px'
					that.navigationBarHeight = (res.statusBarHeight+98)+'px'
				}
			})
			that.queryRecord(that.billType)
			
		},
		onReachBottom(res){
			
			
		}

	}
</script>

<style lang="stylus"  scoped="scoped">
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
	.oder_wrap{
		width:100%;
		height:100%;
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
		width: 100%;
		border-bottom:2rpx solid #EFF1F3;

		padding: 0rpx 30rpx ;
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
		border:2rpx solid #2B8CFC;
		border-radius: 10rpx;
		display: flex;
		height:60rpx;
		width:40%;
		/* align-content: center; */
		align-items: center;
	}
	.tab_active{
		color:#fff;
		background:#2B8CFC;
	}
	.conter-tabbar div
	  width:50%
	  text-align:center
	  padding:6% 0
	.order_status
	  width:100%
	  background:#FFFFFF
	  height:93rpx
	  display:flex
	.order_status>div{
	    width:50%;
			font-weight:700;
			height:100% ;
			display:flex;
			justify-content:center;
			align-items:center;
			}	
	.order_status>div>div{
	  width:33.33%;
	  padding:33rpx 0%;
		text-align center;
		border-bottom:4rpx solid #fff;
		}
		.order_status>div>.order_status_active{
			border-bottom:4rpx solid #278DFC;
			color:#278DFC
	}	
	.container_wrap{
		box-sizing:border-box;
		background:#F2F3F5;
		padding: 30rpx;
		height:100%;
	}
	.container_wrap .order_container .order_list_item{
		padding:0 30rpx;
		height:253rpx;
		width:100%;
		border-radius:15rpx;
		background:#fff;
		color:#3C3C3C;
		margin-bottom:25rpx;
		box-sizing:border-box;
	}
		.address{
		  font-size:28rpx;
			line-height:110rpx;
			font-weight:700;
			display:flex;
		}
		.order_sum{
			font-size: 36rpx;width:20%;text-align:center;
		}
		.order_finish{
			widht:80%;white-space: nowrap;text-overflow: ellipsis;overflow:hidden;
		}
		.startTime{
			height:23px;
			font-size:24rpx;
			line-height:74rpx;
			font-family:"PingFang-SC-Medium";
			font-weight:500;
			color:rgba(175,175,175,1);
		}
		.placeNo{
			padding-bottom:7%;
			border-bottom:2rpx solid rgba(241,243,245,1);
		}
			
</style>
