<template>
    <BOTemplate>
        <div v-if="alertAlbums" class="my-2">
            <alert :msg='alertAlbums.msg' :type="alertAlbums.type"></alert>
        </div>
        <div class="p-4 flex">
            <h1 class="text-3xl">
                Modifier un album
            </h1>
        </div>
        <div class="w-ful text-left">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nom">
                        Nom de l'album
                    </label>
                    <input v-model="album.name"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="nom" type="text" placeholder="Nom de l'album">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="realesed">
                        Sortie de l'album
                    </label>
                    <input v-model="album.released"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="realesed" type="number" min="1800" max="2030" placeholder="Sortie de l'album">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="tracks">
                        Nombres de tracks
                    </label>
                    <input v-model="album.tracks"
                           class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                           id="tracks" type="number" placeholder="Tracks">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="arist">
                        Artiste
                    </label>
                    <div class="relative">
                        <select v-model="album.artistId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="arist">
                            <option :value="null" :selected="album.artistId === null">-- Sélectionner un artiste --</option>
                            <option :selected="album.artistId === artist.id" class="capitalize" v-for="artist in allArtists" :key="artist.id" :value="artist.id">{{ artist.name.charAt(0).toUpperCase() + artist.name.slice(1) }}</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <input type="button" value="Enregistrer" @click="saveAlbum" :disabled="!isFullFiled" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded"/>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'

    export default {
        name: "AdminAlbumsEdit",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                album: state => state.albums.album,
                allArtists: state => state.artists.allArtists,
                alertAlbums: state => state.albums.alertAlbums
            }),
            isFullFiled: function () {
                return this.album.name !== '' && this.album.released !== '' && this.album.tracks !== '' && this.album.artistId
            }
        },
        methods: {
            ...mapActions({
                fetchAlbum: 'albums/fetchAlbum',
                fetchAllArtists: 'artists/fetchAllArtists',
                editAlbum: 'albums/editAlbum',
                errorAlbums: 'albums/errorAlbums',
            }),
            saveAlbum () {
                if(this.isFullFiled) {
                    this.editAlbum({
                        id: this.album.id,
                        released: this.album.released,
                        tracks: this.album.tracks,
                        artistId: this.album.artistId,
                    })
                        .then(() => {
                            this.$router.push({name: 'Admin.albums'})
                        }).catch()
                } else {
                    this.errorAlbums('Tous les champs doivent être renseignés')
                }
            }
        },
        mounted () {
            this.fetchAllArtists()
            this.fetchAlbum(this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>