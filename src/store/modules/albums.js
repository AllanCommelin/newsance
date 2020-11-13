import Vue from 'vue'

const state = {
    allAlbums: [],
    album: {},
    alertAlbum: false,
    pendingAlbum: false
}

const getters = {}

const mutations = {
    setAllAlbums (state, allAlbums) {
        state.allAlbums = allAlbums
    },
    setAlbum (state, album) {
        state.album = album
    },
    setSuccessAlbums (state, success) {
        state.alertAlbums = {
            type: 'success',
            msg: success ? success : 'L\'action s\'est déroulée avec succès'
        }
    },
    setErrorAlbums(state, error) {
        state.alertAlbums = {
            type: 'error',
            msg: error ? error : 'Une erreur est survenue'
        }
    },
    initAlertAlbums (state) {
        state.alertAlbums = false
    },
    setPendingAlbumsTrue (state) {
        state.pendingAlbums = true
    },
    setPendingAlbumsFalse (state) {
        state.pendingAlbums = false
    }
}

const actions = {
    async fetchAllAlbums(store, params = '') {
        store.commit('setPendingAlbumsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/albums' + params)
            .then(response => {
                store.commit('setAllAlbums', response.data)
            })
            .catch(() => {
                store.dispatch('errorAlbums')
            })
        store.commit('setPendingAlbumsFalse')
    },
    errorAlbums (store, error = null) {
        store.commit('setErrorAlbums', error)
        setTimeout(function () {
            store.commit('initAlertAlbums')
        }, 3000)
    },
    successArtists (store, success = null) {
        store.commit('setSuccessAlbums', success)
        setTimeout(function () {
            store.commit('initAlertAlbums')
        }, 3000)
    },
}

const albums = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default albums;
