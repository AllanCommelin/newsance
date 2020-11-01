import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/users'
import news from './modules/news'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    news
  }
})
