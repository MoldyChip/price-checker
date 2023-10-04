<template>
  {{ lowLaptops }}
</template>

<script>
import * as cheerio from 'cheerio';
import neweggServices from '@/services/NeweggServices';
export default {
    data() {
        return {
            lowLaptops: [],
            laptop: {
                title: '',
                image: '',
                link: '',
                price: ''
            }
        }
    },
    methods: {
        async fetchLowLaptops() {
            await neweggServices.listLowLaptops().then((response) => {
                let dataArray = [];
                let html = response.data;
                let $ = cheerio.load(html);
                $('div.item-cells-wrap border-cells items-grid-view four-cells expulsion-one-cell div.item-cell div.item-container').each(() => {
                    this.title = $(this).find('a span');
                    this.image = $(this).find('a img').attr('src');
                    this.link = $(this).find('a').attr('href');
                    this.price = $(this).find('div.item-action ul.price');

                    dataArray.push({
                        'title': this.title,
                        'image': this.image,
                        'link': this.link,
                        'price': this.price
                    });
                });
                console.log(dataArray);
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

<style>

</style>