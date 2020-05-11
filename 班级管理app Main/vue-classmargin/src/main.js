import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../font_1455483_9mucosn74qc/iconfont'
import ElementUI from 'element-ui' // 导入elementUI
import 'element-ui/lib/theme-chalk/index.css' // 导入css
import VueAwesomeSwiper from 'vue-awesome-swiper' // 导入第三方的插件不需要写路径
import 'swiper/css/swiper.css' // 导入swiper需要的样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 使用vue-awesome-swiper要导入然后use
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  components: {App}, //
  template: '<App/>', //
  render: h => h(App) //
}).$mount('#app')
