<template>
  <div>
    {{ lowLaptops }}
  </div>
</template>

<script>
import * as cheerio from 'cheerio';
import neweggService from "../services/NeweggServices.js";
export default {
  props: {},
  data() {
    return {
      lowLaptops: [],
      laptop: {
        title: "",
        image: '',
        link: `${this.currentLink}`,
        price: ''
      }
    };
  },
  methods: {
    async fetchLowLaptops() {
      await neweggService
        .listLowLaptops()
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          this.$(".item-cells-wrap border-cells items-grid-view four-cells expulsion-one-cell").each((_idx, el) => {
            const laptops = $(el);
            this.title = laptops
              .find("div.a.span-item-open-box-italic")
              .text();
            this.image = laptops.find('img.s-image').attr('src')
            this.currentLink = laptops.find('a.a-link-normal.a-text-normal').attr('href')
            const reviews = laptops.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label')
            const stars = laptops.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('ari-label')
            this.price = laptops.find('span.a-price . span.a-offscreen').text()
            if (reviews) {
              this.laptop.reviews = reviews
            }
            if (stars) {
              this.laptop.stars = reviews
            }
            this.lowLaptops.push(this.laptop);
            return this.lowLaptops;
          });
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
    },
    async created() {
      await this.fetchLowLaptops()
      console.log(this.lowLaptops)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
