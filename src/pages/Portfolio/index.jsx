import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { gsap, Expo } from 'gsap'
import { useNavigate, useParams } from 'react-router-dom'
import { publicRequest } from '../../utils/requestMethods'
import style from './Collections.module.scss'
import Container from '../../components/Container/Container'
import Upload from './assets/upload.svg'
import CollectionCard from '../../components/Card/CollectionCard'
import UpdatePrompt from '../../components/Modals/UpdatePrompt/UpdatePrompt'
import { UserContext } from '../../context/UserContext'
import UseAxios from 'src/hooks/AxiosConfig/useAxios'
import Protected from 'src/hooks/AxiosConfig/axiosInstance'
import { ChainContext } from 'src/context/chain'
import ItemCard from 'src/components/Card/ItemCard'

const Portfolio = () => {
    const [showPrompt, setShowPrompt] = useState(false)
    const [themeState] = useContext(ThemeContext)
    const { userState, setUserState } = useContext(UserContext)
    // const [authState] = useContext<any>(AuthContext)
    const dark = themeState.dark
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
        // console.log("verified?>>", authState.user)

        const heroTitle = document.getElementById('heroTitle')
        const heroText = document.getElementById('heroText')

        const tl = gsap.timeline()
        tl.to(heroTitle, {
            y: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
        })
        tl.to(heroText, {
            y: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        })
    }, [])
    console.log(userState?.user?.id);

    const getCollections = async () => {

        try {
            const resp = await publicRequest.get(`api/collection?owner=${id}`)
            setCollections(resp.data.results)
        } catch (error) {
            console.log(error);

        }

    }
    const [update, setUpdate] = useState(false)
    const [collections, setCollections] = useState([])
    useEffect(() => {
        if (userState?.user?.id || update) getCollections()
        setUpdate(false)
    }, [userState, update])


   
    const closePrompt = () => {
        setShowPrompt(false)
    }

    const checkMailStatus = (value) => {
        //console.log("verified?>>", authState.user.email_verified)
        const verified = userState?.user?.email
        if (value === 'create') {
            if (verified) {
                //if mail is verified
                setType(1)
            } else {
                // else
                setShowPrompt(true)
            }
        } 
        else{
            if (verified) {
                //if mail is verified
                setType(2)
            } else {
                // else
                setShowPrompt(true)
            }
        }
        }
    const { Response, loading, error, fetchData } = UseAxios()
    const { Response:user, loading:load, error:err, fetchData:data } = UseAxios()
    const {id}= useParams()
    // const [name,setName]=useState('')
    const currentChainId = sessionStorage.getItem('chain')
    const { chain } = useContext(ChainContext)
    const [collectible,setCollectible]= useState()
   const getNFTS=()=>{
       fetchData({
           method: 'get',
           url: `api/nft/listings?owner=${id}&chain=${chain?.filter((chain) => { return chain.chain === currentChainId })[0]?.id}`,
           axiosInstance: Protected(sessionStorage.getItem('token'))
       })
   }
    const [type, setType] = useState(1)

    useEffect(()=>{
       getNFTS()
        data({
            method:'get',
            axiosInstance:Protected(),
            url:`api/user/${id}`
        })
    },[id,userState])
    useEffect(()=>{
        if(Response) setCollectible(Response.data.results)
        // console.log(Response?.data?.results[0]);
    },[Response])
    
    console.log(collectible,Response,error);
    return (
        <>
            {/* <Header /> */}
            {showPrompt && <UpdatePrompt closePrompt={closePrompt} />}
            <Container>
                <div className={style.container}>
                    <div className={style.content}>
                        <div className={style.top}>
                            <h1>
                                <span id="heroTitle">{user?.data?.username}'s Portfolio</span>{' '}
                            </h1>
                            <p>
                                <span id="heroText">
                                  {user?.data?.bio||''}
                                </span>
                            </p>
                        </div>
                        <div className={style.body}>
                            <div
                                className={`${style.bodyBtns} animate__animated animate__fadeInUp animate__delay-1s`}
                            >
                                {/* <Link to="/createCollectionOptions"> */}
                                {' '}
                                <div
                                    onClick={() => checkMailStatus("create")}
                                    //className={style.bodyBtn}
                                    className={`${style.bodyBtn} ${type === 1 && (dark === 'true' ? 'yellowBtn' : 'blueBtn'
                                    )} `}
                                    style={{ background: 'white', color: 'black', border: '1px solid black' }}
                                   
                                >
                                   NFT
                                </div>
                                {/* </Link> */}

                                <div
                                    //className={style.bodyBtn2}
                                    className={`${style.bodyBtn2} ${type === 2 && (dark === 'true' ? 'yellowBtn' : 'blueBtn'
                                    )}`}
                                        style={{background:'white',color:'black',border:'1px solid black'}}
                                    //onClick={() => setShowImport(true)}
                                    onClick={() => checkMailStatus("import")}
                                >
                                    {' '}
                                    Collections 
                                </div>
                            </div>
                            <div
                                //className={style.collectionsContainer}
                                className={`${style.collectionsContainer} animate__animated animate__fadeInUp animate__delay-1s`}
                            >
                               { type==2?(!collections
                                    ? null
                                    : collections.map((collection, i) => {
                                        return (

                                            <CollectionCard key={collection?.id} update={() => setUpdate(true)} data={collection} />
                                        )

                                    })):
                                (collectible?.map((nft, i) => {
                                    return (

                                        // <div className={style.itemBx} key={nft._id}>
                                            <ItemCard  nftData={nft} />
                                        //  </div>

                                    )
                                }))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Portfolio
