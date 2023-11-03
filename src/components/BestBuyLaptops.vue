<template>
    <div class="bestbuy-container">
    <h1>BestBuy's Lowest Gaming Laptops</h1>
    <div class="card-container">
  <div class="laptop-card" v-for="(laptop, index) in laptops" :key="index">
    <a class="anchor-card" :href="laptop.link">
      <div class="card-content">
    <img class="laptop-image" :src='laptop.imageUrl' alt="laptop image" />
    <h5 v-text="laptop.title" class="card-title"></h5>
     </div>
     <div class="card-details">
    <p >{{ laptop.stars }}</p>
    <span v-text="'Price ' + laptop.price"></span>
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
            filteredArray: [],
            laptops: [],
            currentTime: new Date().toJSON()
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
        getLaptops(){
          bestBuyServices.getLaptops().then((response) => {
            const laptop1 = response.data;
            this.laptops.push(...laptop1);
          })
        },
        addLaptops() {
          if(this.filteredArray.length > 0){
            console.log(this.filteredArray)
            bestBuyServices.addLaptops(this.filteredArray)
          }
        },
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
                      'imageUrl': image,
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
                      'imageUrl': image,
                      'link': link,
                      'price':price,
                      'stars': stars,
                      'datePulled': new Date().toJSON()
                    })
                  });
                  this.lowLaptops2 = dataArray;
                  const combinedLaptops = this.lowLaptops.concat(this.lowLaptops2);
                  this.filteredArray = combinedLaptops.filter(laptop => laptop.price && laptop.imageUrl).slice(0,5);
                 if(this.filteredArray.length > 0){
                     this.addLaptops();
                  }
          }
          }
      },
      async created() {
        await this.getLaptops();
          console.log(this.laptops);
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