<template>
  <div class="container">
		<navigation text="欢迎使用人·车·位·生活"></navigation>
		<div :style="{height:navigationBarHeight}"></div>
    <div class="img">
      <div class="icon_bg"></div>
    </div>
    <p class="app_name">人车位生活</p>
    <p class="descr_info_1">人车位生活申请获得以下权限</p>
    <p class="descr_info_2">获得您的公开信息（微信绑定号码）</p>
    <div class="button"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登录></button></div>
    <van-popup :show="show" position='bottom' @close="onClose">
      <div class="bottom_popup">
          <div class="descr_info_3"><i class="icon_small"></i><span>&nbsp;&nbsp;人车位生活&nbsp;|&nbsp;申请使用</span></div>
          <div class="your_num">你的手机号码</div>
          <div class="input_container"><span class="phoneNumber">{{phoneNumber}}</span><span class="descr_info_4">微信绑定号码</span><i class="icon_choice"></i></div>
          <div @click='changeNum' class="other_num">使用其他手机号码</div>
          <div class="switch"><span class="reject" @click='onReject'>拒绝</span><button class="allow" @click='bindWechat'>允许</button></div>
      </div>
    </van-popup>
  </div>
</template>


<script>
	import navigation from "../../components/modal/navigation-bar.vue"
export default {
  data () {
    return {
			 navigationBarHeight:0,
       show: false,
       phoneNumber:"15813358471",
       wxCode:'',
       errMsg:'',
       iv:'',
       encryptedData:'',
			 query:''
    }
  },
	components:{
		navigation
	},
  methods: {
    
    onClose() {
      this.show = !this.show;
    },
    onPopup(){
      this.show = false;
    },
    changeNum(){
      wx.navigateTo({
        url: '/pages/login/main'
      });
    },
    getPhoneNumber(e) {//授权获取手机号码
      this.iv = e.mp.detail.iv;
      this.encryptedData = e.mp.detail.encryptedData;
      this.errMsg = e.mp.detail.errMsg
      console.log(e.mp.detail)
      console.log(this.errMsg)
     if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
        console.log('尚未授权')
      }else{
        const url = '/v1/r/PCPP/UserServer/WXAppletDecryptDataObj/wxAppletDecryptData';
          const data = {
            sessionID:wx.getStorageSync("sessionID"),
            iv:this.iv,
            encryptedData:this.encryptedData,

          };
          const options = {
            method:"post",
            iTimeout:8000,
            parseJson:true
          };
          this.$fly.request(url,data,options).then(res => {
						console.log("res:",res)
						let arr = []
						arr.push(res.decryptData)
						try{
							var decryptDataObj = JSON.parse(arr[0]);
						}catch(e){
							//TODO handle the exception
							wx.clearStorage()
						}
					 // wx.setStorageSync("oTime",new Date().getTime());
           wx.setStorageSync("phoneNumber",decryptDataObj.phoneNumber);
           this.onWechatLogin();
           wx.showToast({title: '授权成功' , icon: 'none' , duration: 2000 });
					 
        }).catch((e) => console.log("error", e));
      }

  
      
    },
    onReject(){
      this.show = false;
    },
    bindWechat (){
      console.log('绑定微信');
    },
    checkSessionID() {//检查微信sessionID是否过期
      const that = this
      const sessionID = wx.getStorageSync("sessionID");
      if (sessionID !== '') {
      console.log('1111sessionID',sessionID)
     wx.checkSession({
        success () {
          console.log('sessionID尚未过期')
          that.onAuthorize()
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
         that.onAuthorize() //重新登录
         console.log('sessionID已过期，重新登录')
        }
      });
    }else{
      that.onAuthorize()
      console.log('登录');
    }

    },
    onAuthorize() {//授权登录
          const that = this;
          wx.login({
            success (res) {
              console.log(res)
              if (res.code) {
                that.wxCode = res.code
                const url = '/v1/r/PCPP/UserServer/WXAppletLoginWXSrvObj/wxAppletLoginWXSrv';
                const data = {
                  wxCode:that.wxCode,
                };
                const options = {
                  method:"post",
                  timeout:"8000",
                  parseJson:true,
                };
                that.$fly.request(url,data,options).then(res => {
                wx.setStorageSync("sessionID",res.sessionID);
                wx.setStorageSync("openID",res.openID);
                that.onWechatLogin();
                console.log(res)
              }).catch((e) => console.log("error", e));
                
              } else {
                wx.showToast({title: '请授权登录使用' , icon: 'none' , duration: 2000 });
                console.log('登录失败！' + res.errMsg);
              }
            }
      })
    },
    onWechatLogin() {//微信用户登陆
      const that = this
      const phoneNumber = wx.getStorageSync("phoneNumber");
       if (phoneNumber !== '') {
           const url = '/v1/r/PCPP/UserServer/WechatAppLoginObj/wechatAppLogin';
            const data = {
              mobile:phoneNumber,
            }
            const options = {
              method:"post",
              timeout:"8000",
              parseJson:true,
              
            };
            that.$fly.request(url,data,options).then(res => {
            wx.setStorageSync("uid",res.uid);
            const uid = wx.getStorageSync("uid");
						console.log(uid);
            if (this.errMsg == 'getPhoneNumber:ok') {
              console.log('已授权');
              if (uid !== '') {
                  wx.reLaunch({
                    url: '/pages/scan/main'
                  });
                }else{
                  console.log('用户ID为空')
                }
            }
            console.log(res);
          }).catch((e) => console.log("error", e));

        }else {
          console.log('phoneNumber',phoneNumber)
        }
    }

  },
  onShow (){
		let that = this
			wx.getSystemInfo({
			success (res) {
				console.log(res.statusBarHeight)
				// console.log(res.pixelRatio)
				// console.log(res.windowWidth)
				// console.log(res.windowHeight)
				// console.log(res.language)
				// console.log(res.version)
				// console.log(res.platform)
			}
		})
		console.log("showquery:",that.query)
    const phoneNumber = wx.getStorageSync("phoneNumber");
    const uid = wx.getStorageSync("uid");
    if (uid !== '') {
      wx.reLaunch({
        url: '/pages/scan/main'
      });
    }else{
      this.checkSessionID();
    }
},
onLoad(options){
		let that = this;
		wx.setStorageSync("query",decodeURIComponent(options.q))
		wx.getSystemInfo({
			success(res) {
				that.navigationBarHeight = (res.statusBarHeight+54)+'px'
			}
		})
	},
}
</script>

<style lang="stylus">
.bottom_popup
      width:750rpx
      height:617rpx
      background:rgba(255,255,255,1)
  .descr_info_3
    width:100%
    padding-top:53rpx
    text-align: left
    vertical-align:middle
    .icon_small
       display: inline-block
       margin-left:36rpx
       width:48rpx
       height: 48rpx
       vertical-align:middle
       line-height: 48rpx
       background-image: url(../../../static/images/26@2x.png)
       background-size: 48rpx 48rpx
       background-repeat:no-repeat
       background-position:center
    span
      display: inline-block
      height:48rpx
      line-height:48rpx
      overflow: hidden
      letter-spacing:2rpx
      font-size:28rpx
      font-weight:bold
      vertical-align:middle
      color:rgba(22,22,22,1)
  .your_num
    width:660rpx
    height:40rpx
    padding-top:40rpx
    margin-left:39rpx
    text-align: left
    letter-spacing:2rpx
    font-size:38rpx
    font-family:PingFang-SC-Bold
    font-weight:bold
    color:rgba(22,22,22,1)
    line-height:40rpx
  .input_container
    position:relative
    width:660rpx
    height:101rpx
    margin: 20rpx auto 0 auto
    overflow: hidden
    text-align:left
    border-bottom:1rpx solid #B4B4B4
    border-top: 1rpx solid #B4B4B4
    .phoneNumber
      display:inline-block
      height:101rpx
      line-height:101rpx
      font-size:30rpx
      font-weight:bold
      color:rgba(22,22,22,1)
    .descr_info_4
      display:inline-block
      padding-left: 42rpx
      height:101rpx
      font-size:28rpx
      font-weight:500
      color:rgba(180,180,180,1)
      line-height:101rpx
    .icon_choice
      display: inline-block
      position:absolute
      right:0
      top:50%
      margin-top:-24rpx
      margin-right: 18rpx
      width:32rpx
      height: 32rpx
      background-image: url(../../../static/images/864@2x.png)
      background-size: 32rpx 32rpx
      background-repeat:no-repeat
      background-position:center
  .other_num
    width:660rpx
    margin: 20rpx auto 0 auto
    text-align:left
    height:25rpx
    font-size:26rpx
    font-family:PingFang-SC-Medium;
    font-weight:500
    color:rgba(87,106,148,1)
    line-height:40rpx
  .switch
    display:flex
    justify-content:space-around;
    align-items:center
    margin: 110rpx auto 0 auto
    width:100%
    height:100rpx
    span,.allow
      display:inline-block
      align-items:center
      width:328rpx
      height:74rpx
      line-height:74rpx
      font-size:30rpx
      font-weight:bold
      color:rgba(22,22,22,1)
      border-radius:10rpx
    .reject
      
      background-color:rgba(238,238,237,1)
    .allow
      color:#fff
      background-color:rgba(3,154,252,1)
    
              
       
</style>
<style lang="stylus" scoped>
.container
  text-align:center
  .img
    margin: 0 auto
    width:106rpx
    height: 68rpx
    .icon_bg
      margin-top: 84rpx
      width:106rpx
      height: 68rpx
      background-image: url(../../../static/images/260.png)
      background-size: 106rpx 68rpx
      background-repeat:no-repeat
      background-position:center
     /* background-color: red*/

    
  .app_name 
    margin-top: 23rpx
    height:48rpx
    font: bold 48rpx/48rpx PingFang-SC-Bold
    color:#1C68E3
    
  .descr_info_1
    margin-top: 46rpx
    height:30rpx
    font: 500 30rpx/30rpx PingFang-SC-Bold
    color:#000
    
  .descr_info_2
    margin-top: 16rpx
    height:28rpx
    font: 500 28rpx/28rpx PingFang-SC-Bold
  .button
    margin: 0 auto
    width:690rpx
    height:91rpx
    button 
      margin-top: 48rpx
      width:690rpx
      height:91rpx
      font: bold 30rpx/91rpx PingFang-SC-Bold
      color:#fff
      text-align:center
      background:linear-gradient(-90deg,rgba(28,104,227,1),rgba(3,155,252,1))
      border-radius:10rpx
    

      
</style>