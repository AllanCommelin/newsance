import jwt_decode from "jwt-decode";
import Vue from 'vue'
import store from '../store'

export default {
    verifyUser: () => {
        const { sub } = jwt_decode(localStorage.getItem('token'))
        Vue.prototype.$http.get(`http://localhost:3000/users/${sub}`)
            .then(response => {
                store.dispatch('user/loadUser', response.data)
                return true
            }).catch((err) => {
                if (err.response.status === 401) store.commit('user/setError', 'Session expirée, veuillez-vous reconnecter')
                return false
             })
    }
}