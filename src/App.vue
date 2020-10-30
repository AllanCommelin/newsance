<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
        <template v-if="!is_login">
            | <router-link :to="{name: 'Login'}">Connexion</router-link>
            | <router-link :to="{name: 'Register'}">S'incrire</router-link>
        </template>
        <template v-else>
            | <button @click="logout">Déconnexion</button>
        </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: "Register",
        data () {
            return {
                email: '',
                password: '',
                error: null
            }
        },
        computed: {
            is_login: () =>{
                return localStorage.getItem('token')
            }
        },
         methods: {
             logout () {
                 localStorage.removeItem('token')
             }
         }
    }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
