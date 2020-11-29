<template>
    <div>
        <div class="banner flex justify-center items-center">
            <h1 class="text-6xl font-black text-white">Newsance</h1>
        </div>
        <FOTemplate>
            <LastNews class="my-3"/>
            <LastAlbums class="my-3"/>
            <PopularArtists class="my-3"/>
        </FOTemplate>
    </div>
</template>

<script>
// @ is an alias to /src
import FOTemplate from "@/layouts/FOTemplate"
import PopularArtists from '@/components/front_office/PopularArtists.vue'
import LastNews from "@/components/front_office/LastNews"
import LastAlbums from "@/components/front_office/LastAlbums";

export default {
    name: 'Home',
    components: {
        FOTemplate,
        PopularArtists,
        LastNews,
        LastAlbums
    }
}
</script>

<style lang="scss">
.banner {
    width: 100%;
    height: 40vh;
    background-image: url("../../assets/banner.jpg");
    background-position: center;
    background-size: cover;
}
</style>
