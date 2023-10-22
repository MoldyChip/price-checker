import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('http://localhost:3000/bestbuy',{      
            headers: {
            'Access-Control-Allow-Origin': 'https://www.bestbuy.com',
          },
        });
    },
    listPage2() {
        return axios.get('http://localhost:3000/bestbuy2',{
            headers: {
                'Access-Control-Allow-Origin': 'https://www.bestbuy.com',
            }
        })
    },
    addLaptops(laptops) {
        return axios.post("/bestbuy", laptops);
      },
      getlaptops() {
        return axios.get("/bestbuy");
      }
}