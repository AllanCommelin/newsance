<template>
    <FOTemplate>
        <h1 class="text-center">Liste des concerts</h1>
        <search-bar v-model="searchConcert"></search-bar>
        <table class="table-auto mx-auto w-full">
            <thead>
            <tr>
                <th class="px-4 py-2">Titre</th>
                <th class="px-4 py-2">Artiste</th>
                <th class="px-4 py-2">date</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="(concert, index) in filterConcert"
                 :key="concert.name"
                 :class="index % 2 === 0 ? '' : 'bg-gray-100'"
            >
                <td class="border px-4 py-2">{{ concert.name }}</td>
                <td class="border px-4 py-2"><a class="cursor-pointer underline text-blue-600" @click="getArtist(concert.artist.id)">{{ concert.artist.name }}</a></td>
                <td class="border px-4 py-2">{{ concert.date }}</td>
            </tr>
            </tbody>
        </table>
    </FOTemplate>
</template>

<script>
import {mapActions, mapState} from "vuex";
import FOTemplate from "@/layouts/FOTemplate";
import SearchBar from "@/components/searchBar";

export default {
    name: 'FrontConcert',
    components: {SearchBar, FOTemplate},
    computed: {
        ...mapState({
            allConcerts: state => state.concerts.allConcerts,
        }),
        filterConcert () {
            return this.allConcerts.filter(concert =>
                concert.name.toLowerCase().match(this.searchConcert.toLowerCase()) ||
                concert.artist.name.toLowerCase().match(this.searchConcert.toLowerCase())
            )
        }
    },
    data () {
      return {
          searchConcert: '',
      }
    },
    methods: {
        ...mapActions({
            fetchAllConcerts: 'concerts/fetchAllConcerts',
        }),
        getArtist (id) {
            this.$router.push({
                name: 'Artist',
                params: { id: id }
            })
        },
    },
    mounted () {
        this.fetchAllConcerts()
    },
}
</script>
