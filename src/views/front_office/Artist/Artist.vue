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
    computed: {
        ...mapState({
            artist: state => state.artists.artist,
            user: state => state.user.user,
        }),
        checkIfUserLiked: function () {
            return this.artist.likes.some(like => like.userId === this.user.id)
        },
        userLikeId: function () {
            return this.artist.likes.find(like => like.userId === this.user.id).id
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
            parameter: '/?_embed=likes'
        })
    }
}
</script>
