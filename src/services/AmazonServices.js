import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('https://www.amazon.com/s?k=gaming+laptops&i=computers&rh=n%3A565108%2Cp_n_feature_twenty_browse-bin%3A76501028011%7C76501034011%7C76501089011%7C76501112011%7C76501125011&s=price-asc-rank&dc&crid=1MNTEKCRK4QG1&qid=1696552433&rnid=76501006011&sprefix=gaming+laptops%2Caps%2C94&ref=sr_st_price-asc-rank&ds=v1%3AQmqvIvrtZmsPoRUEqxE3Xr0SGyvXtoT3M%2FBIEHuh5is');
    }
}