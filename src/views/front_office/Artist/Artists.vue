<template>
    <FOTemplate>
        <h1>Découvrez les artistes</h1>
        <search-bar v-model="searchArtist"></search-bar>
        <div class="w-full flex flex-wrap">
            <div
                v-for="(artist, index) in filterArtist"
                :key="index"
                class="card-news"
                @click="getArtist(artist.id)"
            >
                <div class="border border-gray-400 rounded p-4 h-full flex flex-col">
                    <div class="mb-8 text-left">
                        <div class="w-32 h-32 mb-4 mx-auto">
                            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table">
                                <img :src="artist.avatar" :alt="artist.name" class="object-cover object-center w-full h-full visible group-hover:hidden" />
                            </div>
                        </div>
                        <div class="text-gray-900 font-bold text-xl mb-2">{{ artist.name }}</div>
                        <p class="text-gray-700 text-base">
                            {{ artist.description | reduce }}
                        </p>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <div class="text-sm">
                            <p class="text-gray-600"><span class="text-red-600">&#10084;</span> {{ artist.likes.length }}</p>
                        </div>
                        <div class="text-sm">
                            <p class="text-blue-600">Voir plus <span class="arrow">&rarr;</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FOTemplate>
</template>

<script>

import {mapActions, mapState} from "vuex";
import FOTemplate from "@/layouts/FOTemplate";
import SearchBar from "@/components/searchBar";

export default {
    name: 'FrontArtists',
    components: {
        FOTemplate,
        SearchBar
    },
    data () {
        return {
            searchArtist: '',
        }
    },
    computed: {
        ...mapState({
            allArtists: state => state.artists.allArtists,
        }),
        filterArtist () {
            return this.allArtists.filter(artist => artist.name.toLowerCase().match(this.searchArtist.toLowerCase()))
        }
    },
    filters: {
        reduce: function (value) {
            let limit = 100
            return value.length >= limit ? value.substring(0,limit) + '...' : value
        }
    },
    methods: {
        ...mapActions({
            fetchAllArtists: 'artists/fetchAllArtists',
        }),
        getArtist (id) {
            this.$router.push({
                name: 'Artist',
                params: { id: id }
            })
        }
    },
    mounted () {
        this.fetchAllArtists('?_embed=likes')
    },
}
</script>

<style scoped>
.card-news {
    @apply bg-white p-2 flex flex-col justify-between leading-normal w-1/4 cursor-pointer;
}
span {
    transition: .3s;
}
.card-news:hover .arrow{
    transition: .3s;
    margin-left: .5rem;
}
.card-news > div:hover {
    background-color: #f5f5f5;
}
</style>
