const axios = require('axios');
const rpcUrl = 'https://filecoin-calibration.chainup.net/rpc/v0';
const address = 't1d2xrzcslx7xlbbylc5c3d5lv3kxahw6xv7fpyaa';
dotenv.config();
const privateKey = process.env.PRIVATE_KEY2;  // You need to have the private key to sign the message

const amount = '1000000000000000000';  // change this to the amount you want to send
async function main() {
    try {
        // 1. Get the nonce
        let response = await axios.post(rpcUrl, {
            jsonrpc: "2.0",
            method: "Filecoin.MpoolGetNonce",
            params: [address],
            id: 1
        });

        const nonce = response.data.result;
        console.log('Nonce:', nonce);

        // 2. Construct the message
        const message = {
            From: address,
            To: address,
            Nonce: nonce,
            Value: amount,  // 1 FIL
            GasLimit: 1000000,
            GasFeeCap: "10000",  // Gas price has been updated to GasFeeCap in newer Filecoin specs
            GasPremium: "10000",  // Add GasPremium for correct fee calculation
            Method: 0,  // Assuming a simple transfer method
            Params: []
        };

        // 3. Sign the message
        response = await axios.post(rpcUrl, {
            jsonrpc: "2.0",
            method: "Filecoin.WalletSignMessage",
            params: [address, message],
            id: 2
        });

        const signedMessage = response.data.result;
        console.log('Signed Message:', signedMessage);

        // 4. Push the signed message
        response = await axios.post(rpcUrl, {
            jsonrpc: "2.0",
            method: "Filecoin.MpoolPush",
            params: [signedMessage],
            id: 3
        });

        const pushedMessage = response.data.result;
        console.log('Pushed Message:', pushedMessage);

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
