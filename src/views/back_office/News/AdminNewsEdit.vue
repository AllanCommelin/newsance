<template>
    <BOTemplate>
        <div v-if="alertNews" class="my-2">
            <alert :msg='alertNews.msg' :type="alertNews.type"></alert>
        </div>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Modifier une news
            </h1>
        </div>
        <div class="w-ful text-left">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    <textarea v-model="news.content" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="content" placeholder="Contenu"></textarea>
                </div>
                <input type="button" value="Enregister" @click="save" :disabled="!isFullFiled"
                       class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded"/>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminNewsEdit",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                news: state => state.news.news,
                alertNews: state => state.news.alertNews
            }),
            isFullFiled: function () {
                return this.news.title !== '' && this.news.content !== ''
            }
        },
        methods: {
            ...mapActions({
                fetchNews: 'news/fetchNews',
                editNews: 'news/editNews',
                errorNews: 'news/errorNews'
            }),
            save () {
                if (this.isFullFiled) {
                    this.editNews(this.news)
                        .then(() => {
                            this.$router.push({name: 'Admin.news'})
                        }).catch()
                } else {
                    this.errorNews('Tous les champs doivent être renseignés')
                }
            }
        },
        mounted () {
            this.fetchNews(this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>