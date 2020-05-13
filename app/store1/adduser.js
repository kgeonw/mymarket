'use strict';

const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/crypto-config/peerOrganizations/store1.mymarket.com/users/User1@store1.mymarket.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/User1@store1.mymarket.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/4a373b84fbd315617e10929db6eed5409f43173438224bf843c30ad17b3d3fae_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@store1.mymarket.com';
        const identity = X509WalletMixin.createIdentity('Store1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
