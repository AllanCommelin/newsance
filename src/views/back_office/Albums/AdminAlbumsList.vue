<template>
    <BOTemplate>
        <div v-if="alertAlbums" class="my-2">
            <alert :msg='alertAlbums.msg' :type="alertAlbums.type"></alert>
        </div>
        <div class="text-gray-900">
            <div class="p-4 flex justify-between">
                <h1 class="text-3xl">
                    Albums
                </h1>
                <button @click="goToCreate" class="px-4 py-1 text-white font-light tracking-wider bg-teal-500 hover:bg-teal-800 rounded">
                    Créer un albums
                </button>
            </div>
            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 px-5">Nom</th>
                        <th class="text-left p-3 px-5">Sortie</th>
                        <th class="text-left p-3 px-5">Tracks</th>
                        <th class="text-left p-3 px-5">Artiste</th>
                        <th></th>
                    </tr>
                    <template v-if="allAlbums.length > 0">
                        <tr class="border-b hover:bg-teal-400 hover:text-white bg-gray-100 text-left" v-for="albums in sortedAlbumsByReleased" :key="albums.id">
                            <td class="p-3 px-5">{{ albums.name }}</td>
                            <td class="p-3 px-5"> {{ albums.released }}</td>
                            <td class="p-3 px-5">{{ albums.tracks }}</td>
                            <td v-if="albums.artist" class="p-3 px-5">{{ albums.artist.name }}</td>
                            <td v-else class="p-3 px-5"><i>Artiste non trouvé</i></td>
                            <td class="p-3 px-5 flex justify-end">
                                <button @click="goToEdit(albums.id)" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                                    Modifier
                                </button>
                                <button @click="remove(albums.id)" class="px-4 py-1 text-white font-light tracking-wider bg-red-500 hover:bg-red-800 rounded">
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="3" class="p-4"> Aucune news pour le moment !</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
    </BOTemplate>
</template>

<script>
    import BOTemplate from '@/layouts/BOTemplate'
    import Alert from '@/components/Alert'
    import { mapActions, mapState, mapGetters } from 'vuex'

    export default {
        name: "AdminAlbumsList",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                allAlbums: state => state.albums.allAlbums,
                alertAlbums: state => state.albums.alertAlbums
            }),
            ...mapGetters({
                sortedAlbumsByReleased: 'albums/sortedAlbumsByReleased'
            })
        },
        methods: {
            ...mapActions({
                fetchAllAlbums: 'albums/fetchAllAlbums',
                createAlbum: 'albums/createAlbum',
                deleteAlbum: 'albums/deleteAlbum'
            }),
            goToCreate () {
                this.$router.push({ name: 'Admin.albums.create'})
            },
            goToEdit (id) {
                this.$router.push({name: 'Admin.albums.edit', params: { id: id } })
            },
            remove (id) {
                this.deleteAlbum(id)
                    .then(() => {
                        this.fetchAllAlbums()
                    }).catch()

            }
        },
        mounted () {
            this.fetchAllAlbums()
        }
    }
</script>

<style scoped>

</style>