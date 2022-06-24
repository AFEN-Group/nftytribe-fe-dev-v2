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
import erc721FactoryAbi from '../../smart_contracts/erc721Factory0.json'
import CollectionModal from './Modals/CollectionModal'

declare const window: any

const CreateCollection = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [userInput, setUserInput] = useState<any>({
    name: '',
    description: '',
    symbol: '',
    url: '',
  })
  const [imageFile, setImageFile] = useState<any>({
    file: '',
    location: '',
  })
  const inputHandler = async (event: any) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
    //console.log(event.target.value)
  }
  const [msg, setMsg] = useState<any>({
    sMsg: '',
    eMsg: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [created, setCreated] = useState(false)
  const [newColllection, setNewCollection] = useState('')

  const selectMedia = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile({
        ...imageFile,
        file: e.target.files[0],
      })
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
        setImageFile({
          ...imageFile,
          file: e.target.files[0],
          location: data.location,
        })
        console.log('image>>>', data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    // if (imageFile.file) {
    //   const img_data = new FormData()
    //   img_data.append('upload', imageFile.file)
    //   try {
    //     const resp = await fetch(
    //       'https://dev.api.nftytribe.io/api/collectibles/upload-image',
    //       {
    //         method: 'POST',
    //         body: img_data,
    //       },
    //     )
    //     const data = await resp.json()
    //     setImageFile({
    //       ...imageFile,
    //       location: data.location,
    //     })
    //     console.log('image>>>', data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    const wallet_address = localStorage.getItem('currentAccount')
    const chain = 'rinkeby'
    const contract_address = '0x4a6Bf413Bb8953dCDAdcFf03077712c48Bb05086'
    // console.log(contract_address, '<< contract ?')
    // console.log(wallet_address, '<< wallet ?')
    //'0xb1d612aB4FfF891E4A0042d4DF9C1F257eaeBb74'
    let erc721FactoryContract
    let web3: any
    if (window.ethereum && wallet_address) {
      web3 = new Web3(window.ethereum)

      erc721FactoryContract = new web3.eth.Contract(
        erc721FactoryAbi,
        contract_address,
      )
      try {
        const newCollection = await erc721FactoryContract.methods
          .createCollection(
            userInput.name,
            //userInput.description,
            userInput.symbol,
            userInput.url,
            userInput.url,
            0,
          )
          //.call()
          .send({ from: wallet_address })
        console.log(newCollection)
        const transactionHash = newCollection?.transactionHash
        //console.log(transactionHash, 'tr hash')
        const newCollectionAddress =
          newCollection?.events?.OwnershipTransferred[0].address
        //console.log(newCollectionAddress, ' address')
        //console.log(imageFile)

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
        setMsg({ ...msg, sMsg: newCollectionReq.data.msg, eMsg: '' })
        setNewCollection(newCollectionReq.data.data.title)
        setCreated(true)
        setShowModal(true)
      } catch (err) {
        console.log(err)
        setMsg({ ...msg, eMsg: err, sMsg: '' })
        //setMsg(err)
      }

      setIsLoading(false)
    } else {
      alert('Connect to meta mask wallet')
      setIsLoading(false)
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
              </div>
            </div>
            <form onSubmit={handleSubmit} className={style.right2}>
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
                  disabled={isLoading}
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
