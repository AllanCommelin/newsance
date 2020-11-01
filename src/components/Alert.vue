<template>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-left" role="alert">
        <strong class="font-bold">{{ title }}</strong><br>
        <span class="block sm:inline">{{ msg }}</span>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            title: String,
            msg: String,
            type: String
        }
    }
</script>

<style scoped>

</style>