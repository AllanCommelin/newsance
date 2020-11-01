import Vue from 'vue'
import userApi from '@/api/user'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Admin from '@/views/back_office/index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: { requiresAuth: true }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
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
