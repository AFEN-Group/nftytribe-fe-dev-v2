import { Contract } from "web3-eth-contract";
import { useEffect, useState } from "react";

import Web3 from "web3";

const stakingContractData = require("../../smart_contracts/staking.json");
const afenContract= require('../../smart_contracts/afenToken.json')
declare const window: any;

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [contracts, setContracts] = useState<object>({});
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const checkForCompatibility = () => {
    if (window.ethereum) {
      return true;
    } else {
      return false;
    }
  };
  const connectWalletMeta = async () => {
    //use this function to connect wallet mainly in the future, options to connect wallet connect will be added soon
    const hasWeb3 = checkForCompatibility();
    if (!hasWeb3) {
      throw new Error(JSON.stringify({ message: "Meta Mask Not found!" }));
    } else {
      // window.ethereum.enable() if window.ethereum.isConnected()
      // is false, can choose to check isconnected status first tho
    }
  };

  const initializeWeb3 = async () => {
    const walletType=localStorage.getItem('walletType')
    console.log(window.ethereum && walletType!=='trustWallet',window.trustwallet && walletType==='trustWallet');
    
    if (window.ethereum && walletType!=='trustWallet') {

      //will have to check if window.eth or wallet connect to initialize web3 in the future
      const web3: any = new Web3(window.ethereum);
      setWeb3(web3);
      setSelectedAddress((await web3.eth.getAccounts())[0]);
    }
   else if (window.trustwallet && walletType==='trustWallet' ) {
      //will have to check if window.eth or wallet connect to initialize web3 in the future
      const web3: any = new Web3(window.trustwallet);
      setWeb3(web3);
      setSelectedAddress((await window.trustwallet.enable())[0]);
    }
  };
  console.log(localStorage.getItem('walletType'))
  const handleChange = async ({
    accountChange = false,
  }: {
    accountChange?: boolean;
  }) => {
    if (web3) {
      !accountChange
        ? window.location.reload()
        : setSelectedAddress((await web3.eth.getAccounts())[0]);
    }
  };
  const handleConnected = () => {
    //handle connection... no need for page reload!
    //initialize web3, mainly should be called in here with options for meta that will be added soon
    //either to init with meta or wallet connect
  };
  
  const initializeContracts = () => {
    //initialize your web3 contracts here
    if (web3) {
      const stakingContract: any = new web3.eth.Contract(
        stakingContractData.abi,
        stakingContractData.contractAddress,
        // {
        //   from: selectedAddress,
        // }
      );
      const afencontract: any= new web3.eth.Contract(
        afenContract.abi,
        afenContract.contractAddress
      )
      console.log("setting");
      setContracts({ ...contracts, stakingContract,afencontract });
    }
  
    
  };
  //  console.log(contracts,stakingContractData);
   
  //listeners
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleChange);
      window.ethereum.on("chainChanged", handleChange);
      window.ethereum.on("connect", handleConnected);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleChange);
        window.ethereum.removeListener("chainChanged", handleChange);
        window.ethereum.removeListener("connect", handleConnected);
      }
    };
  }, []);

  useEffect(() => {
    initializeWeb3();
  }, []);

  useEffect(() => {
    //re initialize contracts once connection web3 is initialized or re initialized
    // console.log(web3);
    if (web3) {
      initializeContracts();
    }
  }, [web3]);
  return {
    connectWalletMeta,
    web3,
    checkForCompatibility,
    contracts,
    selectedAddress,
  };
};

export default useWeb3;
