import jwt_decode from "jwt-decode";
import Vue from 'vue'
import store from '../store'

export default {
     verifyUser: async () => {
        const { sub } = jwt_decode(localStorage.getItem('token'))
        await Vue.prototype.$http.get(`http://localhost:3000/users/${sub}`)
            .then(response => {
                store.dispatch('user/loadUser', response.data)
                return Promise.resolve()
            }).catch((err) => {
                if (err.response.status === 401) store.dispatch('users/errorUser', 'Session expirée, veuillez-vous reconnecter')
                return Promise.reject()
             })
    }
}