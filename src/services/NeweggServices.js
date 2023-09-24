import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('https://www.newegg.com/p/pl?N=4131%204841%20601360966%20601411482%20100157995%204814&d=gaming+laptop&Order=1&LeftPriceRange=500+900')
    }
}