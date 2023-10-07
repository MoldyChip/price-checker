import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('http://localhost:3000/amazon',{      
            headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        })
    },
    listPage2() {
        return axios.get('http://localhost:3000/amazon2',{      
            headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        })
    }
}