<template>
    <div>
        <h3 class="text-3xl font-bold">Les 5 artistes les plus likés</h3>
        <div class="max-w-sm w-full lg:max-w-full lg:flex flex-wrap">
            <div
                v-for="(artist) in sortedArtists(allArtists)"
                :key="artist.id"
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
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'PopularArtists',
    computed: {
        ...mapState({
            allArtists: state => state.artists.allArtists,
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
            fetchAllArtists: 'artists/fetchAllArtists',
        }),
        getArtist (id) {
            this.$router.push({
                name: 'Artist',
                params: { id: id }
            })
        },
        sortedArtists: function(arr) {
            return arr.slice(0, 5).sort((a, b) => {
                return b.likes.length - a.likes.length
            })
        }
    },
    mounted () {
        this.fetchAllArtists('?_embed=likes')
    },
}
</script>

<style lang="scss" scoped>
    .card-news {
        @apply bg-white p-2 flex flex-col justify-between leading-normal w-1/3 cursor-pointer;
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