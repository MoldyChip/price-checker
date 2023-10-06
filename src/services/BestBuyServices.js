import axios from 'axios';

export default {
    listLowLaptops() {
        return axios.get('https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops');
    }
}