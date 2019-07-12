import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import 'style/reset.css'
import fly from './utils/request'
// import navigation from "./components/modal/navigation"
Vue.prototype.$fly = fly
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.use(MpvueRouterPatch);
const app = new Vue(App);

app.$mount();
Vue.prototype.globalData = getApp().globalData

  
