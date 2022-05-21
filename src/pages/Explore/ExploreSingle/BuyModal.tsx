import { useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
//import useState from 'react-usestateref'
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

declare const window: any

const BuyModal = (props: any) => {
  //const [err, setErr] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userWallet, setUserWallet] = useState<any>(
    localStorage.getItem('currentAccount'),
  )
  // const [themeState] = useContext<any>(ThemeContext)
  // const dark = themeState.dark
  // const [msg, setMsg] = useState({
  //   sMsg: '',
  //   eMsg: '',
  // })
  const [completed, setCompleted] = useState(false)
  //const tokens = [{ value: '1', text: 'eth' }]

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    // contract functionality
    //const chain = 'rinkeby'
    const erc721Address = '0x236DdF1f75c0bA5Eb29a8776Ec1820E5dC41a59a' // process.env.REACT_APP_ERC721_CONTRACT
    const contract_address = '0xb6b043610655a356A433aBc0c6BAE46e0AA5C230' //process.env.REACT_APP_MARKETPLACE_CONTRACT

    // contract function
    const marketplace_address = process.env.REACT_APP_MARKETPLACE_CONTRACT
    let marketPlaceContract
    let erc721Contract
    let web3: any
    if (window.ethereum && userWallet) {
      web3 = new Web3(window.ethereum)

      erc721Contract = new web3.eth.Contract(
        erc721Abi,
        props.nftDetails.collection_address || erc721Address,
      )

      marketPlaceContract = new web3.eth.Contract(
        marketPlaceAbi,
        contract_address,
      )

      console.log(props.nftDetails, 'helllo')

      if (props.nftDetails.is_lazy_mint) {
        try {
          const getnftnonce = await fetch(
            `https://dev.api.nftytribe.io/api/collectibles/nft/${props.nftDetails._id}/get-collectible-nonce`,
          )
          const nonceData = await getnftnonce.json()
          const mintingCharge = await erc721Contract.methods
            .mintingCharge()
            .call()

          const totalAmt =
            parseInt(props.nftDetails.price, 10) + parseInt(mintingCharge, 10)
          console.log(totalAmt)

          console.log(
            props.nftDetails.wallet_address,
            0,
            props.nftDetails.file,
            nonceData.data.nonce,
            parseInt(props.nftDetails.price),
            props.nftDetails.signature,
            userWallet,
          )
          console.log(erc721Contract)
          const tx = await erc721Contract.methods
            .lazyMint(
              props.nftDetails.wallet_address,
              0,
              props.nftDetails.file,
              nonceData.data.nonce,
              props.nftDetails.price,
              props.nftDetails.signature,
            )
            .send({ from: userWallet, value: totalAmt.toString() })

          console.log(tx)
          let events = tx.events
          const token_id = events.Transfer[0].returnValues.tokenId

          const updatableData = {
            token_id,
            file: props.nftDetails.file,
            wallet_address: props.nftDetails.wallet_address,
            collection_address: props.nftDetails.collection_address,
            chain_id: 'rinkeby',
            type: 'mint',
            transaction_hash: events.Transfer[0].transactionHash,
            on_sale: false,
          }

          const collectible = await fetch(
            `https://dev.api.nftytribe.io/api/collectibles/update-collectible`,
            {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(updatableData),
            },
          )

          const res = await collectible.json()
          console.log(res)

          const buyData = {
            buyer: events.Transfer[1].returnValues.to,
            wallet_address: props.nftDetails.wallet_address,
            token_id,
            collection_address: props.nftDetails.collection_address,
            chain: 'rinkeby',
            price: props.nftDetails.price,
            transaction_hash: events.Transfer[1].transactionHash,
          }

          const buy = await fetch(
            'https://dev.api.nftytribe.io/api/collectibles/buy',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(buyData),
            },
          )

          const data = await buy.json()

          setIsLoading(false)
          setCompleted(true)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      } else {
        console.log('hello', props.nft, props.nftDetails)
        try {
          // const approve = await erc721Contract.methods
          //   .approve(broker_address, parseInt(props.nft.token_id))
          //   .send({ from: userWallet })
          // console.log(approve)
          const itemDetail = await marketPlaceContract.methods
            .auctions(
              props.nftDetails.collection_address,
              parseInt(props.nftDetails.token_id),
            )
            .call()

          console.log(itemDetail)
          const buyItem = await marketPlaceContract.methods
            .buy(props.nftDetails.token_id, props.nftDetails.collection_address)
            .send({ from: userWallet, value: props.nftDetails.price })
          console.log(buyItem)
          const transactionHash = buyItem.transactionHash

          const itemObj = {
            wallet_address:
              props?.nft?.owner_of || props?.nftDetails?.wallet_address,
            collection_address:
              props?.nft?.token_address ||
              props?.nftDetails?.collection_address,
            buyer: userWallet,
            chain: 'rinkeby',
            transaction_hash: transactionHash,
            price: props?.nft?.amount || props?.nftDetails?.price,
            token_id: props?.nft?.token_id || props?.nftDetails?.token_id,
          }

          const buy = await fetch(
            `https://dev.api.nftytribe.io/api/collectibles/buy`,
            {
              method: 'POST',
              body: JSON.stringify(itemObj),
              headers: {
                'content-type': 'application/json',
              },
            },
          )

          const response = await buy.json()
          console.log(response)

          //API funtionality
          // const itemObj = {
          //   wallet_address: props.nft.owner_of || props.nftDetails.wallet_address,
          //   collection_address:
          //     props.nft.token_address || props.nftDetails.collection_address,
          //   buyer: userWallet,
          //   chain: 'rinkeby',
          //   transaction_hash: transactionHash,
          //   price: props.nft.amount || 0.00001,
          //   token_id: props.nft.token_id || props.nftDetails.token_id,
          // }

          // const buyItemReq = await publicRequest.post(
          //   `/collectibles/buy`,
          //   itemObj,
          // )
          // console.log(buyItemReq)
          setIsLoading(false)
          setCompleted(true)
        } catch (err) {
          console.log(err)
        }
      }

      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className={style.bm}>
      <div className={style.bmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {!completed && (
            <div
              className={`${style.modal} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop}>
                <h1>Checkout</h1>
                <p className={style.mText}>
                  Please, review your purchase of
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
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {!isLoading ? (
                    'Purchase'
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
                  You have successfully purchased{' '}
                  <strong> {' ' + props.nftDetails?.title} </strong>, you can
                  now view on your profile
                </p>
                <img src={Close} alt="close" onClick={props.closeModal} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <Link to="/profile" className={style.modalBtnSingle}>
                <button>View Profile</button>
              </Link>
            </div>
          )}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default BuyModal
