<template>
    <FOTemplate>
        <h1>{{ news.title }}</h1>
        <span>{{ news.published }}</span>
        <p>{{ news.content }}</p>
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
            news: state => state.news.news,
        })
    },
    methods: {
        ...mapActions({
            fetchNews: 'news/fetchNews',

        }),
    },
    mounted () {
        this.fetchNews(this.$route.params.id)
    }
}
</script>
