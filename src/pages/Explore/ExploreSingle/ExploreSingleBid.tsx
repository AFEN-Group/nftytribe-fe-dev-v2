import { useEffect, useContext } from 'react'
import useState from 'react-usestateref'
import { useNavigate, useParams } from 'react-router-dom'
import { ThemeContext } from '../../../context/ThemeContext'
import { AuthContext } from '../../../context/AuthContext'
import ContractContext from '../../../context/ContractContext'
import { publicRequest } from '../../../utils/requestMethods'
//import { format } from 'timeago.js'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import style from './ExploreSingle.module.scss'
import Back from './assets/arrow.svg'
import Back2 from './assets/arrow2.svg'
import ItemImg from './assets/kl.png'
import Twitter from './assets/twitter.svg'
import Twitter2 from './assets/twitter2.svg'
import Header from '../../../components/Header/Header'
import Share from './assets/share.svg'
import Share2 from './assets/share2.svg'
import Dots2 from './assets/dots2.svg'
import Dots from './assets/dots.svg'
import User from './assets/user3.svg'
import User2 from './assets/user4.svg'
// import Eye from './assets/eye.svg'
// import Eye2 from './assets/eye2.svg'
import Container from '../../../components/Container/Container'
import UpdatePrompt from '../../../components/Modals/UpdatePrompt/UpdatePrompt'

import { TwitterShareButton } from 'react-share'
import toast from 'react-hot-toast'

import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc1155Abi from '../../../smart_contracts/erc1155Mintable.json'
import erc1155MarketplaceAbi from "../../../smart_contracts/erc1155Market.json"
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import erc1155MintableAbi from '../../../smart_contracts/erc1155Mintable.json'
import erc721MarketplaceAbi from '../../../smart_contracts/erc721Market.json'
//import erc1155MarketplaceAbi from '../../../smart_contracts/erc1155Market.json'
import Web3 from 'web3'
import contracts from '../../../web3-Service/contractAddress'
import globals from '../../../utils/globalVariables'

// import { shortenAddress } from '../../../utils/formatting'

import Loader from '../../../components/Loader/Loader'
//import BuyModal from './BuyModal'
import BidModal from './BidModal'
import { shortenAddress } from '../../../utils/formatting'
import PutOnSaleModal from './PutOnSaleModal'
declare const window: any

//const erc721Mintable_address = contracts.erc721MintableAddress
//const erc721Marketplace_address = contracts.erc721MarketplaceAddress
//const erc1155Mintable_adddress = contracts.erc1155MintableAdddress

// const erc721Mintable_address = '0x236DdF1f75c0bA5Eb29a8776Ec1820E5dC41a59a'
// const erc721Marketplace_address = '0xD5582083916dc813f974ce4CA3F27E6977e161cF'
// const erc1155Mintable_adddress = '0xCE8e4E1b586dA68F65A386968185ecBE8f222B89'
// const erc1155Factory_address = '0xad1235972331af412613b8a0478d29b07bf70179'
// const erc1155Marketplace_address = '0x4b70e3bbcd763fc5ded47244aef613e8e5689bdd'

const ExploreSingle = () => {
    const url = window.location.href
    const { collectionAddress, id } = useParams()
    const params = new URLSearchParams(window.location.search)
    const lazy_mint = params.get('lazy_mint')
    const seller = params.get('seller')

    const navigate = useNavigate()
    //const [priceType, setPriceType] = useState('auction')
    const [tab, setTab] = useState('art')
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [nft, setNft] = useState<any>()
    const [showPrompt, setShowPrompt] = useState(false)
    const [nftDetails, setNftDetails] = useState<any>()
    const [activities, setActivities] = useState<any>()
    const [auctionData, setAuctionData] = useState<any>()
    //const [showBuy, setShowBuy] = useState(false)
    const [showBid, setShowBid] = useState(false)
    const [showPutOnSale, setShowPutOnSale] = useState(false)
    // const [collectedNft, setCollectedNft] = useState(false)
    // const [endDate, setEndDate] = useState<any>()
    const [countX, setCountX] = useState<any>()
    const [walletAddress, setWalletAddress] = useState('')
    const [itemCollected, setItemCollected] = useState(false)
    const [authState] = useContext<any>(AuthContext)
    const [themeState] = useContext<any>(ThemeContext)
    const [isBidActive, setIsBidActive] = useState<any>()
    const [canCollect, setCanCollect] = useState<any>()
    const dark = themeState.dark
    const { handleAuctionBid, checkIfBIdTimePasses, collectNft } = useContext(
        ContractContext,
    )
    // network
    const [chain, setChain, chainRef] = useState<string>()
    const [chainId, setChainId, chainIdRef] = useState<string>()
    // erc721 addresses
    const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
    const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
    // erc 1155 addresses
    const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
    const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')

    const [timeLeft, setTimeLeft] = useState<any>({
        hours: '',
        minutes: '',
        seconds: '',
    })
    const [timeDifference, setTimeDifference] = useState<any>()
    const [showDrop, setShowDrop] = useState(false)
    const [showShare, setShowShare] = useState(false)

    const closePrompt = () => {
        setShowPrompt(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const wallet_address = localStorage.getItem('currentAccount')
        const currentChain = localStorage.getItem('chain')
        //console.log(wallet_address)

        if (currentChain === globals.mainnetEth.chainId) {
            setChain(globals.mainnetEth.chain)
            setChainId(globals.mainnetEth.chain)
            setErc721MintableAddress(contracts.erc721MintableAddress)
            setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
            setErc1155MintableAddress(contracts.erc1155MintableAdddress)
            setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
        }
        else if (currentChain === '0x38') {
            setChain('bsc')
            setChainId('bsc')
            setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
            setErc721MarketplaceAddress(contracts.BSC_erc721MarketplaceAddress)
            setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
            setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
        }
        if (wallet_address) {
            setWalletAddress(wallet_address)
        }
    }, [])


    useEffect(() => {
        const getNftDetails = async () => {
            try {
                const details = await publicRequest.get(
                    `/collectibles/${collectionAddress}/${id}?seller=${seller}`,
                )
                setNftDetails(details?.data?.data?._doc)
                console.log('deets', nftDetails)
                setActivities(details?.data?.data?.activities)
                // if (!details?.data?.data?._doc?.is_multiple) {
                //     const ifToBeCollected = await checkIfBIdTimePasses(
                //         id,
                //         collectionAddress,
                //     )
                //     setCollectedNft(ifToBeCollected)
                //     //console.log('available?>>', ifToBeCollected)
                // }
                setIsLoading(false)
                setIsLoaded(true)
            } catch (error) {
                setIsLoading(false)
            }
        }

        const getTokenDetails = async () => {
            if (lazy_mint) {
                try {
                    const details = await publicRequest.get(
                        `/collectibles/${collectionAddress}/${id}?lazy_mint=true`,
                    )
                    const nft = details
                    setNftDetails(nft.data.data._doc)
                    //console.log('show img>>', nft.data.data._doc)
                    //setNftPrice(nft.data._doc.price)
                    setIsLoading(false)
                    setIsLoaded(true)
                } catch (error) {
                    //console.log(error)
                    setIsLoading(false)
                }
            } else {
                await getNftDetails()
                let contract_address = erc721MarketplaceAddress
                let erc721Contract
                //let erc1155Contract
                let marketPlaceContract
                if (window.ethereum) {
                    let web3: any = new Web3(window.ethereum)
                    erc721Contract = new web3.eth.Contract(erc721Abi, collectionAddress)
                    marketPlaceContract = new web3.eth.Contract(
                        marketPlaceAbi,
                        contract_address,
                    )
                } else {
                    // alert('connect to meta mask wallet')
                    toast.error(` Please connect wallet`,
                        {
                            duration: 3000,
                        }
                    )
                }
                let uri = await erc721Contract.methods.tokenURI(id).call()
                // if (nftDetails?.is_multiple) {
                //     uri = await erc1155Contract.methods.uri(id).call();
                // }
                const moralis_uri = `https://deep-index.moralis.io/api/v2/nft/${collectionAddress}/${id}?chain=rinkeby&format=decimal&offset=0&limit=20`
                const { data } = await axios({
                    method: 'get',
                    url: moralis_uri,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': `PUX3SuXcL8sop16uK0fMwFsbqiBrZE0ty7buGH0SDV155W6tcoksEiUQaPG5FVMd`,
                    },
                })
                const nft = data
                //console.log('nft>>', nft)
                if (nft.metadata) {
                    nft.metadata = JSON.parse(nft.metadata)
                } else {
                    if (uri.includes('ipfs/')) {
                        // eslint-disable-next-line
                        uri = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
                    }
                    if (uri.includes('ipfs://')) {
                        // eslint-disable-next-line
                        uri = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
                    }
                    try {
                        const data = await axios({
                            method: 'get',
                            url: uri,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods':
                                    'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                'content-type': 'application/json',
                            },
                        })
                        nft.metadata = data
                        ////console.log(data)
                    } catch (err) { }
                }

            }
            //return difference;
        }

        //
        getNftDetails()
        getTokenDetails()


    }, [collectionAddress, id, lazy_mint])

    useEffect(() => {
        const auctionFetch = async () => {
            setIsLoaded(false)
            setIsLoading(true)

            let erc721Contract
            // let erc1155Contract
            let marketPlaceContract
            //let contract_address = erc721MarketplaceAddress
            let web3: any = new Web3(window.ethereum)
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);

                erc721Contract = new web3.eth.Contract(
                    erc721Abi,
                    collectionAddress,
                )

                marketPlaceContract = await new web3.eth.Contract(
                    marketPlaceAbi,
                    erc721MarketplaceAddress,
                )
            } else {
                // toast.error(`Please connect wallet!`,
                //   {
                //     duration: 3000,
                //   }
                // )
            }
            //erc721Contract = await new web3.eth.Contract(erc721Abi, collectionAddress)


            const owner = await erc721Contract.methods.ownerOf(id).call()
            console.log("ownerr", owner)
            const auctionInfo = await marketPlaceContract.methods.auctions(collectionAddress, id).call()
            //alert('ggg')
            console.log("infoo>>>>", auctionInfo)

            // nft.owner_of = owner
            //setNft(nft)

            setAuctionData(auctionInfo)
            setIsLoading(false)
            setIsLoaded(true)

            const dateFutureStr = auctionInfo.closingTime.toString()


            const dateFuture = dateFutureStr + '000'
            console.log(">>>>", dateFuture)
            const dateToday = Math.floor(Date.now())
            console.log("today>>>>", dateToday)
            const dateToday2 = Math.floor(Date.now() / 1000)

            // const dateStartStr = auctionInfo.startingTime.toString()
            // const dateStart = dateStartStr + '000'
            if (parseInt(dateFuture) < dateToday) {
                //console.log("end date", parseInt(dateFuture))
                //console.log("today's date", dateToday)
                setIsBidActive(false)
            } else {
                setIsBidActive(true)
            }

            let diffInMilliSeconds = Math.abs(parseInt(dateFuture) - dateToday) / 1000

            console.log(diffInMilliSeconds)

            //let diffInMilliSeconds = diffInMilliSeconds1 - 1000
            // calculate days
            const days = Math.floor(diffInMilliSeconds / 86400)
            diffInMilliSeconds -= days * 86400
            // calculate hours
            const hours = Math.floor(diffInMilliSeconds / 3600) % 24
            diffInMilliSeconds -= hours * 3600
            // calculate minutes
            const minutes = Math.floor(diffInMilliSeconds / 60) % 60
            diffInMilliSeconds -= minutes * 60
            // calculate minutes
            const seconds = Math.floor(diffInMilliSeconds)

            let difference = ''
            if (days > 0) {
                difference += days === 1 ? `${days}d, ` : `${days}d, `
            }
            if (hours > 0) {
                difference += hours === 0 || hours === 1 ? `${hours}h, ` : `${hours}h, `
            }

            difference +=
                minutes === 0 || hours === 1 ? `${minutes}m` : `${minutes}m `

            // difference +=
            //     seconds === 0 || hours === 1 ? `${seconds}s` : `${seconds}s`



            setTimeDifference(difference)
            // function updateCount() {
            //     setCountX(countX + 1)
            // }
            // setInterval(updateCount, 1000);

            //check if bid is still active
            //const dateToday = Math.floor(Date.now() / 1000)
            // //console.log("today>>>", dateToday)
            // //console.log("end date>>>", dateFuture)
            //console.log(parseInt(dateFuture), dateToday, parseInt(dateFuture) < dateToday)
            //console.log("end date", parseInt(dateFuture))
            //console.log("today's date", dateToday)


            // if (!checkIfBIdTimePasses) {
            //     setIsBidActive(false)
            // } else {
            //     setIsBidActive(true)
            // }

            //check if item can be collected
            console.log("bidder>>> ", auctionInfo.highestBidder.toLocaleUpperCase())
            console.log("my wallet>>> ", walletAddress.toLocaleUpperCase())
            if (auctionInfo.highestBidder.toLocaleUpperCase() === walletAddress.toLocaleUpperCase()) {
                setCanCollect(true)
            } else {
                setCanCollect(false)
            }

            //}
            //console.log("show diff>>", timeDifference)
            //console.log('difference >>', difference)
            setIsLoaded(true)
            setIsLoading(false)
        }
        auctionFetch()

    }, [collectionAddress, id, erc721MarketplaceAddress, countX])




    const getImage = (uri: any) => {
        let url
        if (uri.includes('ipfs/')) {
            // eslint-disable-next-line
            url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
        } else if (uri.includes('ipfs://')) {
            // eslint-disable-next-line
            url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
        }
        return url
    }

    const handleSubmit = async () => {
        const verified = authState.user.email_verified
        //if (verified === 1) {
        const currentChainId = localStorage.getItem('chain')
        if (currentChainId === '0x1') {
            setChain('eth')
        }
        if (currentChainId === '0x38') {
            setChain('bsc')
        }
        const itemChain = nftDetails?.chain
        //console.log('me', chainRef.current)
        //console.log('them', itemChain)
        if (chainRef.current === itemChain)
            if (nftDetails?.on_sale) {
                const wallet_address = localStorage.getItem('currentAccount')
                //console.log(nftDetails?.marketplace_type)
                if (wallet_address) {
                    setShowBid(true)
                } else {
                    //setShowConnect(true)
                    //alert('Please connect wallet')
                    toast.error(` Please connect wallet`,
                        {
                            duration: 3000,
                        }
                    )

                }
            } else {
                //console.log('not available')
            }
        else {
            //alert("Wrong chain!, Please switch to the chain of this NFT")
            toast.error(` Wrong chain!, Please switch to the chain of this NFT`,
                {
                    duration: 3000,
                }
            )
        }
        // } else {
        //     setShowPrompt(true)
        // }
    }
    const handleSale = async (e: any) => {
        e.preventDefault()
        if (!nftDetails?.on_sale) {
            //put on sale
            setShowPutOnSale(true)
        } else {
            //put off sale
            //put off sale
            if (nftDetails?.is_multiple) {
                try {
                    setIsLoading(true)
                    let erc1155Contract
                    let marketplace_contract
                    let web3: any
                    if (window.ethereum) {
                        web3 = new Web3(window.ethereum)

                        erc1155Contract = new web3.eth.Contract(
                            erc1155MintableAbi,
                            erc1155MintableAddress,
                        )
                        marketplace_contract = new web3.eth.Contract(
                            erc1155MarketplaceAbi,
                            erc1155MarketplaceAddress,
                        )
                    } else {
                        //alert('connect to meta mask wallet')
                        toast.error(` Please connect wallet`,
                            {
                                duration: 3000,
                            }
                        )
                        //setShowConnect(true)
                    }

                    const data = nftDetails
                    // data.wallet_address = wallet_address
                    // data.chain = chain
                    // data.collection_address =
                    //   userInput.collection_address || erc1155Mintable_adddress
                    // data.upload = imageFile
                    // data.is_multiple = false
                    // data.nft_type = userInput.category
                    // data.cardImage = cardImage
                    //data.price = parseFloat(userInput.price) * parseInt(userInput.copies)
                    //returnvalues = mint.events.TransferSingle.returnValues
                    ////console.log(returnvalues, 'value')

                    if (data.market_type !== '0') {
                        data.on_sale = true
                    }

                    let updatableData
                    if (data?.on_sale) {

                        if (data.market_type === '2') {
                            data.starting_time =
                                new Date(data.starting_time).getTime() / 1000
                            data.ending_time = new Date(data.ending_time).getTime() / 1000
                        }
                        ////console.log(web3.utils.toWei(data.price.toString(), 'ether'), 'price', returnvalues.id)
                        const putOffSale = await marketplace_contract.methods
                            .putOffSale(
                                //userInput.collection_address || erc1155Mintable_adddress,
                                data?.collection_address,
                                parseInt(data?.token_id),

                            )
                            .send({ from: walletAddress })
                        //console.log(putOffSale)


                        updatableData = {
                            token_id: data.token_id,
                            wallet_address: walletAddress,
                            collection_address:
                                data.collection_address,
                            file: data.file,
                            transaction_hash: data.transactionHash,
                            type: 'putOffSale',
                            chain_id: data.chain,

                            on_sale: false,
                            marketplace_type: data.marketplace_type,
                            order_detail: {
                                starting_price: web3.utils.toWei(
                                    data.price.toString(),
                                    'ether',
                                ),
                                start_time: data.starting_time,
                                expiration_time: data.ending_time,
                            },
                            price: web3.utils.toWei(data.price.toString(), 'ether'),
                        }
                    } else {
                        updatableData = {
                            token_id: data.token_id,
                            wallet_address: walletAddress,
                            collection_address:
                                data.collection_address,
                            file: data.file,
                            transaction_hash: data.transactionHash,
                            type: 'putOffSale',
                            chain_id: data.chain,
                            on_sale: false
                        }
                    }

                    const updateCollectible = await fetch(
                        `${globals.baseURL}/collectibles/update-collectible`,
                        {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(updatableData),
                        },
                    )

                    const res = await updateCollectible.json()

                    //console.log(res.data)
                    setIsLoading(false)

                    //window.location.reload()
                    setIsLoading(false)

                } catch (err) {
                    //console.log(err)

                    setIsLoading(false)
                }
            }
            if (!nftDetails.is_multiple) {
                try {
                    setIsLoading(true)
                    let erc721Contract
                    let marketplace_contract
                    let web3: any
                    if (window.ethereum) {
                        web3 = new Web3(window.ethereum)

                        erc721Contract = new web3.eth.Contract(
                            erc721Abi,
                            erc721MintableAddress,
                        )
                        marketplace_contract = new web3.eth.Contract(
                            erc721MarketplaceAbi,
                            erc1155MarketplaceAddress,
                        )
                    } else {
                        //alert('connect to meta mask wallet')
                        toast.error(` Please connect wallet`,
                            {
                                duration: 3000,
                            }
                        )
                        //setShowConnect(true)
                    }

                    const data = nftDetails
                    // data.wallet_address = wallet_address
                    // data.chain = chain
                    // data.collection_address =
                    //   userInput.collection_address || erc721Mintable_address
                    // data.upload = imageFile
                    // data.is_multiple = false
                    // data.nft_type = userInput.category
                    // data.cardImage = cardImage

                    if (data.market_type !== '0') {
                        data.on_sale = true
                    }

                    let updatableData
                    if (data.on_sale) {
                        ////console.log(parseInt(returnvalues.token_id), 'hello')

                        if (data.market_type === '2') {
                            data.starting_time =
                                new Date(data.starting_time).getTime() / 1000
                            data.ending_time = new Date(data.ending_time).getTime() / 1000
                        }
                        //console.log(data, 'this is data')
                        const putOffSale = await marketplace_contract.methods
                            .putSaleOff(
                                //userInput.collection_address || erc1155Mintable_adddress,                               
                                parseInt(data?.token_id),
                                data?.collection_address,

                            )
                            .send({ from: walletAddress })

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
                        //   //console.log(err)
                        //   setMsg({ ...msg, eMsg: err, sMsg: '' })
                        //   setIsLoading(false)
                        //   return
                        // }

                        ////console.log(putOnSale, putOnSale.events, 'sale')

                        // const expiration_time =
                        //   new Date(data.ending_time).getTime() + 2 * 24 * 3600 * 1000 // * 1000

                        updatableData = {
                            token_id: data.token_id,
                            wallet_address: walletAddress,
                            collection_address:
                                data.collection_address,
                            file: data.file,
                            transaction_hash: data.transactionHash,
                            type: 'putOffSale',
                            chain_id: data.chain,
                            //order_type: data.market_type,

                            on_sale: false,
                            price: 0,
                        }
                    } else {
                        updatableData = {
                            token_id: data.token_id,
                            wallet_address: walletAddress,
                            collection_address:
                                data.collection_address,
                            file: data.file,
                            transaction_hash: data.transactionHash,
                            type: 'putOffSale',
                            chain_id: data.chain,
                        }
                    }

                    const updateCollectible = await fetch(
                        `${globals.baseURL}/collectibles/update-collectible`,
                        {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(updatableData),
                        },
                    )

                    const res = await updateCollectible.json()

                    //console.log(res.data)
                    setIsLoading(false)
                    window.location.reload()
                    setIsLoading(false)
                } catch (err) {
                    //console.log(err)

                    setIsLoading(false)
                }
            }

        }


    }

    const handleCollect = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const wallet_address = localStorage.getItem('currentAccount')
        const result = await collectNft(
            wallet_address,
            nftDetails?.token_id,
            nftDetails?.collection_address,
        )
        setIsLoading(false)
        if (result.data) {
            //console.log(result)
            setIsLoading(false)
            setItemCollected(true)
            setShowBid(true)

            return
        }
    }

    const handleClose = () => {
        //setShowConnect(false)
        setShowBid(false)
        setShowPutOnSale(false)
    }

    console.log("active>>", isBidActive)
    return (
        <>
            <Header />
            {showPutOnSale && (
                <PutOnSaleModal
                    handleClose={handleClose}
                    nft={nft}
                    nftDetails={nftDetails}
                />
            )}
            {showBid && (
                <BidModal
                    handleClose={handleClose}
                    nft={nft}
                    nftDetails={nftDetails}
                    itemCollected={itemCollected}
                />
            )}
            {showPrompt && <UpdatePrompt closePrompt={closePrompt} />}
            <Container>
                <div
                    className={`${style.container} animate__animated animate__fadeInLeft`}
                >
                    <div className={style.content}>
                        <div className={style.top}>
                            <div className={style.backBx} onClick={() => navigate(-1)}>
                                <img src={dark === 'true' ? Back2 : Back} alt="back" />
                                <p>Back</p>
                            </div>
                            <div className={style.titleBx}>
                                <h2>{nft?.metadata?.name || nftDetails?.title}</h2>
                                <p>from the {nft?.name || 'Afen'} collection.</p>
                            </div>
                        </div>
                        <div className={style.body}>
                            <div className={style.left}>
                                {lazy_mint ? (
                                    <div className={style.itemImg}>
                                        {!isLoading ? (
                                            nft?.cardImage ? (
                                                <img
                                                    src={
                                                        nft?.metadata?.image.includes('ipfs/') ||
                                                            nft?.metadata?.image.includes('ipfs://')
                                                            ? getImage(nft?.metadata?.image)
                                                            : nft?.metadata?.image
                                                    }
                                                    alt="itemImg"
                                                />
                                            ) : nftDetails?.cardImage ? (
                                                <img src={nftDetails.cardImage} alt="ItemImg" />
                                            ) : (
                                                <img src={ItemImg} alt="itemImg" />
                                            )
                                        ) : (
                                            <div className={style.loaderBx}>
                                                <Loader />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={style.itemImg}>
                                        {!isLoading ? (
                                            nft?.cardImage ? (
                                                <img
                                                    src={
                                                        nft?.metadata?.image.includes('ipfs/') ||
                                                            nft?.metadata?.image.includes('ipfs://')
                                                            ? getImage(nft?.metadata?.image)
                                                            : nft?.metadata?.image
                                                    }
                                                    alt="itemImg"
                                                />
                                            ) : nftDetails?.cardImage ? (
                                                <img src={nftDetails.cardImage} alt="ItemImg" />
                                            ) : (
                                                <img src={ItemImg} alt="itemImg" />
                                            )
                                        ) : (
                                            // <div className={style.loaderBx}>
                                            //   <CircularProgress color="inherit" size="65px" />
                                            // </div>
                                            <div className={style.loaderBx}>
                                                <Loader />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={style.right}>
                                <div className={style.rightTop}>
                                    <div className={style.rightNav}>
                                        <div
                                            className={
                                                tab === 'art' ? style.navItemActive : style.navItem
                                            }
                                            onClick={() => setTab('art')}
                                        >
                                            <p>The Art</p>
                                        </div>
                                        <div
                                            className={
                                                tab === 'activity' ? style.navItemActive : style.navItem
                                            }
                                            onClick={() => setTab('activity')}
                                        >
                                            <p>The Activity</p>
                                        </div>
                                        <div
                                            className={
                                                tab === 'offers' ? style.navItemActive : style.navItem
                                            }
                                            onClick={() => setTab('offers')}
                                        >
                                            <p>Offers</p>
                                        </div>
                                    </div>
                                    <div className={style.rightIcons}>
                                        <img src={dark === 'true' ? Share2 : Share} alt="share" />
                                        {/* <img src={dark === 'true' ? Dots2 : Dots} alt="dots" /> */}
                                    </div>
                                    {showDrop && (
                                        <>

                                            <div className={`${style.drop} ${dark === 'true' ? 'darkTheme' : 'lightTheme'} animate__animated animate__fadeInUp animate__faster`}
                                            //onClick={() => setShowDrop(!showDrop)}
                                            >
                                                {/* {!showShare ? ( */}
                                                {/* <div className={style.dropContent}>
                                                        <p onClick={() => setShowShare(!showShare)}>
                                                            Share
                                                        </p>
                                                        <p className='disable_link'>Report</p> */}
                                                {/* </div>) : ( */}
                                                <div className={style.dropContent2}>
                                                    <h3>Share NFT</h3>
                                                    <TwitterShareButton
                                                        title={"Check out this NFT on Nftytribe"}
                                                        hashtags={['nftytribe']}
                                                        url={url}

                                                    >
                                                        <div className={style.dropItem}>
                                                            <p>Twitter</p>
                                                            <img src={`${dark === 'true' ? Twitter2 : Twitter}`} alt="twitter" />
                                                        </div>
                                                    </TwitterShareButton>
                                                </div>
                                                {/* )} */}

                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={style.rightTitles}>
                                    <div className={style.userBx}>
                                        <img src={dark === 'true' ? User : User2} alt="user" />
                                        {nftDetails && (
                                            <p>{shortenAddress(nftDetails?.wallet_address)}</p>
                                        )}
                                    </div>
                                    <div className={style.bronze}>
                                        <p>{nftDetails?.is_multiple ? 'Multiple Items' : 'Single Item'}{' '}</p>
                                    </div>
                                    {/* <div className={style.eyes}>
                    <img src={dark === 'true' ? Eye2 : Eye} alt="seen" />
                    <p>1215</p>
                  </div> */}
                                </div>
                                {tab === 'art' && (
                                    <div
                                        className={`${style.info} animate__animated animate__fadeIn`}
                                    >
                                        <div className={style.description}>
                                            <h2>Description</h2>

                                            <p>
                                                {nft?.metadata?.description ||
                                                    nftDetails?.description ||
                                                    'No description.'}{' '}
                                            </p>
                                        </div>
                                        <div className={style.prices}>
                                            {!isLoading && (
                                                <div

                                                    className={`${style.bidPrices} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                                                        } `}
                                                >
                                                    {(isBidActive && !isLoading) && (
                                                        <div className={style.bids}>
                                                            <div className={style.bidBx}>
                                                                <div className={style.bidBlue}>
                                                                    Current bid
                                                                </div>

                                                                {auctionData?.currentBid && (
                                                                    <p>
                                                                        {Web3.utils.fromWei(
                                                                            auctionData?.currentBid?.toString(),
                                                                            'ether'
                                                                        ) || ''}{' '}
                                                                        {nftDetails?.chain === "eth" ? 'ETH' : nftDetails?.chain === "bsc" ? 'BNB' : ''}

                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className={style.bidBx2}>
                                                                <div className={style.bidBlue}>
                                                                    Starting price
                                                                </div>
                                                                {auctionData?.startingPrice && (
                                                                    <p>
                                                                        {Web3.utils.fromWei(
                                                                            auctionData?.startingPrice?.toString(),
                                                                            'ether'
                                                                        ) || ''}{' '}
                                                                        {nftDetails?.chain === "eth" ? 'ETH' : nftDetails?.chain === "bsc" ? 'BNB' : ''}

                                                                    </p>)}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {
                                                        //auctionData?.startingPrice !== '0' ||
                                                        isBidActive ? (
                                                            <div className={style.time}>
                                                                {/* <p>2d 13h 23m 19s</p> */}
                                                                <p>
                                                                    {timeDifference}
                                                                </p>

                                                            </div>
                                                        ) : (
                                                            <div className={style.time}>
                                                                <p>Bid ended</p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )}


                                        </div>
                                        {nftDetails?.is_multiple && (
                                            <p>Number of copies : {nftDetails.number_of_copies}</p>
                                        )}
                                        <div className={style.Btns}>


                                            <>
                                                {nftDetails?.wallet_address != walletAddress && nftDetails?.on_sale ? (
                                                    <button
                                                        disabled={!isLoaded || !isBidActive}
                                                        className={`${style.gradBtn} 
                                                        
                                                        ${dark === 'true' ? 'yellowBtn' : 'blueBtn'} `}
                                                        onClick={handleSubmit}
                                                    >
                                                        Bid
                                                    </button>) : (
                                                    <>
                                                        {/* {console.log(isBidActive)} */}
                                                        <button
                                                            disabled={!isLoaded || !isBidActive}
                                                            className={`${style.gradBtn} 
                                                            ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                                                                } `}
                                                            onClick={handleSale}
                                                        >
                                                            {!nftDetails?.on_sale ?
                                                                'Put On Sale'


                                                                : 'Remove from Sale'}
                                                        </button>
                                                    </>
                                                )}
                                                {canCollect && (
                                                    nftDetails?.wallet_address.toLowerCase() !=
                                                    walletAddress?.toLowerCase() && (
                                                        <button
                                                            style={{ marginLeft: '50px' }}
                                                            className={style.regBtn}
                                                            disabled={!isLoaded}
                                                            onClick={handleCollect}
                                                        >
                                                            {!isLoading ? (
                                                                ' Collect Nft'
                                                            ) : (
                                                                <CircularProgress
                                                                    color="inherit"
                                                                    size="20px"
                                                                />
                                                            )}
                                                        </button>
                                                    )
                                                )}
                                            </>

                                        </div>

                                    </div>
                                )}
                                {tab === 'activity' && (
                                    <div
                                        className={`${style.activity} animate__animated animate__fadeIn`}
                                    >
                                        <div className={style.activitySingle}>
                                            <div className={style.aAddress}>
                                                <p>Address</p>
                                            </div>
                                            <div className={style.aType}>
                                                <p>Activity type</p>
                                            </div>
                                            <div className={style.aDate}>
                                                <p>Date</p>
                                            </div>
                                        </div>
                                        {activities?.map((activity: any, i: any) => (
                                            <div className={style.activitySingle} key={activity._id}>
                                                <div className={style.aAddress}>
                                                    {activity.to ? (
                                                        <p>{shortenAddress(activity?.to)}</p>
                                                    ) : (
                                                        <p>{shortenAddress(activity?.from)}</p>
                                                    )}
                                                </div>
                                                <div className={style.aType}>
                                                    <p>{activity?.type}</p>
                                                </div>
                                                <div className={style.aDate}>
                                                    <p>{activity?.timeStamp.substr(0, 10)}</p>
                                                    {/* <p>{activity.timestamp}</p> */}
                                                </div>
                                            </div>
                                        ))}
                                        {/* <div className={style.activitySingle}></div> */}

                                        {/* <div>
                      {activities?.map((activity: any, i: any) => {
                        return (
                          activity?._id && (
                            <div
                              className={style.activitySingle}
                              key={activity._id}
                            >
                              <div className={style.aAddress}>
                                <p>{activity.from}</p>
                              </div>
                              <div className={style.aType}>
                                <p>{activity.type}jjjjj</p>
                              </div>
                              <div className={style.aDate}>
                                <p>{activity.timestamp.substr(0, 10)}</p>
                              </div>
                              <div className="">
                                <p>hhhhh</p>
                              </div>
                            </div>
                          )
                        )
                      })}
                    </div> */}
                                    </div>
                                )}
                                {tab === 'offers' && (
                                    <div
                                        className={`${style.offers} animate__animated animate__fadeIn`}
                                    >
                                        <div className={style.offersContent}>
                                            <div className={style.offer}>
                                                <div className={style.offerUser}>
                                                    <p>No offers</p>
                                                </div>
                                                {/* <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div> */}
                                            </div>
                                            {/* <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ExploreSingle
