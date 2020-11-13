<template>
    <FOTemplate>
        <h1 class="text-center">Dernières sorties</h1>
        <table class="table-auto mx-auto">
            <thead>
            <tr>
                <th class="px-4 py-2">Titre</th>
                <th class="px-4 py-2">Artiste</th>
                <th class="px-4 py-2">Tracks</th>
                <th class="px-4 py-2">Sortie</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="(album, index) in allAlbums"
                 :key="index"
                 :class="index % 2 === 0 ? '' : 'bg-gray-100'"
            >
                <td class="border px-4 py-2">{{ album.name }}</td>
                <td class="border px-4 py-2"><a class="cursor-pointer underline text-blue-600" @click="getArtist(album.artist.id)">{{ album.artist.name }}</a></td>
                <td class="border px-4 py-2">{{ album.tracks }}</td>
                <td class="border px-4 py-2">{{ album.released }}</td>
            </tr>
            </tbody>
        </table>
    </FOTemplate>
</template>

<script>

import {mapActions, mapState} from "vuex";
import FOTemplate from "@/layouts/FOTemplate";

export default {
    name: 'FrontAlbum',
    components : {
      FOTemplate
    },
    computed: {
        ...mapState({
            allAlbums: state => state.albums.allAlbums,
        })
    },
    methods: {
        ...mapActions({
            fetchAllAlbums: 'albums/fetchAllAlbums',
        }),
        getArtist (id) {
            this.$router.push({
                name: 'Artist.show',
                params: { id: id }
            })
        }
    },
    mounted () {
        this.fetchAllAlbums('?_sort=released&_order=desc&_expand=artist')
    },
}
</script>
