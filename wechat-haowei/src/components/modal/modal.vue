<template>
  <div class="container">
    <div class="modal_mask" >
        <div class="modal_wrap">
        <div class="modal_content">
          <div class="icon"><img src="../../../static/images/19.png"></div>
          <div class="pay_success">支付成功</div>
          <div class="tips"><p class="tips_info">请15分钟内离开车位，否则需缴纳超时停车费</p></div>
          <div class="count"><span>{{totalTime}}s</span>后自动转</div>
          <div class="button" @click='clickMask'>知道了</div>
        </div>
          
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return {
       isShow:false,
       totalTime: 3,
       timer:null
    }
  },
  methods: {
    clickMask(e) {
        this.$emit('onChange', this.isShow)
    },
  },
  onLoad () {
     setInterval(() => {
    
    if (this.totalTime > 0 && this.totalTime <=3) {
      this.totalTime--
      if (this.totalTime == 0) {
        this.$emit('onChange', this.isShow);
        wx.redirectTo({
        url: '/pages/scan/main'
      })
      }

    }
    
    
    
  },1000)

    }

}
</script>

<style lang="stylus" scoped>
.modal_mask
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
  .modal_wrap
    position:absolute
    left:50%
    top:50%
    transform: translate(-50%, -50%)
    // z-index:1
    width:573rpx
    height:617rpx
    background:#fff
    .modal_content
      width:487rpx
      margin:37rpx auto
      text-align:center
    .icon
      display: block
      margin: 24rpx auto 0 auto
      width:231rpx
      height: 170rpx
    .icon img
      max-width:100%
      max-height:100%
    .pay_success
      font-size:36rpx
      font-family:PingFang-SC-Medium
      font-weight:500
      color:#3C3C3C
    .tips
      font-size:26rpx
      font-family:PingFang-SC-Medium
      font-weight:500
      color:#3C3C3C
      text-align:center
      .tips_info
        margin: 37rpx auto 47rpx auto
        width:328rpx
        line-height:39rpx
    .count
      margin-bottom:56rpx
      font-size:26rpx
      font-family:PingFang-SC-Medium
      font-weight:500
      color:#3C3C3C
      opacity:0.66
    .count span
      color:#33A5F7
    .button
      width:487rpx
      height:80rpx
      line-height:80rpx
      background:linear-gradient(270deg,rgba(30,101,225,1),rgba(0,160,255,1))
      border-radius:10rpx
      font-size:30rpx
      font-family:PingFang-SC-Medium
      font-weight:500
      color:#fff
       
</style>
