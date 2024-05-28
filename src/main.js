import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import myPlugn from './plugns/myPlugn.js'

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.use(VueRouter)
Vue.use(myPlugn)

// axios.defaults.baseURL = 'http://localhost:9999/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
