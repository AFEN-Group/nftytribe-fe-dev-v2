import { useEffect } from 'react'
import useState from 'react-usestateref'
//import { ThemeContext } from '../../../context/ThemeContext'
//import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from './ExploreSingle.module.scss'
import Close from './assets/close.svg'
import Happy from './assets/happy.svg'
import { CircularProgress } from '@material-ui/core'
import { shortenAddress } from '../../../utils/formatting'
import user from './assets/usericon.svg'
import Web3 from 'web3'
import contracts from '../../../web3-Service/contractAddress'
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc1155MintableAbi from "../../../smart_contracts/erc1155Mintable.json"
import erc1155Marketplace from "../../../smart_contracts/erc1155Market.json"
import NumberInput from '../../../components/Inputs/NumberInput'
import globals from '../../../utils/globalVariables'
import { motion } from 'framer-motion'
import erc20 from '../../../smart_contracts/afenToken.json'
import {WhatsappShareButton} from 'react-share'


declare const window: any

const BuyModal = (props: any) => {
  //const [err, setErr] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line

  const userWallet:any =  sessionStorage.getItem('currentAccount')
 
  
  const [completed, setCompleted] = useState(false)
  const [validated, setValidated] = useState(false)
  const [userInput, setUserInput, userInputRef] = useState<any>({
    quantity: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
 
  const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
  const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
  // erc 1155 addresses
  const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
  const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')
  const [chainId, setChainId, chainIdRef] = useState<string>()

  
  
  useEffect(() => {
   
    const currentChain = sessionStorage.getItem('chain')

    if (currentChain === '0x1') {
      
      setErc721MintableAddress(contracts.erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
    }
    if (currentChain === '0x38'||currentChain==='0x61') {
      // setChain('bsc testnet')
      setChainId('bsc')
      setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.BSC_erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
    }
  }, [])

  const inputHandler = async (event: any) => {
    setValidated(false)
    const { name, value } = event.target
    let letters = /[a-zA-Z]/
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
    let dots = value.match(/\./g)
    if (letters.test(value) || specialChars.test(value) || dots?.length >= 2 || value > props?.nftDetails?.number_of_copies || value === '' || value < 1) {
      // console.log(value)
      // console.log(props?.nftDetails?.number_of_copies)
      setValidated(false)
    } else {
      setUserInput({
        ...userInput,
        [event.target.name]: parseInt(value),
      })
      setValidated(true)
    }
    if (userInputRef.current.quantity !== '') {
      setValidated(true)
    }
  }
  //  console.log(props.nft);
   
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    let marketPlaceContract
    let erc721Contract
    let erc1155Contract
    let erc20token
    let web3: any
    if (window.ethereum && userWallet) {

      web3 = new Web3(window.ethereum)

      erc721Contract = new web3.eth.Contract(
        erc721Abi,
        props.nft.moreInfo.collectionAddress || erc721MintableAddress,
      )

      marketPlaceContract = new web3.eth.Contract(
        marketPlaceAbi,
        erc721MarketplaceAddress,
      )
      erc20token = new web3.eth.Contract(erc20.abi,props.nft.moreInfo.erc20TokenAddress)
      // console.log(props.nft, 'helllo')

  if (props?.nft?.amount<2) {
        try {
        
          // console.log(erc20token)
          const decimal= await erc20token.methods.decimals().call(
            {from:userWallet}
          )
          // console.log(decimal);
          const amount= parseInt(props.nft.price)*(10**decimal)
          // console.log(amount);
          
          
          await erc20token.methods.approve(erc721MarketplaceAddress,(`${amount}`)).send({from:userWallet})
          console.log(props?.nft.tokenId, props.collectionAddress,userWallet);
          
          const buyItem = await marketPlaceContract.methods
            .buy(props?.nft.tokenId, props.collectionAddress)
            .send({ from: userWallet })
          console.log(buyItem)
          setIsLoading(false)
          setCompleted(true)
        } catch (err) {
          console.log(err)
          setIsLoading(false)
        }
      }
      else if (props?.nftDetails?.is_multiple) {
        erc1155Contract = new web3.eth.Contract(erc1155MintableAbi, erc1155MarketplaceAddress);
        marketPlaceContract = new web3.eth.Contract(erc1155Marketplace, erc1155MarketplaceAddress);

        const buyDetails = await marketPlaceContract.methods._auctions(props?.nftDetails?.collection_address, props?.nftDetails?.token_id, props?.nftDetails?.owner ? props?.nftDetails?.owner : props?.nftDetails?.wallet_address).call()
        let totalPrice

        console.log(buyDetails, userInput.quantity, 'got details')
        if (userInput.quantity) {
          totalPrice = parseInt(buyDetails.price, 10) * parseInt(userInput.quantity)
        }

        console.log(props?.nftDetails?.collection_address, parseInt(props?.nftDetails?.token_id), props?.nftDetails?.owner ? props?.nftDetails?.owner : props?.nftDetails?.wallet_address, parseInt(userInput.quantity), totalPrice)

        const buy = await marketPlaceContract.methods.buy(props?.nftDetails?.collection_address, parseInt(props?.nftDetails?.token_id), props?.nftDetails?.owner ? props?.nftDetails?.owner : props?.nftDetails?.wallet_address, parseInt(userInput.quantity))
          .send({ from: userWallet, value: totalPrice?.toString() })

        console.log(buy)

        const transactionHash = buy.transactionHash

        const itemObj = {
          wallet_address:
            props?.nftDetails?.owner,
          collection_address:
            props?.nft?.token_address ||
            props?.nftDetails?.collection_address,
          buyer: userWallet,
          chain_id: chainId,
          transaction_hash: transactionHash,
          price: props?.nft?.amount || props?.nftDetails?.price,
          token_id: props?.nft?.token_id || props?.nftDetails?.token_id,
          quantity: userInput.quantity
        }

        const buyApi = await fetch(
          `${globals.baseURL}/collectibles/buy-multiple`,
          {
            method: 'POST',
            body: JSON.stringify(itemObj),
            headers: {
              'content-type': 'application/json',
            },
          },
        )

        const response = await buyApi.json()
        console.log(response)

        setIsLoading(false)
        setCompleted(true)
      }
      setIsLoading(false)

    } else {
      setIsLoading(false)
    }
  
  }
  console.log(props.nft,  props.nft?.moreInfo);
  
  return (
    <div className={style.bm}>
      <div className={style.bmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {!completed && (
            <motion.form
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.7,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.1,
                    //delay: 0.3,
                    scale: {
                      duration: .01,
                    },
                  },
                },
              }}
              className={`${style.modal}  `}
              onSubmit={handleSubmit}
            >
              <div className={style.modalTop}>
                <h1>Checkout</h1>
                <p className={style.mText}>
                  Please, review your purchase of
                  <span
                    className="blueTxt"
                  >
                    <strong> {' ' + props.nft?.name} </strong>
                  </span>{' '}
                  from
                  <span className="blueTxt">
                    <strong>
                      {' ' +
                        shortenAddress(
                          props.nft?.user.walletAddress ||
                          props.nftDetails?.wallet_address,
                        ) || ''}{' '}
                    </strong>
                  </span>
                </p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.addrBox}>
                  <img src={user} alt="user" />
                  {shortenAddress(userWallet) || ''}

                  <div className={style.connectedBox}>
                    <p>Connected</p>
                  </div>
                </div>
              </div>
              <div className={style.pricesBx}>
                <div className={style.pbItem}>
                  <p>Service pay </p>
                  <p>0.001 {props.nft?.chain === "eth" ? 'ETH' : props.nftDetails?.chain === "bsc" ? 'BNB' : ''}</p>
                </div>
                <div className={style.pbItem}>
                  <p>Amount </p>
                  <p>
                    {props.nft?.price || ''}{' '}
                    {props.nft?.moreInfo.erc20TokenSymbol}
                  </p>
                </div>
                {props?.nftDetails?.is_multiple && (
                  <div className={style.fieldBx}>
                    <p>Quantity</p>
                    <br />
                    <NumberInput
                      inputName="quantity"
                      holder="Enter quantity"
                      min="1"
                      max={props?.nftDetails?.number_of_copies}
                      inputHandler={inputHandler}
                    // value={userInput.bid}
                    />
                  </div>)}
               
              </div>
              <div className={style.modalBtns2}>
                {props?.nftDetails?.is_multiple ? (
                  <button
                    type="submit"
                    className={style.btn1}
                    disabled={isLoading || !validated}

                  >
                    {!isLoading ? (
                      'Purchase'
                    ) : (
                      <CircularProgress color="inherit" size="20px" />
                    )}
                  </button>) : (
                  <button
                    type="submit"
                    className={style.btn1}
                    disabled={isLoading}

                  >
                    {!isLoading ? (
                      'Purchase'
                    ) : (
                      <CircularProgress color="inherit" size="20px" />
                    )}
                  </button>
                )}

                <button className={style.btn2} onClick={props.handleClose}>
                  {' '}
                  Cancel
                </button>
              </div>
              {errorMsg && <p>{errorMsg}</p>}
            </motion.form>
          )}
          {completed && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.7,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.1,
                    //delay: 0.3,
                    scale: {
                      duration: .01,
                    },
                  },
                },
              }}
              className={`${style.modal} `}
            >
              <div className={style.modalTop}>
                <h1>Congratulations</h1>
                <p className={style.mText}>
                  You have successfully purchased{' '}
                  <strong> {' ' + props.nft?.name} </strong>, you can
                  now view on your profile
                </p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <Link to="/profile" className={style.modalBtnSingle}>
                <button>View Profile</button>
              </Link>
            </motion.div>
          )}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default BuyModal
