import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('https://www.bhphotovideo.com/c/products/gaming-laptops/ci/24610?sort=PRICE_LOW_TO_HIGH&filters=fct_graphic-card_3052%3Anvidia-geforce-rtx-3050%7Cnvidia-geforce-rtx-3050-ti%7Cnvidia-geforce-rtx-3060%7Cnvidia-geforce-rtx-3070-ti%7Cnvidia-geforce-rtx-4050%7Cnvidia-geforce-rtx-4060');
    }
}