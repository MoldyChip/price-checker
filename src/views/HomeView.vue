<template>
  <div class="home">
    <newEgg />
    <amazon />
    <b-h-laptops />
  </div>
</template>

<script>
// @ is an alias to /src
import newEgg from '@/components/NewEggLaptops.vue'
import amazon from '@/components/AmazonLaptops.vue'
import BHLaptops from '@/components/B&HLaptops.vue'

export default {
  name: 'HomeView',
  components: {
    newEgg,
    amazon,
    BHLaptops
  }
}
</script>
