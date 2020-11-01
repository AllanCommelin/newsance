<template>
    <div class="h-screen font-sans register">
        <div class="container mx-auto h-full flex justify-center items-center">
            <div class="w-full flex justify-center max-w-lg">
                <div class="w-full m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                    <p class="text-white font-medium text-center text-lg font-bold">S'inscrire</p>
                    <div v-if="error" class="my-2">
                        <alert :msg='error' type="error"></alert>
                    </div>
                    <div class="text-left">
                        <label class="block text-sm text-white" for="email">E-mail</label>
                        <input v-model="email" class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email"  placeholder="E-mail" aria-label="email" required>
                    </div>
                    <div class="text-left mt-2">
                        <label class="block  text-sm text-white">Mot de passe</label>
                        <input v-model="password" class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                               type="password" id="password" placeholder="Mot de passe" arial-label="password" v-on:keyup.enter="register" required>
                    </div>
                    <div class="mt-4 items-center flex justify-between">
                        <button class="py-1 font-light tracking-wider text-teal-900 hover:text-teal-800 underline"
                                @click="goToLogin">Déja inscrit ?</button>
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-teal-900 hover:bg-teal-800 rounded"
                                @click="register">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Alert from '@/components/Alert'

    export default {
        name: "Register",
        components: {
            Alert
        },
        data () {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.user.is_login,
                error: state => state.user.errorLogin,
            })
        },
        watch: {
            is_login: function () {
                if (this.is_login) this.$router.push({name: 'Home'})
            }
        },
        methods: {
            ...mapActions({
                registerUser: 'user/registerUser'
            }),
            register () {
                this.registerUser({
                    email: this.email,
                    password: this.password
                })
            },
            goToLogin() {
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>
    .register{
        background-color: cadetblue;
    }
</style>