<template>
  <div class="home">
    <newEgg />
    <amazon />
    <bestbuy />
  </div>
</template>

<script>
// @ is an alias to /src
import newEgg from '@/components/NewEggLaptops.vue'
import amazon from '@/components/AmazonLaptops.vue'
import bestbuy from '@/components/BestBuyLaptops.vue'

export default {
  name: 'HomeView',
  components: {
    newEgg,
    amazon,
    bestbuy
  }
}
</script>
