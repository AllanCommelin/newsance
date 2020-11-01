import Vue from 'vue'

const state = {
    allNews: [],
    errorNews: false,
    pendingNews: false,
}

const getters = {}

const mutations = {
    setAllNews (state, allNews) {
        state.allNews = allNews
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
            }).catch(() => {
                store.commit('setErrorNews', 'Une erreur est survenue')
                setTimeout(function () {
                    store.commit('initErrorNews')
                }, 6000)
            })
        store.commit('setPendingNewsFalse')
    }
}

const news = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default news;