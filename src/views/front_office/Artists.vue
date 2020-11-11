<template>
    <div>
        <ul>
            <li v-for="(artist, index) in allArtists" :key="index">
                {{ artist.name }}
            </li>
        </ul>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'FrontArtists',
    computed: {
        ...mapState({
            allArtists: state => state.artists.allArtists,
        })
    },
    methods: {
        ...mapActions({
            fetchAllArtists: 'artists/fetchAllArtists',
        }),
    },
    mounted () {
        this.fetchAllArtists()
    },
}
</script>
