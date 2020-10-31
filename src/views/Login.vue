<template>
    <div class="h-screen font-sans login bg-cover">
        <div class="container mx-auto h-full flex flex-1 justify-center items-center">
            <div class="w-full max-w-lg">
                <div class="leading-loose">
                    <div class="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                        <p class="text-white font-medium text-center text-lg font-bold">Connexion</p>
                        <div class="">
                            <label class="block text-sm text-white" for="email">E-mail</label>
                            <input v-model="email" class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email"  placeholder="E-mail" aria-label="email" required>
                        </div>
                        <div class="mt-2">
                            <label class="block  text-sm text-white">Mot de passe</label>
                            <input v-model="password" class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                   type="password" id="password" placeholder="Mot de passe" arial-label="password" required>
                        </div>

                        <div class="mt-4 items-center flex justify-between">
                            <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                    @click="login">Connexion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Login",
        data () {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.user.is_login
            })
        },
        watch: {
            is_login: function () {
                if (this.is_login) this.$router.push({name: 'Home'})
            }
        },
        methods: {
            ...mapActions({
                logInUser: 'user/logInUser'
            }),
            login () {
                this.logInUser({
                    email: this.email,
                    password: this.password
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg') no-repeat;
        background-size: cover;
    }
</style>