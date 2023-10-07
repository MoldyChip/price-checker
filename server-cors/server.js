const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
const port = 3000;
// type node server.js to run server
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req,res) => res.json("Server is running"))

app.get("/amazon", async (req,res) => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=gaming+laptops&i=computers&rh=n%3A565108%2Cp_n_feature_twenty_browse-bin%3A76501028011%7C76501034011%7C76501089011%7C76501112011%7C76501125011&s=price-asc-rank&dc&crid=1MNTEKCRK4QG1&qid=1696552433&rnid=76501006011&sprefix=gaming+laptops%2Caps%2C94&ref=sr_st_price-asc-rank&ds=v1%3AQmqvIvrtZmsPoRUEqxE3Xr0SGyvXtoT3M%2FBIEHuh5is', {
         withCredentials: true
        });
    res.send(response.data);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

app.get("/amazon2", async (req,res) => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=gaming+laptops&i=computers&rh=n%3A565108%2Cp_n_feature_twenty_browse-bin%3A76501028011%7C76501034011%7C76501089011%7C76501112011%7C76501125011&s=price-asc-rank&dc&page=2&crid=1MNTEKCRK4QG1&qid=1696651162&rnid=76501006011&sprefix=gaming+laptops%2Caps%2C94&ref=sr_pg_2', {
            withCredentials: true
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
})

app.get("/newEgg", async (req,res) => {
    try {
        const response = await axios.get('https://www.newegg.com/p/pl?N=4131%204841%20601360966%20601411482%20100157995%204814&d=gaming+laptop&Order=1&LeftPriceRange=500+900', {
            withCredentials: true
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

app.get("/bestbuy", async (req,res) => {
    try {
        const response = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops', {
            withCredentials: true
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
})

app.get("/bestbuy2", async (req,res) => {
    try {
        const response = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?cp=2&id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops', {
            withCredentials: true
        });
        res.send(response.data);
    } catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`));