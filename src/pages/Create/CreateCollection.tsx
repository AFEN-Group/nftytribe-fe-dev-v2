import { useContext, useEffect } from 'react'
import useState from 'react-usestateref'
//import { useParams } from 'react-router'
import { ThemeContext } from '../../context/ThemeContext'
import { Cancel } from '@material-ui/icons'
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import style from './Create.module.scss'
import TextInput from '../../components/Inputs/TextInput'
import TextArea from '../../components/Inputs/TextArea'
import icon from './assets/upload.svg'
//import guy from './assets/00guy.png'
import { CircularProgress } from '@material-ui/core'
import { publicRequest } from '../../utils/requestMethods'
import Web3 from 'web3'
import contracts from '../../web3-Service/contractAddress'
import erc721FactoryAbi from '../../smart_contracts/erc721Factory.json'
import erc1155FactoryAbi from '../../smart_contracts/erc1155Factory.json'
import CollectionModal from './Modals/CollectionModal'
import SelectOption from '../../components/Inputs/SelectOption'
import globals from '../../utils/globalVariables'
import toast from 'react-hot-toast'

declare const window: any

const CreateCollection = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const [isLoading, setIsLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [userInput, setUserInput, userInputRef] = useState<any>({
    name: '',
    description: '',
    symbol: '',
    url: '',
    contractOption: 'erc721'
  })
  const [imageFile, setImageFile] = useState<any>({
    file: '',
    location: '',
  })
  const inputHandler = async (event: any) => {
    setValidated(false)
    //const { name, value } = event.target
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
    if (
      userInputRef.current.name !== '' &&
      userInputRef.current.symbol !== ''
    ) {
      setValidated(true)
    }

  }
  const [msg, setMsg] = useState<any>({
    sMsg: '',
    eMsg: '',
    eMsg2: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [created, setCreated] = useState(false)
  const [newColllection, setNewCollection] = useState('')

  const contractOptions = [
    { value: 'erc721', text: 'erc721' },
    { value: 'erc1155', text: 'erc1155' },
  ]

  // network
  const [chain, setChain, chainRef] = useState<string>()
  // erc721 address
  const [erc721FactoryAddress, setErc721FactoryAddress] = useState<any>('')

  // erc 1155 address
  const [erc1155FactoryAddress, setErc1155FactoryAddress] = useState<any>('')

  useEffect(() => {
    const currentChain = localStorage.getItem('chain')
    if (currentChain === '0x1') {
      setChain('eth')
      setErc721FactoryAddress(contracts.erc721FactoryAddress)
    }
    if (currentChain === '0x38') {
      setChain('bsc')
      setErc721FactoryAddress(contracts.BSC_erc721FactoryAddress)
    }

  }, [])

  const selectMedia = async (e: any) => {
    setIsLoading(true)
    if (e.target.files && e.target.files.length > 0) {
      setImageFile({
        ...imageFile,
        file: e.target.files[0],
      })
      var form_data = new FormData()
      form_data.append('upload', e.target.files[0])
      try {
        const resp = await fetch(
          `${globals.baseURL}/collectibles/upload-image`,
          {
            method: 'POST',
            body: form_data,
          },
        )
        const data = await resp.json()
        setImageFile({
          ...imageFile,
          file: e.target.files[0],
          location: data.location,
        })
        console.log('image>>>', data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(userInput.contractOption)
    if (imageFile.location === null || imageFile.location === "") {
      setMsg({
        ...msg,
        eMsg: '* Please choose a file! *',
      })
    } else {
      setMsg({
        ...msg,
        eMsg: '',
      })
      setIsLoading(true)
      const wallet_address = localStorage.getItem('currentAccount')
      // const chain = 'eth'
      // const erc721Factory = contracts.erc721FactoryAddress
      // const erc1155Factory = contracts.erc1155FactoryAddress
      // console.log(contract_address, '<< contract ?')
      // console.log(wallet_address, '<< wallet ?')
      //'0xb1d612aB4FfF891E4A0042d4DF9C1F257eaeBb74'
      let factoryContract
      let web3: any
      if (window.ethereum && wallet_address) {
        web3 = new Web3(window.ethereum)
        if (userInput.contractOption === "erc721") { // for erc721
          factoryContract = new web3.eth.Contract(
            erc721FactoryAbi,
            erc721FactoryAddress,
          )
          try {
            const newCollection = await factoryContract.methods
              .createCollection(
                userInput.name,
                userInput.symbol,
                "",
                "https://ipfs.io/ipfs/",
                10000,
              )
              .send({ from: wallet_address })
            console.log(newCollection)
            const transactionHash = newCollection?.transactionHash
            const newCollectionAddress =
              newCollection?.events?.OwnershipTransferred[0].address
            //console.log(newCollectionAddress, ' address'

            const collectionObj = {
              wallet_address,
              contract_address: newCollectionAddress,
              chain,
              title: userInput.name,
              about: userInput.description,
              symbol: userInput.symbol,
              cover_image: imageFile.location,
              background_image: imageFile.location,
              transactionHash,
            }
            const newCollectionReq = await publicRequest.post(
              `/collections/create-collection`,
              collectionObj,
            )
            console.log(newCollectionReq)
            //setMsg({ ...msg, sMsg: newCollectionReq.data.msg, eMsg: '' })
            setNewCollection(newCollectionReq.data.data.title)
            setCreated(true)
            setShowModal(true)
          } catch (err) {
            console.log(err)
            //setMsg({ ...msg, eMsg: err, sMsg: '' })
            //setMsg(err)
          }
        }
        if (userInput.contractOption === "erc1155") {
          factoryContract = new web3.eth.Contract(
            erc1155FactoryAbi,
            erc1155FactoryAddress,
          )
          try {
            const newCollection = await factoryContract.methods
              .createCollection(
                "https://ipfs.io/ipfs/",
                10000,
                userInput.name,
                userInput.symbol,
                "",
              )
              .send({ from: wallet_address })
            console.log(newCollection)
            const transactionHash = newCollection?.transactionHash
            const newCollectionAddress =
              newCollection?.events?.OwnershipTransferred[0].address
            //console.log(newCollectionAddress, ' address'

            const collectionObj = {
              wallet_address,
              contract_address: newCollectionAddress,
              chain,
              title: userInput.name,
              about: userInput.description,
              symbol: userInput.symbol,
              cover_image: imageFile.location,
              background_image: imageFile.location,
              transactionHash,
            }
            const newCollectionReq = await publicRequest.post(
              `/collections/create-collection`,
              collectionObj,
            )
            console.log(newCollectionReq)
            //setMsg({ ...msg, sMsg: newCollectionReq.data.msg, eMsg: '' })
            setNewCollection(newCollectionReq.data.data.title)
            setCreated(true)
            setShowModal(true)
          } catch (err) {
            console.log(err)
            //setMsg({ ...msg, eMsg: err, sMsg: '' })
            //setMsg(err)
          }
        }

        setIsLoading(false)
      } else {
        // alert('Connect to meta mask wallet')
        toast.error(`Please connect wallet!`,
          {
            duration: 3000,
          }
        )
        setIsLoading(false)
      }
    }
  }


  const closeModal = () => {
    setShowModal(false)
    setUserInput({
      name: '',
      description: '',
      symbol: '',
      url: '',
    })
    setImageFile(null)
  }

  return (
    <>
      <Header />
      {showModal && (
        <CollectionModal
          closeModal={closeModal}
          created={created}
          newCollection={newColllection}
        />
      )}
      <Container>
        <div
          className={`${style.create} animate__animated animate__fadeInLeft`}
        >
          <div className={style.createContent}>
            <div className={style.left}>
              <div className={style.leftTop}>
                <h2>Create NFT collection</h2>
                <p>Create, curate, and manage collections of unique NFTs to share and sell.
                </p>
              </div>
              <div className={style.leftBody}>
                <div
                  className={` ${dark === 'true'
                    ? style.fileContainerD
                    : style.fileContainerL
                    }`}
                >
                  {!imageFile.file && (
                    <div className={style.fileTxt}>
                      <img src={icon} alt="upload" />
                      <h3>Choose file</h3>
                      <p>PNG, GIF, WEBP, Maximum 100mb</p>
                    </div>
                  )}

                  <input type="file" name="img" onChange={selectMedia} />
                  {imageFile.file && (
                    <div className={style.fileBx}>
                      {/* <img src={guy} alt="guy" /> */}
                      <img
                        src={URL.createObjectURL(imageFile.file)}
                        alt="nft"
                      />
                      <Cancel
                        className={style.cancel}
                        onClick={() =>
                          setImageFile({
                            file: null,
                            location: '',
                          })
                        }
                      />
                    </div>
                  )}
                </div>
                <br />
                <br />
                <p className="redtxt">
                  <strong> {msg?.eMsg} </strong>
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className={style.right2}>
              <div className={style.fieldBx}>
                <p>Choose contract</p>
                <SelectOption
                  options={contractOptions}
                  inputName="contractOption"
                  inputHandler={inputHandler}
                  value={userInput.contractOption}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Collection name</p>
                <TextInput
                  type="text"
                  inputName="name"
                  holder="Name your collection"
                  value={userInput.name}
                  inputHandler={inputHandler}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Description</p>
                <TextArea
                  type="text"
                  inputName="description"
                  holder="Say something about your collection"
                  value={userInput.description}
                  inputHandler={inputHandler}
                />
              </div>
              <div className={style.fieldBx}>
                <p>Symbol</p>
                <TextInput
                  type="text"
                  inputName="symbol"
                  holder="Token symbol"
                  value={userInput.symbol}
                  inputHandler={inputHandler}
                />
              </div>
              <div className={style.fieldBx}>
                <p>URL</p>
                <TextInput
                  type="text"
                  inputName="url"
                  holder="Short url/public url"
                  value={userInput.url}
                  inputHandler={inputHandler}
                />
              </div>

              <div className={style.submitBx}>
                <button
                  disabled={isLoading || !validated}
                  className={dark === 'true' ? 'yellowBtn' : 'blueBtn'}
                >
                  {!isLoading ? (
                    'Create Collection'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CreateCollection
