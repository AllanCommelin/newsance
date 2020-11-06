import Vue from 'vue'

const state = {
    allNews: [],
    news: {},
    alertNews: false,
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
    setSuccessNews (state, success) {
        state.alertNews = {
            type: 'success',
            msg: success ? success : 'L\'action s\'est déroulée avec succès'
        }
    },
    setErrorNews (state, error) {
        state.alertNews = {
            type: 'error',
            msg: error ? error : 'Une erreur est survenue'
        }
    },
    initAlertNews (state) {
        state.alertNews = false
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
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/news')
            .then(response => {
                store.commit('setAllNews', response.data)
            })
            .catch(() => {
                store.dispatch('errorNews')
            })
        store.commit('setPendingNewsFalse')
    },
    async fetchNews (store, id) {
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.get(`http://localhost:3000/news/${id}`)
            .then(response => {
                store.commit('setNews', response.data)
            })
            .catch(() => {
                store.dispatch('errorNews')
            })
        store.commit('setPendingNewsFalse')
    },
    async createNews (store, news) {
        let result;
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.post('http://localhost:3000/news', {...news})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successNews')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorNews')
            })
        store.commit('setPendingNewsFalse')
        return result
    },
    async editNews (store, news) {
        let result;
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.patch(`http://localhost:3000/news/${news.id}`, {...news})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successNews')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorNews')
            })
        store.commit('setPendingNewsFalse')
        return result
    },
    async deleteNews (store, id) {
        let result
        store.commit('setPendingNewsTrue')
        await Vue.prototype.$http.delete(`http://localhost:3000/news/${id}`)
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successNews')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorNews')
            })
        store.commit('setPendingNewsFalse')
        return result
    },

    errorNews (store, error = null) {
        store.commit('setErrorNews', error)
        setTimeout(function () {
            store.commit('initAlertNews')
        }, 3000)
    },
    successNews (store, success = null) {
        store.commit('setSuccessNews', success)
        setTimeout(function () {
            store.commit('initAlertNews')
        }, 3000)
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