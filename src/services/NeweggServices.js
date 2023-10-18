import axios from 'axios';

const instance = axios.create({baseURL: 'https://localhost:44388'});

export default {
    listLowLaptops() {
        return axios.get('http://localhost:3000/newEgg',{      
            headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
    },
    addLaptops(laptops) {
        return instance.post("/newegg", laptops);
      },
    getLaptops() {
        return instance.get("/newegg");
      }
}