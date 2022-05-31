import { useContext, useEffect } from 'react'
import useState from 'react-usestateref'
import { useParams } from 'react-router'
import { ThemeContext } from '../../context/ThemeContext'
import ContractContext from '../../context/ContractContext'
import { Link } from 'react-router-dom'
import { Cancel } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import style from './Create.module.scss'
import TextInput from '../../components/Inputs/TextInput'
import TextArea from '../../components/Inputs/TextArea'
import SelectOption from '../../components/Inputs/SelectOption'
import icon from './assets/upload.svg'
import check from './assets/check.svg'
import arrow1 from './assets/arrowR1.svg'
import arrow2 from './assets/arrowR2.svg'
import arrowDown from './assets/arrowd.svg'
import create from './assets/create.svg'
import logo from './assets/logo-sm.svg'

import Web3 from 'web3'
import erc721Abi from '../../smart_contracts/erc721Mintable.json'
import erc721MarketplaceAbi from '../../smart_contracts/erc721Market.json'
import erc721CollectionAbi from '../../smart_contracts/erc721Collection.json'
import { publicRequest } from '../../utils/requestMethods'

import { ethers } from 'ethers'
import CreateSteps from './Modals/CreateSteps'

declare const window: any

const erc721Mintable_address = '0x236DdF1f75c0bA5Eb29a8776Ec1820E5dC41a59a'
const erc721Marketplace_address = '0xD5582083916dc813f974ce4CA3F27E6977e161cF'

const CreateItems = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const { handlePutOnSale } = useContext(ContractContext)
  const itemType = useParams().itemType
  const [priceType, setPriceType] = useState('fixed')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [step, setStep] = useState(0)
  const [collection, setCollection] = useState('afen')
  const [returnValues, setReturnValues] = useState<any>()
  const [response0, setResponse0] = useState<any>()
  const [mint, setMint] = useState<any>()
  const [collectible, setCollectible] = useState()
  const [validated, setValidated] = useState(false)
  const [err, setErr] = useState<any>({
    title: '',
    price: '',
    market_type: '',
    category: '',
  })
  const [msg, setMsg] = useState<any>({
    sMsg: '',
    eMsg: '',
  })
  const [userInput, setUserInput, userInputRef] = useState<any>({
    chain: '',
    wallet_address: '',
    title: '',
    description: '',
    collection_address: erc721Mintable_address,
    //customCollection: '',
    nft_type: '',
    is_multiple: '',
    price: 0,
    market_type: '1',
    category: '0',
    royalties: 0,
    is_lazy_mint: false,
  })
  const [cardImage, setCardImage] = useState('')
  const [imageFile, setImageFile] = useState<any>(null)
  const [userCollections, setUserCollections] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const royalties = [
    { value: '0', text: '0%' },
    { value: '10', text: '10%' },
    { value: '20', text: '20%' },
  ]
  const categories = [
    { value: '', text: 'Select' },
    { value: 'art', text: 'Art' },
    { value: 'gaming', text: 'Gaming' },
    { value: 'collectibles', text: 'Collectibles' },
    { value: 'utility', text: 'Utility' },
    // { value: '5', text: 'Music' },
  ]
  useEffect(() => {
    const wallet_address = localStorage.getItem('currentAccount')
    const getCollections = async () => {
      try {
        const collections = await publicRequest.get(
          `/collections/user-collection?wallet_address=${wallet_address}`,
        )
        console.log(collections)
        setUserCollections(collections?.data?.data.collections)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    getCollections()
  }, [])
  const inputHandler = async (event: any) => {
    setValidated(false)
    const { name, value } = event.target
    if (name === 'price' || name === 'royalties' || name === 'copies') {
      //const valueFiltered = value.replace(/\D/g, '')
      let letters = /[a-zA-Z]/
      let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
      let dots = value.match(/\./g)
      //console.log(dots)
      //if (!regex.test(value)) {
      if (
        letters.test(value) ||
        specialChars.test(value) ||
        dots?.length >= 2
      ) {
        console.log(value)
      } else {
        setUserInput({
          ...userInput,
          [event.target.name]: value,
        })
      }
    } else {
      setUserInput({
        ...userInput,
        [event.target.name]: event.target.value,
      })
    }
    if (
      userInputRef.current.title !== '' &&
      userInputRef.current.price !== '' &&
      userInputRef.current.category !== '0' &&
      userInputRef.current.market_type !== '0'
      //&&
      //imageFile !== null
    ) {
      setValidated(true)
    }
  }
  // const selectMedia = async (e: any) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setImageFile(e.target.files[0])
  //   }
  // }
  const selectMedia = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
      var form_data = new FormData()
      form_data.append('upload', e.target.files[0])
      try {
        const resp = await fetch(
          'https://dev.api.nftytribe.io/api/collectibles/upload-image',
          {
            method: 'POST',
            body: form_data,
          },
        )
        const data = await resp.json()
        setCardImage(data.location)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleLazy = () => {
    setUserInput({
      ...userInput,
      is_lazy_mint: !userInput.is_lazy_mint,
    })
    console.log(userInput.is_lazy_mint)
    //console.log("feedback")
  }
  const handleClose = () => {
    setShowModal(false)
    // setUserInput({
    //   title: '',
    //   price: '',
    // })
    // setImageFile(null)
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    // if (
    //   userInput.title === '' ||
    //   userInput.price === '' ||
    //   userInput.market_type === '' ||
    //   userInput.category === '' ||
    //   imageFile === null
    // ) {
    //   console.log(err)
    //   setValidated(false)
    // } else {
    //   setValidated(true)

    if (imageFile === null) {
      setMsg({
        ...msg,
        eMsg: '* Please choose a file! *',
      })
    } else {
      setMsg({
        ...msg,
        eMsg: '',
      })
      setShowModal(true)
      if (step === 0) {
        setStep(1)
        console.log(userInput.is_lazy_mint)
      }
    }
  }

  // create item steps //
  ////
  const handleSteps = async () => {
    const wallet_address = localStorage.getItem('currentAccount')
    console.log(wallet_address)
    if (wallet_address) {
      //check if wallet is connected
      const chain = 'rinkeby'
      let returnvalues: any
      switch (step) {
        case 1:
          //console.log(collectionChoice)
          const data = userInput
          data.wallet_address = wallet_address
          data.chain = chain
          data.collection_address =
            userInput.collection_address || erc721Mintable_address
          data.upload = imageFile
          data.is_multiple = false
          data.nft_type = userInput.category
          data.cardImage = cardImage
          if (data.market_type != '0') {
            data.on_sale = false
          }
          console.log(data, 'recorded')

          try {
            setIsLoading(true)
            //db query
            let nonceData: any
            if (data.is_lazy_mint) {
              const getNonce = await fetch(
                'https://dev.api.nftytribe.io/api/collectibles/get-nonce',
              )
              nonceData = await getNonce.json()
            }
            const resp = await fetch(
              'https://dev.api.nftytribe.io/api/collectibles/create',
              {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({
                  ...data,
                  nonce: nonceData?.data?.nonce,
                }),
              },
            )

            //upload image
            // var form_data = new FormData()
            // form_data.append('upload', imageFile)
            // try {
            //   const resp2 = await fetch(
            //     'https://dev.api.nftytribe.io/api/collectibles/upload-image',
            //     {
            //       method: 'POST',
            //       body: form_data,
            //     },
            //   )
            //   const data = await resp2.json()
            //   setCardImage(data.location)
            // } catch (error) {
            //   console.log(error)
            // }

            //mint
            const response = await resp.json()
            console.log(response)
            if (response.success === false) {
              setMsg({ ...msg, eMsg: 'Sorry an error occured', sMsg: '' })
            }
            setCollectible(response.data)
            setResponse0(response)

            let erc721Contract
            let erc721collectionContract
            let web3: any
            if (window.ethereum) {
              web3 = new Web3(window.ethereum)
              // const collection_address = userInput.collection_address || erc721Mintable_address    // to use for contract
              // console.log("address used",collection_address)
              // console.log("user input",userInput.collection_address)
              console.log(userInput.collection_address, 'col add')

              erc721Contract = new web3.eth.Contract(
                erc721Abi,
                erc721Mintable_address,
              )
            } else {
              alert('connect to meta mask wallet')
              //setShowConnect(true)
            }

            const mintingCharge = await erc721Contract.methods
              .mintingCharge()
              .call()

            let mint
            if (data.is_lazy_mint) {
              //console.log(data.is_lazy_mint)
              let message = ethers.utils.solidityPack(
                ['address', 'uint96', 'uint256', 'string', 'uint256'],
                [
                  userInput.collection_address || erc721Mintable_address,
                  0,
                  parseInt(nonceData.data.nonce),
                  response.data.file,
                  web3.utils.toWei(data.price, 'ether'),
                ],
              )

              let message_hash = ethers.utils.keccak256(message)

              let sign = await web3.eth.personal.sign(
                message_hash,
                wallet_address,
                '',
              )
              console.log(response, 'response')
              const updatableData = {
                signature: sign,
                is_lazy_mint: true,
                wallet_address,
                collection_address:
                  userInput.collection_address || erc721Mintable_address,
                file: response.data.file,
                type: 'mint',
                chain_id: 'rinkeby',
                price: web3.utils.toWei(data.price, 'ether'),
              }

              console.log(updatableData, 'get upload')

              const updateCollectible = await fetch(
                'https://dev.api.nftytribe.io/api/collectibles/update-collectible',
                {
                  method: 'PUT',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify(updatableData),
                },
              )
              const res = await updateCollectible.json()
              console.log(res)
              setIsLoading(false)
              setStep(4)
            } else {
              if (
                userInput.collection_address.toLowerCase() ===
                erc721Mintable_address.toLowerCase()
              ) {
                //console.log('hello collection')
                mint = await erc721Contract.methods
                  .mint(response.data.file, 0)
                  .send({ from: wallet_address, value: mintingCharge })
                console.log(mint, 'befor')
                returnvalues = mint.events.Transfer.returnValues
                //console.log(mint, 'hello here0')
              } else {
                erc721collectionContract = new web3.eth.Contract(
                  erc721CollectionAbi,
                  userInput.collection_address || erc721Mintable_address,
                )
                mint = await erc721collectionContract.methods
                  .mint(response.data.file, 0)
                  .send({ from: wallet_address, value: mintingCharge })
                console.log(mint, 'befor')
                returnvalues = mint.events.Transfer.returnValues
                console.log(mint, 'hello here')
              }

              setMint(mint)

              setReturnValues(returnvalues)
              const data = userInput
              const updateForMint = {
                wallet_address: wallet_address,
                chain_id: chain,
                collection_address:
                  data.collection_address || erc721Mintable_address,
                file: response.data.file,
                transaction_hash: mint.transactionHash,
                on_sale: false,
                type: 'mint',
                token_id: returnvalues.tokenId,
                price: web3.utils.toWei(data.price, 'ether'),
              }

              const updateCollectible = await fetch(
                'https://dev.api.nftytribe.io/api/collectibles/update-collectible',
                {
                  method: 'PUT',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify(updateForMint),
                },
              )

              const res = await updateCollectible.json()
              console.log(res)
              setIsLoading(false)
              setStep(2)
            }
          } catch (err) {
            console.log(err)
          }
          setIsLoading(false)

          break

        case 2:
          //approve
          try {
            setIsLoading(true)
            let erc721Contract
            let web3: any
            if (window.ethereum) {
              web3 = new Web3(window.ethereum)

              if (
                userInput.collection_address.toLowerCase() ===
                erc721Mintable_address.toLowerCase()
              ) {
                erc721Contract = new web3.eth.Contract(
                  erc721Abi,
                  erc721Mintable_address,
                )
              } else {
                erc721Contract = new web3.eth.Contract(
                  erc721CollectionAbi,
                  userInput.collection_address || erc721Mintable_address,
                )
              }

              // marketplace_contract = new web3.eth.Contract(
              //   erc721MarketplaceAbi,
              //   erc721Marketplace_address,
              // )
            } else {
              alert('connect to meta mask wallet')
              //setShowConnect(true)
            }

            console.log(parseInt(returnValues?.tokenId), 'hello')
            const approve = await erc721Contract.methods
              .approve(
                erc721Marketplace_address,
                parseInt(returnValues.tokenId),
              )
              .send({ from: wallet_address })
            console.log(approve, 'else')
            setIsLoading(false)
            setStep(3)
          } catch (err) {
            console.log(err)
            setIsLoading(false)
          }

          break

        case 3:
          //put on sale
          try {
            setIsLoading(true)
            let erc721Contract
            let marketplace_contract
            let web3: any
            if (window.ethereum) {
              web3 = new Web3(window.ethereum)

              erc721Contract = new web3.eth.Contract(
                erc721Abi,
                erc721Mintable_address,
              )
              marketplace_contract = new web3.eth.Contract(
                erc721MarketplaceAbi,
                '0xD5582083916dc813f974ce4CA3F27E6977e161cF',
              )
            } else {
              alert('connect to meta mask wallet')
              //setShowConnect(true)
            }

            const data = userInput
            data.wallet_address = wallet_address
            data.chain = chain
            data.collection_address =
              userInput.collection_address || erc721Mintable_address
            data.upload = imageFile
            data.is_multiple = false
            data.nft_type = userInput.category
            data.cardImage = cardImage

            if (data.market_type !== '0') {
              data.on_sale = true
            }

            let updatableData
            if (data.on_sale) {
              console.log(parseInt(returnValues.token_id), 'hello')

              if (data.market_type === '2') {
                data.starting_time =
                  new Date(data.starting_time).getTime() / 1000
                data.ending_time = new Date(data.ending_time).getTime() / 1000
              }
              const putOnSale = await marketplace_contract.methods
                .putOnSale(
                  parseInt(returnValues.tokenId),
                  web3.utils.toWei(data.price, 'ether'),
                  parseInt(data.market_type),
                  parseInt(data.starting_time),
                  parseInt(data.ending_time),
                  userInput.collection_address || erc721Mintable_address,
                  '0x0000000000000000000000000000000000000000',
                )
                .send({ from: wallet_address })

              // const putOnSale = await handlePutOnSale(
              //   returnValues.tokenId,
              //   wallet_address,
              //   userInput.collection_address,
              //   web3.utils.toWei(data.price, 'ether'),
              //   parseInt(data.starting_time),
              //   parseInt(data.ending_time),
              //   parseInt(data.market_type),
              // )
              // if (putOnSale?.error) {
              //   console.log(err)
              //   setMsg({ ...msg, eMsg: err, sMsg: '' })
              //   setIsLoading(false)
              //   return
              // }

              //console.log(putOnSale, putOnSale.events, 'sale')

              // const expiration_time =
              //   new Date(data.ending_time).getTime() + 2 * 24 * 3600 * 1000 // * 1000

              updatableData = {
                token_id: returnValues.tokenId,
                wallet_address,
                collection_address:
                  userInput.collection_address || erc721Mintable_address,
                file: response0.data.file,
                transaction_hash: mint.transactionHash,
                type: 'putOnSale',
                chain_id: 'rinkeby',
                order_type: data.market_type,

                on_sale: true,
                marketplace_type: data.market_type,
                order_detail: {
                  starting_price: web3.utils.toWei(
                    data.price.toString(),
                    'ether',
                  ),
                  start_time: data.starting_time,
                  expiration_time: data.ending_time,
                },
                price: web3.utils.toWei(data.price, 'ether'),
              }
            } else {
              updatableData = {
                token_id: returnvalues.tokenId,
                wallet_address,
                collection_address:
                  userInput.collection_address || erc721Mintable_address,
                file: response0.data.file,
                transaction_hash: mint.transactionHash,
                type: 'putOnSale',
                chain_id: 'rinkeby',
              }
            }

            const updateCollectible = await fetch(
              'https://dev.api.nftytribe.io/api/collectibles/update-collectible',
              {
                method: 'PUT',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify(updatableData),
              },
            )

            const res = await updateCollectible.json()

            console.log(res.data)
            setIsLoading(false)
            //alert('visit explore page')
            //window.location.replace('/explore')
            setIsLoading(false)
            setStep(4)
          } catch (err) {
            console.log(err)
            setMsg({ ...msg, eMsg: err, sMsg: '' })
            setIsLoading(false)
          }
          //clear all input fields

          // setShowModal(false)
          break
        case 4:
          //navigate to explore
          //setStep(4)

          break
      }
    } else {
      setShowModal(false)
      setStep(0)
      //setShowConnect(true)
      alert('Connect to metamask')
    }
  }
  // create item steps // end

  return (
    <>
      <Header />
      {showModal && (
        <CreateSteps
          handleClose={handleClose}
          step={step}
          handleSteps={handleSteps}
          isLoading={isLoading}
          msg={msg}
        />
      )}
      <Container>
        <div
          className={`${style.create} animate__animated animate__fadeInLeft`}
        >
          <form className={style.createContent}>
            <div className={style.left}>
              <div className={style.leftTop}>
                <h2>
                  Create{' '}
                  {itemType === 'single' ? 'single item' : 'multiple items'}
                </h2>
                <p>Create a single NFT item by minting it now.</p>
              </div>
              <div className={style.leftBody}>
                <div
                  className={` ${
                    dark === 'true'
                      ? style.fileContainerD
                      : style.fileContainerL
                  }`}
                >
                  {!imageFile && (
                    <div className={style.fileTxt}>
                      <img src={icon} alt="upload" />
                      <h3>Choose file</h3>
                      <p>PNG, GIF, WEBP, Maximum 100mb</p>
                    </div>
                  )}

                  <input
                    type="file"
                    name="img"
                    onChange={selectMedia}
                    required
                  />
                  {imageFile && (
                    <div className={style.fileBx}>
                      {/* <img src={guy} alt="guy" /> */}
                      <img src={URL.createObjectURL(imageFile)} alt="nft" />
                      <Cancel
                        className={style.cancel}
                        onClick={() => setImageFile(null)}
                      />
                    </div>
                  )}
                </div>
                <br />
                <br />
                <p className="redtxt">
                  <strong> {msg.eMsg} </strong>
                </p>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.fieldBx}>
                <p>Title</p>
                <TextInput
                  type="text"
                  inputName="title"
                  holder="Enter Title"
                  inputHandler={inputHandler}
                  value={userInput.title}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Description</p>
                <TextArea
                  inputName="description"
                  holder="Enter Description"
                  inputHandler={inputHandler}
                  value={userInput.description}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Price</p>
                <TextInput
                  type="text"
                  inputName="price"
                  holder="Enter Price"
                  inputHandler={inputHandler}
                  value={userInput.price}
                />
              </div>
              <div className={style.fieldBx}>
                <div className={style.smBtns}>
                  <div
                    className={
                      userInput.market_type === '1' && dark === 'true'
                        ? style.sAdark
                        : userInput.market_type === '1' && dark !== 'true'
                        ? style.sAlight
                        : style.smBtn
                    }
                    onClick={() =>
                      setUserInput({
                        ...userInput,
                        market_type: '1',
                      })
                    }
                  >
                    Fixed price
                  </div>
                  {/* <div
                    className={`${style.smBtn} ${
                      priceType === 'bids' ? style.smBtnA : ''
                    } `}
                    onClick={() => setPriceType('bids')}
                  >
                    Open for bids
                  </div> */}
                  <div
                    className={
                      userInput.market_type === '2' && dark === 'true'
                        ? style.sAdark
                        : userInput.market_type === '2' && dark !== 'true'
                        ? style.sAlight
                        : style.smBtn
                    }
                    onClick={() =>
                      setUserInput({
                        ...userInput,
                        market_type: '2',
                      })
                    }
                  >
                    Timed auction
                  </div>
                </div>
              </div>
              {userInput.market_type === '2' && (
                <>
                  <div className={style.fieldBx}>
                    <p>Start Date</p>
                    <TextInput
                      type="datetime-local"
                      inputName="starting_time"
                      //value={userInput.price}
                      inputHandler={inputHandler}
                      //step="1"
                    />
                  </div>
                  <div className={style.fieldBx}>
                    <p>End Date</p>
                    <TextInput
                      type="datetime-local"
                      inputName="ending_time"
                      //value={userInput.price}
                      inputHandler={inputHandler}
                    />
                  </div>
                </>
              )}
              <div className={style.cfieldBx}>
                {/* <Link
                  to="/createcollection"
                  className={`${style.collectionDashed} ${
                    dark === 'true' ? 'darkGradient' : 'lightGradient'
                  }`}
                >
                  <img src={create} alt="create" />
                  <p>Create</p>
                </Link> */}
                <div
                  className={`${style.collectionFill} ${
                    dark === 'true' ? 'darkGradient' : 'lightGradient'
                  }`}
                >
                  <img src={logo} alt="logo" />
                  <p>Nftytribe</p>
                </div>
                <p></p>
              </div>
              {userCollections.length >= 1 && (
                <div className={style.fieldBx}>
                  <p>Choose from created collections</p>
                  <SelectOption
                    value={userInput.category}
                    inputName="collection_address"
                    inputHandler={inputHandler}
                    options={userCollections}
                  />
                </div>
              )}

              <div className={style.fieldBx}>
                <p>Select a category</p>
                <SelectOption
                  options={categories}
                  inputName="category"
                  inputHandler={inputHandler}
                  value={userInput.category}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Royalties</p>
                <SelectOption
                  inputName="royalties"
                  options={royalties}
                  inputHandler={inputHandler}
                  value={userInput.royalties}
                />
              </div>
              {itemType === 'multiple' && (
                <div className={style.fieldBx}>
                  <p>Number of copies</p>
                  <TextInput
                    type="text"
                    inputName="copies"
                    holder="Number of copies..."
                    inputHandler={inputHandler}
                    value={userInput.copies}
                  />
                </div>
              )}
              <div className={style.fieldBx2}>
                <img className={style.toggleCheck} src={check} alt="toggle" />
                <p>Lazy minting</p>
                <div className={style.toggle}>
                  <div className={style.toggleBox}>
                    <label className={style.switchToggle}>
                      <input
                        onChange={handleLazy}
                        type="checkbox"
                        name="lazyMinting"
                      />
                      <span
                        className={`${style.sliderToggle} ${style.round}`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.fieldBx}>
                {!showAdvanced ? (
                  <div
                    //className={style.advancedBx}
                    className={`${style.advancedBx} animate__animated animate__fadeInUp `}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <p>Advanced settings</p>
                    <img src={dark === 'true' ? arrow2 : arrow1} alt="arrow" />
                  </div>
                ) : (
                  <div
                    //className={style.advancedBxA}
                    className={`${style.advancedBxA} animate__animated animate__fadeInUp `}
                  >
                    <div
                      className={style.aBxTop}
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <p>Advanced settings</p>
                      <img src={arrowDown} alt="arrow" />
                    </div>
                    <div className={style.aBxBody}>
                      <div className={style.fieldBx}>
                        <p>Properties</p>
                        <SelectOption
                          options={categories}
                          inputName="categories"
                        />
                      </div>
                      <div className={style.fieldBx}>
                        <p>Levels</p>
                        <SelectOption
                          options={categories}
                          inputName="categories"
                        />
                      </div>
                      <div className={style.fieldBx}>
                        <p>Stats</p>
                        <SelectOption
                          options={categories}
                          inputName="categories"
                        />
                      </div>
                      <div className={style.fieldBx2}>
                        <img
                          className={style.toggleCheck}
                          src={check}
                          alt="toggle"
                        />
                        <p>Sensitive content</p>
                        <div className={style.toggle}>
                          <div className={style.toggleBox}>
                            <label className={style.switchToggle}>
                              <input type="checkbox" name="sensitive" />
                              <span
                                className={`${style.sliderToggle} ${style.round}`}
                              ></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.submitBx}>
                <button
                  type="submit"
                  onClick={onSubmit}
                  disabled={isLoading || !validated}
                  className={dark === 'true' ? 'darkGradient' : 'lightGradient'}
                >
                  {!isLoading ? (
                    'Create'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default CreateItems
