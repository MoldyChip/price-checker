import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('http://localhost:3000/bestbuy',{      
            headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
    }
}