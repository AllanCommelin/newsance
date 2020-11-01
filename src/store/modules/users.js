import Vue from 'vue'
import userApi from '@/api/user'

const state = {
    user: {},
    is_login: false,
    errorLogin: false,
    pendingUser: false,
}

const getters = {
    getUser: state => state.user,
    getIsLogin: state => state.is_login,
}

const mutations = {
    setUser (state, user) {
        state.user = user
    },
    setError (state, error) {
        state.errorLogin = error
    },
    initError (state) {
        state.errorLogin = false
    },
    setIsLogInTrue (state) {
      state.is_login = true
    },
    setIsLogInFalse (state) {
      state.is_login = false
    },
    setPendingUserTrue (state) {
        state.pendingUser = true
    },
    setPendingUserFalse (state) {
        state.pendingUser = false
    }
}

const actions = {
    loadUser: function (store, user) {
        store.commit('setUser', user)
        store.commit('setIsLogInTrue')
    },
    logInUser: function (store, {email, password}) {
        store.commit('initError')
        if(!store.state.pendingUser) {
            store.commit('setPendingUserTrue')
            Vue.prototype.$http.post('http://localhost:3000/login', {
                email: email,
                password: password
            })
                .then(response => {
                    localStorage.setItem('token', response.data.accessToken)
                    userApi.verifyUser()
                })
                .catch(() => {
                    store.commit('setError', 'Une erreur est survenue')
                    setTimeout(function () {
                        store.commit('initError')
                    }, 6000)
                })
            store.commit('setPendingUserFalse')
        }
    },
    logOutUser: function (store) {
        localStorage.removeItem('token')
        store.commit('setUser', {})
        store.commit('setIsLogInFalse')
    },
    registerUser: function (store, {email, password}) {
        store.commit('initError')
        if (!store.state.pendingUser) {
            Vue.prototype.$http.post('http://localhost:3000/register', {
                email: email,
                password: password,
                role: 'user'
            })
                .then(res => {
                    localStorage.setItem('token', res.data.accessToken)
                    userApi.verifyUser()
                })
                .catch(() => {
                    store.commit('setError', 'Une erreur est survenue')
                    setTimeout(function () {
                        store.commit('initError')
                    }, 6000)
                })
            store.commit('setPendingUserFalse')
        }
    }
}

const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default user;