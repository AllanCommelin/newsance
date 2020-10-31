<template>
    <div id="nav">
        <ul class="flex">
            <li class="mr-6">
                <router-link class="text-blue-500 hover:text-blue-800" :to="{name: 'Home'}">
                    Accueil
                </router-link>
            </li>
            <li v-if="is_admin" class="mr-6">
                <router-link class="text-blue-500 hover:text-blue-800" to="/admin">
                    Admin
                </router-link>
            </li>
            <template v-if="!is_login">
                <li class="mr-6">
                    <router-link class="text-blue-500 hover:text-blue-800" :to="{name: 'Login'}">
                        Connexion
                    </router-link>
                </li>
                <li class="mr-6">
                    <router-link class="text-blue-500 hover:text-blue-800" :to="{name: 'Register'}">
                        S'incrire
                    </router-link>
                </li>
            </template>
            <li v-else class="mr-6">
                <button class="text-blue-500 hover:text-blue-800" @click="logOutUser">Déconnexion</button>
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
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>