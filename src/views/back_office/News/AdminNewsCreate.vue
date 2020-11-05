<template>
    <BOTemplate>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Créer une news
            </h1>
        </div>
        <div v-if="errorNews" class="my-2">
            <alert :msg='errorNews' type="error"></alert>
        </div>
        <div class="w-ful text-left">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Titre de l'article
                    </label>
                    <input v-model="news.title" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="title" type="text" placeholder="Titre">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Contenu de l'article
                    </label>
                    <input v-model="news.content" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="content" type="text" placeholder="Contenu">
                </div>
                <button @click="create" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                    Créer
                </button>
            </form>
        </div>
    </BOTemplate>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminNewsCreate",
        components: {
            BOTemplate,
            Alert
        },
        data () {
            return {
                news: {
                    title: '',
                    content: '',
                    published: '',
                }
            }
        },
        computed: {
            ...mapState({
                errorNews: state => state.news.errorNews
            })
        },
        methods: {
            ...mapActions({
                createNews: 'news/createNews',
            }),
            getDate () {
                const date = Date.now()
                const day = date.getUTCDate().toString().length === 2 ? date.getUTCDate() : '0' + date.getUTCDate()
                let month = date.getUTCMonth() + 1
                month = month.toString().length === 2 ? month : '0' + month
                return day + '/' + month + '/' + date.getFullYear()
            },
            async create () {
                this.news.published = await this.getDate()
                this.createNews(this.news)
            }
        }
    }
</script>

<style scoped>

</style>