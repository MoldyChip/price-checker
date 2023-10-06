<template>
  <div class="home">
    <newEgg msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import newEgg from '@/components/NewEggLaptops.vue'

export default {
  name: 'HomeView',
  components: {
    newEgg
  }
}
</script>
