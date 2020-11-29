<template>
    <div>
        <div class="header bg-teal-800 flex justify-center items-center">
            <h1 class="font-bold text-white text-3xl py-10">Administration</h1>
        </div>
        <div class="flex">
            <div class="aside w-1/6 bg-teal-600 h-screen">
                <NavAside></NavAside>
            </div>
            <div class="main w-5/6 px-10">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import NavAside from '@/components/back_office/NavAside'

    export default {
        name: "BOTemplate",
        components: {
            NavAside
        }
    }
</script>

<style scoped>

</style>