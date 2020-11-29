import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/users'
import news from './modules/news'
import artists from './modules/artists'
import concerts from './modules/concerts'
import albums from './modules/albums'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    news,
    artists,
    concerts,
    albums,
    comments
  }
})
