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
const amazonConfig = {
    headers: {
      Cookie: 'session-id=147-2509638-2052546; ubid-main=130-9210616-8393619; lc-main=en_US; session-id-time=2082787201l; i18n-prefs=USD; aws-ubid-main=955-0652275-6728741; aws-userInfo-signed=eyJ0eXAiOiJKV1MiLCJrZXlSZWdpb24iOiJ1cy1lYXN0LTEiLCJhbGciOiJFUzM4NCIsImtpZCI6ImViYjdjODY1LTY3NGEtNDNjZi1hYzY2LTUxNGQ1YjQxNjlhYiJ9.eyJzdWIiOiIiLCJzaWduaW5UeXBlIjoiUFVCTElDIiwiaXNzIjoiaHR0cDpcL1wvc2lnbmluLmF3cy5hbWF6b24uY29tXC9zaWduaW4iLCJrZXliYXNlIjoiSis5K3A4NW1XNFVGaVN0YXFUMDBmNWRLc09pcnZqZmRHaEJxT3U1VVNucz0iLCJhcm4iOiJhcm46YXdzOmlhbTo6OTA0MjE0MjkyMTMzOnJvb3QiLCJ1c2VybmFtZSI6ImppbWtuYWthIn0.dipOQw0ZwDBsXqswRHZtTmzM8DcgIoEH4UeNKkCrL2SZAWH33RP_JVjn335n2mIS6GC-3ixBnECiFM5Zmbjf-A_4JMlwPddHBfOvLrm1PBuuG7BA4PWU-CNcbAPkqciI; aws-userInfo=%7B%22arn%22%3A%22arn%3Aaws%3Aiam%3A%3A904214292133%3Aroot%22%2C%22alias%22%3A%22%22%2C%22username%22%3A%22jimknaka%22%2C%22keybase%22%3A%22J%2B9%2Bp85mW4UFiStaqT00f5dKsOirvjfdGhBqOu5USns%5Cu003d%22%2C%22issuer%22%3A%22http%3A%2F%2Fsignin.aws.amazon.com%2Fsignin%22%2C%22signinType%22%3A%22PUBLIC%22%7D; session-token=r1ZQuMy1X8A/FG8b85GZpq5eVd9lyXxNIXgTRqK74zEFVyUU+DE+NCwcrtd3pPKXgsUEyKkFSEJFZGlsxErCLllIOr8TZNt52XdfGFvCPW1lDdgTokXXF1dFpix9GeuP1PP1w9/+NTZm0fUqwbfD1UlG5uQc9PGceCIDPDRp+aqKx2lPpq922a/uRQ8LMiXrz30kn7hxycVHCrhPVe1sQ2Nt3PxAW3wW4gXHGfT4y1KdMGneIDKKZDj/cmhUovVXT1HY6VU0GYKjik9+W2Gx7mSB5kadQBU1egmI0uVjiN7yqnvMGBROjNrRvI+6mnrdeqcQ7uD6XDcH1c8pQ99KEchExbZN+xpP; csm-hit=tb:s-6QEDVYJ5NS5VXTE583QT|1698962038767&t:1698962039002&adb:adblk_yes',
      'Access-Control-Allow-Origin': '*',
      withCredentials: true,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    },
  };
const neweggConfig = {
    headers: {
        withCredentials: true,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Access-Control-Allow-Origin': '*',
        Cookie: 'NVTC=248326808.0001.51bd1fcf8.1693341575.1697581548.1698968136.40; NID=724M348O2Q9D5z9D0M; _gcl_au=1.1.204598952.1698968138; NV_MC_FC=Natural|www.google.com; NV_MC_LC=Natural|www.google.com; __cf_bm=vhy11LNXTW4CE5altUPu8nukU8bg3BsGyCFKGTkmQmQ-1698968304-0-AUPuZEYS3cCzLswhA3MRHMAFc7g9ZS7VNSCf4lEpFI+havU03WvE0F1kfivPwZArL8T+sxQ14rsDUukEByFL97Q=; NV%5FW57=USA; NV%5FW62=en; cf_clearance=6yMG.crUifamVSvu69cgNJfLkDo6vRQ7TikOgZou19w-1698968306-0-1-919addf4.a0772dfb.c69b8214-0.2.1698968306; _ga=GA1.1.203316606.1698968306; ak_bmsc=D187B0BA75BD6350CC1BCD3E769D2EDD~000000000000000000000000000000~YAAQBqosFx03IGeLAQAA2QZnkhXDoJI7eObBpISVbDlCQXl5mAnz4PXuyOpR92VM1RmuLinTa0nUy7B9ZeRexPVLmRcJRT+Al7RZ8zezAx4Eoi5tXP8csl5R6QqEd6RIQ3PtxrsiFSJlim7GiwL2vKGWYTI/ECy64anPhGEoRNDC0Ho99lTvbQOsPjKNhOTkZgQj+zq2kSDRUJG3GcK2WkDIU4V9n3ZtAL+zF9UiVHsZgPCLRcML5fCBjSBZTFspzRXa6C7sZ3D1fupqRPOLAe/a1E6uojanAH3iyDr1nnr2LYUIdmYjcb6klg7mLxO7P4jN0UCeFFlWC1vh2WLPYL6i3PuZoVqlWegpS3ENySoFlVqK+f+tkPaenHCIFhVuX6j014dxOQ==; NV%5FCONFIGURATION=#5%7B%22Sites%22%3A%7B%22USA%22%3A%7B%22Values%22%3A%7B%22w58%22%3A%22USD%22%7D%2C%22Exp%22%3A%222562968318%22%7D%7D%7D; NV%5FGAPREVIOUSPAGENAME=search%3Asearch%20result; _ga_TR46GG8HLR=GS1.1.1698968305.1.1.1698968319.0.0.0; bm_sv=467A6CC92C2D627FA3FEC79367BCA20F~YAAQBqosF0U9IGeLAQAAAj1nkhX8HYuDSk9noXERLtkChJn45muG4vvGSu11ikyFuJ3PhXdXmXlwYIzyUwFgfYAVLTXCJMn9OQ5wnYHei++llBlFpFJiSVIGioBTqCAoSQjllndKK+/XrIlI0FHfiBjvKeSSUBuMNjNRsnXxTgUpOX+QDQdyOAKPrXvUk2GSve62/4ECyBBlPwQskTNDEIAW3+r+Vp4MgpJaNi5n8MSkXI71tTMHN0809oRfFGRS~1; NV_NVTCTIMESTAMP=1698968327; NE_STC_V1=28d4a3da38c3d62a3df089643bba00bd63911a24464066a842ff35509fddfabf6586df88'
    }
}
const bestbuyConfig = {
    headers: {
        withCredentials: true,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Access-Control-Allow-Origin': '*',
        Cookie: 'UID=43e6a4a2-9280-4fff-a457-067664f5f1ca; CTT=d295d08ab00dfd3f41d807c6f605d753; vt=d5f0e529-46a0-11ee-9f21-0e44f463b383; ui=1693336709317; pt=2428102131; DYN_USER_CONFIRM=d061d8dd39a4f28d6839ea296ce88402; DYN_USER_ID=ATG17534059324; pst2=570|N; s_ecid=MCMID%7C43564095082764234868681145636055030698; SID=5f557a78-e931-4339-8b66-d12ece93d0d0; physical_dma=602; customerZipCode=60601|N; bm_sz=E22BE3011ABFBA37249C6C7C096B8A64~YAAQV6TAF5Xdw1CLAQAAcOfBkRVYR8heuzAl6mwYm6iehW0ct3CFfXQLu8mGuhNNdl90GQyl5Pm2c+mjhVs9P1dBq/QhGfOlhgIqWU1I58/hZZ5T7tYTjnbQNZ+LPpK63sS4m9/feNi3ljvkKSL36Meocje2/9U6dVk06ujRQsdsTSD9WNcCF77Y09avn1RHRc7+UyEq6q1Z2GOs6fbLC0RmdoXBfwMCIENphp/bn2OJe0L+03trAhLoFxWbjMQRnYSx4OVneJUxjLk4an8dD6IiljcAASPMoYE1M79lKtT1yMlaA0QyqAjuOLyjKYzOxsRcbItnctwJW082+Auv9LcJaE0j6WajXWRovNIZrvw9hjlZfrZ7CtNc29rFQ6gCUwFOP/Ber9wYXFMnGL6G/ltBtNv/jrEaLP48hrAMY+K2NkM=~3687748~3224388; _abck=4F94F9D883BCE4D342AD1FDEEF078E4F~0~YAAQV6TAF5Tdw1CLAQAAcOfBkQpwrAsbiyl77vfI6RP4pwKD/EsRbL+qU+aiy3bk+LeI0L+PN4xX/eV/Pw6JWRFKeSLeXYJp2rsITNUe31g7oqmte1sgxFPqttNFFM29r5A6BnwfvmChPkg+dwQZ8HQs31lGW5AttBJr/p+cfCDAT68c6Hrxe9ZsYSep8Ll2QZjtpW5rgXJHEdLzx5/tSlfBqopUTENBI7E1b19rvpMmWVV2BOftD5sM2s0O5Lu1NpikOPSpuvNs0QbpkiyTCDK+MQGZ9zQ+tKKspYSTzLwb97BBUmvb72RtHaeraN7LIWBd6f5HYkLxxbBfFmYc/zx8knFuPvWrgmf5Wo5IQ4DfatkYghia7wC/q34KWV+SZyx3kFP2oC525QbscJpOOnuVxM9Acc0kN+FqVneXSoCtw/aUqTu2eDg02cMGek/1~-1~-1~-1; bby_rdp=l; rxVisitor=1698957487807T36R9MI8085TLCM8AJKAAAI0IO0G9CRK; dtSa=-; COM_TEST_FIX=2023-11-02T20%3A38%3A08.622Z; dtCookie=v_4_srv_12_sn_O2J7H6DQE5COMBSK1RTA4F97DJBSS8CE_app-3A1b02c17e3de73d2a_1_ol_0_perc_100000_mul_1; locDestZip=60608; locStoreId=1142; sc-location-v2=%7B%22meta%22%3A%7B%22CreatedAt%22%3A%222023-11-02T20%3A38%3A13.000Z%22%2C%22ModifiedAt%22%3A%222023-11-02T20%3A38%3A14.746Z%22%2C%22ExpiresAt%22%3A%222024-11-01T20%3A38%3A14.746Z%22%7D%2C%22value%22%3A%22%7B%5C%22physical%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2260608%5C%22%2C%5C%22source%5C%22%3A%5C%22G%5C%22%2C%5C%22captureTime%5C%22%3A%5C%222023-11-02T20%3A38%3A13.000Z%5C%22%7D%2C%5C%22destination%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2260608%5C%22%7D%2C%5C%22store%5C%22%3A%7B%5C%22storeId%5C%22%3A1142%2C%5C%22zipCode%5C%22%3A%5C%2260607%5C%22%2C%5C%22storeHydratedCaptureTime%5C%22%3A%5C%222023-11-02T20%3A38%3A14.745Z%5C%22%7D%7D%22%7D; blue-assist-banner-shown=true; bby_cbc_lb=p-browse-e; ltc=%20; rxvt=1698969808300|1698966581705; dtPC=12$368007227_439h-vAKFHTQMMCIAWJEAHRQMPFNKRHUDTMUQU-0e0; dtLatC=38'
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res) => res.json("Server is running"))

app.get("/amazon", async (req,res) => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=gaming+laptops&i=computers&rh=n%3A565108%2Cp_n_feature_twenty_browse-bin%3A76501028011%7C76501034011%7C76501089011%7C76501112011%7C76501125011&s=price-asc-rank&dc&crid=1MNTEKCRK4QG1&qid=1696552433&rnid=76501006011&sprefix=gaming+laptops%2Caps%2C94&ref=sr_st_price-asc-rank&ds=v1%3AQmqvIvrtZmsPoRUEqxE3Xr0SGyvXtoT3M%2FBIEHuh5is', amazonConfig);
    res.send(response.data);
    } catch (error) {
        res.status(500).json({error});
    }
});

app.get("/amazon2", async (req,res) => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=gaming+laptops&i=computers&rh=n%3A565108%2Cp_n_feature_twenty_browse-bin%3A76501028011%7C76501034011%7C76501089011%7C76501112011%7C76501125011&s=price-asc-rank&dc&page=2&crid=1MNTEKCRK4QG1&qid=1696651162&rnid=76501006011&sprefix=gaming+laptops%2Caps%2C94&ref=sr_pg_2', amazonConfig);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error});
    }
})

app.get("/newEgg", async (req,res) => {
    try {
        const response = await axios.get('https://www.newegg.com/p/pl?N=4131%204841%20601360966%20601411482%20100157995%204814&d=gaming+laptop&Order=1&LeftPriceRange=500+900', neweggConfig);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error});
    }
});

app.get("/bestbuy", async (req,res) => {
    try {    
            const response = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops', bestbuyConfig);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error});
    }
})

app.get("/bestbuy2", async (req,res) => {
    try {
        const response = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?cp=2&id=pcat17071&qp=graphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%203050%20Ti%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204050%5Egraphicscardsv_facet%3DVideo%20Card~NVIDIA%20GeForce%20RTX%204060%5Econdition_facet%3DCondition~New%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items&sp=%2Bcurrentprice%20skuidsaas&st=gaming+laptops', bestbuyConfig);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({error});
    }

})

app.listen(port, () => console.log(`Server is running on port ${port}`));