## How to run this project
clone this repo
```bash
git clone http://github.com/mjoel4708/loan-dapp.git
```
Install Ganache
https://truffleframework.com/ganache
```bash
npm install -g ganache-cli
```
## How to run the smart contract
Install Truffle
```bash
npm install -g truffle
```
cd into the truffle directory
```bash
cd truffle
```
install dependencies
```bash
npm install
```
run ganache
```bash
ganache-cli
```
migration
```bash
truffle migrate
```
Get the contract address from the migration output and create a json file in the client/src directory with the following format
```json
{
  "peerToPeeraddreess": "0x1234567890"
}
```
## How to run the client

cd into the client directory
```bash
cd client
```

install dependencies
```bash
npm install
```

Install MetaMask, which is an extension for Chrome or Firefox that connects to an Ethereum network without running a full node on the browser’s machine 
https://metamask.io/
Configure MetaMask properly with Ganache or Truffle Develop 
https://truffleframework.com/docs/ganache/using-metamask-with-ganache
Make sure your dapp is checking for MetaMask’s web3 instance

run the project
```bash
npm start
```
