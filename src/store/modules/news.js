import Vue from 'vue'

const state = {
    allNews: [],
    news: {},
    errorNews: false,
    pendingNews: false,
}

const getters = {}

const mutations = {
    setAllNews (state, allNews) {
        state.allNews = allNews
    },
    setNews (state, news) {
        state.news = news
    },
    setErrorNews (state, error) {
        state.errorNews = error
    },
    initErrorNews (state) {
        state.errorNews = false
    },
    setPendingNewsTrue (state) {
        state.pendingNews = true
    },
    setPendingNewsFalse (state) {
        state.pendingNews = false
    }
}

const actions = {
    async fetchAllNews(store) {
        store.commit('initErrorNews')
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/news')
            .then(response => {
                store.commit('setAllNews', response.data)
            })
            .catch(() => {
                store.commit('setErrorNews', 'Une erreur est survenue')
                setTimeout(function () {
                    store.commit('initErrorNews')
                }, 6000)
            })
        store.commit('setPendingNewsFalse')
    },
    async fetchNews (store, id) {
        store.commit('initErrorNews')
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.get(`http://localhost:3000/news/${id}`)
            .then(response => {
                store.commit('setNews', response.data)
            })
            .catch(() => {
                store.commit('setErrorNews', 'Une erreur est survenue')
                setTimeout(function () {
                    store.commit('initErrorNews')
                }, 6000)
            })
        store.commit('setPendingNewsFalse')
    },
    async editNews (store, news) {
        await Vue.prototype.$http.patch(`http://localhost:3000/news/${news.id}`, {...news})
            .then(() => {
                //todo: Faire une alert success
            })
            .catch(() => {
                store.commit('setErrorNews', 'Une erreur est survenue')
                setTimeout(function () {
                    store.commit('initErrorNews')
                }, 6000)
            })
    },
}

const news = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default news;