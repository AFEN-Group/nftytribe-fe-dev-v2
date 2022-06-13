import { useContext } from 'react'
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
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import TextInput from '../../../components/Inputs/TextInput'

declare const window: any

const BidModal = (props: any) => {
  //const [err, setErr] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line
  const [userWallet, setUserWallet] = useState<any>(
    localStorage.getItem('currentAccount'),
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
  const [validated, setValidated] = useState(false)
  const { handleAuctionBid, checkIfBIdTimePasses, collectNft } = useContext(
    ContractContext,
  )
  const [completed, setCompleted] = useState(false)
  //const tokens = [{ value: '1', text: 'eth' }]

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

  const handleSubmit = async () => {
    setIsLoading(true)
    const wallet_address = localStorage.getItem('currentAccount')
    console.log(props.nftDetails?.marketplace_type)

    const erc721Address = '0x236DdF1f75c0bA5Eb29a8776Ec1820E5dC41a59a'
    const contract_address = '0xD5582083916dc813f974ce4CA3F27E6977e161cF'

    let marketPlaceContract
    let erc721Contract
    let web3: any
    if (window.ethereum && wallet_address) {
      web3 = new Web3(window.ethereum)

      erc721Contract = new web3.eth.Contract(
        erc721Abi,
        props.nftDetails.collection_address || erc721Address,
      )

      marketPlaceContract = new web3.eth.Contract(
        marketPlaceAbi,
        contract_address,
      )

      //   try {
      //     console.log(marketPlaceContract)
      //     const brokerage = await marketPlaceContract.methods
      //       .brokerage('0x0000000000000000000000000000000000000000')
      //       .call()
      //     const Bid = await marketPlaceContract.methods
      //       .auctions(
      //         props.nftDetails?.collection_address,
      //         props.nftDetails?.token_id,
      //       )
      //       .call()
      //     console.log(Bid)
      //     const nextBidAmount =
      //       parseInt(Bid.currentBid, 10) + parseInt(Bid.currentBid, 10) * 0.0001

      //     const bid = await marketPlaceContract.methods
      //       .bid(
      //         props.nftDetails?.token_id,
      //         props.nftDetails?.collection_address,
      //         1,
      //       )
      //       .send({ from: wallet_address, value: 1 })

      //     return bid
      //   } catch (error) {
      //     console.log(error)
      //     setIsLoading(false)
      //   }
      try {
        const result = await handleAuctionBid(
          props.nftDetails?.token_id,
          wallet_address,
          props.nftDetails?.collection_address,
          userInput.bid,
        )
        if (result) {
          console.log(result)
          setCompleted(true)
          setIsLoading(false)
          return
        }
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    } else {
      //setShowConnect(true)
      alert('Please connect wallet')
    }
  }

  return (
    <div className={style.bm}>
      <div className={style.bmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {!completed && !props.itemCollected && (
            <div
              className={`${style.modalB} animate__animated animate__zoomInUp `}
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
                    <strong> {' ' + props.nftDetails?.title} </strong>
                  </span>{' '}
                  from
                  <span className="blueTxt">
                    <strong>
                      {' ' +
                        shortenAddress(
                          props.nft?.owner_of ||
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
                    {Web3.utils.fromWei(props.nftDetails?.price, 'ether') || ''}{' '}
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
                  className={style.btn1}
                  disabled={isLoading || !validated}
                  onClick={handleSubmit}
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
            </div>
          )}
          {completed && (
            <div
              className={`${style.modal} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop}>
                <h1>Congratulations</h1>
                <p className={style.mText}>
                  Your bid for{' '}
                  <strong> {' ' + props.nftDetails?.title} </strong>
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
            </div>
          )}
          {props.itemCollected && (
            <div
              className={`${style.modal} animate__animated animate__zoomInUp `}
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
            </div>
          )}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default BidModal
