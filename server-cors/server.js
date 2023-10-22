const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3000;
// type node server.js to run server
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res) => res.json("Server is running"))

app.get("/amazon", async (req,res) => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=gaming+laptops&i=computers&rh=n%3A565108%2Cp_n_feature_twenty_browse-bin%3A76501028011%7C76501034011%7C76501089011%7C76501112011%7C76501125011&s=price-asc-rank&dc&crid=1MNTEKCRK4QG1&qid=1696552433&rnid=76501006011&sprefix=gaming+laptops%2Caps%2C94&ref=sr_st_price-asc-rank&ds=v1%3AQmqvIvrtZmsPoRUEqxE3Xr0SGyvXtoT3M%2FBIEHuh5is', {
         withCredentials: true,
         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
         'Access-Conrol-Request-Headers': 'content-type',
         'Accept': '*/*',
         'Accept-Encoding': 'gzip,deflate,br',
         'Accept-Language': 'en-US,en;q=0.9',
         'Access-Control-Request-Method': 'GET',
         'Connection': 'keep-alive'
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
        const response = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops', {
            withCredentials: true,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip,deflate,br',
            'Content-Length': '11670',
            'Content-Type': 'text/plain;charset=UTF-8',
            'Access-Control-Allow-Origin': 'https://www.bestbuy.com',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Host': 'www.bestbuy.com',
            'Origin': 'https://www.bestbuy.com',
            'Referer': 'https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops',
            'Sec-Ch-Ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Gpc': '1',
        });
        res.cookie('Cookie', 'UID=43e6a4a2-9280-4fff-a457-067664f5f1ca; CTT=d295d08ab00dfd3f41d807c6f605d753; vt=d5f0e529-46a0-11ee-9f21-0e44f463b383; ui=1693336709317; pt=2428102131; DYN_USER_CONFIRM=d061d8dd39a4f28d6839ea296ce88402; DYN_USER_ID=ATG17534059324; pst2=570|N; s_ecid=MCMID%7C43564095082764234868681145636055030698; SID=cd51c4d0-f3b4-4a5d-bca8-7be81c56fb08; rxVisitor=1697581571083G6I2JOJTTT9H7RSPIONFLKJAGV238B5M; COM_TEST_FIX=2023-10-17T22%3A26%3A11.828Z; locDestZip=43085; locStoreId=570; AMCVS_F6301253512D2BDB0A490D45%40AdobeOrg=1; _cs_mk=0.6150245467079742_1697581576612; s_cc=true; aam_uuid=38436831463337743648168137601583952520; sc-location-v2=%7B%22meta%22%3A%7B%22CreatedAt%22%3A%222023-10-17T22%3A26%3A16.285Z%22%2C%22ModifiedAt%22%3A%222023-10-17T22%3A26%3A16.977Z%22%2C%22ExpiresAt%22%3A%222024-10-16T22%3A26%3A16.977Z%22%7D%2C%22value%22%3A%22%7B%5C%22physical%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2243085%5C%22%2C%5C%22source%5C%22%3A%5C%22A%5C%22%2C%5C%22captureTime%5C%22%3A%5C%222023-10-17T22%3A26%3A16.284Z%5C%22%7D%2C%5C%22destination%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2243085%5C%22%7D%2C%5C%22store%5C%22%3A%7B%5C%22storeId%5C%22%3A570%2C%5C%22zipCode%5C%22%3A%5C%2243240%5C%22%2C%5C%22storeHydratedCaptureTime%5C%22%3A%5C%222023-10-17T22%3A26%3A16.977Z%5C%22%7D%7D%22%7D; surveyDisabled=true; blue-assist-banner-shown=true; _cs_c=1; dtSa=-; dtCookie=v_4_srv_12_sn_ARVV2QBTNQJ4O4HDFV5PV5TUL5O5BV6G_app-3Aea7c4b59f27d43eb_1_app-3A1b02c17e3de73d2a_1_ol_0_perc_100000_mul_1; AMCV_F6301253512D2BDB0A490D45%40AdobeOrg=1585540135%7CMCMID%7C43564095082764234868681145636055030698%7CMCAID%7CNONE%7CMCOPTOUT-1697663695s%7CNONE%7CvVersion%7C4.4.0; _cs_id=f775d2f1-2646-a21f-d440-97b1b7f04a83.1697581587.2.1697656513.1697655113.1645469968.1731745587987; bby_cbc_lb=p-browse-e; physical_dma=602; customerZipCode=60601|N; ltc=%20; bm_sz=858012B7A483E0E55845D4EC5335D4B0~YAAQHag4F1W3FEeLAQAA78ZjVBV7uQBPa9rn/2qopBStCfpc+OTfU5uvP1NVCfDWGM0S5qz32RL5oAmuRVpiAauzu0qeSa31iZ3XDjFfgUAcxQI4koxnZSgQ0fVtSHjdzCN9af5AbVUFp9bkNvB8+f2nZzaVBf7+dLDbQ9c8M+p6/i9EvGiaCd12Iww467G1nMU6z23kahaILvoVd/ZqTMHuB43vFV2zX7M+F/Bn+ftxNpodOqDv8JkRuRcyp4s0a4Ovkgjr3gAKhyfSz1o6fP95XiPRRmgfPUF6vYVFZt3Qg6Humhe1xdUJTg3qUMrB5wGrubm124L0iRi9dhwOakGzgIfIGgYmepQjsu9JmB3N6gdsYXSnQ/tsMFI0SvtBRThlAbCeu40EAymt1DbyojNg6aOgjKqKmw/AxOQymW1cLw==~3420994~4339764; bby_rdp=l; _abck=4F94F9D883BCE4D342AD1FDEEF078E4F~0~YAAQJ6g4Fxn3TT+LAQAAQNljVApwLz1AWDl1xLiJolPORHE/xAzKppeMQlLJCtA7iOOgdAjHRqfmZjJ4LxhhPD9ZP3l5N4c+LTK06EkWjl7ingmOYKEl5wZClgQHItt1S1dy7q5JqFKWlQT+dKXqS+TcmgO9CP8iG7jfRZX3ukGzxYjBuQwXlTwUnNjP+Om/YNXTAeZAPoUeU7Ow+7UmPmJx5z5dp662dvc5gN+AO+tjPgTD/vAaJrUJ6wVEcBxJY+o3erqlcUrmc9Erptvq/1Pnb71eo0HOo5E7rRFnDuvNhe8u4jA9z83hKt4GUpwTFlAhHZ+Ga4AGPfpRIF21nw1wieMRXTSMlok7ed3kNtXAOVniTN6abCyOhV+GgqH6vpqOOJUJbxsc5vASRvu2OjCiJynsjA4VkpCLEXbBiZT0vuHbq4iEl2zh0aZHLkJk~-1~||-1||~-1; rxvt=1697929915472|1697927911232; dtPC=12$528113383_651h-vRMEFVDLMBOIAOMKFQDHCVLCCQPACPFOT-0e0; dtLatC=10');
        res.send(response.data);
})

app.get("/bestbuy1", async (req,res) => {
    const response = await axios.get('https://www.bestbuy.com/site/electronics/top-deals/pcmcat1563299784494.c?id=pcmcat1563299784494', {
        withCredentials: true
    });
    res.send(response.data)
})

app.get("/bestbuy2", async (req,res) => {
        const response = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?cp=2&id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops', {
            withCredentials: true
        });
        res.send(response.data);

})

app.listen(port, () => console.log(`Server is running on port ${port}`));