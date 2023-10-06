<template>
    <div class="b&h-container">
  
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
                  console.log($('div.sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col s-widget-spacing-small sg-col-12-of-16'))
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