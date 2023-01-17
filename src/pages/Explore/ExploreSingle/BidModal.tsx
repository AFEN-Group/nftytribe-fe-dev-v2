import { useContext, useEffect } from 'react'
import useState from 'react-usestateref'
//import { ThemeContext } from '../../../context/ThemeContext'
//import useState from 'react-usestateref'
import ContractContext from '../../../context/ContractContext'
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
import TextInput from '../../../components/Inputs/TextInput'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import erc20 from '../../../smart_contracts/afenToken.json'

declare const window: any

const BidModal = (props: any) => {
  //const [err, setErr] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line
  const [userWallet, setUserWallet] = useState<any>(
    sessionStorage.getItem('currentAccount'),
  )
  // const [themeState] = useContext<any>(ThemeContext)
  // const dark = themeState.dark
  // const [msg, setMsg] = useState({
  //   sMsg: '',
  //   eMsg: '',
  // })
  const [userInput, setUserInput, userInputRef] = useState<any>({
    bid: '',
  })
  const [err, setErr] = useState<any>()
  const [validated, setValidated] = useState(false)
  
  const [completed, setCompleted] = useState(false)
  //const tokens = [{ value: '1', text: 'eth' }]
  // erc721 addresses
  const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
  const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
  // erc 1155 addresses
  const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
  const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')
  const [chainId, setChainId, chainIdRef] = useState<string>()

  useEffect(() => {
    //const wallet_address = sessionStorage.getItem('currentAccount')
    const currentChain = sessionStorage.getItem('chain')
    const itemChain = props?.nftDetails?.chain
    if (currentChain === '0x1') {
      // setChain('rinkeby')
      setChainId('eth')
      setErc721MintableAddress(contracts.erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
    }
    if (currentChain === '0x38'||'0x61') {
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
    if (letters.test(value) || specialChars.test(value) || dots?.length >= 2) {
      console.log(value)
    } else {
      setUserInput({
        ...userInput,
        [event.target.name]: value,
      })
    }
    if (userInputRef.current.bid !== '') {
      setValidated(true)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const wallet_address = sessionStorage.getItem('currentAccount')
   

    let marketPlaceContract
    let erc721Contract
    let web3: any
    if (window.ethereum && wallet_address) {
      const startPrice = parseInt(props.nft?.price)
      console.log("bid price", userInput.bid)
      console.log("actual price", startPrice)

      if (userInput.bid >= startPrice) {
        setIsLoading(true)
        setErr('')
        web3 = new Web3(window.ethereum)

        // erc721Contract = new web3.eth.Contract(
        //   erc721Abi,
        //   props.nft?.moreInfo.contractAddress || erc721MintableAddress,
        // )

        marketPlaceContract = new web3.eth.Contract(
          marketPlaceAbi,
          erc721MarketplaceAddress,
        )
      const  erc20token = new web3.eth.Contract(erc20.abi, props.nft.moreInfo.erc20TokenAddress)

          try {
            const decimal = await erc20token.methods.decimals().call(
              { from: userWallet }
            )
            // console.log(decimal);
            const amount = parseInt(userInput.bid) * (10 ** decimal)
            // console.log(amount);


            await erc20token.methods.approve(erc721MarketplaceAddress, (`${amount}`)).send({ from: userWallet })
            console.log(marketPlaceContract, userInput.bid, erc721MarketplaceAddress, props.nft?.tokenId,
              props.nft?.moreInfo?.contractAddress,
              amount.toString(),)
            const bid = await marketPlaceContract.methods
              .bid(
                props.nft?.tokenId,
                props.nft?.moreInfo?.contractAddress,
                amount.toString(),
              )
              .send({ from: wallet_address})

             setCompleted(!completed)
          }
       catch (err) {
          console.log(err)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      } else {
        setErr("Bid is less than starting price")
      }
    } else {
      //setShowConnect(true)
      //alert('Please connect wallet')
      toast.error(` Please connect wallet`,
        {
          duration: 3000,
        }
      )
    }
  }
console.log(props.nft);

  return (
    <div className={style.bm}>
      <div className={style.bmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {!completed && !props.itemCollected && (
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
              onSubmit={handleSubmit}
              className={`${style.modalB} `}
            >
              <div className={style.modalTop}>
                <h1>Place a bid</h1>
                <p className={style.mText}>
                  You are about to bid for
                  <span
                    // className={`${
                    //   dark === 'true' ? 'yellowMain' : 'blueLight'
                    // }`}
                    className="blueTxt"
                  >
                    <strong> {' ' + props.nft?.name} </strong>
                  </span>{' '}
                  from
                  <span className="blueTxt">
                    <strong>
                      {' ' +
                        shortenAddress(
                          props.nft?.user?.walletAddress ||
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
                <div className={style.fieldBx}>
                  <p>Your bid</p>
                  <TextInput
                    type="text"
                    inputName="bid"
                    holder="Enter bid amount"
                    inputHandler={inputHandler}
                    value={userInput.bid}
                  />
                </div>
                <div className={style.pbItem}>
                  <p>Service pay </p>
                  <p>0.001 ETH</p>
                </div>
                <div className={style.pbItem}>
                  <p>Amount </p>
                  <p>
                    {props.nft?.price}
                    ETH
                  </p>
                </div>
                {/* <div className={style.pbItem}>
                  <p>Total </p>
                  <div className={style.pbBlue}>
                    <p>xx ETH</p>
                  </div>
                </div> */}
              </div>
              <div className={style.modalBtns2}>
                <button
                  type='submit'
                  className={style.btn1}
                  disabled={isLoading || !validated}

                >
                  {!isLoading ? (
                    'Place bid'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
                <button className={style.btn2} onClick={props.handleClose}>
                  {' '}
                  Cancel
                </button>
              </div>
              {err && (<p className='redtxt'>{err}</p>)}
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
                  Your bid for{' '}
                  <strong> {' ' + props.nft?.name} </strong>
                  has been successfully placed
                </p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <Link to="/explore" className={style.modalBtnSingle}>
                <button>Back to explore</button>
              </Link>
            </motion.div>
          )}
          {props.itemCollected && (
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
              className={`${style.modal}`}
            >
              <div className={style.modalTop}>
                <h1>Congratulations</h1>
                <p className={style.mText}>
                  You have successfully collected{' '}
                  <strong> {' ' + props.nftDetails?.title} </strong>
                </p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <Link to="/explore" className={style.modalBtnSingle}>
                <button>Back to explore</button>
              </Link>
            </motion.div>
          )}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default BidModal
