import Vue from 'vue'

const state = {
    allAlbums: [],
    album: {},
    alertAlbums: false,
    pendingAlbum: false
}

const getters = {
    sortedAlbumsByReleased: (state) => {
        return state.allAlbums.sort(function(a,b){
            return b.released - a.released;
        })
    }
}

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
    async fetchAlbum (store, id) {
        store.commit('setPendingAlbumsTrue')
        await Vue.prototype.$http.get(`http://localhost:3000/albums/${id}?_expand=artist`)
            .then(response => {
                store.commit('setAlbum', response.data)
            })
            .catch(() => {
                store.dispatch('errorAlbums')
            })
        store.commit('setPendingAlbumsFalse')
    },
    async createAlbum (store, album) {
        let result;
        store.commit('setPendingAlbumsTrue')
        await Vue.prototype.$http.post('http://localhost:3000/albums', {...album})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successAlbums')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorAlbums')
            })
        store.commit('setPendingAlbumsFalse')
        return result
    },
    async editAlbum (store, album) {
        let result;
        store.commit('setPendingAlbumsTrue')
        await Vue.prototype.$http.patch(`http://localhost:3000/albums/${album.id}`, {...album})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successAlbums')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorAlbums')
            })
        store.commit('setPendingAlbumsFalse')
        return result
    },
    async deleteAlbum (store, id) {
        let result
        store.commit('setPendingAlbumsTrue')
        await Vue.prototype.$http.delete(`http://localhost:3000/albums/${id}`)
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successAlbums')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorAlbums')
            })
        store.commit('setPendingAlbumsFalse')
        return result
    },
    errorAlbums (store, error = null) {
        store.commit('setErrorAlbums', error)
        setTimeout(function () {
            store.commit('initAlertAlbums')
        }, 3000)
    },
    successAlbums (store, success = null) {
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
