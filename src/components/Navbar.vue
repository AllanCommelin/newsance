<template>
    <div id="nav" class="pl-8 py-6 bg-teal-900">
        <ul class="flex">
            <li class="mr-6">
                <router-link class="text-white hover:text-teal-300" :to="{name: 'Home'}">
                    Accueil
                </router-link>
            </li>
            <li class="mr-6">
                <router-link class="text-white hover:text-teal-300" :to="{name: 'News'}">
                    News
                </router-link>
            </li>
            <li class="mr-6">
                <router-link class="text-white hover:text-teal-300" :to="{name: 'Albums'}">
                    Albums
                </router-link>
            </li>
            <li class="mr-6">
                <router-link class="text-white hover:text-teal-300" :to="{name: 'Artists'}">
                    Artistes
                </router-link>
            </li>
            <li class="mr-6">
                <router-link class="text-white hover:text-teal-300" :to="{name: 'Concerts'}">
                    Concerts
                </router-link>
            </li>
            <li v-if="is_admin" class="mr-6">
                <router-link class="text-white hover:text-teal-300" :to="{name: 'Admin'}">
                    Admin
                </router-link>
            </li>
            <template v-if="!is_login">
                <li class="mr-6">
                    <router-link class="text-white hover:text-teal-300" :to="{name: 'Login'}">
                        Connexion
                    </router-link>
                </li>
                <li class="mr-6">
                    <router-link class="text-white hover:text-teal-300" :to="{name: 'Register'}">
                        S'incrire
                    </router-link>
                </li>
            </template>
            <li v-else class="mr-6">
                <button class="text-white hover:text-teal-300" @click="logOutUser">Déconnexion</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "Navbar",
        computed: {
            ...mapState({
                user: state => state.user.user,
                is_login: state => state.user.is_login
            }),
            is_admin: function () {
               return this.user.role === 'admin'
            }
        },
        watch: {
            is_login: function () {
                if (!this.is_login) this.$router.push({name: 'Login'})
            }
        },
        methods: {
            ...mapActions({
                logOutUser: 'user/logOutUser'
            }),
        }
    }
</script>

<style scoped>
    #nav {
        a {
            font-weight: bold;
            color: white;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
