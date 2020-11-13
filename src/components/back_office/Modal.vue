<template>
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-y-visible">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" @click="cancelAction"></div>
        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="modal-content py-4 text-left px-6">
                <div class="flex justify-between items-center pb-3">
                    <p class="text-2xl font-bold">Attention!</p>
                    <div class="modal-close cursor-pointer z-50" @click="cancelAction">
                        <svg class="fill-current text-teal-600" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>

                <p>Êtes-vous sûr de vouloir supprimer "{{ item }}"</p>

                <div class="flex justify-end pt-2">
                    <button @click="cancelAction" class="modal-close px-4 text-teal-600 p-3 rounded-lg bg-transparent hover:text-teal-400">Fermer</button>
                    <button @click="confirmAction" class="px-4 text-white p-3 rounded-lg bg-red-500 hover:bg-gray-100 hover:bg-red-400 mr-2">Oui j'en suis sûr</button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Modal",
        props: {
            item: {
                type: String
            }
        },
        methods: {
            confirmAction() {
                this.$emit("confirm");
            },
            cancelAction() {
                this.$emit("cancel");
            }
        }
    }
</script>

<style scoped>

</style>