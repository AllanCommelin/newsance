<template>
  <div>
    <div class="banner flex justify-center items-center">
      <h1 class="text-6xl font-black text-white">Newsance</h1>
    </div>
    <FOTemplate>
      <PopularArtists />
    </FOTemplate>
  </div>
</template>

<script>
// @ is an alias to /src
import FOTemplate from "@/layouts/FOTemplate"
import PopularArtists from '@/components/front_office/PopularArtists.vue'

export default {
  name: 'Home',
  components: {
    FOTemplate,
    PopularArtists
  }
}
</script>

<style lang="scss">
  .banner {
    width: 100%;
    height: 40vh;
    background-image: url("../assets/banner.jpg");
    background-position: center;
    background-size: cover;
  }
</style>
