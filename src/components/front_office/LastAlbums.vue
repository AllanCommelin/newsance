<template>
    <div>
        <h3 class="text-3xl font-bold">Les derniers albums</h3>
        <div class="w-full flex flex-wrap">
            <div
                v-for="album in lastAlbums"
                :key="album.id"
                class="card-news"
                @click="getArtist(album.artist.id)"
            >
                <div class="mb-8 text-left">
                    <div class="text-gray-900 font-bold text-xl mb-2">{{ album.name }} - {{ album.artist.name}}</div>
                    <p class="text-gray-700 text-base">
                        Nombre de titres : {{ album.tracks }}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <p class="text-gray-600">{{ album.released }}</p>
                    </div>
                    <div class="text-sm">
                        <p class="text-blue-600">Voir l'artiste <span>&rarr;</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'LastAlbums',
    computed: {
        ...mapState({
            allAlbums: state => state.albums.allAlbums,
        }),
        lastAlbums () {
            return this.allAlbums.slice(0, 5)
        },
    },
    methods: {
        ...mapActions({
            fetchAllAlbums: 'albums/fetchAllAlbums',
        }),
        getArtist (id) {
            this.$router.push({
                name: 'Artist',
                params: { id: id }
            })
        },
    },
    mounted () {
        this.fetchAllAlbums('?_sort=released&_order=desc&_expand=artist')
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
