<template>
  <div class="home">
    <newEgg />
    <amazon />
    <best-buy-laptops />
  </div>
</template>

<script>
// @ is an alias to /src
import newEgg from '@/components/NewEggLaptops.vue'
import amazon from '@/components/AmazonLaptops.vue'
import BestBuyLaptops from '@/components/BestBuyLaptops.vue'

export default {
  name: 'HomeView',
  components: {
    newEgg,
    amazon,
    BestBuyLaptops
  }
}
</script>
,
    BestBuyLaptops