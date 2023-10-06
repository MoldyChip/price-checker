<template>
  <div class="amazon-container">
    <h1>Amazon's Lowest Gaming Laptops</h1>
    <div class="card-container">
  <div class="laptop-card" v-for="(laptop, index) in lowLaptops" :key="index">
    <a class="anchor-card" :href="'https://www.amazon.com' + laptop.link">
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
import amazonServices from '@/services/AmazonServices.js'
export default {
    data() {
        return {
            lowLaptops: []
        }
    },
    methods: {
        async fetchLowLaptops() {
           try { const response = await amazonServices.listLowLaptops();
                let html = response.data;
                let $ = cheerio.load(html);
                const dataArray = []; //will not work if this.lowLaptops is pushed
                $('div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16').each(function() { //cannot use ()=>{}, if wanting to it must be in this format (_idx,el) => {}
                    const image = $(this).find('img.s-image').attr('src');
                    const title = $(this).find('img.s-image').attr('alt');
                    const link = $(this).find('a.a-link-normal.s-no-outline').attr('href');
                    const price = $(this).find('span.a-price-whole').text() + $(this).find('span.a-price-fraction').text();
                    const stars = $(this).find('span.a-icon-alt').text();
                    const reviews = $(this).find('span.a-size-base.s-underline-text').text();
                    dataArray.push({
                        'image': image,
                        'title': title,
                        'link': link,
                        'price': price,
                        'stars': stars,
                        'reviews': reviews
                    });
                });
                this.lowLaptops = dataArray.slice(0,5);
              } catch(error) {
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
          }
        }
        }
    },
    async created() {
        await this.fetchLowLaptops();
    }
}
</script>

<style>
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