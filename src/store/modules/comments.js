import Vue from 'vue'

const state = {
    allComments: [],
}

const mutations = {
    setAllComments (state, allComments) {
        state.allComments = allComments
    }
}

const actions = {
    async fetchAllComments(store, news_id) {
        await Vue.prototype.$http.get(`http://localhost:3000/news/${news_id}/comments?_expand=user`)
            .then(response => {
                store.commit('setAllComments', response.data)
            })
    },
    async storeComment(store, data) {
        await Vue.prototype.$http.post('http://localhost:3000/comment')
            .then(response => {
                store.commit('setAllComments', response.data)
            })
    },
}

const comments = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default comments;
