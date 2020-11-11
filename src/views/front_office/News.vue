<template>
    <div>
        <ul>
            <li v-for="(news, index) in allNews" :key="index">
                {{ news.title }}
            </li>
        </ul>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'FrontNews',
    computed: {
        ...mapState({
            allNews: state => state.news.allNews,
        })
    },
    methods: {
        ...mapActions({
            fetchAllNews: 'news/fetchAllNews',
        }),
    },
    mounted () {
        this.fetchAllNews()
    },
}
</script>
