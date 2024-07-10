const { ethers } = require('ethers')
const fs = require('fs')
const path = require('path')

const providerUrl = 'https://sepolia.infura.io/v3/YOUR_API_KEY'

const mnemonic = ''

const contractJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../artifacts/contracts/Voting.sol/Voting.json'), 'utf-8'))
const { abi, bytecode } = contractJson

async function deploy(){
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(provider)


    console.log("Deploying from account: " + wallet.address)

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    const contract = await factory.deploy();

    console.log('Contract deployed to:', contract.address);
    return contract;
}

deploy()
  .then(contract => {
    console.log('Deployment successful:', contract.address);
    process.exit(0);
  })
  .catch(error => {
    console.error('Deployment failed:', error);
    process.exit(1);
  });