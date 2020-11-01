<template>
    <ul>
        <li :class="['text-left pl-8 pr-2 py-4 text-white font-bold text-lg cursor-pointer hover:bg-teal-500', idx !== items.length - 1 ? 'border-b border-teal-400' : '', currentRoute === item.link ? 'bg-teal-400' : '']"
            v-for="(item, idx) in items" :key="item.name" @click="goTo(item.link)">
            {{ item.name }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "NavAside",
        data () {
            return {
                items: [
                    {name: 'Accueil', link:'Admin'},
                    {name: 'News', link:'Admin.news'},
                    {name: 'Artistes', link:'Admin.artists'},
                    {name: 'Concerts', link:'Admin.concerts'},
                    {name: 'Albums', link:'Admin.albums'},
                ]
            }
        },
        computed: {
            currentRoute () {
                return this.$route.name
            }
        },
        methods: {
            goTo (link) {
                this.$router.push({name: link})
            }
        }
    }
</script>

<style scoped>

</style>