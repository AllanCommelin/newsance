<template>
    <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                    Titre de l'article
                </label>
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="title" type="text" placeholder="Titre">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                    Contenu de l'article
                </label>
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="content" type="text" placeholder="Contenu">
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "AdminNewsEdit",
        computed: {
            ...mapState({
                news: state => state.news.news
            })
        },
        methods: {
            ...mapActions({
                fetchNews: 'news/fetchNews',
                editNews: 'news/editNews'
            }),
            save () {
                this.editNews(this.news)
                this.$router.push({ name: 'news.index' })
            }
        },
        mounted () {
            this.fetchNews(this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>