<template>
    <FOTemplate>
        <div class="w-32 h-32 mb-4 mx-auto">
            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple">
                <img :src="artist.avatar" :alt="artist.name" class="object-cover object-center w-full h-full visible group-hover:hidden" />
            </div>
        </div>
        <h1>{{ artist.name }}</h1>
        <div v-if="user.is_login">
            <button
                class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                @click="like(artist.id)"
                v-if="!checkIfUserLiked"
            >Like</button>
            <button
                v-else
                class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                @click="unlike(userLikeId)"
            >Unlike</button>
        </div>
        <span v-if="artist.likes"><span class="text-red-600">&#10084;</span> {{ artist.likes.length }}</span>
        <p>{{ artist.description }}</p>
        <div class="inline-flex my-2" role="group" aria-label="Button group">
            <button
                class="h-10 px-5 text-indigo-100 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-indigo-800"
                :class="switchArtist === 'albums' ? ' bg-indigo-700' : 'bg-indigo-400'"
                @click="switchArtist = 'albums'"
            >Albums</button>
            <button
                class="h-10 px-5 text-indigo-100 transition-colors duration-150 rounded-r-lg focus:shadow-outline hover:bg-indigo-800"
                :class="switchArtist === 'concerts' ? ' bg-indigo-700' : 'bg-indigo-400'"
                @click="switchArtist = 'concerts'"
            >Concerts</button>
        </div>
        <div v-if="switchArtist === 'albums'">
            <table  class="table-auto mx-auto w-full"  v-if="artist.albums.length > 0">
                <thead>
                <tr>
                    <th class="px-4 py-2">Titre</th>
                    <th class="px-4 py-2">Tracks</th>
                    <th class="px-4 py-2">Sortie</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(album, index) in artist.albums"
                     :key="index"
                     :class="index % 2 === 0 ? '' : 'bg-gray-100'"
                >
                    <td class="border px-4 py-2">{{ album.name }}</td>
                    <td class="border px-4 py-2">{{ album.tracks }}</td>
                    <td class="border px-4 py-2">{{ album.released }}</td>
                </tr>
                </tbody>
            </table>
            <div v-else class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-indigo-500">
                <span class="text-xl inline-block mr-5 align-middle">
                    <i class="fas fa-bell" />
                </span>
                <span class="inline-block align-middle mr-8">
                    <span class="text-xl">&#9888;</span> Aucun album n'est renseigné
                </span>
            </div>
        </div>
        <div  v-if="switchArtist === 'concerts'" >
            <table class="table-auto mx-auto w-full" v-if="artist.concerts.length > 0">
                <thead>
                <tr>
                    <th class="px-4 py-2">Titre</th>
                    <th class="px-4 py-2">date</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(concert, index) in artist.concerts"
                     :key="concert.name"
                     :class="index % 2 === 0 ? '' : 'bg-gray-100'"
                >
                    <td class="border px-4 py-2">{{ concert.name }}</td>
                    <td class="border px-4 py-2">{{ concert.date }}</td>
                </tr>
                </tbody>
            </table>
            <div v-else class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-indigo-500">
                <span class="text-xl inline-block mr-5 align-middle">
                    <i class="fas fa-bell" />
                </span>
                <span class="inline-block align-middle mr-8">
                    <span class="text-xl">&#9888;</span> Aucun concert n'est renseigné
                </span>
            </div>
        </div>
    </FOTemplate>
</template>

<script>

import {mapActions, mapState} from "vuex";
import FOTemplate from "@/layouts/FOTemplate";
import artists from "@/store/modules/artists";

export default {
    name: 'Artist',
    components: {
        FOTemplate
    },
    data () {
      return  {
          switchArtist: 'albums'
      }
    },
    computed: {
        ...mapState({
            artist: state => state.artists.artist,
            user: state => state.user,
        }),
        checkIfUserLiked: function () {
            return this.artist.likes.some(like => like.userId === this.user.user.id)
        },
        userLikeId: function () {
            return this.artist.likes.find(like => like.userId === this.user.user.id).id
        }
    },
    methods: {
        ...mapActions({
            fetchArtist: 'artists/fetchArtist',
            like: 'artists/like',
            unlike: 'artists/unlike',
        }),
    },
    mounted () {
        this.fetchArtist({
            id :this.$route.params.id,
            parameter: '/?_embed=likes&_embed=albums&_embed=concerts'
        })
    }
}
</script>
