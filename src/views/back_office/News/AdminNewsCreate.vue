<template>
    <BOTemplate>
        <div v-if="alertNews" class="my-2">
            <alert :msg='alertNews.msg' :type="alertNews.type"></alert>
        </div>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Créer une news
            </h1>
        </div>
        <div class="w-ful text-left">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Titre de l'article
                    </label>
                    <input v-model="news.title"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="title" type="text" placeholder="Titre">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Contenu de l'article
                    </label>
                    <textarea v-model="news.content" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="content" placeholder="Contenu"></textarea>
                </div>
                <input type="button" value="Créer" @click="addNews" :disabled="!isFullFiled"
                       class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded"/>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminNewsCreate",
        components: {
            BOTemplate,
            Alert
        },
        data() {
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
                alertNews: state => state.news.alertNews
            }),
            isFullFiled: function () {
                return this.news.title !== '' && this.news.content !== ''
            }
        },
        methods: {
            ...mapActions({
                createNews: 'news/createNews',
                errorNews: 'news/errorNews'
            }),
            getCurrentDate() {
                let date_ob = new Date();
                //  Adjust 0 before single digit date
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                return `${date}/${month}/${year}`
            },
            addNews() {
                this.news.published = this.getCurrentDate()
                if (this.isFullFiled) {
                    this.createNews(this.news)
                        .then(() => {
                            this.$router.push({ name: 'Admin.news'})
                        }).catch()
                } else {
                    this.errorNews('Tous les champs doivent être renseignés')
                }
            }
        }
    }
</script>

<style scoped>

</style>