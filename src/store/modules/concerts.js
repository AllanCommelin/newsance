import Vue from 'vue'

const state = {
    allConcerts: [],
    concert: {},
    alertConcerts: false,
    pendingConcerts: false
}

const getters = {
    sortedConcertsByDate: (state) => {
        return state.allConcerts.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        })
    }
}

const mutations = {
    setAllConcerts (state, allConcerts) {
        state.allConcerts = allConcerts
    },
    setConcert (state, concert) {
        state.concert = concert
    },
    setSuccessConcerts (state, success) {
        state.alertConcerts = {
            type: 'success',
            msg: success ? success : 'L\'action s\'est déroulée avec succès'
        }
    },
    setErrorConcerts (state, error) {
        state.alertConcerts = {
            type: 'error',
            msg: error ? error : 'Une erreur est survenue'
        }
    },
    initAlertConcerts (state) {
        state.alertConcerts = false
    },
    setPendingConcertsTrue (state) {
        state.pendingConcerts = true
    },
    setPendingConcertsFalse (state) {
        state.pendingConcerts = false
    }
}

const actions = {
    async fetchAllConcerts(store) {
        store.commit('setPendingConcertsTrue')
        await Vue.prototype.$http.get('http://localhost:3000/concerts')
            .then(response => {
                response.data.forEach( concert => {
                    store.dispatch('artists/fetchArtist', concert.artistId, {root: true})
                        .then(artist => { concert.artistId = artist })
                        .catch ()
                });
                store.commit('setAllConcerts', response.data)
            })
            .catch(() => {
                store.dispatch('errorConcerts')
            })
        store.commit('setPendingConcertsFalse')
    },
    async fetchConcert (store, id) {
        store.commit('setPendingConcertsTrue')
        await Vue.prototype.$http.get(`http://localhost:3000/concerts/${id}`)
            .then(response => {
                store.commit('setConcert', response.data)
            })
            .catch(() => {
                store.dispatch('errorConcerts')
            })
        store.commit('setPendingConcertsFalse')
    },
    async createConcert (store, concert) {
        let result;
        store.commit('setPendingConcertsTrue')
        await Vue.prototype.$http.post('http://localhost:3000/concerts', {...concert})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successConcerts')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorConcerts')
            })
        store.commit('setPendingConcertsFalse')
        return result
    },
    async editConcert (store, concert) {
        let result;
        store.commit('setPendingConcertsTrue')
        await Vue.prototype.$http.patch(`http://localhost:3000/concerts/${concert.id}`, {...concert})
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successConcerts')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorConcerts')
            })
        store.commit('setPendingConcertsFalse')
        return result
    },
    async deleteConcerts (store, id) {
        let result
        store.commit('setPendingConcertsTrue')
        await Vue.prototype.$http.delete(`http://localhost:3000/concerts/${id}`)
            .then(() => {
                result = Promise.resolve()
                store.dispatch('successConcerts')
            })
            .catch(() => {
                result = Promise.reject()
                store.dispatch('errorConcerts')
            })
        store.commit('setPendingConcertsFalse')
        return result
    },

    errorConcerts (store, error = null) {
        store.commit('setErrorConcerts', error)
        setTimeout(function () {
            store.commit('initAlertConcerts')
        }, 3000)
    },
    successConcerts (store, success = null) {
        store.commit('setSuccessConcerts', success)
        setTimeout(function () {
            store.commit('initAlertConcerts')
        }, 3000)
    },
}

const concerts = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default concerts;