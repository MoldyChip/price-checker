import axios from 'axios';

const instance = axios.create({baseURL: 'https://localhost:44388'});

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
        return instance.post("/bestbuy", laptops);
      },
      getLaptops() {
        return instance.get("/bestbuy");
      }
}