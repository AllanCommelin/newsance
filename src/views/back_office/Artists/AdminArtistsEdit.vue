<template>
    <BOTemplate>
        <div v-if="alertArtists" class="my-2">
            <alert :msg='alertArtists.msg' :type="alertArtists.type"></alert>
        </div>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Modifier un artiste
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
                        <img v-if="artist.avatar" class="inline-block h-10 w-10 rounded-full text-white shadow-solid"
                             :src="artist.avatar" :alt="artist.name">
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
                        <select v-model="artist.genreId"
                                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="genre">
                            <option :value="null" :selected="artist.genreId === null">-- Sélectionner un genre --
                            </option>
                            <option :selected="artist.genreId === genre.id" class="capitalize"
                                    v-for="genre in allGenres" :key="genre.id" :value="genre.id">{{
                                genre.name.charAt(0).toUpperCase() + genre.name.slice(1) }}
                            </option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Description de l'artiste
                    </label>
                    <textarea v-model="artist.description"
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                              id="content" placeholder="Contenu"></textarea>
                </div>
                <input type="button" value="Enregistrer" @click="saveArtist" :disabled="!isFullFiled"
                       class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded"/>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminArtistsEdit",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                artist: state => state.artists.artist,
                allGenres: state => state.artists.allGenres,
                alertArtists: state => state.artists.alertArtists
            }),
            isFullFiled: function () {
                return this.artist.name !== '' && this.artist.origin !== '' && this.artist.description !== '' && this.artist.genreId
            }
        },
        methods: {
            ...mapActions({
                fetchAllGenres: 'artists/fetchAllGenres',
                fetchArtist: 'artists/fetchArtist',
                editArtist: 'artists/editArtist',
                errorArtists: 'artists/errorArtists'
            }),
            saveArtist() {
                if (this.isFullFiled) {
                    this.editArtist({
                        id: this.artist.id,
                        name: this.artist.name,
                        origin: this.artist.origin,
                        avatar: this.artist.avatar,
                        genreId: this.artist.genreId,
                        likes: this.artist.likes,
                        description: this.artist.description,
                    })
                        .then(() => {
                            this.$router.push({name: 'Admin.artists'})
                        }).catch()
                } else {
                    this.errorArtists('Tous les champs doivent être renseignés')
                }
            }
        },
        mounted() {
            this.fetchAllGenres()
            this.fetchArtist({
                id: this.$route.params.id,
            })
        }
    }
</script>

<style scoped>

</style>
