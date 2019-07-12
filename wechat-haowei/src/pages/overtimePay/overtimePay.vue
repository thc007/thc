<template>
<div class="container">
	<navigation text="超时支付" showback="true" show_text="true"></navigation>
	<div :style="{height:navigationBarHeight}"></div>
  <div class="site_wrap">
    <div class="center">
      <i class="icon"><img src="../../../static/images/@2x2.png"></i>
      <div class="location">
        <div class="site">{{queryFeeArgs.parkName}}</div>
        <div class="address">{{queryFeeArgs.parkAddr}}</div>
      </div>
    </div>
  </div>
  <div class="info_wrap">
    <div class="position border-pay"><div class="row"><div class="left license">车位号：</div><div class="right license_info">{{queryFeeArgs.placeNo}}</div></div></div>
    <div class="position border-pay"><div class="row"><div class="left parking_time">停车时长</div><div class="right parking_time_info">{{queryFeeArgs.duration}}分</div></div></div>
    <div class="position border-pay"><div class="row"><div class="left last_pay_time">最后缴费时间</div><div class="right last_pay_time_info">{{queryFeeArgs.lastPayTime}}</div></div></div>
    <div class="position border-pay"><div class="row"><div class="left overtime">超时时长</div><div class="right overtime_info">{{queryFeeArgs.ovDuration}}分钟</div></div></div>
    <div class="position border-pay"><div class="row"><div class="left paid">已付停车费<i></i></div><div class="right paid_info">￥{{queryFeeArgs.hasPayAmount/100}}</div></div></div>
    <div class="position border-pay"><div class="row"><div class="left overtime_pay">超时停车费</div><div class="right overtime_pay_info">￥{{(queryFeeArgs.totalAmount-queryFeeArgs.hasPayAmount)/100}}</div></div></div>
    <!-- <div class="position border-pay"><div class="row"><div class="left discounts">可用优惠</div><div class="right discounts_info" @click='onDiscounts'><div class="usable"><div class="usable_discounts"><i></i>3个可用</div><i class="arrow"></i></div></div></div></div> -->
    <!-- <div class="position "><div class="row"><div class="left discounts_rule">优惠规则<i class="rule_icon"></i></div><div class="right discounts_rule_info"><span>待支付</span>￥{{(queryFeeArgs.totalAmount-queryFeeArgs.hasPayAmount)/100}}</div></div></div> -->
  </div>
  <div class="pay_wrap">
    <div class="position border-pay"><div class="row"><div class="left pay_way">支付方式</div></div></div>
    <div class="pay layout">
      <!-- <div class="wallet layout_item"  ><div class="way"><i class="icon_bg icon_wallet"></i><p>余额支付（￥5555）</p></div><div class="radio"><i class="radio_icon" :style='styleWallet? "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAACqElEQVRYR83YTWgTQRQH8P/sdi0RCdgWP2jTg2DwoGixKHhTwZOevFT00nryFBAFDyLiSahWbKXYpKYKLSjWU28ePFoKFS31pODFg22s0a7VfO28J5PJNqa2yYqxnUCYDSGb37x582ZmBQx5ib9y9HPYzv84BQ/HBLAfRLsEc1gQAGLXkvzBYpohohdZx5rA9WY36P2DQW67Uct2rkByF4hCghiCAdVCXZO+Vm+LdQtJGYv4Mbz8ze99be9qgapD+jgEJ3dDMMcg2Sn/cW2IkBokiAuC+O4i56/hTiSzFmhtyP3sbkjxTBDvU73WPS+3tSLiQ6zSb8A8y9I67fZve78aZnXIcL4DBTwXxC0+4p8hxeHkBRCd+DbQ+nol5k+IioSwX4K4xY9AXSKi8qeE8fLyiDsUqYhMJUTlxBZvCozicPwXiMbMfknRYTwt50wlZFj2gvgSuDIn6hoRDVGz7tbCYOtlf4jKkDhHYdFbEDvrAiEuwMPehYSe2mVIUiZB6C72fj0iouvPyOehtp4yZJTDKPAcJIfWE2IRZ7ylzTvSY82ujshDPgvi0eWpGiAiXXsaEOt0cGC7VbzFzCeJgckcxmfzupCVCtpyHfFnjZ8jpc8gnEslImMaMsIPwNwTFHLv+CZc6HBWLZLxqSwuTvwMDBHEyflE+3k/ItMgPhgE0hW1MXayserS0f1kCeNvcnrt8SvrmhHhV6lEe6eGPOI0JG8NApk804hDO+2qkOmPHo4OLgaCWIyvc/FIkx8RD8R2EEg2FoJjV18rC5LRdDUdCCIIcj4RaTAMYtDQGJKsBk1fQwqaMSVeVYUkJ0G0wYueghizDVAYIzZGCmLMVlFhjNg8+0uZEccJH2PEAcvHGHHk/H3HseGH8JXbnw1/LFHrmUIdvv8FI7lZfd5TKagAAAAASUVORK5CYII=);":""' @click='selectPayMethod(1)'></i></div></div> -->
      <div class="wechat layout_item"><div class="way"><i class="icon_bg icon_wechat"></i><p>微信支付</p></div><div class="radio"><i class="radio_icon" style='background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAACqElEQVRYR83YTWgTQRQH8P/sdi0RCdgWP2jTg2DwoGixKHhTwZOevFT00nryFBAFDyLiSahWbKXYpKYKLSjWU28ePFoKFS31pODFg22s0a7VfO28J5PJNqa2yYqxnUCYDSGb37x582ZmBQx5ib9y9HPYzv84BQ/HBLAfRLsEc1gQAGLXkvzBYpohohdZx5rA9WY36P2DQW67Uct2rkByF4hCghiCAdVCXZO+Vm+LdQtJGYv4Mbz8ze99be9qgapD+jgEJ3dDMMcg2Sn/cW2IkBokiAuC+O4i56/hTiSzFmhtyP3sbkjxTBDvU73WPS+3tSLiQ6zSb8A8y9I67fZve78aZnXIcL4DBTwXxC0+4p8hxeHkBRCd+DbQ+nol5k+IioSwX4K4xY9AXSKi8qeE8fLyiDsUqYhMJUTlxBZvCozicPwXiMbMfknRYTwt50wlZFj2gvgSuDIn6hoRDVGz7tbCYOtlf4jKkDhHYdFbEDvrAiEuwMPehYSe2mVIUiZB6C72fj0iouvPyOehtp4yZJTDKPAcJIfWE2IRZ7ylzTvSY82ujshDPgvi0eWpGiAiXXsaEOt0cGC7VbzFzCeJgckcxmfzupCVCtpyHfFnjZ8jpc8gnEslImMaMsIPwNwTFHLv+CZc6HBWLZLxqSwuTvwMDBHEyflE+3k/ItMgPhgE0hW1MXayserS0f1kCeNvcnrt8SvrmhHhV6lEe6eGPOI0JG8NApk804hDO+2qkOmPHo4OLgaCWIyvc/FIkx8RD8R2EEg2FoJjV18rC5LRdDUdCCIIcj4RaTAMYtDQGJKsBk1fQwqaMSVeVYUkJ0G0wYueghizDVAYIzZGCmLMVlFhjNg8+0uZEccJH2PEAcvHGHHk/H3HseGH8JXbnw1/LFHrmUIdvv8FI7lZfd5TKagAAAAASUVORK5CYII=);'></i></div></div>
      <!-- <div class="wechat layout_item"><div class="way"><i class="icon_bg icon_wechat"></i><p>微信支付</p></div><div class="radio"><i class="radio_icon" :style='styleWechat? "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAACqElEQVRYR83YTWgTQRQH8P/sdi0RCdgWP2jTg2DwoGixKHhTwZOevFT00nryFBAFDyLiSahWbKXYpKYKLSjWU28ePFoKFS31pODFg22s0a7VfO28J5PJNqa2yYqxnUCYDSGb37x582ZmBQx5ib9y9HPYzv84BQ/HBLAfRLsEc1gQAGLXkvzBYpohohdZx5rA9WY36P2DQW67Uct2rkByF4hCghiCAdVCXZO+Vm+LdQtJGYv4Mbz8ze99be9qgapD+jgEJ3dDMMcg2Sn/cW2IkBokiAuC+O4i56/hTiSzFmhtyP3sbkjxTBDvU73WPS+3tSLiQ6zSb8A8y9I67fZve78aZnXIcL4DBTwXxC0+4p8hxeHkBRCd+DbQ+nol5k+IioSwX4K4xY9AXSKi8qeE8fLyiDsUqYhMJUTlxBZvCozicPwXiMbMfknRYTwt50wlZFj2gvgSuDIn6hoRDVGz7tbCYOtlf4jKkDhHYdFbEDvrAiEuwMPehYSe2mVIUiZB6C72fj0iouvPyOehtp4yZJTDKPAcJIfWE2IRZ7ylzTvSY82ujshDPgvi0eWpGiAiXXsaEOt0cGC7VbzFzCeJgckcxmfzupCVCtpyHfFnjZ8jpc8gnEslImMaMsIPwNwTFHLv+CZc6HBWLZLxqSwuTvwMDBHEyflE+3k/ItMgPhgE0hW1MXayserS0f1kCeNvcnrt8SvrmhHhV6lEe6eGPOI0JG8NApk804hDO+2qkOmPHo4OLgaCWIyvc/FIkx8RD8R2EEg2FoJjV18rC5LRdDUdCCIIcj4RaTAMYtDQGJKsBk1fQwqaMSVeVYUkJ0G0wYueghizDVAYIzZGCmLMVlFhjNg8+0uZEccJH2PEAcvHGHHk/H3HseGH8JXbnw1/LFHrmUIdvv8FI7lZfd5TKagAAAAASUVORK5CYII=);":""'  @click='selectPayMethod(6)'></i></div></div> -->
      <!-- <div class="Alipay layout_item"><div class="way"><i class="icon_bg icon_alipay"></i><p>支付宝支付</p></div><div></div><div class="radio"><i class="radio_icon" :style='styleAlipay? "background-image: url(../../../static/images/@2x1.png);":""'  @click='selectPayMethod(4)'></i></div></div> -->
    </div>
  </div>
	<div style="height:158rpx;"></div>
  <div class="bottom">
    <button class="submit" @click='onPay'>立即支付</button>
  </div>
  <modal @onChange='onClose' v-if='showModal'></modal>
 
</div>
</template>


<script>
	import navigation from '../../components/modal/navigation-bar'
  import modal from '../../components/modal/modal'
  import overtimepay from '../../components/modal/overtimepay'
export default {
  name:'pay',
  data () {
    return {
				navigationBarHeight:0,
       radio:'',
       showModal: false,
       styleWallet: false,
       styleWechat: false,
       styleAlipay: false,
       payMethod:6,
       queryFeeArgs:{},
       payFeeArgs: {},
       returnScanUrl:''
       
    }
  },
  components: {
    modal,
    overtimepay,
		navigation
  },
  computed: {
    
  },
  methods: {
    onClose (e) {
      this.showModal = e;
      console.log('this.showModal',this.showModal)
    },

		ChangeHourMinutestr(str){
				if (str !== "0" && str !== "" && str !== null) {
				return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() : 
				(Math.floor(str / 60)).toString()) + "小时" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
				}
				else
				{
				return "";
				}
		},
   
//     selectPayMethod(n) {
//       console.log('支付方式');
//       this.payMethod = n;
//       if (this.payMethod == 1) {
//         this.styleWallet = !this.styleWallet;
//         this.styleWechat = false;
//         this.styleAlipay = false;
//       }else if (this.payMethod == 6) {
//         this.styleWechat = !this.styleWechat;
//         this.styleWallet = false;
//          this.styleAlipay = false;
// 
//        }else if(this.payMethod == 4){
//         this.styleAlipay = !this.styleAlipay;
//         this.styleWallet = false;
//         this.styleWechat = false;
//       }
//     }, 
		
    onPay () {
			let that = this
      if (this.queryFeeArgs.totalAmount - this.queryFeeArgs.hasPayAmount <= 0 ||this.queryFeeArgs.ovDuration <=0){
				console.log(1)
        return;
      }
      var d = new Date('Thu May 12 2016 08:00:00 GMT+0800 (中国标准时间)');
      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      if (this.payMethod) {
        var url = '/v1/r/PCPP/ChargeServer/PayFeeObj/payFee';
        var data = {
          uid: wx.getStorageSync("uid"),
          totalAmount: this.queryFeeArgs.totalAmount, //总金额
          orderRecordID: this.queryFeeArgs.orderRecordID, //订单记录号
          discountAmount: this.queryFeeArgs.discountAmount, //优惠金额
          feeType: 2, //费用类型
          payAmount: this.queryFeeArgs.totalAmount - this.queryFeeArgs.hasPayAmount, //支付金额
          payTime: datetime,
          discountType: this.queryFeeArgs.discountType, //优惠类型
          transactionID: this.queryFeeArgs.transactionID, //订单号
          payMethod: this.payMethod, //支付方式
          duration: this.queryFeeArgs.duration //预约时常
          //添加openID
        };data["openID"] = wx.getStorageSync("openID");
        var options = {
          method: "post",
          timeout: "5000",
          parseJson: true
        };
        console.log("付费接口：请求data：", data);
        this.$fly.request(url, data, options).then(function (res) {
          var wxPayData = JSON.parse(res.thirdPayInfo);
          console.log("paying......", JSON.parse(res.thirdPayInfo));
          //调起微信支付接口
          wx.requestPayment({
            timeStamp: wxPayData.timeStamp,
            nonceStr: wxPayData.nonceStr,
            package: wxPayData.package,
            signType: 'MD5',
            paySign: wxPayData.paySign,
            success: function success(res) {
              //支付成功弹窗
              that.showModal = !that.showModal;
              console.log("支付成功：", res);
            },
            fail: function fail(res) {
              console.log("支付失败", res);
            },
            complete: function complete(res) {
              console.log(res);
            }
          });
      }).catch((e) => console.log("error", e))

      }else{
         wx.showToast({title: '请选择支付方式' , icon: 'none' , duration: 2000 })
      }
     
    },
  },
  onLoad (options) {
		let that = this;
		wx.getSystemInfo({
			success(res) {
				that.navigationBarHeight = (res.statusBarHeight+54)+'px'
			}
		})
    console.log('超时支付',JSON.parse(options.data));
     // console.log('this.showModal',this.showModal)
      that.queryFeeArgs= JSON.parse(options.data);
			that.queryFeeArgs.duration = that.ChangeHourMinutestr(that.queryFeeArgs.duration)
			
			console.log(this.queryFeeArgs)
      // this.onQueryFee();
    }


  
}
</script>
<style>
  page{
    background:#F1F3F5!important;
    /*overflow:hidden;*/
  }
 .van-checkbox__icon{
  width:34rpx!important;
  height:34rpx!important;

 }


  
</style>

<style lang="stylus" scoped>
@import '~style/border.css'

.site_wrap
  position: relative;
  width:692rpx
  height: 200rpx
  margin: 20rpx auto
  background:#fff
  .center
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    .icon
      display: inline-block
      margin-left:36rpx
      width:48rpx
      height: 48rpx
      vertical-align:middle
     /* line-height: 48rpx
      background-image: url(../../../static/images/@2x2.png)
      background-size: 48rpx 48rpx
      background-repeat:no-repeat
      background-position:center*/
    .icon img
      width:100%
      height:100%
    .location
      display: inline-block
      vertical-align:middle
      .site
        padding:10rpx
        font-size:28rpx
        color:#000
        font-weight:500
      .address
        padding:10rpx
        font-size:22rpx
        color:#777
        font-weight:500
.info_wrap,.pay_wrap
  width:692rpx
  /*height:800rpx*/
  background:#fff
  margin: 20rpx auto
 .position
    position: relative
  
.row
  display:flex
  justify-content:space-between
  align-items:center
  height:99rpx
  width:597rpx
  margin:0 auto
  /*background:blue*/
  .left
    display:inline-block
    font-size:32rpx
    font-weight:bold
    color:#3C3C3C
  .right,.license_info
    display:inline-block
    font-size:28rpx
    font-weight:500
    color:#777
  .parking_time,.last_pay_time,.overtime,.paid,.paid_info,.overtime_pay,.overtime_pay_info,.license
    font-size:30rpx
    color:#3C3C3C
    font-weight:500
  .parking_time_info,.last_pay_time_info,.overtime_info
    font-size:28rpx
    color:#777
    font-weight:500
    letter-spacing:4rpx
  .paid i
    display: inline-block
    width:66rpx
    height: 37rpx
    /*line-height: 48rpx*/
    background-image: url(../../../static/images/paid.png)
    background-size: 66rpx 37rpx
    background-repeat:no-repeat
    background-position:center
  .paid_info
    color:#CBCBCB
  .overtime_pay_info
    font-weight:bold
    letter-spacing:4rpx
  .discounts
    font-size:24rpx
    color:#777
    font-weight:500
  .discounts_rule
    font-size:23rpx
    color:#B4B4B4
    font-weight:500
  .discounts_rule_info
    font-size:34rpx
    font-family:PingFang-SC-Bold
    font-weight:bold
    color:#3C3C3C
  .discounts_rule_info span
    font-size:30rpx
    font-family:PingFang-SC-Medium
    font-weight:500
    color:#3C3C3C
    
  .rule_icon
    display: inline-block
    width:20rpx
    height: 20rpx
    /*line-height: 48rpx*/
    background-image: url(../../../static/images/rule.png)
    background-size: 20rpx 20rpx
    background-repeat:no-repeat
    background-position:center
        

.layout_item
  display:inline-block
  display:flex
  justify-content:space-between
  align-items:center
  padding:0 50rpx 0 20rpx
  height:99rpx
  /*background:green*/
  /*border:1px solid #000*/
.way
  display:flex
  justify-content:space-between
  align-items:center
  p
   display: inline-block
  .icon_bg
    display: inline-block
    margin: 0 30rpx 0 36rpx
    width:48rpx
    height: 48rpx
    line-height: 48rpx
    background-size: 48rpx 48rpx
    background-repeat:no-repeat
    background-position:center
  .icon_wallet
    background-image: url(../../../static/images/wallet@3x.png)
  .icon_wechat
    background-image: url(../../../static/images/wechatPay@x2.png)
  .icon_alipay
    background-image: url(../../../static/images/alipay.png)
.radio_icon
  display: inline-block
  width:34rpx
  height: 34rpx
  background-image: url(../../../static/images/@2x3.png)
  background-size: 34rpx 34rpx
  background-repeat:no-repeat
  background-position:center
.border-pay .pay_way
  color:#B4B4B4
  font-weight:500
.bottom
  /*width: 100%*/
  height:80rpx
  position: fixed
  bottom: 0
  padding: 38rpx 30rpx
  background:#fff
 .submit
    width: 690rpx
    height:80rpx
    line-height:80rpx
    background:linear-gradient(270deg,rgba(30,101,225,1),rgba(0,160,255,1))
    border-radius:6rpx
    font-size:30rpx
    color: #fff
    font-family:PingFang-SC-Medium;
    font-weight:500
  .usable,.usable_discounts,.usable_discounts i,.usable i 
      display: inline-block
    .arrow
      width:18rpx
      height: 52rpx
      vertical-align: bottom
      background-image: url(../../../static/images/arrow.png)
      background-size: 18rpx 18rpx
      background-repeat:no-repeat
      background-position:center
    .usable_discounts
      width:160rpx
      height:52rpx
      margin-right:20rpx
      line-height:52rpx
      text-align:center
      font-size:22rpx
      color:#fff
      background:red
      border-radius:10rpx;
    .usable_discounts i
      width:24rpx
      height: 52rpx
      vertical-align: bottom
      background-image: url(../../../static/images/discounts.png)
      background-size: 24rpx 24rpx
      background-repeat:no-repeat
      background-position:center
</style>