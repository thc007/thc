<template>
  <div class="container">
    <div class="modal_mask">
      <div class="close" @click='onReturn'><img class='close_icon' src="../../../static/images/close.png" /></div>
      <div class="modal_wrap">
        <div class="modal_content">
          <div class="overtime_tips">超时提醒</div>
          <div class="tips ">
            <p class="tips_info">您已超时，请缴纳停车费后尽快离开车位</p>
          </div>
          <div class="button"><div class="border-top submit" @click='clickMask'>去支付</div></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'overtimepay',
  data() {
    return {
       isShow:false,
       scanUrl:'/pages/scan/main'
    }
  },
  methods: {
    clickMask(e) {
        this.$emit('onChoose', this.isShow)
    },
    onReturn() {
      this.$emit('onReturn', this.scanUrl)
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~style/border.css'
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
  .close
    position:absolute
    right:9%
    top:13.5%
    .close_icon
      width:44rpx
      height:44rpx
  .modal_wrap
    position:absolute
    left:50%
    top:34%
    transform: translate(-50%, -50%)
    width:573rpx
    height:335rpx
    background:#fff
    .modal_content
      width:573rpx
      margin:37rpx auto
      text-align:center
    
    .overtime_tips
      font-size:30rpx
      font-weight:bold
      color:#3C3C3C
    .tips
      font-size:28rpx
      font-weight:500
      color:#3C3C3C
      text-align:center
      opacity:0.67
      .tips_info
        margin: 37rpx auto 47rpx auto
        width:377rpx
        line-height:39rpx
    .button
      position:relative
      width:573rpx
      height:99rpx
      line-height:99rpx
      background:#fff
      border-radius:10rpx
      font-size:30rpx
      font-weight:bold
      color:#1477EB
    
     
      
     
</style>
