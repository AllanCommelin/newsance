<template>
    <BOTemplate>
        <div v-if="alertConcerts" class="my-2">
            <alert :msg='alertConcerts.msg' :type="alertConcerts.type"></alert>
        </div>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Créer un concert
            </h1>
        </div>
        <div class="w-ful text-left">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nom">
                        Nom du concert
                    </label>
                    <input v-model="concert.name"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="nom" type="text" placeholder="Nom du concert">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="origin">
                        Date du concert
                    </label>
                    <input v-model="concert.date"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="origin" type="date" placeholder="Date">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="genre">
                        Artiste
                    </label>
                    <div class="relative">
                        <select v-model="concert.artistId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="genre">
                            <option :value="null" :selected="concert.artistId === null">-- Sélectionner un artiste --</option>
                            <option :selected="concert.artistId === artist.id" class="capitalize" v-for="artist in allArtists" :key="artist.id" :value="artist.id">{{ artist.name.charAt(0).toUpperCase() + artist.name.slice(1) }}</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <button @click="addConcert" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                    Créer
                </button>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminConcertsCreate",
        components: {
            BOTemplate,
            Alert
        },
        data: () => {
            return {
                concert: {
                    name: '',
                    date: '',
                    artistId: null
                }
            }
        },
        computed: {
            ...mapState({
                allArtists: state => state.artists.allArtists,
                alertConcerts: state => state.concerts.alertConcerts
            })
        },
        methods: {
            ...mapActions({
                fetchConcert: 'concerts/fetchConcert',
                fetchAllArtists: 'artists/fetchAllArtists',
                createConcert: 'concerts/createConcert'
            }),
            addConcert () {
                this.createConcert(this.concert)
                    .then(() => {
                        this.$router.push({ name: 'Admin.concerts'})
                    }).catch()
            }
        },
        mounted () {
            this.fetchAllArtists()
        }
    }
</script>

<style scoped>

</style>