<template>
    <div>
        <Navbar></Navbar>
        <router-view />
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar'

    export default {
        name: "Main",
        components: {
            Navbar
        }
    }
</script>

<style scoped>

</style>