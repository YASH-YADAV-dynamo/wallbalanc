import React, {useState} from 'react';
import {ethers} from 'ethers';
const fs = require('fs');


const MetaMask = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [userBalance, setUserBalance] = useState(null)

    const connectWallet = async () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChanged([result[0]])
            })
        }
        else{
            setErrorMessage("Please install MetaMask")
        }
    }
    const accountChanged = (accountName) => {
        setDefaultAccount(accountName)
        getUserBalance(accountName)
    }
    const getUserBalance = (accountName) => {
        window.ethereum.request({  method: 'eth_getBalance', params: [accountName, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }
    

  return (  
    <div>
        <h1>MetaMask Wallet</h1>
        <button onClick ={connectWallet}>Connect Wallet</button>
        <h3>Address: {defaultAccount}</h3>
        <h3>Balance: {userBalance}</h3>

        {errorMessage}
    </div>
    )
}

fs.writeFileSync('wallet.js', MetaMask);
console.log('wallet.js created successfully.');
export default MetaMask;
