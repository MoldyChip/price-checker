<template>
    <div class="b&h-container">
    <h1>B&H's Lowest Gaming Laptops</h1>
    <div class="card-container">
  <div class="laptop-card" v-for="(laptop, index) in lowLaptops" :key="index">
    <a class="anchor-card" :href='laptop.link'>
      <div class="card-content">
    <img class="laptop-image" :src='laptop.image' alt="laptop image" />
    <h5 v-text="laptop.title" class="card-title"></h5>
     </div>
     <div class="card-details">
    <p>{{ laptop.stars }}  {{ laptop.reviews }}</p>
    <span>Price {{ laptop.price }}</span>
  </div>
  </a>
  </div>
</div>
    </div>
  </template>
  
  <script>
  import * as cheerio from 'cheerio';
  import bHServices from '@/services/B&HServices.js'
  export default {
      data() {
          return {
              lowLaptops: []
          }
      },
      methods: {
          async fetchLowLaptops() {
              await bHServices.listLowLaptops().then((response) => {
                  console.log('success in fetching link');
                  let html = response.data;
                  let $ = cheerio.load(html);
             //     const dataArray = [];
                  console.log($('div.product_UCJ1nUFwhh'))
              })
          }
      },
      async created() {
          await this.fetchLowLaptops();
      }
  }
  </script>
  
  <style scoped>
  .laptop-card {
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: center;
  margin: 10px;
}
.anchor-card {
  text-decoration: none;
  text-align: center;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
.card-content {
  margin-bottom: 10px;
}

.card-details {
  text-align: center;
}
.card-title {
  width: 200px;
}
img {
  height: 100px;
  max-width: 100%;
  width: 100%;
}
  </style>