<template>
    <div>
        <label class="text-sm mb-2 text-gray-600" for="search">Rechercher</label>
        <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-1/3" :value="value" id="search" type="text" @input="update($event)">
    </div>
</template>

<script>
export default {
    name: 'searchBar',
    props: {
      value: String
    },
    methods: {
        update (event) {
          this.$emit('input', event.target.value)
        }
    }
}
</script>
