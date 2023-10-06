import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('http://3.137.202.54:3000/newEgg',{      
            headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
    }
}