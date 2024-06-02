const axios = require('axios');

// Define the URL of your Lotus node's JSON-RPC API endpoint
const lotusRpcUrl = ' https://filecoin-calibration.chainup.net/rpc/v0';

// Define the miner address you want to query
const minerAddress = 't017840'; // Replace 'f01234' with the actual miner address

// Define the TipSet CID (optional)
const tipSetCid = [{"/":"bafy2bzacec2bhyaubwmqnjfd6owso4ufolk4yj75sirmfu6cckun4ze32dbns"},{"/":"bafy2bzacedugd3q63qo3oeb4hx33nutaa3ldkhxmxzsumjpctb3tlq2wxcbfm"},{"/":"bafy2bzacecwskwosvs7gxkmagfsr34hlg5arzar5hcq5faudvrfvpjwhlmxcw"}]; // Replace with the TipSet CID if you want to query at a specific TipSet

// Define the JSON-RPC request payload
const requestPayload = {
  jsonrpc: '2.0',
  method: 'Filecoin.StateMinerPower',
  params: [minerAddress, tipSetCid],
  id: 1
};

// Send the JSON-RPC request
axios.post(lotusRpcUrl, requestPayload)
  .then(response => {
    // Handle the response
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });