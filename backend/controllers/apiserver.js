const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:5174' , credentials: true}));

app.get('/api/balance/:account', async (req, res) => {
    const account = req.params.account;
    const options = {
        method: 'GET',
        url: `https://api.zondax.ch/fil/data/v3/calibration/account/balance/${account}`,
        headers: {
            accept: 'application/json',
            authorization: 'Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleS1iZXJ5eC0wMDEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W10sImlzcyI6IlpvbmRheCIsImF1ZCI6WyJiZXJ5eCJdLCJleHAiOjE3MjI0MTE5ODMsImp0aSI6IlNhaGlsIGdpbGwsZ3Vyc2FoaWxnaWxsMjRAZ21haWwuY29tIn0.6KArn742YsVNbWu3BrWyTcwgrdUOKkjO24KOWoJtJ7aSTfwaQna7mQp1VLogQuTn3-FVUck0v_lRJAKaD2Oojw'
        }
    };

    try {
        const response = await axios.request(options);
        const balance = response.data.balances[0].value;
        res.json(balance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/deals/:provider_id', async (req, res) => {
    const provider_id = req.params.provider_id;
    console.log(provider_id)
    axios.post("https://filecoin-calibration.chainup.net/rpc/v0", {
        "jsonrpc": "2.0",
        "method": "Filecoin.StateMarketDeals",
        "params": [[{ "/": "bafy2bzacebqb7fdyajgwmh6xv3bkhaebyiemo642pjzc2jzsibd4flarfdwco" }, { "/": "bafy2bzacedpgd4qgc2u5eirtw4wirfk4oteym3d2lkgzhxkd75o6behw6h5pu" }]],
        "id": 1
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp => {

        const filteredValues = Object.entries(resp.data.result)
            .filter(([key, value]) => value.Proposal.Provider === provider_id)
            .map(([key, value]) => ({ key, value }));
        const lastTenValues = filteredValues.slice(-10);

        res.json(lastTenValues)


    })
        .catch(error => {
            console.error("Error:", error)

        })
})

app.get('/beryx/deal_info/:provider_id', async (req, res) => {
    const provider_id = req.params.provider_id;
    console.log("heello")
    axios.post("https://filecoin-calibration.chainup.net/rpc/v0", {
        "jsonrpc": "2.0",
        "method": "Filecoin.StateMarketDeals",
        "params": [[{ "/": "bafy2bzacebqb7fdyajgwmh6xv3bkhaebyiemo642pjzc2jzsibd4flarfdwco" }, { "/": "bafy2bzacedpgd4qgc2u5eirtw4wirfk4oteym3d2lkgzhxkd75o6behw6h5pu" }]],
        "id": 1
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp => {
        const filteredValues = Object.values(resp.data.result).filter(value => value.Proposal.Provider == provider_id);
        const lastTransaction = filteredValues.slice(-10);

        const simplify = lastTransaction.map(value => ({
            pieceCID: value.Proposal.PieceCID['/'],
            client: value.Proposal.Client,
            startEpoch: value.Proposal.StartEpoch,
            endEpoch: value.Proposal.EndEpoch,
            providerCollateral: value.Proposal.ProviderCollateral,
            clientCollateral: value.Proposal.ClientCollateral,
            storagePricePerEpoch: value.Proposal.StoragePricePerEpoch,
            label: value.Proposal.Label
        }));

        res.json(simplify)
        console.log("completion")


    })


})

app.get('/beryx/miner_details/power/:provider_id', async (req, res) => {
    const provider_id = req.params.provider_id;
    const tipSetCid = [{ "/": "bafy2bzacec2bhyaubwmqnjfd6owso4ufolk4yj75sirmfu6cckun4ze32dbns" }, { "/": "bafy2bzacedugd3q63qo3oeb4hx33nutaa3ldkhxmxzsumjpctb3tlq2wxcbfm" }, { "/": "bafy2bzacecwskwosvs7gxkmagfsr34hlg5arzar5hcq5faudvrfvpjwhlmxcw" }]; // Replace with the TipSet CID if you want to query at a specific TipSet
    const requestPayload = {
        jsonrpc: '2.0',
        method: 'Filecoin.StateMinerPower',
        params: [provider_id, tipSetCid],
        id: 1
    };
    axios.post(' https://filecoin-calibration.chainup.net/rpc/v0', requestPayload)
        .then(response => {
            // Handle the response
            
            console.log('Response:', response.data);
            res.json(response.data.result.TotalPower)
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });

})



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
