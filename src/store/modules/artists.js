import Vue from 'vue'

const state = {
    allArtists: [],
    allGenres: [],
    artist: {
        likes: []
    },
    alertArtists: false,
    pendingArtists: false
}

const getters = {}

const mutations = {
    setAllArtists (state, allArtists) {
        state.allArtists = allArtists
    },
    setAllGenres (state, allGenres) {
        state.allGenres = allGenres
    },
    setArtist (state, artist) {
        state.artist = artist
    },
    setSuccessArtists (state, success) {
        state.alertArtists = {
            type: 'success',
            msg: success ? success : 'L\'action s\'est déroulée avec succès'
        }
    },
    setErrorArtists (state, error) {
        state.alertArtists = {
            type: 'error',
            msg: error ? error : 'Une erreur est survenue'
        }
    },
    initAlertArtists (state) {
        state.alertArtists = false
    },
    setPendingArtistsTrue (state) {
        state.pendingArtists = true
    },
    setPendingArtistsFalse (state) {
        state.pendingArtists = false
    },
    pushUserLike (state, like) {
        state.artist.likes.push(like)
    },
    deleteUserLike (state, userId) {
        state.artist.likes = state.artist.likes.filter(like => like.userId !== userId)
    }
}

const actions = {
    async fetchAllArtists(store, params = '') {
        store.commit('setPendingArtistsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/artists' + params)
            .then(response => {
                store.commit('setAllArtists', response.data)
            })
            .catch(() => {
                store.dispatch('errorArtists')
            })
        store.commit('setPendingArtistsFalse')
    },
    async fetchAllGenres(store) {
        store.commit('setPendingArtistsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/genres')
            .then(response => {
                store.commit('setAllGenres', response.data)
            })
            .catch(() => {
                store.dispatch('errorArtists')
            })
        store.commit('setPendingArtistsFalse')
    },
    async fetchArtist (store, {id, parameter = ''}) {
        let result
        store.commit('setPendingArtistsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/artists/' + id + parameter)
            .then(response => {
                store.commit('setArtist', response.data)
                result = response.data
            })
            .catch(() => {
                store.dispatch('errorArtists')
            })
        store.commit('setPendingArtistsFalse')
        return result
    },
    async like(store, artistId) {
        if (!store.rootState.user.is_login) {
            store.dispatch('errorArtists')
            return false;
        }
        await Vue.prototype.$http.post('http://localhost:3000/likes', {userId: store.rootState.user.user.id, artistId: artistId})
            .then(response => {
                store.commit('pushUserLike', response.data)
            })
            .catch(() => {
                store.dispatch('errorArtists')
            })
    },
    async unlike(store, likeId) {
        if (!store.rootState.user.is_login) {
            store.dispatch('errorArtists')
            return false;
        }
        await Vue.prototype.$http.delete(`http://localhost:3000/likes/${likeId}`)
            .then(() => {
                store.commit('deleteUserLike', store.rootState.user.user.id)
            })
            .catch(() => {
                store.dispatch('errorArtists')
            })
    },
    async createArtist (store, artist) {
        let result;
        store.commit('setPendingArtistsTrue')
        await Vue.prototype.$http.post('http://localhost:3000/artists', {...artist})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successArtists')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorArtists')
            })
        store.commit('setPendingArtistsFalse')
        return result
    },
    async editArtist (store, artist) {
        let result;
        store.commit('setPendingArtistsTrue')
        await Vue.prototype.$http.patch(`http://localhost:3000/artists/${artist.id}`, {...artist})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successArtists')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorArtists')
            })
        store.commit('setPendingArtistsFalse')
        return result
    },
    async deleteArtists (store, id) {
        let result
        store.commit('setPendingArtistsTrue')
        await Vue.prototype.$http.delete(`http://localhost:3000/artists/${id}`)
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successArtists')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorArtists')
            })
        store.commit('setPendingArtistsFalse')
        return result
    },

    errorArtists (store, error = null) {
        store.commit('setErrorArtists', error)
        setTimeout(function () {
            store.commit('initAlertArtists')
        }, 3000)
    },
    successArtists (store, success = null) {
        store.commit('setSuccessArtists', success)
        setTimeout(function () {
            store.commit('initAlertArtists')
        }, 3000)
    },
}

const artists = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default artists;
