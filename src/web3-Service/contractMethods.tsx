import Web3 from 'web3'
import contractAddress from './contractAddress'
import erc721Abi from '../smart_contracts/erc721Mintable.json'
//import erc721FactoryAbi from "../smart_contracts/erc721Factory0.json";
import erc721MarketplaceAbi from '../smart_contracts/erc721Market.json'

declare const window: any
const useContractMethods = () => {
  let erc721Contract: any
  let erc721MarketplaceContract: any
  const main = async () => {
    let web3: any
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      // eslint-disable-next-line
      erc721Contract = new web3.eth.Contract(
        erc721Abi,
        contractAddress.erc721MintableAddress,
      )
      erc721MarketplaceContract = new web3.eth.Contract(
        erc721MarketplaceAbi,
        contractAddress.erc721MarketplaceAddress,
      )
    } else {
      alert('connect to meta mask wallet')
    }
  }

  const handlePutOnSale = async (
    token_id: any,
    wallet_address: any,
    collection_address: any,
    amount: any,
    starting_time: any,
    ending_time: any,
    auction_type: any,
  ) => {
    await main()
    try {
      console.log(
        token_id,
        amount,
        auction_type,
        starting_time,
        ending_time,
        collection_address,
      )
      const putOnSale = await erc721MarketplaceContract.methods
        .putOnSale(
          token_id,
          amount,
          auction_type,
          starting_time,
          ending_time,
          collection_address,
          '0x0000000000000000000000000000000000000000',
        )
        .send({ from: wallet_address })
      return { error: null, data: putOnSale }
    } catch (error) {
      console.log(error)
      return { error, data: null }
    }
  }

  const checkIfBIdTimePasses = async (
    token_id: any,
    collection_address: any,
  ) => {
    await main()
    try {
      console.log(erc721MarketplaceContract)
      const brokerage = await erc721MarketplaceContract.methods
        .brokerage('0x0000000000000000000000000000000000000000')
        .call()
      const Bid = await erc721MarketplaceContract.methods
        .auctions(collection_address, token_id)
        .call()
      console.log(brokerage)
      console.log(Bid, 'thi i bid', Bid.closingTime)
      console.log(
        new Date().getTime(),
        new Date(parseInt(Bid.closingTime + '000', 10)).getTime(),
        new Date().getTime() > new Date(Bid.closingTime).getTime(),
      )
      if (new Date() > new Date(parseInt(Bid.closingTime, 10))) {
        if (
          Bid.highestBidder !== '0x0000000000000000000000000000000000000000'
        ) {
          return true
        }
        return false
      }
      return false
    } catch (error) {
      return false
    }
  }

  const handleAuctionBid = async (
    token_id: any,
    wallet_address: any,
    collection_address: any,
    amount: any,
  ) => {
    await main()
    try {
      console.log(erc721MarketplaceContract)
      const brokerage = await erc721MarketplaceContract.methods
        .brokerage('0x0000000000000000000000000000000000000000')
        .call()
      const Bid = await erc721MarketplaceContract.methods
        .auctions(collection_address, token_id)
        .call()
      console.log(brokerage)
      console.log(Bid)
      const nextBidAmount =
        parseInt(Bid.currentBid, 10) + parseInt(Bid.currentBid, 10) * 0.0001

      const bid = await erc721MarketplaceContract.methods
        .bid(token_id, collection_address, Web3.utils.toWei(amount,"ether")) // nextBidAmount changed to amount here
        .send({ from: wallet_address, value: Web3.utils.toWei(amount,"ether") })

      return bid
    } catch (error) {
      console.log(error)
    }
  }

  const collectNft = async (
    wallet_address: any,
    token_id: any,
    collection_address: any,
  ) => {
    await main()
    try {
      const collect = await erc721MarketplaceContract.methods
        .collect(token_id, collection_address)
        .send({ from: wallet_address })
      return { error: false, data: collect }
    } catch (error) {
      console.log(error)
      return { error, data: null }
    }
  }
  return {
    handleAuctionBid,
    handlePutOnSale,
    checkIfBIdTimePasses,
    collectNft,
  }
}
export default useContractMethods
