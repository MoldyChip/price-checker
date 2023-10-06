<template>
  <div class="newEgg-container">
    <h1>NewEgg's Lowest Gaming Laptops</h1>
    <div class="card-container">
  <div class="laptop-card" v-for="(laptop, index) in lowLaptops" :key="index">
    <a class="anchor-card" :href='laptop.link'>
      <div class="card-content">
    <img class="laptop-image" :src='laptop.image' alt="laptop image" />
    <h5 v-text="laptop.title" class="card-title"></h5>
     </div>
     <div class="card-details">
    <p>{{ laptop.eggs }}  {{ laptop.reviews }}</p>
    <span>Price {{ laptop.price }}</span>
  </div>
  </a>
  </div>
</div>
  </div>
</template>

<script>
import * as cheerio from 'cheerio';
import neweggServices from '@/services/NeweggServices';
export default {
    data() {
        return {
            lowLaptops: [],
        }
    },
    methods: {
         async fetchLowLaptops() {
             await neweggServices.listLowLaptops().then((response) => {
                let html = response.data;
                let $ = cheerio.load(html);
                const dataArray = [];
                $('div.item-cell div.item-container').each(function() {
                    const image = $(this).find('img').attr('src');
                    const title = $(this).find('img').attr('title');
                    const link = $(this).find('a').attr('href');
                    const price = $(this).find('li.price-current strong').text() + $(this).find('li.price-current sup').text();
                    const eggs = $(this).find('a.item-rating i').attr('aria-label');
                    const reviews = $(this).find('a.item-rating span').text();
                     dataArray.push({
                         'title': title,
                         'image': image,
                         'link': link,
                         'price': price,
                         'eggs': eggs,
                         'reviews': reviews
                     });
                });
                this.lowLaptops = dataArray.slice(0,5);
            })
            .catch((error) => {
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
        });
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