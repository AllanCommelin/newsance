<template>
    <BOTemplate>
        <div v-if="alertArtists" class="my-2">
            <alert :msg='alertArtists.msg' :type="alertArtists.type"></alert>
        </div>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Créer un artiste
            </h1>
        </div>
        <div class="w-ful text-left">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nom">
                        Nom de l'artiste
                    </label>
                    <input v-model="artist.name"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="nom" type="text" placeholder="Nom">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">
                        <img v-if="artist.avatar" class="inline-block h-10 w-10 rounded-full text-white shadow-solid" :src="artist.avatar" :alt="artist.name">
                        Image de l'artiste (URL vers une image)
                    </label>
                    <input v-model="artist.avatar"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="avatar" type="url" placeholder="URL">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="origin">
                        Origine de l'artiste
                    </label>
                    <input v-model="artist.origin"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="origin" type="text" placeholder="Origine">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="genre">
                        Genre de musique
                    </label>
                    <div class="relative">
                        <select v-model="artist.genreId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="genre">
                            <option :value="null" :selected="artist.genreId === null">-- Sélectionner un genre --</option>
                            <option :selected="artist.genreId === genre.id" class="capitalize" v-for="genre in allGenres" :key="genre.id" :value="genre.id">{{ genre.name.charAt(0).toUpperCase() + genre.name.slice(1) }}</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Description de l'artiste
                    </label>
                    <textarea v-model="artist.description" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="content" placeholder="Contenu"></textarea>
                </div>
                <button @click="addArtist" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                    Créer
                </button>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminArtistsCreate",
        components: {
            BOTemplate,
            Alert
        },
        data() {
            return {
                artist: {
                    name: '',
                    origin: '',
                    avatar: '',
                    genreId: null,
                    likes: 0,
                    description: '',
                }
            }
        },
        computed: {
            ...mapState({
                allGenres: state => state.artists.allGenres,
                alertArtists: state => state.news.alertArtists
            })
        },
        methods: {
            ...mapActions({
                fetchAllGenres: 'artists/fetchAllGenres',
                createArtist: 'artists/createArtist',
                deleteArtists: 'artists/deleteArtists'
            }),
            addArtist () {
                this.createArtist(this.artist)
                    .then(() => {
                        this.$router.push({ name: 'Admin.artists'})
                    }).catch()
            }
        },
        mounted () {
            this.fetchAllGenres()
        },
    }
</script>

<style scoped>

</style>