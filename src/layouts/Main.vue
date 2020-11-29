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

<style lang="scss">
    input[type='button'] {
        &:disabled {
            background-color: #a0aec0;
            color: #edf2f7;
        }
    }
</style>