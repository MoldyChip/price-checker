import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('http://localhost:3000/newEgg',{      
            headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
    },
    addLaptops(laptops) {
        return axios.post("/newegg", laptops);
      },
      getlaptops() {
        return axios.get("/newegg");
      }
}