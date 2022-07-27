import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap, Expo } from 'gsap'
//import { ThemeContext } from '../../context/ThemeContext'
import style from './Create.module.scss'
import Header from '../../components/Header/Header'
//import Flow from './assets/fl.png'
import Eth from './assets/eth.svg'
import Polygon from './assets/profile.svg'
import Binance from './assets/binance.svg'
import Skale from './assets/skale.svg'
import Solana from './assets/sol.svg'
import Container from '../../components/Container/Container'
import toast from 'react-hot-toast'

const CreateCollectionOptions = () => {
    const [chain, setChain] = useState('')
    const currentChain = localStorage.getItem('chain')
    console.log(currentChain, "<<<<<")
    const navigate = useNavigate()
    // const [themeState] = useContext<any>(ThemeContext)
    // const dark = themeState.dark
    useEffect(() => {
        window.scrollTo(0, 0)

        const heroTitle = document.getElementById('heroTitle')
        const heroTitle2 = document.getElementById('heroTitle2')
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
        tl.to(heroTitle2, {
            y: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
        })

    }, [])

    const checkNetwork = (network: any) => {
        if (network === 'eth') {
            if (currentChain === "0x4") {
                setChain(network)
                navigate(`/createCollection/${network}`)
            } else {
                //alert("Switch to ethereum chain")
                toast.error(`Switch to ethereum chain`,
                    {
                        duration: 3000,
                    }
                )
            }
        }
        if (network === 'binance') {
            if (currentChain === "0x61") {
                setChain(network)
                navigate(`/createCollection/${network}`)
            } else {
                //alert("Switch to binance chain")
                toast.error(`Switch to binance chain`,
                    {
                        duration: 3000,
                    }
                )
            }
        }
    }

    console.log(chain)
    return (
        <>
            <Header />
            <Container>
                <div className={style.createOptions}>
                    {/* {chain === '' ? ( */}
                    <div className={style.cOptContent1}>
                        <div className={style.cOptTop}>
                            <h1>
                                <span id="heroTitle">Choose Blockchain</span>{' '}
                            </h1>
                            <p>
                                <span id="heroText">Select  the most suitable blockchain to create your collection. You need to sign in to create.
                                </span>{' '}
                            </p>
                        </div>
                        <div
                            className={`${style.cOptBody} animate__animated animate__fadeInUp animate__delay-1s`}
                        >
                            <div className={style.optBoxes}>
                                <div
                                    className={style.optBox}
                                    onClick={() => checkNetwork('eth')}
                                >
                                    <img src={Eth} alt="eth" />
                                    <p>Ethereum</p>
                                </div>
                                <div
                                    className={`${style.optBox} `}
                                    onClick={() => checkNetwork('binance')}
                                >
                                    <img src={Binance} alt="binance" />
                                    <p>Binance</p>
                                </div>
                                <div
                                    className={`${style.optBox} ${style.disable}`}
                                //onClick={() => setChain('')}
                                >
                                    <img src={Skale} alt="skale" />
                                    <p>Skale</p>
                                </div>

                                <div
                                    className={`${style.optBox} ${style.disable}`}
                                    onClick={() => setChain('')}
                                >
                                    <img src={Solana} alt="sol" />
                                    <p className={style.mg1}>Solana</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* ) : ( */}

                </div>
            </Container>
        </>
    )
}

export default CreateCollectionOptions
