import jwt_decode from "jwt-decode"
//import axios from "../../api/config.js"
import Vue from 'vue'


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
                    const { sub } = jwt_decode(localStorage.getItem('token'))
                    Vue.prototype.$http.get(`http://localhost:3000/users/${sub}`)
                        .then(response => {
                            store.commit('setUser', response.data)
                            store.commit('setIsLogInTrue')
                        }).catch(() => {
                            store.commit('setError', 'Une erreur est survenue')
                        })
                })
                .catch(() => {
                    store.commit('setError', 'Une erreur est survenue')
                })
            store.commit('setPendingUserFalse')
        }
    },
    logOutUser: function (store) {
        localStorage.removeItem('token')
        store.commit('setUser', {})
        store.commit('setIsLogInFalse')
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