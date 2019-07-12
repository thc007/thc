<template>
	<div class="getbill_wrap">
		<navigation left_text = "开票" showback = 'true'></navigation>
		<map id="map" longitude="113.324520" latitude="23.099994" scale="14" :markers="markers" :polyline="polyline" show-location></map>
	</div>
</template>
<!-- <script src="../../../static/js/amap-wx.js"></script> -->
<script>
	import amapFile from "../../../static/js/amap-wx.js"
	var myAmapFun = new amapFile.AMapWX({key:'cd1f92902cdcad8aabfce4599247028f'});
	console.log(myAmapFun)
	import navigation from '../../components/modal/navigation-bar.vue'
	export default{
		components:{
			navigation
		},
		data(){
			return {
				data:""
			}
		},
		onLoad(){
			const that = this
			    var myAmapFun = new amapFile.AMapWX({key:'cd1f92902cdcad8aabfce4599247028f'});
				myAmapFun.getPoiAround({
				  success: function(data){
					  that.data = data
					  console.log(that.data)
					//成功回调
				  },
				  fail: function(info){
					//失败回调
					console.log(info)
				  }
				})
			  wx.getSystemInfo({
				  success: function(data){
					var height = data.windowHeight;
					var width = data.windowWidth;
					var size = width + "*" + height;
					myAmapFun.getStaticmap({
					  zoom: 8,
					  size: size,
					  scale: 2,
					  markers: "mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437",
					  success: function(data){
						  console.log(data)
						  that.src = data.url
					  },
					  fail: function(info){
						wx.showModal({title:info.errMsg})
					  }
					})
      }
    })
		}
	}
</script>

<style>
</style>
