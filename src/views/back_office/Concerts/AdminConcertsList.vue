<template>
    <BOTemplate>
        <div v-if="alertArtists" class="my-2">
            <alert :msg='alertArtists.msg' :type="alertArtists.type"></alert>
        </div>
        <div class="text-gray-900">
            <div class="p-4 flex justify-between">
                <h1 class="text-3xl">
                    Concerts
                </h1>
                <button @click="goToCreate" class="px-4 py-1 text-white font-light tracking-wider bg-teal-500 hover:bg-teal-800 rounded">
                    Créer un concert
                </button>
            </div>
            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 px-5">Nom</th>
                        <th class="text-left p-3 px-5">Date</th>
                        <th class="text-left p-3 px-5">Artiste</th>
                        <th></th>
                    </tr>
                    <template v-if="allConcerts.length > 0">
                        <tr class="border-b hover:bg-teal-400 hover:text-white bg-gray-100 text-left" v-for="concert in allConcerts" :key="concert.id">
                            <td class="p-3 px-5">{{ concert.name }}</td>
                            <td class="p-3 px-5">{{ concert.date }}</td>
                            <td class="p-3 px-5">Nom de l'artiste</td>
                            <td class="p-3 px-5 flex justify-end">
                                <button @click="goToEdit(concert.id)" class="px-4 py-1 mr-2 text-white font-light tracking-wider bg-green-500 hover:bg-green-800 rounded">
                                    Modifier
                                </button>
                                <button @click="remove(concert.id)" class="px-4 py-1 text-white font-light tracking-wider bg-red-500 hover:bg-red-800 rounded">
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
        name: "AdminConcertsList",
        components: {
            BOTemplate,
            Alert
        },
        computed: {
            ...mapState({
                allConcerts: state => state.concerts.allConcerts,
                alertConcerts: state => state.concerts.alertConcerts
            })
        },
        methods: {
            ...mapActions({
                getArtist: 'concerts/getArtists',
                fetchAllConcerts: 'concerts/fetchAllConcerts',
                createConcert: 'concerts/createConcert',
                deleteConcert: 'artists/deleteArtists'
            }),
            goToCreate () {
                this.$router.push({ name: 'Admin.concerts.create'})
            },
            goToEdit (id) {
                this.$router.push({name: 'Admin.concerts.edit', params: { id: id } })
            },
            remove (id) {
                this.deleteConcert(id)
                    .then(() => {
                        this.fetchAllConcerts()
                    }).catch()

            }
        },
        mounted () {
            this.fetchAllConcerts()
        },
    }
</script>

<style scoped>

</style>