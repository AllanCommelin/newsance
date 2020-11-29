<template>
    <div :class="classType" role="alert">
        <span class="block sm:inline">{{ msg }}</span>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            msg: String,
            type: String
        },
        computed: {
          classType:  function () {
              let alertClass;
              switch (this.type) {
                  case 'error':
                      alertClass = { 'px-4 py-3 rounded relative text-left bg-red-100 border border-red-400 text-red-700' : true }
                      break
                  case 'success':
                      alertClass = { 'px-4 py-3 rounded relative text-left bg-green-100 border border-green-400 text-green-700' : true }
                      break
                  case 'info':
                      alertClass = { 'px-4 py-3 rounded relative text-left bg-blue-100 border border-blue-400 text-blue-700' : true }
                      break
              }
              return alertClass
          }
        }
    }
</script>

<style scoped>
    div {
        position: absolute;
    }
</style>