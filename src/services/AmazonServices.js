import axios from 'axios';

const instance = axios.create({baseURL: 'https://localhost:44388'});

export default {
    listLowLaptops() {
        return axios.get('http://localhost:3000/amazon')
    },
    listPage2() {
        return axios.get('http://localhost:3000/amazon2')
    },
    addLaptops(laptops) {
      return instance.post("/amazon", laptops);
    },
    getLaptops() {
      return instance.get("/amazon");
    }
}