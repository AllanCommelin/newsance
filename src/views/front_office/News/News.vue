<template>
    <FOTemplate>
        <h1>Découvrez nos articles</h1>
        <div class="max-w-sm w-full lg:max-w-full lg:flex">
            <div
                v-for="(news, index) in allNews"
                :key="index"
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
    </FOTemplate>
</template>

<script>

import {mapActions, mapState} from "vuex";
import FOTemplate from "@/layouts/FOTemplate";

export default {
    name: 'FrontNews',
    components: {
        FOTemplate
    },
    computed: {
        ...mapState({
            allNews: state => state.news.allNews,
        })
    },
    filters: {
      reduce: function (value) {
          let limit = 100
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

<style scoped>
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
