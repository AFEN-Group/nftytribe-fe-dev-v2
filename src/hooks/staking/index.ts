import { Web3Context } from "./../../context/Web3Context";
import { useContext, useEffect, useState } from "react";
import { chain } from "mathjs";
import axios from "axios";
const useStaking = () => {
  const { contracts, web3, selectedAddress }: any = useContext(Web3Context);
  const [statistics, setStatistics] = useState<any>();
  const [loading, setLoading] = useState({
    stake: false,
    unstake: false,
    collectReward: false,
    gettingStatistics: false,
  });
  const [responses, setResponses] = useState<{
    stake?: any;
    unstake?: any;
    collectReward?: any;
    gettingStatistics?: any;
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
    const [unstakable, userStakeData] = userStat;
    return {
      unstakable,
      userStakeData,
    };
  };
  const getStatistics = async () => {
    const { stakingContract } = contracts;

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
    ]);

    const [apy, totalStakedInVault, usdPrice] = stats;
    const tvl = chain(totalStakedInVault).multiply(usdPrice).done();
    const stake = 100;
    const earn = chain(stake).multiply(apy).divide(100).done();
    setStatistics({
      apy,
      totalStakedInVault,
      tvl,
      usdPrice,
      hint: {
        stake,
        earn,
      },
      ...(selectedAddress && (await getUserData())),
    });
  };

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
      const res = await stakingContract.methods
        .stake(web3.utils.toWei(amount))
        .send({ from: selectedAddress });
      setLoading({ ...loading, stake: false });
      setResponses({ ...responses, stake: res });
      return res;
    } catch (err) {
      console.log(err);
      setLoading({ ...loading, stake: false });
    }
  };

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

  const collectReward = async (amount: string) => {
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
        collectReward: true,
      });

      const { stakingContract } = contracts;
      const res = await stakingContract.methods
        .claimReward(web3.utils.toWei(amount))
        .send({ from: selectedAddress });
      setLoading({ ...loading, collectReward: false });
      setResponses({ ...responses, collectReward: res });
      return res;
    } catch (err) {
      console.log(err);
      setLoading({ ...loading, collectReward: false });
    }
  };

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
    stake,
    unstake,
    collectReward,
  };
};

export default useStaking;
