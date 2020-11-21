<template>
    <section class="container mx-auto px-4 pt-4">
        <slot></slot>
    </section>
</template>

<script>

export default {
    name: "FOTemplate",
}
</script>

<style scoped>
    h1 {
        @apply text-2xl;
        @apply font-bold;
    }
</style>
