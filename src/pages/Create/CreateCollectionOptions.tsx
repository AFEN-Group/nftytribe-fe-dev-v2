import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap, Expo } from 'gsap'
//import { ThemeContext } from '../../context/ThemeContext'
import style from './Create.module.scss'
// import Header from '../../components/Header/Header'
//import Flow from './assets/fl.png'

import Container from '../../components/Container/Container'
import toast from 'react-hot-toast'
import globals from '../../utils/globalVariables'
import { ChainContext } from 'src/context/chain'

const CreateCollectionOptions = () => {
    const [selctedcChain, setSChain] = useState('')
    const currentChain = sessionStorage.getItem('chain')
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
    const { chain, setChain } = useContext(ChainContext)
    console.log(chain);
    // const checkNetwork = (network: any) => {
    //     if (network === 'eth') {
    //         if (currentChain === globals.mainnetEth.chainId) {
    //             setChain(network)
    //             navigate(`/createCollection/${network}`)
    //         } else {
    //             //alert("Switch to ethereum chain")
    //             toast.error(`Switch to ethereum chain`,
    //                 {
    //                     duration: 3000,
    //                 }
    //             )
    //         }
    //     }
    //     if (network === 'binance') {
    //         if (currentChain === globals.testnetBsc.chainId) {
    //             setChain(network)
    //             navigate(`/createCollection/${network}`)
    //         } else {
    //             //alert("Switch to binance chain")
    //             toast.error(`Switch to binance chain`,
    //                 {
    //                     duration: 3000,
    //                 }
    //             )
    //         }
    //     }
    // }

    console.log(chain)
    return (
        <>
            {/* <Header /> */}
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
                                {
                                    chain?.map((chain: any) => (
                                        <div
                                            className={`${style.optBox} `}
                                            onClick={() => {
                                                if (currentChain === chain.chain) {
                                                    setSChain(chain.chain)
                                                    navigate(`/createCollection/${chain.chain}`)
                                                } else {
                                                    //alert("Switch to binance chain")
                                                    toast.error(`Switch to Selected chain`,
                                                        {
                                                            duration: 3000,
                                                        }
                                                    )
                                                }
                                            }
                                            }
                                        >
                                            <img src={chain?.image} alt={chain.chain} />
                                            <p>{chain?.name}</p>
                                        </div>
                                    ))
                                }
                                {/* <div
                                    className={`${style.optBox} ${style.disable}`}
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
                                </div> */}
                                {/* <div
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
                                </div>*/}

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
