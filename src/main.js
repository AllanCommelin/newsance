import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import configAxios from './api/config'

Vue.config.productionTip = false
Vue.prototype.$http = configAxios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
