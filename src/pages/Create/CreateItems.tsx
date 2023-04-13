import { useContext, useEffect } from 'react'
import useState from 'react-usestateref'
import { useParams } from 'react-router'
import { ThemeContext } from '../../context/ThemeContext'
// import ContractContext from '../../context/ContractContext'
import { Link } from 'react-router-dom'
import { Cancel } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import Container from '../../components/Container/Container'
// import Header from '../../components/Header/Header'
import style from './Create.module.scss'
import TextInput from '../../components/Inputs/TextInput'
import SelectDate from '../../components/Inputs/SelectDate'
import TextArea from '../../components/Inputs/TextArea'
import SelectOption from '../../components/Inputs/SelectOption'
import SelectOption2 from '../../components/Inputs/SelectOption2'
import icon from './assets/upload.svg'
import check from './assets/check.svg'
import globals from '../../utils/globalVariables'
import logo from './assets/logo-sm.svg'
import moment from 'moment'
import physicalAbi from '../../smart_contracts/physical.json'
import Web3 from 'web3'
import contracts from '../../web3-Service/contractAddress'
import tokenAbi from '../../smart_contracts/afenToken.json'

import abi from '../../smart_contracts/erc721Mintable.json'
// import erc721Abi from '../../smart_contracts/erc721Collection.json'
import collectionabi from '../../smart_contracts/collections.json'
import erc721MarketplaceAbi from '../../smart_contracts/erc721Market.json'
import erc721CollectionAbi from '../../smart_contracts/erc721Collection.json'
import erc1155MintableAbi from '../../smart_contracts/erc1155Mintable2.json'
import erc1155MarketplaceAbi from '../../smart_contracts/erc1155Market2.json'
import { publicRequest } from '../../utils/requestMethods'
import toast from 'react-hot-toast'

import { ethers } from 'ethers'
import CreateSteps from './Modals/CreateSteps'
import { useTranslation } from "react-i18next";
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { UserContext } from '../../context/UserContext'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import PutOnSaleModal from './physical'

declare const window: any

const CreateItems = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const currentChain = sessionStorage.getItem('chain')
  // const { handlePutOnSale } = useContext(ContractContext)
  const { itemType } = useParams()
  const { chain } = useParams()
  const [priceType, setPriceType] = useState('fixed')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [step, setStep] = useState(1)
  const [collection, setCollection] = useState('afen')
  const [returnValues, setReturnValues] = useState<any>()
  const [response0, setResponse0] = useState<any>()
  const [mint, setMint] = useState<any>()
  const [collectible, setCollectible] = useState()
  const [validated, setValidated] = useState(false)
  // network
 
  
  // erc721 addresses
  const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
  const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
  // erc 1155 addresses
  const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
  const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')
  const wallet_address = sessionStorage.getItem('currentAccount')
  const web3= new Web3(window.ethereum)
  const [showList,setShowList]=useState<boolean>(false)
  const [err, setErr] = useState<any>({
    title: "",
    price: "",
    market_type: "",
    category: "",
  });
  const [msg, setMsg] = useState<any>({
    sMsg: "",
    eMsg: "",
    eMsg2: "",
  });
  const [categories,setCategories]=useState<any>([])
  const getCategories = async () => {
    const res = await Protected(sessionStorage.getItem('token'))['get']('api/category')
    setCategories(res?.data)

  }
  const [userInput, setUserInput, userInputRef] = useState<any>({
    chain: chain,
    wallet_address: wallet_address,
    title: '',
    description: '',
    collection_address: contracts.BSC_erc721MintableAddress ,
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
  const [cardImage, setCardImage] = useState('')
  const [imageFile, setImageFile] = useState<any>('')
  const [userCollections, setUserCollections] = useState([])
  const [isPhysical, setIsPhysical] = useState<boolean>(false)


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 
  
  const {userState}=useContext(UserContext)
 
  
  const getCollections = async () => {

    try {
      const resp = await publicRequest.get(`api/collection?owner=${userState?.user?.id}`)
      // console.log(resp.data)
      //setCollections(resp.data.data.splice(0, 9))
      setUserCollections(resp?.data.results)
      setIsLoading(false)
    } 
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }
  // console.log(currentChain === '0x61', contracts.erc721MintableAddress, contracts.BSC_erc721MintableAddress );
  
  useEffect(() => {
    const currentChain = sessionStorage.getItem('chain')
    if (currentChain === globals.mainnetEth.chainId) {
     
      setErc721MintableAddress(contracts.erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
    }
    // remeber to change for live
    else if (currentChain === '0x61') {
   
      setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.BSC_erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
    }
    // console.log(itemType, 'type')
    getCategories()
    getCollections()
  }, [userState])

  const inputHandler = async (event: any) => {
    setValidated(false);
    const { name, value } = event.target;
    // console.log(event);
    
    if (name === "price" || name === "royalties" || name === "copies") {
      //const valueFiltered = value.replace(/\D/g, '')
      let letters = /[a-zA-Z]/;
      let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
      let dots = value.match(/\./g);
      //console.log(dots)
      //if (!regex.test(value)) {
      if (
        letters.test(value) ||
        specialChars.test(value) ||
        dots?.length >= 2
      ) {
        // console.log(value);
      } else {
        setUserInput({
          ...userInput,
          [event.target.name]: value,
        });
      }
    } else {
      setUserInput({
        ...userInput,
        [event.target.name]: event.target.value,
      });
    }
    if (
      !isPhysical&&
      userInputRef.current.title !== "" &&
      userInputRef.current.category !== "0"
    ) {
      setValidated(true);
    }
    else if (isPhysical && userInputRef.current.address !== "" && userInputRef.current.city !== "" && userInputRef.current.state !== "" && userInputRef.current.weight !== "" && userInputRef.current.country !== "" && userInputRef.current.price !== ""){
      setValidated(true);
    }
  };
  // console.log(isPhysical && userInputRef.current.address !== "" && userInputRef.current.city !== "" && userInputRef.current.state !== "" && userInputRef.current.weight !== "" && userInputRef.current.country !== "" && userInputRef.current.price !== "");
  
  const selectMedia = async (e: any) => {

    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      console.log(e.target.files[0]);
      
      var form_data = new FormData();
      form_data.append("upload", e.target.files[0]);
       
    }
  };

  
  const handleClose = () => {
    setShowModal(false)
    
  }
  const [imgKey, setImgKey]=useState()
  const {fetchData,Response,loading,error}=UseAxios()
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData= new FormData();
    
    if (imageFile === '') {
      setMsg({
        ...msg,
        eMsg: "* Please choose a file! *",
      });
        } else {
      setMsg({
        ...msg,
        eMsg: '',
      })
       setShowModal(true)
       setIsLoading(true)
      formData.append('image',imageFile);
      try {
        const imgRes= await Protected(sessionStorage.getItem('token'))['post']('api/uploads/temp/nft',formData)
      const key=imgRes.data.key
      setImgKey(key)
     
         await fetchData({
           method: 'post',
           url: 'api/nft/create-nft',
           axiosInstance: Protected(sessionStorage.getItem('token')),
           requestConfig: {
             name: userInput.title,
             description: userInput.description,
             website: 'www.kachi.com',
             imageKey: key,
             lazyMint: false
           }
         })
       
          
     
     
      } catch (error) {
        console.log(error);
        
      }
     
     

      

    }
  };
//  console.log(collectionabi)
const [mintedId,setId]=useState()
const create=UseAxios()
  const Mint=async()=>{
    try {
      // @ts-ignore
      const contract = new web3.eth.Contract(abi, contracts.BSC_erc721MintableAddress)
      // @ts-ignore
      const collectionContract = new web3.eth.Contract(collectionabi,userInput.collection_address)

     if(userInput.collection_address!==contracts.BSC_erc721MintableAddress){
       const charge = await collectionContract.methods.mintingCharge().call()
       console.log(charge,userInput.collection_address);
       
       
       const req = await collectionContract.methods.mint(Response?.data?.uri, userInput.royalties).send({ from: wallet_address, value: charge })
       console.log(req)
     }
     else {
      console.log('minting');
      
      const charge = await contract.methods.mintingCharge().call()
      console.log(charge);
      
     
     const mint= await contract.methods.mint(Response?.data?.uri, userInput.royalties).send({ from: wallet_address, value: charge })
     setId(mint.events.Transfer.returnValues.tokenId);
      
    }
    
    
      console.log("mintied");
     
     
      
      if (isPhysical) {
        await create.fetchData({
          method: 'post',
          url: 'api/nft/physical-item',
          axiosInstance: Protected(sessionStorage.getItem('token')),
          requestConfig: {
            address: userInput.address,
            city: userInput.city,
            state: userInput.state,
            country: userInput.country,
            weight: userInput.weight,
            deliveryChannels: ["topship"],
            // imageKey: imgKey,
            //  lazyMint:false
          }
        })
      } 
         //   }
     else setStep(4)
     
      
    } catch (error) {
      console.log(error);
      
    }
  }
console.log(tokenAbi);

  useEffect(()=>{
   if(Response) Mint()
   else return
  },[Response])
  const { t } = useTranslation();
   
  const List= async()=>{// @ts-ignore
    const physicalContract = new web3.eth.Contract(physicalAbi,
      contracts.BSC_PhysicalItem,
    )
      //  @ts-ignore
            const TokenContract = new web3.eth.Contract(erc721CollectionAbi, userInput.collection_address)
    // console.log(await physicalContract.methods);
    // @ts-ignore
  
    const token = new web3.eth.Contract(tokenAbi.abi, userInput.erc20)



        await TokenContract.methods.approve(contracts.BSC_PhysicalItem, mintedId).send({ from: wallet_address })

 console.log( userInput.price);
          const decimal = parseInt(await token.methods.decimals().call({ from: wallet_address }))
          let amount = parseInt(userInput.price) * 10 ** decimal
    console.log(amount, mintedId,
             JSON.stringify(amount),
              userInput.market_type,
               moment().unix(),
               moment().add(30, 'days').unix(),
               '0',
                userInput.collection_address,
                 userInput.erc20,// @ts-ignore
                 create?.Response?.key??create?.Response.data.key);

        await physicalContract.methods.putOnSale(mintedId,
             JSON.stringify(amount),
              userInput.market_type,
               moment().unix(), 
               moment().add(30, 'days').unix(),
               '0',
                userInput.collection_address,
                 userInput.erc20,// @ts-ignore
                web3.utils.asciiToHex(create?.Response?.key??create?.Response.data.key))
                 .send({ from: wallet_address })

        try {
         
                 
                 
          // setCompleted(!completed)
        } catch (error) {

        }


  }
 
  useEffect(()=>{if(create.Response)List()},[create.Response])


  return (
    <>
      {/* <Header /> */}
      {showModal && (
        <CreateSteps
          handleClose={handleClose}
          step={step}
          handleSteps={''}
          isLoading={isLoading}
          msg={msg}
        />
      )}
      {/* {!showList && <PutOnSaleModal />} */}
      <Container>
        <div
          className={`${style.create} animate__animated animate__fadeInLeft`}>
          <form className={style.createContent}>
            <div className={style.left}>
              <div className={style.leftTop}>
                <h2>
                  Create{" "}
                  {itemType === "single" ? "single item" : "multiple items"}
                </h2>
                <p>{t("Create a single")}</p>
              </div>
              <div className={style.leftBody}>
                <div
                  className={` ${dark === "true"
                    ? style.fileContainerD
                    : style.fileContainerL
                    }`}>
                  {!imageFile && (
                    <div className={style.fileTxt}>
                      <img src={icon} alt="upload" />
                      <h3>{t("Choose file")}</h3>
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
                        onClick={() => setImageFile('')}
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
             <><div className={style.fieldBx}>
                <p>{t("Title")}</p>
                <TextInput
                  type="text"
                  inputName="title"
                  holder="Enter Title"
                  inputHandler={inputHandler}
                  value={userInput.title}
                />
              </div>
              <div className={style.fieldBx}>
                <p>{t("Description")}</p>
                <TextArea
                  inputName="description"
                  holder="Enter Description"
                  inputHandler={inputHandler}
                  value={userInput.description}
                />
              </div></>
             {isPhysical&&<> 
                <div className={style.fieldBx}>
                  <p>{t("Price")}</p>
                  <TextInput
                    type="text"
                    inputName="price"
                    holder={`Enter ${currentChain === '0x1' ? 'ETH' : currentChain === '0x38' ? 'BNB' : ''} Price`}
                    max="12"
                    inputHandler={inputHandler}
                    value={userInput.price}
                  />
                  <div className={style.iDesc}><p>({currentChain === globals.mainnetEth.chainId ? 'ETH' : currentChain === globals.mainnetBsc.chainId ? 'BNB' : ''} price)</p></div>

                </div> <div className={style.fieldBx}>
                  <p>Erc20 token</p>
                  <TextInput
                    type="text"
                    inputName="erc20"
                    holder={`Enter ERC20 token address`}
                    // max="12"
                    inputHandler={inputHandler}
                    value={userInput.erc20}
                  />
                  {/* <div className={style.iDesc}><p>({currentChain === globals.mainnetEth.chainId ? 'ETH' : currentChain === globals.mainnetBsc.chainId ? 'BNB' : ''} price)</p></div> */}

                </div>  
                <div className={style.fieldBx}>
                  <p>Address</p>
                  <TextInput
                    type="text"
                    inputName="address"
                    holder={`Enter Delivery Address`}
                    // max="12"
                    inputHandler={inputHandler}
                    value={userInput.address}
                  />
                  {/* <div className={style.iDesc}><p>({currentChain === globals.mainnetEth.chainId ? 'ETH' : currentChain === globals.mainnetBsc.chainId ? 'BNB' : ''} price)</p></div> */}

                </div>  <div className={style.fieldBx}>
                  <p>City</p>
                  <TextInput
                    type="text"
                    inputName="city"
                    holder={`Enter City`}
                    max="12"
                    inputHandler={inputHandler}
                    value={userInput.city}
                  />
                  {/* <div className={style.iDesc}><p>({currentChain === globals.mainnetEth.chainId ? 'ETH' : currentChain === globals.mainnetBsc.chainId ? 'BNB' : ''} price)</p></div> */}

                </div>  <div className={style.fieldBx}>
                  <p>State</p>
                  <TextInput
                    type="text"
                    inputName="state"
                    holder={`Enter State`}
                    max="12"
                    inputHandler={inputHandler}
                    value={userInput.state}
                  />
                  {/* <div className={style.iDesc}><p>({currentChain === globals.mainnetEth.chainId ? 'ETH' : currentChain === globals.mainnetBsc.chainId ? 'BNB' : ''} price)</p></div> */}

                </div>  <div className={style.fieldBx}>
                  <p>Country</p>
                  <TextInput
                    type="text"
                    inputName="country"
                    holder={`Enter Country`}
                    max="12"
                    inputHandler={inputHandler}
                    value={userInput.country}
                  />
                  {/* <div className={style.iDesc}><p>({currentChain === globals.mainnetEth.chainId ? 'ETH' : currentChain === globals.mainnetBsc.chainId ? 'BNB' : ''} price)</p></div> */}

                </div>  <div className={style.fieldBx}>
                  <p>Weight</p>
                  <TextInput
                    type="text"
                    inputName="weight"
                    holder={`Enter Item Weight`}
                    max="12"
                    inputHandler={inputHandler}
                    value={userInput.weight}
                  />
                  <div className={style.iDesc}><p>(Kg)</p></div>

                </div>
              <div className={style.fieldBx}>
                <div className={style.smBtns}>
                  <div
                    className={
                      userInput.market_type === "1" && dark === "true"
                        ? style.sAdark
                        : userInput.market_type === "1" && dark !== "true"
                          ? style.sAlight
                          : style.smBtn
                    }
                    onClick={() =>
                      setUserInput({
                        ...userInput,
                        market_type: "1",
                      })
                    }>
                    {t("Fixed price")}
                  </div>
                  {/* <div
                    className={`${style.smBtn} ${
                      priceType === 'bids' ? style.smBtnA : ''
                    } `}
                    onClick={() => setPriceType('bids')}
                  >
                    Open for bids
                  </div> */}
                  {itemType !== "multiple" && (
                    <div
                      className={
                        userInput.market_type === "2" && dark === "true"
                          ? style.sAdark
                          : userInput.market_type === "2" && dark !== "true"
                            ? style.sAlight
                            : style.smBtn
                      }
                      onClick={() =>
                        setUserInput({
                          ...userInput,
                          market_type: "2",
                        })
                      }>
                      {t("Timed auction")}
                    </div>
                  )}
                </div>
              </div>
              {userInput.market_type === "2" && (
                <>
                  <div className={style.fieldBx}>
                    <p>{t("Start Date")}</p>
                    <SelectDate
                      type="text"
                      inputName="starting_time"
                      //onFocus={(e: any) => e.target.type = 'datetime-local'}
                      holder="Choose Start Date"
                      //value={userInput.price}
                      inputHandler={inputHandler}
                    //step="1"
                    />
                  </div>
                  <div className={style.fieldBx}>
                    <p>{t("End Date")}</p>
                    <SelectDate
                      type="text"
                      inputName="ending_time"
                      //onFocus={(e: any) => e.target.type = 'datetime-local'}
                      holder="Choose End Date"
                      //value={userInput.price}
                      inputHandler={inputHandler}
                    />
                  </div>
                </>
              )}
              </>}
              <p>
                Choose Collection (Nftytribe collection is chosen by default)
              </p>
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
                  className={`${style.collectionFill} ${dark === "true" ? "darkGradient" : "lightGradient"
                    }`}>
                  <img src={logo} alt="logo" />
                  {/* <p>Nftytribe</p> */}
                </div>
                <p></p>
              </div>
              {userCollections?.length >= 1 && (
                <div className={style.fieldBx}>
                  <p>Choose from created collections</p>
                  <SelectOption2
                    //value={userInput.collection_address}
                    inputName="collection_address"
                    inputHandler={inputHandler}
                    options={userCollections}
                  />
                </div>
              )}

              <div className={style.fieldBx}>
                <p>Select a category</p>
                <SelectOption
                  options={categories.map((category:any)=>{
                    return {value:category.id,text:category.name}
                  })}
                  inputName="category"
                  inputHandler={inputHandler}
                  value={userInput.category}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Royalties</p>

                

                <TextInput
                  type="text"
                  inputName="royalties"
                  holder="In % Eg 0, 10. max:10"
                  inputHandler={inputHandler}
                  value={userInput.royalties}
                />
              </div>
              {itemType === "multiple" && (
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
                        // onChange={handleLazy}
                        type="checkbox"
                        name="lazyMinting"
                      />
                      <span
                        className={`${style.sliderToggle} ${style.round}`}></span>
                    </label>
                  </div>
                </div>
              </div> 
              <div className={style.fieldBx2}>
                <img className={style.toggleCheck} src={check} alt="toggle" />
                <p>Has Physical Item</p>
                <div className={style.toggle}>
                  <div className={style.toggleBox}>
                    <label className={style.switchToggle}>
                      <input
                        onChange={()=>setIsPhysical(!isPhysical)}
                        type="checkbox"
                        name="lazyMinting"
                      />
                      <span
                        className={`${style.sliderToggle} ${style.round}`}></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.submitBx}>
                <button
                  type="submit"
                  onClick={onSubmit}
                  
                  disabled={isLoading || !validated}
                  className={dark === "true" ? "yellowBtn" : "blueBtn"}>
                  {!isLoading ? (
                    "Create"
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
                {msg.eMsg2 && (
                  <>
                    <br />

                    <p className="redtxt">
                      <strong> {msg.eMsg2} </strong>
                    </p>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CreateItems;
