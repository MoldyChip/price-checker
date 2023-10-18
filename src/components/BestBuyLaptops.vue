<template>
    <div class="bestbuy-container">
    <h1>BestBuy's Lowest Gaming Laptops</h1>
    <div class="card-container">
  <div class="laptop-card" v-for="(laptop, index) in filteredLaptops.slice(0,5)" :key="index">
    <a class="anchor-card" :href="'https://www.bestbuy.com' + laptop.link">
      <div class="card-content">
    <img class="laptop-image" :src='laptop.image' alt="laptop image" />
    <h5 v-text="laptop.title" class="card-title"></h5>
     </div>
     <div class="card-details">
    <p >{{ laptop.stars }}  {{ laptop.reviews }}</p>
    <span v-text="'Price ' + laptop.price.slice(0,7)"></span>
  </div>
  </a>
  </div>
</div>
    </div>
  </template>
  
  <script>
  import * as cheerio from 'cheerio';
  import bestBuyServices from '@/services/BestBuyServices.js'
  export default {
      data() {
          return {
              lowLaptops: [],
              lowLaptops2: [],
          }
      },
      computed: {
        filteredLaptops() {
          const combinedLaptops = this.lowLaptops.concat(this.lowLaptops2);
          const filteredArray = combinedLaptops.filter(laptop => laptop.price && laptop.image);
          return filteredArray
        }
      },
      methods: {
         async fetchLowLaptops() {
            try { 
              const response = await bestBuyServices.listLowLaptops();
                  let html = response.data;
                  let $ = cheerio.load(html);
                  const dataArray = [];
                  $('ol.sku-item-list li.sku-item').each(function() {
                    const title = $(this).find('h4.sku-title a').text();
                    const image = $(this).find('img.product-image ').attr('src');
                    const link = $(this).find('a.image-link').attr('href');
                    const price = $(this).find('div.priceView-hero-price.priceView-customer-price > span').text();
                    const stars = $(this).find('p.visually-hidden').text();

                    dataArray.push({
                      'title': title,
                      'image': image,
                      'link': link,
                      'price':price,
                      'stars': stars,
                      'datePulled': new Date().toJSON()
                    })
                  });
                  this.lowLaptops = dataArray;
              }
          catch(error) {
            if (error.response) {
            // error.response exists
            // Request was made, but response has error status (4xx or 5xx)
            console.log("Error fetching laptops", error.response.status);
          } else if (error.request) {
            // There is no error.response, but error.request exists
            // Request was made, but no response was received
            console.log(
              "Error getting laptops: unable to communicate with server"
            );
          } else {
            // Neither error.response and error.request exist
            // Request was *not* made
            console.log("Error getting laptops: make request");
          }}
          {
            const response = await bestBuyServices.listPage2();
                  let html = response.data;
                  let $ = cheerio.load(html);
                  const dataArray = [];
                  $('ol.sku-item-list li.sku-item').each(function() {
                    const title = $(this).find('h4.sku-title a').text();
                    const image = $(this).find('img.product-image ').attr('src');
                    const link = $(this).find('a.image-link').attr('href');
                    const price = $(this).find('div.priceView-hero-price.priceView-customer-price > span').text();
                    const stars = $(this).find('p.visually-hidden').text();

                    dataArray.push({
                      'title': title,
                      'image': image,
                      'link': link,
                      'price':price,
                      'stars': stars,
                    })
                  });
                  this.lowLaptops2 = dataArray;
          }
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
  box-shadow: 0 4px 8px 0 #000000;
  transition: 0.3s;
  background-color: rgba(255, 255, 255, 0.16);
  border-radius: 5px;
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