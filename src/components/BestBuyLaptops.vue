<template>
    <div class="bestbuy-container">
  
    </div>
  </template>
  
  <script>
  import * as cheerio from 'cheerio';
  import bestBuyServices from '@/services/BestBuyServices.js'
  export default {
      data() {
          return {
              lowLaptops: []
          }
      },
      methods: {
          async fetchLowLaptops() {
              await bestBuyServices.listLowLaptops().then((response) => {
                  console.log('success in fetching link');
                  let html = response.data;
                  let $ = cheerio.load(html);
             //     const dataArray = [];
                  console.log($(''));
              })
          }
      },
      async created() {
          await this.fetchLowLaptops();
      }
  }
  </script>
  
  <style scoped>
  
  </style>