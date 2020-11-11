<template>
    <BOTemplate>
        <div v-if="alertConcerts" class="my-2">
            <alert :msg='alertConcerts.msg' :type="alertConcerts.type"></alert>
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
                        <tr class="border-b hover:bg-teal-400 hover:text-white bg-gray-100 text-left" v-for="concert in sortedConcertsByDate" :key="concert.id">
                            <td class="p-3 px-5">{{ concert.name }}</td>
                            <td class="p-3 px-5">{{ getFormatDate(concert.date) }}</td>
                            <td v-if="typeof concert.artistId === 'object'" class="p-3 px-5">{{ concert.artistId.name }}</td>
                            <td v-else class="p-3 px-5"><i>Artiste non trouvé</i></td>
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
    import { mapActions, mapState, mapGetters } from 'vuex'

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
            }),
            ...mapGetters({
                sortedConcertsByDate: 'concerts/sortedConcertsByDate'
            })
        },
        methods: {
            ...mapActions({
                fetchAllConcerts: 'concerts/fetchAllConcerts',
                createConcert: 'concerts/createConcert',
                deleteConcert: 'artists/deleteConcerts'
            }),
            getFormatDate(date) {
                let date_ob = new Date(date);
                //  Adjust 0 before single digit date
                let dateFormat = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                return `${dateFormat}/${month}/${year}`
            },
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
        }
    }
</script>

<style scoped>

</style>