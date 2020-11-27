<template>
    <div>
        <ul>
            <li v-for="(concert, index) in allConcerts" :key="index">
                {{ concert.name }}
            </li>
        </ul>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'FrontConcert',
    computed: {
        ...mapState({
            allConcerts: state => state.concerts.allConcerts,
        })
    },
    methods: {
        ...mapActions({
            fetchAllConcerts: 'concerts/fetchAllConcerts',
        }),
    },
    mounted () {
        this.fetchAllConcerts()
    },
}
</script>
