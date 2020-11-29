<template>
    <div>
        <ul>
            <li v-for="(album, index) in allAlbums" :key="index">
                {{ album.name }}
            </li>
        </ul>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'FrontAlbum',
    computed: {
        ...mapState({
            allAlbums: state => state.albums.allAlbums,
        })
    },
    methods: {
        ...mapActions({
            fetchAllAlbums: 'albums/fetchAllAlbums',
        }),
    },
    mounted () {
        this.fetchAllAlbums()
    },
}
</script>
