//import { useState, useContext } from 'react'
//import { ThemeContext } from '../../../context/ThemeContext'
//import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from '../Create.module.scss'
import Close from '../assets/close.svg'
import Happy from '../assets/happy.svg'
import { CircularProgress } from '@material-ui/core'
import { motion } from 'framer-motion'
import TextInput from 'src/components/Inputs/TextInput'
import { useContext, useEffect, useState } from 'react'
import './index.scss'
import contracts from '../../../web3-Service/contractAddress'
import moment from 'moment'
import UseAxios from 'src/hooks/AxiosConfig/useAxios'
import Protected from 'src/hooks/AxiosConfig/axiosInstance'
import SelectOption from 'src/components/Inputs/SelectOption'
import Web3 from 'web3'
import physicalAbi from '../../../smart_contracts/physical.json'
import erc721CollectionAbi from '../../../smart_contracts/erc721Collection.json'
import tokenAbi from '../../../smart_contracts/afenToken.json'
import { UserContext } from 'src/context/UserContext'
import { toast } from 'react-hot-toast'



const CreateSteps = (props: any) => {
  const [validated, setValidated] = useState(false)
 const [listing,setListing]=useState(false)
  const [userInput, setUserInput] = useState<any>({
 
    wallet_address: sessionStorage.getItem('currentAccount'),
    title: '',
    description: '',
  
    //customCollection: '',
    nft_type: "",
    is_multiple: "",
    // price: 0,
    market_type: "1",
    category: 0,
    royalties: 0,
    copies: 2,
    is_lazy_mint: false,
    starting_time: 0,
    ending_time: 1
  })
  const inputHandler = async (event: any) => {
   
      setUserInput({
        ...userInput,
        [event.target.name]: event.target.value,
      });
    
  
  };
  const categ=UseAxios()
  const create = UseAxios()
  const verify = UseAxios()
  

  
  useEffect(()=>{
    if(verify.error) toast.error('verify.error.data.message.message')
  },[verify.error])
  // console.log();
  // @ts-ignore
  const web3 = new Web3(window.ethereum)
const {userState}=useContext(UserContext)
const wallet_address=sessionStorage.getItem('currentAccount')
  const List = async () => {
    setListing(true)// @ts-ignore
    const physicalContract = new web3.eth.Contract(physicalAbi,
      contracts.BSC_PhysicalItem,
    )
    console.log(erc721CollectionAbi, props.collection_address);
    
    //  @ts-ignore
    const TokenContract = new web3.eth.Contract(erc721CollectionAbi, props.collection_address)
   
    // @ts-ignore

    const token = new web3.eth.Contract(tokenAbi.abi, props.erc20)
     console.log(TokenContract);
   

    await TokenContract.methods.approve(contracts.BSC_PhysicalItem, props.mintedId).send({ from: wallet_address })

    const decimal = parseInt(await token.methods.decimals().call({ from: wallet_address }))
    let amount = Number(props.price) * 10 ** decimal


    await physicalContract.methods.putOnSale(props.mintedId,
      JSON.stringify(amount),
      props.market_type,
      moment().unix(),
      moment().add(30, 'days').unix(),
      '0',
      props.collection_address,
      props.erc20,// @ts-ignore
      web3.utils.asciiToHex(create?.Response?.key ?? create?.Response.data.key))
      .send({ from: wallet_address })

    props.handleSteps(4)
    setListing(false)
  }
  console.log(create.Response);
  
  useEffect(() => { if (create.Response) {console.log('hi');
   List()} }, [create.Response])
  useEffect(() => { if (verify.Response) {
    setUserInput({...userInput,address_code:verify.Response.data.address_code})
    props.handleSteps(10)
  } }, [verify.Response])
  console.log(verify.Response);
  console.log(userInput);
 useEffect(()=>{categ.fetchData({
  method:'get',
   url:'api/shipment/categories',
   axiosInstance:Protected(sessionStorage.getItem('token'))
 })},[])
 const categories= categ.Response?.data
 console.log(categories);
 
  return (
    <div className={style.cm}>
      <div className={style.cmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {/* {!props.created && ( */}
          {props.step === 1 && (
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
              className={`${style.modalSm} `}
            >
              <div className={style.modalTop2}>
                <h1> Minting your NFT</h1>
                <p>Minting your NFT on NftyTribe marketplace..</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                {/* <div className={style.successImg}>
                    <img src={Happy} alt="success" />
                  </div> */}
              </div>
              <div className={style.modalBtnSingle2}>
                <button disabled={props.isLoading} onClick={props.handleSteps}>
                  {!props.isLoading ? (
                    'Mint'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
          {props.step === 2 && (
            <div
              className={`${style.modalSm} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Step 2 : Approve</h1>
                <p>Approve NftyTribe to use your wallet</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                {/* <div className={style.successImg}>
                    <img src={Happy} alt="success" />
                  </div> */}
              </div>
              <div className={style.modalBtnSingle2}>
                <button disabled={props.isLoading} onClick={props.handleSteps}>
                  {!props.isLoading ? (
                    'Approve'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          )}
          {props.step === 9 && (
            <div
              className={`${style.modalSm} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Create NFT+ Real item</h1>
                <p>As a creator you are required to verify your details before listing a physical item</p>
                <img src={Close} alt="close" onClick={props.handleClose} />

                <div className="user">
                  <p>
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0.5C6.72 0.5 0 7.22 0 15.5C0 23.78 6.72 30.5 15 30.5C23.28 30.5 30 23.78 30 15.5C30 7.22 23.28 0.5 15 0.5ZM15 5C17.49 5 19.5 7.01 19.5 9.5C19.5 11.99 17.49 14 15 14C12.51 14 10.5 11.99 10.5 9.5C10.5 7.01 12.51 5 15 5ZM15 26.3C11.25 26.3 7.935 24.38 6 21.47C6.045 18.485 12 16.85 15 16.85C17.985 16.85 23.955 18.485 24 21.47C22.065 24.38 18.75 26.3 15 26.3Z" fill="#393936" />
                    </svg>
                    {userState?.user?.username}
                  </p>
                  <span>Connected</span>
                </div>
              </div>
              <div style={{width:'70%'}} className={style.modalBody2}>
                <div className={style.fieldBx}>
                  <p>Name</p>
                  <TextInput
                    type="text"
                    inputName="name"
                    holder="Input Your Full Name"
                    inputHandler={inputHandler}
                    value={userInput.name}
                  />
                </div>
                <div className={style.fieldBx}>
                  <p>Phone</p>
                  <TextInput
                    type="text"
                    inputName="phone"
                    holder="Phone Number"
                    inputHandler={inputHandler}
                    value={userInput.phone}
                  />
                </div>
                <div className={style.fieldBx}>
                  <p>Country</p>
                  <TextInput
                    type="text"
                    inputName="country"
                    holder="Enter Country"
                    inputHandler={inputHandler}
                    value={userInput.country}
                  />
                </div>
                <div className={style.fieldBx}>
                  <p>State</p>
                  <TextInput
                    type="text"
                    inputName="state"
                    holder="Enter State"
                    inputHandler={inputHandler}
                    value={userInput.state}
                  />
                </div> 
                 <div className={style.fieldBx}>
                  <p>Address</p>
                  <TextInput
                    type="text"
                    inputName="address"
                    holder="Enter Address"
                    inputHandler={inputHandler}
                    value={userInput.address}
                  />
                </div>

               
              </div>
              <div className={`${style.modalBtnSingle2} buttons`}>
                <button style={{ background: 'white' }} disabled={verify.loading} onClick={props.handleSteps}>
                  {!verify.loading ? (
                    'Cancel'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
                <button disabled={verify.loading} onClick={()=>{
                   verify.fetchData({
                    method: 'post',
                     url: 'api/shipment/verify-address',
                    axiosInstance: Protected(sessionStorage.getItem('token')),
                    requestConfig: {
                     
                      "name": userInput.name,
                      "phone": userInput.phone,
                      "address": `${userInput.address},${userInput.country},${userInput.state}`
                    }
                  })
                }}>
                  {!verify.loading ? (
                    'Verify'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          )} 
            {props.step === 10 && (
            <div
              className={`${style.modalSm} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Create NFT+ Real item</h1>
                <p>Tell us the details of the physical Item that you are listing</p>
                <img src={Close} alt="close" onClick={props.handleClose} />

                <div className="user">
                  <p>
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0.5C6.72 0.5 0 7.22 0 15.5C0 23.78 6.72 30.5 15 30.5C23.28 30.5 30 23.78 30 15.5C30 7.22 23.28 0.5 15 0.5ZM15 5C17.49 5 19.5 7.01 19.5 9.5C19.5 11.99 17.49 14 15 14C12.51 14 10.5 11.99 10.5 9.5C10.5 7.01 12.51 5 15 5ZM15 26.3C11.25 26.3 7.935 24.38 6 21.47C6.045 18.485 12 16.85 15 16.85C17.985 16.85 23.955 18.485 24 21.47C22.065 24.38 18.75 26.3 15 26.3Z" fill="#393936" />
                    </svg>
                    {sessionStorage.getItem('currentAccount')?.slice(0, 6)}...
                  </p>
                  <span>Connected</span>
                </div>
              </div>
              <div className={style.modalBody2}>
                <div className={style.fieldBx}>
                  <p>Unit weight</p>
                  <TextInput
                    type="text"
                    inputName="unit_weight"
                    holder="Input the weight of the item in Kg"
                    inputHandler={inputHandler}
                    value={userInput.unit_weight}
                  />
                </div>
                <div className={style.fieldBx}>
                  <p>Unit Amount</p>
                  <TextInput
                    type="text"
                    inputName="unit_amount"
                    holder="Enter Amount"
                    inputHandler={inputHandler}
                    value={userInput.unit_amount}
                  />
                </div>
                <div className={style.fieldBx}>
                  <p>Quantity</p>
                  <TextInput
                    type="text"
                    inputName="quantity"
                    holder="Enter Quantity"
                    inputHandler={inputHandler}
                    value={userInput.quantity}
                  />
                </div>
                <div className={style.fieldBx}>
                  <p>Select a category</p>
                  <SelectOption
                    options={categories?.data?.map((category: any) => {
                      return { value: category.category_id, text: category.category }
                    })}
                    inputName="category_id"
                    inputHandler={inputHandler}
                    value={userInput.category}
                  />
                </div>

                <div className='dimension'>
                  <div className={style.fieldBx}>
                    <p>length</p>
                    <TextInput
                      type="number"
                      inputName="length"
                      holder="Enter length"
                      inputHandler={inputHandler}
                      value={userInput.length}
                    />
                  </div> <div className={style.fieldBx}>
                    <p>width</p>
                    <TextInput
                      type="number"
                      inputName="width"
                      holder="Enter width"
                      inputHandler={inputHandler}
                      value={userInput.width}
                    />
                  </div> <div className={style.fieldBx}>
                    <p>Height</p>
                    <TextInput
                      type="text"
                      inputName="height"
                      holder="Enter height"
                      inputHandler={inputHandler}
                      value={userInput.height}
                    />
                  </div>
                </div>
              </div>
              <div className={`${style.modalBtnSingle2} buttons`}>
                <button style={{ background: 'white' }} disabled={create.loading||listing} onClick={props.handleSteps}>
                  {!create.loading||listing ? (
                    'Cancel'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
                <button disabled={create.loading||listing} onClick={()=>{
                  create.fetchData({
                     method:'post',
                    url:'api/nft/physical-item',
                    axiosInstance: Protected(sessionStorage.getItem('token')),
                    requestConfig: {

                      "description":props.description,
                      "unit_weight": userInput.unit_weight,
                      "unit_amount": userInput.unit_amount,
                      "quantity": userInput.quantity,
                      "address_code": userInput.address_code,
                      "imageKey": "",
                      "name": props.title,
                      "category_id": userInput.category_id,
                      "width": userInput.width,
                      "height": userInput.height,
                      "length": userInput.length
                    }
                  })
                }}>
                  {!create.loading||listing ? (
                    'Confirm'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          )}
          {props.step === 3 && (
            <div
              className={`${style.modalSm} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Step 3 : Sign Sale Order</h1>
                <p>Put your item(s) on sale.</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                {/* <div className={style.successImg}>
                    <img src={Happy} alt="success" />
                  </div> */}
              </div>
              <div className={style.modalBtnSingle2}>
                <button disabled={props.isLoading} onClick={props.handleSteps}>
                  {!props.isLoading ? (
                    'Sign Sale Order'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          )}
          {props.step === 4 && (
            <div
              className={`${style.modal} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Item Created!</h1>
                <p>You can now view your item on the Profile page.</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <div className={style.modalBtnSingle2}>
                <Link to="/profile">
                  <button>View Profile Page</button>
                </Link>
              </div>
            </div>
          )}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default CreateSteps
