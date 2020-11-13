<template>
    <FOTemplate>
        <h1>{{ news.title }}</h1>
        <span>{{ news.published }}</span>
        <p>{{ news.content }}</p>

        <section class="commentary">
            <h2 class="mt-6">Les avis des internautes</h2>
            <div class="flex items-center">
                    <div class="flex flex-wrap mb-6 mt-6 mx-auto">
                        <div>
                            <div class="p-2 bg-gray-200 border rounded m-1" v-for="(comment, index) in comments" :key="index">
                                <span class="text-sm text-gray-700">{{ comment.user.email}}</span>
                                <p class="font-medium">{{ comment.content}}</p>
                                <span class="text-xs text-gray-500">{{ comment.created_at}}</span>
                            </div>
                            <div v-if="comments.length === 0">
                                <p>Aucun commentaire</p>
                            </div>
                        </div>
                        <div class="w-full md:w-full px-3 mb-2 mt-2">
                            <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"  placeholder='Taper Un Commentaire' v-model="newComment"></textarea>
                        </div>
                        <div class="w-full flex items-start  px-3">
                            <div class="flex items-start text-gray-700 px-2 mr-auto">
                                <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <p class="text-xs md:text-sm pt-px">Surveillez votre language</p>
                            </div>
                            <div class="-mr-1">
                                <button class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100">Poster mon commentaire</button>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
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
    date () {
        return {
            newComment: ''
        }
    },
    computed: {
        ...mapState({
            news: state => state.news.news,
            comments: state => state.comments.allComments
        })
    },
    methods: {
        ...mapActions({
            fetchNews: 'news/fetchNews',
            fetchAllComments: 'comments/fetchAllComments',
        }),
        storeComment () {

        }
    },
    mounted () {
        this.fetchNews(this.$route.params.id)
        this.fetchAllComments(this.$route.params.id)
    }
}
</script>
