<template>
    <BOTemplate>
        <div v-if="alertArtists" class="my-2">
            <alert :msg='alertArtists.msg' :type="alertArtists.type"></alert>
        </div>
        <div class="text-gray-900">
            <div class="p-4 flex justify-between">
                <h1 class="text-3xl">
                    Artistes
                </h1>
                <button @click="goToCreate" class="px-4 py-1 text-white font-light tracking-wider bg-teal-500 hover:bg-teal-800 rounded">
                    Créer un artiste
                </button>
            </div>
            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 px-5">Image</th>
                        <th class="text-left p-3 px-5">Nom</th>
                        <th class="text-left p-3 px-5">Pays</th>
                        <th class="text-left p-3 px-5">Description</th>
                        <th class="text-left p-3 px-5">Likes</th>
                        <th></th>
                    </tr>
                    <template v-if="allArtists.length > 0">
                        <tr class="border-b hover:bg-teal-400 hover:text-white bg-gray-100 text-left"
                            v-for="artist in allArtists" :key="artist.id">
                            <td class="p-3 px-5">
                                <img class="inline-block h-10 w-10 rounded-full text-white shadow-solid" :src="artist.avatar" :alt="artist.name">
                            </td>
                            <td class="p-3 px-5">{{ artist.name }}</td>
                            <td class="p-3 px-5">{{ artist.origin }}</td>
                            <td class="p-3 px-5">{{ artist.description ? artist.description.substring(0, 15) + '..' : ''}}</td>
                            <td class="p-3 px-5">{{ artist.likes }}</td>
                            <td class="p-3 px-5 flex justify-end">
                                <button @click="goToEdit(artist.id)" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                                    Modifier
                                </button>
                                <button @click="remove(artist.id)" class="px-4 py-1 text-white font-light tracking-wider bg-red-500 hover:bg-red-800 rounded">
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
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "AdminArtistsList",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                allArtists: state => state.artists.allArtists,
                alertArtists: state => state.artists.alertArtists
            })
        },
        methods: {
            ...mapActions({
                fetchAllArtists: 'artists/fetchAllArtists',
                createArtists: 'artists/createArtists',
                deleteArtists: 'artists/deleteArtists'
            }),
            goToCreate () {
                this.$router.push({ name: 'Admin.artists.create'})
            },
            goToEdit (id) {
                this.$router.push({name: 'Admin.artists.edit', params: { id: id } })
            },
            remove (id) {
                this.deleteArtists(id)
                    .then(() => {
                        this.fetchAllArtists()
                    }).catch()

            }
        },
        mounted () {
            this.fetchAllArtists()
        },
    }
</script>

<style scoped>

</style>