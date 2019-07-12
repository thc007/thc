 <template>
	<div class="box">
		<navigation text="扫码支付" show_text="true"></navigation>
		<div :style="{height:navigationBarHeight}"></div>
		<div  class="container">
			<div class="scan_img"><img class="scan_bg" src="../../../static/images/sao.png" alt="scan"></div>
			<div class="description"><span>扫码线上支付</span></div>
			<div class="details"><span>扫描停车场二维码</span></div>
			<div class="details_invoice">
				<span @click="go_detail_page">订单详情&nbsp;&nbsp;</span> 
				<span style="font-size:20rpx;color:#ccc;">|</span>
				<span @click="go_invoice_page">&nbsp;&nbsp;开发票</span>
			</div>
			<div class="scan"><div class="scan_details" @click='onScan'><i class="scan_icon"></i><span class="scan_description"> 扫码缴费</span></div></div>
		</div>
		 <overtimepay v-if='showOvertimepay' @onChoose='onClosePay' @onReturn='onReturn'></overtimepay>
  </div>
</template>
<script>
import navigation from '../../components/modal/navigation-bar'
import overtimepay from '../../components/modal/overtimepay'
export default {
	components:{
		navigation,
		overtimepay
	},
  data () {
    return {
		navigationBarHeight:0,
		showOvertimepay:false,
		overtimepaydata:"",
		empty:false,
        data:{
           //预约ID
          reserveID:1,
          //车牌号码
          plateNo:"川A66666",
          //保留时长(单位:分)
          duration:30,
          //费用类型(1:预约服务费; 2:停车费; 3:分时共享预约费; 4:分时共享停车费; 5:充电服务费;)
          feeType:1,
          //车位类型(1:普通车位; 2预约车位; 3:固定车位; 4:VIP车位; 5:充电桩; 6:白名单车位)
          placeType:0,
          //车辆类型(0:微型车; 1:小型车; 2:中型车; 3:大型车)
          sizeType:0,
          //停车场编号
          parkNo:1,
          //楼层ID
          floorID:1,
          //区域ID
          areaID:1,
          //车位号(扫码停车需要)
          placeNo:'1111'
        }
    }
  },
  methods: {
    go_detail_page(){
		wx.navigateTo({
			url: '../orderDetail/provisionalorder/main'
		});
	},
	onClosePay (e) {
	  console.log('去支付');
	  this.showOvertimepay = e;
		wx.navigateTo({
			url: '/pages/overtimePay/main?data='+JSON.stringify(this.overtimepaydata)
			// url: '/pages/overtimePay/main'
		})
	},
	onReturn(e) {
	  console.log('返回首页');
	  // console.log('onReturn',e);
	  this.showOvertimepay = false;
	  // wx.redirectTo({
	  //   url: this.returnScanUrl
	  // })
	},
	urlArgs(urlPath) {
		var args = {};
		var query = urlPath.split("?")[1];
		var pairs = query.split('&');
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var name = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	},
	go_invoice_page(){
		wx.navigateTo({
			url: '../getbill/main'
		});
	},
	queryFee(resultMsg){
		//解析urlPath
		let that =this
		let result=that.urlArgs(resultMsg)
		if(result.parkNo){
			that.empty=false
			let options = {
				method:"post",
				timeout:"5000",
				parseJson:true
			}
			let url = "/v1/r/PCPP/ChargeServer/QueryFeeObj/queryFee"
			let data = {
				// reserveID:"12354363463463",	
				// duration:120,//保留时长(单位:分)
				// plateNo:"粤888888",  //车牌号码
				// sizeType:2,//车辆类型(0:微型车; 1:小型车; 2:中型车; 3:大型车)
				feeType: 2, //费用类型(1:预约服务费; 2:停车费; 3:分时共享预约费; 4:分时共享停车费; 5:充电服务费;)
				placeType: 1, //车位类型(1:普通车位; 2预约车位; 3:固定车位; 4:VIP车位; 5:充电桩; 6:白名单车位)
				// function:result.function,
				// appid:result.appid,
				// secret:result.secret,
				// grant_type:result.grant_type,
				functionType:result.functionType,
				// parkNo:755000001,//result.parkNo
				parkNo: parseInt(result.parkNo),
				floorID: parseInt(result.floorID), //result.floorID
				areaID: parseInt(result.areaID), //
				placeNo: result.placeNo //
			}
			// {feeType:2，placeType:1,parkNo:755000001,floorID:3,areaID:6,placeNo:A001}
			console.log("76line-data:",data)
			that.$fly.request(url,data,options).then(res=>{
				wx.setStorageSync("query","")
					console.log("duration1:", res);
					
					that.overtimepaydata = res
					 var startDate = new Date(Date.parse(res.lastPayTime .replace(/-/g, '/'))).getTime();
				if (res.totalAmount<0||res.duration<15 ) {
					wx.showToast({
						title: '未产生费用',
						icon: 'none'
					});
				} else {
					console.log("res.ovDuration", res.ovDuration)
					// if(res.ovDuration>0 && (new Date().getTime()-startDate ) > 900000){//如果有超时时间则进入超时支付页面，没有则进入支付页面
					if(res.lastPayTime){//如果有超时时间则进入超时支付页面，没有则进入支付页面
						if(res.ovDuration>=0){
							that.showOvertimepay = true;
						}
					}else{ 
						wx.navigateTo({
								url: '/pages/pay/main?data='+JSON.stringify(res)
								// url: '/pages/overtimePay/main'
						})
					}
				}
			}).catch(err=>{
				console.log("scan:",err);
				wx.showToast({
					title: '出错了',
					icon: 'none'
				}).then(res=>{
					console.log("scanres:",res)
				});
			})
		}else{
			console.log("二维码错误");
		}
	},
    onScan() {
		//开启摄像头扫码
		let that = this;
			wx.scanCode({
				success(res){ 
				try{
					that.queryFee(res.result)
				}catch(e){
					//TODO handle the exception
					console.log(e)
					wx.showToast({
						title: '二维码不合规范',
						icon: 'none'
					});
				}
			},
			fail(err){
				console.log("开启摄像头失败err:",err);
			

			}
		})
  }

  },
  onLoad(options){
	let that = this;
    wx.getSystemInfo({
	  	success(res) {
	  		that.navigationBarHeight = (res.statusBarHeight+54)+'px'
	  	}
	})
	let query = wx.getStorageSync("query")
	if(query === "undefined" || query === ""){
		
	}else{
		console.log("链接参数query:", query)
		that.queryFee(query)
	}

	
  	},
	onShow(options) {
 	// var oTime = wx.getStorageSync('oTime');
 	// var ms = new Date().getTime() - oTime;
 	// if (ms > 28800000) {
 	// 	console.log(123465);
		// 	wx.clearStorage();
 	// 	wx.redirectTo({
 	// 		url: '/pages/index/main'
 	// 	});
 	// }
 }
  
}
</script>
<style lang="stylus" scoped>
  .container
    width:640rpx
    height:800rpx
    margin: 0 auto
    .scan_img
      display:block
      margin-top:96rpx
      width:640rpx
      height: 384rpx
     .scan_bg
        width:100%
        height:100%
  .container>div
    width:100%
    text-align:center
  .description
    margin-top:82rpx
    font-size:40rpx
    font-weight:500
    color:#333333
  .details
    margin-top:30rpx
    font-size:26rpx
    font-weight:500
    color:#999
  .scan
    margin-top:66rpx
    height:86rpx
    // background:#2D7EFF
    // border-radius:43rpx
  .scan_details
      width:443rpx
      height:86rpx
      margin:0 auto
      background:rgba(45,126,255,1)
      border-radius:43rpx
      font-size:36rpx;
      font-weight:500;
      color:rgba(255,255,255,1);
    .scan_icon
      display: inline-block
      width:50rpx
      height: 86rpx
      line-height: 86rpx
      background-image: url(../../../static/images/ma.png)
      background-size: 50rpx 50rpx
      background-repeat:no-repeat
      background-position:center
      vertical-align: bottom
    .scan_description
      font-size:36rpx;
      display: inline-block
      height: 86rpx
      line-height: 86rpx
      vertical-align: bottom 
	.details_invoice
	  margin-top:30rpx
	  color:#7BB1F5
	  font-size:23rpx
       
     
       
      
</style>