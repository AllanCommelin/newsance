<template>
    <BOTemplate>
        <div v-if="alertNews" class="my-2">
            <alert :msg='alertNews.msg' :type="alertNews.type"></alert>
        </div>
        <div class="text-gray-900">
            <div class="p-4 flex justify-between">
                <h1 class="text-3xl">
                    News
                </h1>
                <button @click="goToCreate" class="px-4 py-1 text-white font-light tracking-wider bg-teal-500 hover:bg-teal-800 rounded">
                    Créer une news
                </button>
            </div>
            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 px-5">Titre</th>
                        <th class="text-left p-3 px-5">Date de publication</th>
                        <th class="text-left p-3 px-5">Contenu</th>
                        <th></th>
                    </tr>
                    <template v-if="allNews.length > 0">
                        <tr class="border-b hover:bg-teal-400 hover:text-white bg-gray-100 text-left"
                            v-for="news in allNews" :key="news.id">
                            <td class="p-3 px-5">{{ news.title }}</td>
                            <td class="p-3 px-5">{{ news.published }}</td>
                            <td class="p-3 px-5">{{ news.content.substring(0, 15) }}...</td>
                            <td class="p-3 px-5 flex justify-end">
                                <button @click="goToEdit(news.id)" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                                    Modifier
                                </button>
                                <button @click="remove(news.id)" class="px-4 py-1 text-white font-light tracking-wider bg-red-500 hover:bg-red-800 rounded">
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="3" class="p-4"> Aucune news pour le moment !</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "AdminNewsList",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                allNews: state => state.news.allNews,
                alertNews: state => state.news.alertNews
            })
        },
        methods: {
            ...mapActions({
                fetchAllNews: 'news/fetchAllNews',
                createNews: 'news/createNews',
                deleteNews: 'news/deleteNews'
            }),
            goToCreate () {
                this.$router.push({ name: 'Admin.news.create'})
            },
            goToEdit (id) {
                this.$router.push({name: 'Admin.news.edit', params: { id: id } })
            },
            remove (id) {
                this.deleteNews(id)
                    .then(() => {
                        this.fetchAllNews()
                    }).catch()

            }
        },
        mounted () {
            this.fetchAllNews()
        },
    }
</script>

<style scoped>

</style>