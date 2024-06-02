const axios = require('axios');
(async () => {
    axios.post("https://filecoin-calibration.chainup.net/rpc/v0", {
        "jsonrpc": "2.0",
        "method": "Filecoin.StateMarketDeals",
        "params": [[{ "/": "bafy2bzacebqb7fdyajgwmh6xv3bkhaebyiemo642pjzc2jzsibd4flarfdwco" }, { "/": "bafy2bzacedpgd4qgc2u5eirtw4wirfk4oteym3d2lkgzhxkd75o6behw6h5pu" }]],
        "id": 1
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            const lastTenValues = response.data;
            
            // const jsonData = JSON.stringify(lastTenValues);
            // console.log(jsonData)
        })
        .catch(error => {
            console.error("Error:", error);
        });
})();