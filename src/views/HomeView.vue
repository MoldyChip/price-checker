<template>
  <div class="home">
    <newEgg />
    <amazon />
  </div>
</template>

<script>
// @ is an alias to /src
import newEgg from '@/components/NewEggLaptops.vue'
import amazon from '@/components/AmazonLaptops.vue'

export default {
  name: 'HomeView',
  components: {
    newEgg,
    amazon
  }
}
</script>
