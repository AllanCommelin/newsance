import Vue from 'vue'
import userApi from '@/api/user'
import store from '@/store'
import Main from '@/layouts/Main.vue'
import VueRouter from 'vue-router'
import newsRoutes from '@/router/news'
import defaultRoutes from '@/router/default'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            component: Main,
            path: '',
            children: [
                ...defaultRoutes,
                ...newsRoutes
            ]
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    // Si la route nécessite d'être login
    if (to.matched.some(route => route.meta.requiresAuth)) {
        // Si déjà login et set dans le store
        if (store.state.user.is_login) {
            return next()
        } else if (localStorage.getItem('token')) {
            // Si il y a un token dans le localStorage mais que le user n'est pas dans le store
            try {
                const check = await userApi.verifyUser()
                return check ?  next() : next('/login')
            } catch (e) {
                localStorage.removeItem('token')
                return next('/login')
            }
        } else {
            return next('/login')
        }
        // Si la route ne nécessite pas d'être login, mais qu'il y a un token dans le localStorage
    } else if(localStorage.getItem('token')) {
        // Si le user est déjà set dans le store
        if (store.state.user.is_login) {
            return next()
        } else {
            try {
                await userApi.verifyUser()
            } catch (e) {
                localStorage.removeItem('token')
            }
        }
        return next()
    } else {
        return next()
    }
})

export default router
