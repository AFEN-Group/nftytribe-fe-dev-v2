import { useContext, useEffect } from 'react'
import useState from 'react-usestateref'
import tokenAbi from '../../../smart_contracts/afenToken.json'
// import ContractContext from '../../../context/ContractContext'
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
import SelectOption1 from '../../../components/Inputs/SelectOption'
import SelectDate from '../../../components/Inputs/SelectDate'
import globals from '../../../utils/globalVariables'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import moment from 'moment'
import { TokenContext } from 'src/App'
import { UserContext } from "../../../context/UserContext";
import BigNumber from 'bignumber.js'
import Protected from 'src/hooks/AxiosConfig/axiosInstance'


declare const window: any

const PutOnSaleModal = (props: any) => {
    //const [err, setErr] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    // eslint-disable-next-line
    const [userWallet, setUserWallet] = useState<any>(
        sessionStorage.getItem('currentAccount'),
    )
   
    const { userState, setUserState } = useContext(UserContext);

    const [completed, setCompleted] = useState(false)
    
    const marketType = [
        { value: '1', text: 'Fixed price' },
        { value: '2', text: 'Auction' },
    ]

  const [days,setDays]=useState(30)
    const web3= new Web3(window.ethereum)

    const [onsaleParams,setParams]=useState({
        // tokenId:props.id,
        marketType:'1',
        amount:'',
        from:moment().unix(),
        category:'',
        // to: moment().add(parseInt(days) ?? 30, 'days').unix(),
        erc20:''
    })
   
    const abi:any= tokenAbi.abi
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const wallet_address = sessionStorage.getItem('currentAccount')
        if (window.ethereum && wallet_address) {
              //  @ts-ignore
            const TokenContract = new web3.eth.Contract(erc721Abi, props.collectionAddress)
            // @ts-ignore

            const marketPlaceContract = new web3.eth.Contract(marketPlaceAbi,
                contracts.BSC_erc721MarketplaceAddress,
            )
            const token = new web3.eth.Contract(abi, onsaleParams.erc20)
          
            
            await TokenContract.methods.approve(contracts.BSC_erc721MarketplaceAddress, props.id).send({ from: wallet_address })
           
            
                try {
                   console.log(props.id,onsaleParams.amount);
                  const  decimal=parseInt(await token.methods.decimals().call({from:wallet_address}))
                    const amount = new BigNumber(onsaleParams.amount).times(10 ** decimal).toFixed();

                    console.log(amount, await marketPlaceContract.methods);
                    // @ts-ignore
                    await marketPlaceContract.methods.putOnSale(props.id, amount, onsaleParams.marketType, onsaleParams.from, moment().add(parseInt(days) ?? 30, 'days').unix(),props.collectionAddress,onsaleParams.erc20).send({from:wallet_address})
                    setCompleted(!completed)
                } catch (error) {
                      
                }
          
          
        } else {
           
            toast.error(` Please connect wallet`,
                {
                    duration: 3000,
                }
            )
        }
    }
    console.log(onsaleParams)
    const tokens:any=useContext(TokenContext)
    const getToken = tokens?.filter((token: any) => {
        return token?.tokenAddress === onsaleParams?.erc20

    }

    )
    const [categories, setCategories] = useState<any>([])
    const getCategories = async () => {
        const res = await Protected(sessionStorage.getItem('token'))['get']('api/category')
        setCategories(res?.data)

    }
    useEffect(()=>{getCategories()},[])
    // console.log(props,onsaleParams);
    
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
                            className={`${style.modalD} `}
                        >
                            <div className={style.modalTop}>
                                <h1>Put item on sale.</h1>
                                <p className={style.mText}>
                                    You are about to put
                                    <span className="blueTxt">
                                        <strong> {props.nft?.metadata?.name} </strong>
                                    </span>{' '}
                                    on sale
                                   
                                </p>
                                <img src={Close} alt="close" onClick={props.handleClose} />
                            </div>
                            <div className={style.modalBody2}>
                                <div className={style.addrBox}>
                                    <img src={user} alt="user" />
                                    {userState?.user?.username || ''}

                                    <div className={style.connectedBox}>
                                        <p>Connected</p>
                                    </div>
                                </div>
                            </div>

                            <div className={style.pricesBx}>
                               <div className={style.fieldBx}>
                                    <p>Select Token</p><br />
                                    {/* <TextInput
                                        type="text"
                                        inputName="erc20"
                                        holder="Enter amount"
                                        inputHandler={(e: any) => {
                                            setParams({ ...onsaleParams, [e.target.name]: e.target.value })

                                        }}
                                        value={onsaleParams.erc20}
                                        required
                                    /> */}
                                    <SelectOption1
                                        options={tokens?.map((category: any) => {
                                            return { value: category.tokenAddress, text: category.tokenName }
                                        })}
                                        inputName={'erc20'}
                                        inputHandler={(e: any) => {
                                            setParams({ ...onsaleParams, [e.target.name]: e.target.value })

                                        }}
                                        value={onsaleParams.erc20}
                                        required
                                    />
                                </div>  
                                 <div className={style.fieldBx}>
                                    <p>Enter amount {getToken[0]?.tokenSymbol}</p><br />
                                    <TextInput
                                        type="tel"
                                        inputName="amount"
                                        holder="Enter amount"
                                        inputHandler={(e: any) => {
                                            setParams({ ...onsaleParams, [e.target.name]: e.target.value })

                                        }}
                                        value={onsaleParams.amount}
                                        required
                                    />
                                </div> 
                              
                                <div className={style.fieldBx}>
                                    <p>Select a category</p>
                                    <SelectOption
                                        options={categories.map((category: any) => {
                                            return { value: category.id, text: category.name }
                                        })}
                                        inputName="category"
                                        inputHandler={(e: any) => setParams({ ...onsaleParams, category: e.target.value })}
                                        value={onsaleParams?.category}
                                    />
                                </div> 
                                 <div className={style.fieldBx}>
                                    <p>Choose market type</p><br />
                                    <SelectOption
                                        options={marketType}
                                        inputHandler={(e: any) => setParams({ ...onsaleParams, marketType: e.target.value })}
                                        value={onsaleParams.marketType}
                                    />
                                </div>
                                {onsaleParams.marketType === '2' && <div className={style.fieldBx}>
                                    <p>Duration (days)</p>



                                    <TextInput
                                        type="number"
                                        inputName="royalties"
                                        holder=" max:30 days"
                                        inputHandler={(e: any) => e.target.value < 31 && e.target.value > 0 ? setDays(e.target.value) : toast.error('Range From 1-30 days')}
                                        value={days}
                                    />
                                </div>}
                                {/* {onsaleParams.marketType === '2' && (
                                    <>
                                        <div className={style.fieldBx}>
                                            <p>Start Date</p><br />
                                            <SelectDate
                                                type="text"
                                                inputName="starting_time"
                                                //onFocus={(e: any) => e.target.type = 'datetime-local'}
                                                holder="Choose Start Date"
                                               
                                            />
                                        </div>
                               
                               */}
            
                            </div>
                            <div className={style.modalBtns2}>
                                <button
                                    type='submit'
                                    className={style.btn1}
                                    disabled={isLoading || !onsaleParams.amount}

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
                                    Your item
                                    <strong> {' ' + props.nft?.metadata?.name} </strong>
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
                            className={`${style.modal} `}
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

export default PutOnSaleModal 
