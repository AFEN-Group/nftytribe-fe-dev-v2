import { Web3Context } from "../../context/Web3Context";
import { useContext, useEffect, useState } from "react";
import { chain } from "mathjs";
import contractAddress from '../../smart_contracts/staking.json'
import axios from "axios";
import { ethers } from "ethers";
const useStaking = () => {
  const { contracts, web3, selectedAddress }: any = useContext(Web3Context);
  const [statistics, setStatistics] = useState<any>();
  const [loading, setLoading] = useState({
    stake: false,
    unstake: false,
    collectReward: false,
    gettingStatistics: false,
    errMsg: '',
  });
  const [loadedStats, setLoadedStats] = useState<any>(false)
  const [responses, setResponses] = useState<{
    stake?: any;
    unstake?: any;
    collectReward?: any;
    gettingStatistics?: any;
    errMsg?: string
  }>();
  const getUserData = async (): Promise<any> => {
    const { stakingContract } = contracts;
    const userStat = await Promise.all([
      web3.utils.fromWei(
        await stakingContract.methods
          .getUnstakableAmount(selectedAddress)
          .call()
      ),
      await stakingContract.methods.stakeHolders(selectedAddress).call(),
    ]);
    console.log(userStat);
    
    const [unstakable, userStakeData] = userStat;
    return {
      
      unstakable,
      userStakeData,
    };
  };
  const getStatistics = async () => {
    const { stakingContract ,afencontract} = contracts;
    
    //  console.log(afencontract.methods);
     
    console.log(stakingContract.methods)

    const stats = await Promise.all([
      chain(await stakingContract.methods.APY().call())
        .divide(1000)
        .done(),

      web3.utils.fromWei(await stakingContract.methods.totalStaked().call()),
      (
        await axios({
          url: "https://token-price.afenmail.com/afen-price/",
          method: "get",
        })
      ).data.usdPrice,
      web3.utils.fromWei(await afencontract.methods.balanceOf(selectedAddress).call(),'ether'),
      web3.utils.fromWei(await stakingContract.methods.calculateReward(selectedAddress).call(),'ether')
    ]);
   
    const [apy, totalStakedInVault, usdPrice,balance,reward] = stats;
    //  console.log(balance);
     

    const tvl = chain(totalStakedInVault).multiply(usdPrice).done();
    const stake = 100;
    const earn = chain(stake).multiply(apy).divide(100).done();
    setStatistics({
      apy,
      totalStakedInVault,
      tvl,
      usdPrice,
      balance,
      reward,
      hint: {
        stake,
        earn,
      },
      ...(selectedAddress && (await getUserData())),
    });
    setLoadedStats(true)
  };
  console.log(contracts);
  
  const stake = async (amount: string) => {
    try {
      if (!selectedAddress) {
        throw new Error(
          JSON.stringify({ message: "please connect your wallet!" })
        );
      }
      if (amount.trim() === "") {
        throw new Error(JSON.stringify({ message: "amount cannot be empty!" }));
      }
      setLoading({
        ...loading,
        stake: true,
      });

      const { stakingContract } = contracts;
      const isApproved= await contracts.afencontract.methods.allowance(selectedAddress,contractAddress.contractAddress).call()
      if(isApproved<web3.utils.toWei(amount)){
        await contracts.afencontract.methods.approve(contractAddress.contractAddress,ethers.constants.MaxUint256.toString()).send({from:selectedAddress})
        const res = await stakingContract.methods
          .stake(web3.utils.toWei(amount))
          .send({ from: selectedAddress });
        setLoading({ ...loading, stake: false });
        setResponses({ ...responses, stake: res });
        setLoadedStats(true)
        return res;
      }
      else {const res = await stakingContract.methods
        .stake(web3.utils.toWei(amount))
        .send({ from: selectedAddress });
      setLoading({ ...loading, stake: false });
      setResponses({ ...responses, stake: res });
      setLoadedStats(true)
      return res;}
      
     

    } catch (err) {
      console.log(err);
      setLoading({ ...loading, stake: false });
    }
  };
  
  // useEffect(()=>{
  //   throw new Error(JSON.stringify({ message: "amount cannot be empty!" }))
  // },[])
  const unstake = async (amount: string) => {
    try {
      if (!selectedAddress) {
        throw new Error(
          JSON.stringify({ message: "please connect your wallet!" })
        );
      }
      if (amount.trim() === "") {
        throw new Error(JSON.stringify({ message: "amount cannot be empty!" }));
      }
      if (Number(amount) > Number(statistics.unstakable)) {
        throw new Error(
          JSON.stringify({ message: "You have some stakes locked!" })
        );

      }
      setLoading({
        ...loading,
        unstake: true,
      });

      const { stakingContract } = contracts;
      console.log(stakingContract);
      
      const res = await stakingContract.methods
        .requestUnstake(web3.utils.toWei(amount))
        .send({ from: selectedAddress });

      setLoading({ ...loading, unstake: false });

      setResponses({ ...responses, unstake: res });
      return res;
    } catch (err) {
      console.log(err);
      setLoading({ ...loading, unstake: false });
    }
  };
  const { stakingContract } = contracts;
  console.log(stakingContract?.methods);
  
  const collectReward = async () => {
    try {
      if (!selectedAddress) {
        throw new Error(
          JSON.stringify({ message: "please connect your wallet!" })
        );
      }

   

      setLoading({
        ...loading,
        collectReward: true,
      });

      
      
      // console.log(stakingContract.methods);
      
      const res = await stakingContract.methods
        .claimReward()
        .send({ from: selectedAddress });
      setLoading({ ...loading, collectReward: false });
      setResponses({ ...responses, collectReward: res });
      return res;
    } catch (err) {
      console.log(err);
      setLoading({ ...loading, collectReward: false });
    }
  };
  const PanicUnstake= async(amount:string)=>{
    try {
      if (!selectedAddress) {
        throw new Error(
          JSON.stringify({ message: "please connect your wallet!" })
        );
      }

      if (amount.trim() === "") {
        throw new Error(JSON.stringify({ message: "amount cannot be empty!" }));
      }

      setLoading({
        ...loading,
        unstake: true,
      });



      await stakingContract.methods.requestUnstake(web3.utils.toWei(amount)).send({from:selectedAddress})
      const res = await stakingContract.methods
        .panicUnstake(web3.utils.toWei(amount))
        .send({ from: selectedAddress });

      setLoading({ ...loading, unstake: false });
      return res;
    } catch (err) {
      console.log(err);
      setLoading({ ...loading, unstake: false });
    }
  }
  useEffect(() => {
    if (contracts.stakingContract) {
      getStatistics();
    }
  }, [contracts.stakingContract]);

  //re run get stats when address found
  useEffect(() => {
    if (selectedAddress) {
      getStatistics();
    }
  }, [selectedAddress]);
  return {
    getStatistics,
    statistics,
    responses,
    loading,
    loadedStats,
    stake,
    unstake,
    PanicUnstake,
    collectReward,
  };
};

export default useStaking;
