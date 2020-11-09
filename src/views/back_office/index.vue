<template>
    <BOTemplate>
        <div class="my-10 text-left">
            <h2 class="font-bold text-5xl">
                Bienvenue sur le back-office de
                <span class="block font-black text-6xl">Newsance</span>
            </h2>
        </div>
    </BOTemplate>
</template>

<script>
    import BOTemplate from '@/layouts/BOTemplate'

    export default {
        name: "index",
        components: {
            BOTemplate
        },
    }
</script>

<style scoped>

</style>