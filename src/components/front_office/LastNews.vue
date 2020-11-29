<template>
    <div>
        <h3 class="text-3xl font-bold">Les dernières news</h3>
        <div class="w-full flex flex-wrap">
            <div
                v-for="news in lastNews"
                :key="news.id"
                class="card-news"
                @click="getNews(news.id)"
            >
                <div class="mb-8 text-left">
                    <div class="text-gray-900 font-bold text-xl mb-2">{{ news.title }}</div>
                    <p class="text-gray-700 text-base">
                        {{ news.content | reduce }}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <p class="text-gray-600">{{ news.published }}</p>
                    </div>
                    <div class="text-sm">
                        <p class="text-blue-600">Voir plus <span>&rarr;</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'LastNews',
    computed: {
        ...mapState({
            allNews: state => state.news.allNews,
        }),
        lastNews () {
            return this.allNews.slice(0, 5)
                .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
        },
    },
    filters: {
        reduce: function (value, limit = 100) {
            return value.length >= limit ? value.substring(0,limit) + '...' : value
        }
    },
    methods: {
        ...mapActions({
            fetchAllNews: 'news/fetchAllNews',
        }),
        getNews (id) {
            this.$router.push({
                name: 'News.show',
                params: { id: id }
            })
        }
    },
    mounted () {
        this.fetchAllNews()
    },
}
</script>

<style lang="scss" scoped>
.card-news {
    @apply border border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal w-1/3 m-2 cursor-pointer;
}
span {
    transition: .3s;
}
.card-news:hover span{
    transition: .3s;
    margin-left: .5rem;
}
.card-news:hover {
    background-color: #f5f5f5;
}
</style>
