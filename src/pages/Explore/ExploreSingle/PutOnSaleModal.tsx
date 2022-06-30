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
import contracts from '../../../web3-Service/contractAddress'
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import erc721MarketplaceAbi from '../../../smart_contracts/erc721Market.json'
import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc1155MintableAbi from '../../../smart_contracts/erc1155Mintable.json'
import erc1155MarketplaceAbi from '../../../smart_contracts/erc1155Market.json'
import TextInput from '../../../components/Inputs/TextInput'
import SelectOption from '../../../components/Inputs/SelectOption3'
import SelectDate from '../../../components/Inputs/SelectDate'

declare const window: any

const PutOnSaleModal = (props: any) => {
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
        market_type: '1',
        starting_time: 0,
        ending_time: 1
    })
    const [validated, setValidated] = useState(false)
    const { handleAuctionBid, checkIfBIdTimePasses, collectNft } = useContext(
        ContractContext,
    )
    const [completed, setCompleted] = useState(false)
    //const tokens = [{ value: '1', text: 'eth' }]
    const marketType = [
        { value: '1', text: 'Fixed price' },
        { value: '2', text: 'Auction' },
    ]

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
        if (userInputRef.current.amount !== '') {
            setValidated(true)
        }
        if (name === 'starting_time' || name === 'ending_time') {
            setUserInput({
                ...userInput,
                [event.target.name]: value,
            })
        }
        //setValidated(false)

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const wallet_address = localStorage.getItem('currentAccount')
        console.log(props?.nftDetails?.marketplace_type)

        // const erc721Address = '0x236DdF1f75c0bA5Eb29a8776Ec1820E5dC41a59a'
        // const contract_address = '0xD5582083916dc813f974ce4CA3F27E6977e161cF'
        const erc721Mintable_address = contracts.erc721MintableAddress
        const erc721Marketplace_address = contracts.erc721MarketplaceAddress
        const erc1155Mintable_adddress = contracts.erc1155MintableAdddress
        const erc1155Factory_address = contracts.erc1155FactoryAddress
        const erc1155Marketplace_address = contracts.erc1155MarketplaceAddress

        if (window.ethereum && wallet_address) {
            if (props?.nftDetails?.is_multiple) {
                try {
                    setIsLoading(true)
                    let erc1155Contract
                    let marketplace_contract
                    let web3: any
                    if (window.ethereum) {
                        web3 = new Web3(window.ethereum)

                        erc1155Contract = new web3.eth.Contract(
                            erc1155MintableAbi,
                            erc1155Mintable_adddress,
                        )
                        marketplace_contract = new web3.eth.Contract(
                            erc1155MarketplaceAbi,
                            erc1155Marketplace_address
                        )
                    } else {
                        alert('connect to meta mask wallet')
                        //setShowConnect(true)
                    }

                    const data = props.nftDetails

                    if (userInput.market_type !== '0') {
                        data.on_sale = true
                    }

                    let updatableData
                    // if (data.on_sale) {

                    if (userInput.market_type === '2') {
                        data.starting_time =
                            new Date(userInput.starting_time).getTime() / 1000
                        data.ending_time = new Date(userInput.ending_time).getTime() / 1000
                    }
                    //console.log(web3.utils.toWei(userInput.amount.toString(), 'ether'), 'price', returnvalues.id)

                    console.log(userInput.amount) //userInput.amount value not valid?
                    const putOnSale = await marketplace_contract.methods
                        .putOnSale(
                            //userInput.collection_address || erc1155Mintable_adddress,
                            data?.collection_address,
                            parseInt(data?.token_id),
                            parseInt(data?.copies),
                            web3.utils.toWei(userInput.amount.toString(), 'ether'),
                            '0x0000000000000000000000000000000000000000',
                        )
                        .send({ from: userWallet })

                    console.log(putOnSale)


                    updatableData = {
                        token_id: data.token_id,
                        userWallet,
                        collection_address:
                            data.collection_address,
                        file: data.file,
                        transaction_hash: data.transactionHash,
                        type: 'putOnSale',
                        chain_id: 'eth',

                        on_sale: true,
                        marketplace_type: data.marketplace_type,
                        order_detail: {
                            starting_price: web3.utils.toWei(
                                userInput.amount.toString(),
                                'ether',
                            ),
                            start_time: data.starting_time,
                            expiration_time: data.ending_time,
                        },
                        price: web3.utils.toWei(userInput.amount.toString(), 'ether'),
                    }


                    const updateCollectible = await fetch(
                        'https://api.nftytribe.io/api/collectibles/update-collectible',
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

                    window.location.reload()
                    setIsLoading(false)

                } catch (err) {
                    console.log(err)

                    setIsLoading(false)
                }
            }
            if (!props?.nftDetails?.is_multiple) {
                try {
                    setIsLoading(true)
                    let erc721_mintable_Contract
                    let marketplace_contract
                    let web3: any
                    if (window.ethereum) {
                        web3 = new Web3(window.ethereum)

                        erc721_mintable_Contract = new web3.eth.Contract(
                            erc721Abi,
                            props?.nftDetails?.collection_address,
                        )
                        marketplace_contract = new web3.eth.Contract(
                            erc721MarketplaceAbi,
                            erc721Marketplace_address
                        )
                    } else {
                        alert('connect to meta mask wallet')
                        //setShowConnect(true)
                    }

                    const data = props.nftDetails

                    const isApproved = await erc721_mintable_Contract.methods.getApproved(props?.nftDetails?.token_id).call()
                    if (isApproved?.toLowerCase() != erc721Marketplace_address.toLowerCase()) {
                        try {
                            const getApproved = await erc721_mintable_Contract.methods.approve(erc721Marketplace_address, props?.nftDetails?.token_id).send({ from: userWallet })
                        } catch (error) {
                            console.log(error)
                        }

                    }

                    if (userInput.market_type !== '0') {
                        data.on_sale = true
                    }

                    let updatableData
                    // if (data.on_sale) {
                    //console.log(parseInt(returnvalues.token_id), 'hello')
                    console.log(userInput)

                    if (userInput.market_type === '2') {
                        data.starting_time =
                            new Date(userInput.starting_time).getTime() / 1000
                        data.ending_time = new Date(userInput.ending_time).getTime() / 1000
                    }
                    else {
                        data.starting_time = 0
                        data.ending_time = 1
                    }
                    console.log(parseInt(data?.token_id),
                        web3.utils.toWei(userInput.amount.toString(), 'ether'),
                        parseInt(userInput.market_type),
                        parseInt(data.starting_time),
                        parseInt(data.ending_time),
                        data?.collection_address,
                        '0x0000000000000000000000000000000000000000')
                    const putOnSale = await marketplace_contract.methods
                        .putOnSale(
                            parseInt(data?.token_id),
                            web3.utils.toWei(userInput.amount.toString(), 'ether'),
                            parseInt(userInput.market_type),
                            parseInt(data.starting_time),
                            parseInt(data.ending_time),
                            data?.collection_address,
                            '0x0000000000000000000000000000000000000000'
                        )
                        .send({ from: userWallet })


                    if (putOnSale) {
                        updatableData = {
                            token_id: data.token_id,
                            wallet_address: userWallet,
                            collection_address:
                                data.collection_address,
                            file: data.file,
                            transaction_hash: data.transactionHash,
                            type: 'putOnSale',
                            chain_id: 'eth',
                            //order_type: userInput.market_type,

                            on_sale: true,
                            marketplace_type: userInput.market_type,
                            order_detail: {
                                starting_price: web3.utils.toWei(
                                    userInput.amount.toString(),
                                    'ether',
                                ),
                                start_time: userInput.starting_time === 0 ? new Date().toISOString() : new Date(data.starting_time).toISOString(),
                                expiration_time: userInput.ending_time === 1 ? new Date().toISOString() : new Date(data.ending_time).toISOString(),
                            },
                            price: web3.utils.toWei(userInput.amount.toString(), 'ether'),
                        }


                        const updateCollectible = await fetch(
                            'https://api.nftytribe.io/api/collectibles/update-collectible',
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
                        window.location.reload()
                        setIsLoading(false)
                    }
                    else {
                        setIsLoading(false)
                    }
                } catch (err) {
                    console.log(err)

                    setIsLoading(false)
                }
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
                        <form
                            onSubmit={handleSubmit}
                            className={`${style.modalD} animate__animated animate__zoomInUp `}
                        >
                            <div className={style.modalTop}>
                                <h1>Put item on sale.</h1>
                                <p className={style.mText}>
                                    You are about to put
                                    <span className="blueTxt">
                                        <strong> {' ' + props.nftDetails?.title} </strong>
                                    </span>{' '}
                                    on sale
                                    {/* <span className="blueTxt">
                                        <strong>
                                            {' ' +
                                                shortenAddress(
                                                    props.nft?.owner_of ||
                                                    props.nftDetails?.wallet_address,
                                                ) || ''}{' '}
                                        </strong>
                                    </span> */}
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
                                    <p>Enter amount (ETH)</p><br />
                                    <TextInput
                                        type="text"
                                        inputName="amount"
                                        holder="Enter amount"
                                        inputHandler={inputHandler}
                                        value={userInput.amount}
                                        required
                                    />
                                </div>
                                <div className={style.fieldBx}>
                                    <p>Choose market type</p><br />
                                    <SelectOption
                                        options={marketType}
                                        inputName="market_type"
                                        inputHandler={inputHandler}
                                        value={userInput.market_type}
                                    />
                                </div>
                                {userInput.market_type === '2' && (
                                    <>
                                        <div className={style.fieldBx}>
                                            <p>Start Date</p><br />
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
                                            <p>End Date</p>
                                            <SelectDate
                                                type="text"
                                                inputName="ending_time"
                                                //onFocus={(e: any) => e.target.type = 'datetime-local'}
                                                holder="Choose End Date"
                                                //value={userInput.price}
                                                inputHandler={inputHandler}
                                            />
                                        </div>
                                    </>)}
                                {/* 
                                <div className={style.pbItem}>
                                    <p>Amount </p>
                                    <p>
                                        {Web3.utils.fromWei(props.nftDetails?.price.toString(), 'ether') || ''}{' '}
                                        ETH
                                    </p>
                                </div> */}
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
                                        'Put on sale'
                                    ) : (
                                        <CircularProgress color="inherit" size="20px" />
                                    )}
                                </button>
                                <button className={style.btn2} onClick={props.handleClose}>
                                    {' '}
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                    {completed && (
                        <div
                            className={`${style.modal} animate__animated animate__zoomInUp `}
                        >
                            <div className={style.modalTop}>
                                <h1>Congratulations</h1>
                                <p className={style.mText}>
                                    Your item
                                    <strong> {' ' + props.nftDetails?.title} </strong>
                                    is on sale.
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

export default PutOnSaleModal 
