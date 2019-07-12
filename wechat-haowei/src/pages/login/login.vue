<template>
  <div class="container">
		<navigation text="添加其他号码"></navigation>
		<div :style="{height:navigationBarHeight}"></div>
    <div class="top-container border-b"></div>
    <div class="input_phoneNum border-b">
			<label class="phoneNum">手机号码
			<input type="number"  placeholder="输入有效手机号" maxlength="11" v-model='phoneNumBer'>
			</label>
		<button class="verify_code" :disabled='!show' @click='getVerifyCode'>
			<div class="verify">获取验证码<span v-show='!show'>{{countdown}}s</span></div>
		</button>
		</div>
    <div class="input_phoneNum border-b">
			<label class="verifyNum">验证码<input type="number" placeholder="输入验证码" maxlength="4" v-model='verifyCode'>
			</label>
		</div>
    <div class="submit"  @click="onLogin"><button class="btn" :style="styleObject" :disabled='!showSubmit'  >完成</button></div>
  </div>
</template>
<script>
const TIME_COUNT = 40;
const checkNumber = false;
import navigation from '../../components/modal/navigation-bar'
export default {
  data () {
    return { 
			 navigationBarHeight:0,
       checked:false,
       phoneNumBer:null,
       mobile:'',
       verifyCode:null,
       show:true,
       showSubmit:true,
       countdown:'',
       timer:null,
       styleObject: null,
       checkNumber:false
      
    }
  },
	components:{
		navigation
	},
  methods: {
    onChange () {
    	this.checked = !this.checked;
    	
    },
    checkPhoneNumber(){
      const checkPhoneNumber = this.phoneNumBer + '';
      if(checkPhoneNumber.length < 11) { 
          wx.showToast({title: '请输入11位数字的手机号码' , icon: 'none' , duration: 2000 })
      }else{
        const reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
        const flag = reg.test(checkPhoneNumber); 
        // console.log(flag);
        if (flag) {
          // console.log('正确手机号码')
          this.mobile = checkPhoneNumber;
          this.checkNumber = true;
        }else{
          wx.showToast({title: '请输入正确的手机号码' , icon: 'none' , duration: 2000 })
          console.log('错误手机号码')
        }
      }  
    },
    checkVerifyCode (){
      const checkVerifyCode = this.verifyCode + '';
      if (checkVerifyCode.length < 4) {
        wx.showToast({title: '请输入4位数字的验证码' , icon: 'none' , duration: 2000 })
      }else {
        const reg = /^[0-9]{4}$/;
        const flag = reg.test(checkVerifyCode); 
        // console.log(flag);
        if (flag) {
          // console.log('正确手机号码')
          this.verifyCode = checkVerifyCode;
        }else{
          wx.showToast({title: '请输入正确的验证码' , icon: 'none' , duration: 2000 })
          console.log('验证码错误')
        }
      }
    },
    

    getVerifyCode(){
      //倒计时
      this.checkPhoneNumber()
      if (this.mobile) {
         if (!this.timer) {
                this.countdown = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
                    this.countdown--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
      const url = '/v1/r/PCPP/UserServer/VCodeObj/getVCode';
      const data = {
        // iTimeout:5000,
        // isAsync:'0',
        // iRequestID:301,
        mobile:this.mobile,

      }
      const options = {
        method:"post",
        timeout:"5000",
        parseJson:true,
      }
      this.$fly.request(url,data,options).then(res => {
      console.log(res)
    }).catch((e) => console.log("error", e))

      }

      

    },

    onLogin(){
        this.checkPhoneNumber();
        this.checkVerifyCode();
      if (this.mobile&&this.mobile.length == 11&&this.verifyCode&&this.verifyCode.length == 4) {
        this.showSubmit = false
        console.log('输入正确');
        const url = '/v1/r/PCPP/UserServer/UserLoginObj/login';
        const data = {
        // iTimeout:5000,
        // isAsync:'0',
        // iRequestID:301,
        mobile:this.mobile,
        code:this.verifyCode
      }
      const options = {
        method:"post",
        timeout:"5000",
        parseJson:true,
      }
      this.$fly.request(url,data,options).then(res => {
      console.log(res);
    }).catch((e) => console.log("error", e))
        wx.redirectTo({
            url: '/pages/scan/main'
          })
        
      }else {
        console.log('登陆失败')
        // wx.showToast({title: '这是测试' , icon: 'none' , duration: 2000 })
      }
    }
    

  },
  onLoad(){
		let that = this;
		wx.getSystemInfo({
			success(res) {
				that.navigationBarHeight = (res.statusBarHeight+54)+'px'
			}
		})
	},

  watch: {
    //提交按钮激活
    verifyCode: function () {
      if ( this.verifyCode !== null && this.verifyCode.length) {
        console.log('verifyCode长度',this.verifyCode.length)
        if (this.verifyCode.length < 4) {
          this.styleObject = "background-color:#38A9FF;color:#fff;font-weight:bold;font-size:30rpx"
        }else {
          this.styleObject = "background-color:blue;color:#fff;font-weight:bold;font-size:30rpx"
        }
        
       
      }else{
        
      }
      
    },

  
    
    
  }





  
}
</script>
<style type="text/css">
    button::after{
    outline: none!important;
    border: 0;
   
   
  }
  button{
   margin: 0!important;
   outline: none!important;
   border-radius: 0;
  }
</style>

<style lang="stylus" scoped>
@import '~style/border.css'
.top-container
  position:relative
  height:1rpx
.input_phoneNum
  position:relative
  width:688rpx
  margin: 0 auto
  height:90rpx
  .phoneNum,.verifyNum ,input
    display:inline-block
    height:90rpx
    line-height:90rpx
    font-size:30rpx
    font-weight:500
    color:#000
  .phoneNum,.verifyNum
    margin-left:16rpx
    input
      font-weight:500
      width:272rpx
      margin-left:49rpx
      margin-top:-5rpx
  button
   margin: 0!important
   padding: 0!important
   border: 0!important
   background-color: transparent!important
   outline: none!important
  .verify_code
    position:absolute
    right:2%
    top:50%
    -webkit-transform: translate(0,-50%);
    -ms-transform: translate(0,-50%);
    transform: translate(0,-50%);
    font-size:28rpx
    text-align:center
    padding: 14rpx 18rpx
    border:2rpx solid #25A8FD
    color:#25A8FD
    .verify
      padding: 7rpx 18rpx
      border:2rpx solid #25A8FD
   .verifyNum input
      margin-left:79rpx
 .input_phoneNum p
    display: inline-block
    margin-left:16rpx
    height:90rpx
    line-height:90rpx
    font-size:30rpx
    color:#000
    font-weight:500
  .submit
    margin:74rpx auto 0 auto
    width:328rpx
    height:74rpx
   
    
  .btn
    width:328rpx
    height:74rpx
    line-height:74rpx
    background-color:#38A9FF
    color:#fff
    font-weight:bold
    font-size:30rpx
    opacity:0.53
    border-radius:10rpx
  
</style>