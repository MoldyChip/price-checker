<template>
  <div class="amazon-container">
    <h1>Amazon's Lowest Gaming Laptops</h1>
    <div class="card-container">
  <div class="laptop-card" v-for="(laptop, index) in laptops" :key="index">
    <a class="anchor-card" :href="'https://www.amazon.com' + laptop.link">
      <div class="card-content">
    <img class="laptop-image" :src='laptop.imageUrl' alt="laptop image" />
    <h5 v-text="laptop.title" class="card-title"></h5>
     </div>
     <div class="card-details">
    <p>{{ laptop.stars }}  {{ laptop.reviews }}</p>
    <span>Price ${{ laptop.price }}</span>
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
          const filteredArray = combinedLaptops.filter(laptop => laptop.price && laptop.imageUrl);
          return filteredArray
        }
      },
    methods: {
        getLaptops(){
          amazonServices.getLaptops().then((response) => {
            const laptop1 = response.data;
            this.laptops.push(...laptop1);
          })
        },
        addLaptops() {
          if(this.filteredArray.length > 0){
            console.log(this.filteredArray)
            amazonServices.addLaptops(this.filteredArray)
          }
        },
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
                        'title': title,
                        'imageUrl': image,
                        'link': link,
                        'price': price,
                        'stars': stars,
                        'reviews': reviews,
                        'datePulled': new Date().toJSON()
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
        {
            const response = await amazonServices.listPage2();
                  let html = response.data;
                  let $ = cheerio.load(html);
                  const dataArray = [];
                  $('div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16').each(function() { //cannot use ()=>{}, if wanting to it must be in this format (_idx,el) => {}
                    const image = $(this).find('img.s-image').attr('src');
                    const title = $(this).find('img.s-image').attr('alt');
                    const link = $(this).find('a.a-link-normal.s-no-outline').attr('href');
                    const price = $(this).find('span.a-price-whole').text() + $(this).find('span.a-price-fraction').text();
                    const stars = $(this).find('span.a-icon-alt').text();
                    const reviews = $(this).find('span.a-size-base.s-underline-text').text();
                    dataArray.push({
                        'title': title,
                        'imageUrl': image,
                        'link': link,
                        'price': price,
                        'stars': stars,
                        'reviews': reviews,
                        'datePulled': new Date().toJSON()
                    });
                });
                  this.lowLaptops2 = dataArray;
                  const combinedLaptops = this.lowLaptops.concat(this.lowLaptops2);
                  this.filteredArray = combinedLaptops.filter(laptop => laptop.price && laptop.imageUrl).slice(0,5);
                 if(this.filteredArray.length > 0){
                     this.addLaptops();
                  }
                  this.getLaptops();
                  console.log(this.laptops);
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