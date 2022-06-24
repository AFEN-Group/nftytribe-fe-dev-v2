import { useState, useContext } from 'react'
import style from '../Explore.module.scss'
import Slider from 'react-slick'
import { ThemeContext } from '../../../context/ThemeContext'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import arrow from '../assets/arrowM.svg'

const FilterNav = () => {
    const [themeState] = useContext(ThemeContext)
    const dark = themeState.dark
    const [filter, setFilter] = useState()
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: false,
        lazyload: true,
        speed: 1200,
        // autoplaySpeed: 3000,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    //infinite: true,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            }
        ]
    }
    return (
        <>
            <div
                className={`${style.slideBoxM}  animate__animated animate__fadeInUp animate__delay-1s`}
            >
                <Slider {...settings} >

                    <div className={style.expBx}
                    //</Slider>onClick={(e) => setFilter('')}
                    >
                        <div className={`${style.exploreCatM} 
                    `}
                            onClick={(e) => setFilter('Category')}
                        >
                            <p>Categories</p>


                            <img src={arrow} alt="arrow" />

                        </div>
                    </div>

                    <div className={style.expBx}>
                        <div className={`${style.exploreCatM} 
                    `}
                            onClick={(e) => setFilter('SaleType')}
                        >
                            <p>Sale Type</p>


                            <img src={arrow} alt="arrow" />

                        </div>
                    </div>
                    <div className={style.expBx}>
                        <div className={`${style.exploreCatM} 
                    `}
                            onClick={(e) => setFilter('Chain')}
                        >
                            <p>Blockchain</p>


                            <img src={arrow} alt="arrow" />

                        </div>
                    </div>
                    <div className={style.expBx}>
                        <div className={`${style.exploreCatM} 
                    `}
                            onClick={(e) => setFilter('')}
                        >
                            <p>Recently added</p>


                            {/* <img src={arrow} alt="arrow" /> */}

                        </div>
                    </div>

                </Slider>


            </div>
            {filter === 'Category' && (

                <form
                    className={`${style.filterDrop} 
${dark === 'true' ? 'darkGradient' : 'lightGradient'} animate__animated animate__fadeInUp animate__faster`}
                //onClick={(e) => setFilter('')}
                >
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>All</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>Art</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>Gaming</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>Photography</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>Collectibles</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>African Art</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                </form>)}
            {filter === 'SaleType' && (

                <form
                    className={`${style.filterDrop} 
${dark === 'true' ? 'darkGradient' : 'lightGradient'} animate__animated animate__fadeInUp animate__faster`}
                //onClick={(e) => setFilter('')}
                >
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>Fixed Sale</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt} >
                            <p style={{ textAlign: 'left' }}>Auctions</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&marketplace_type=2")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                </form>)}
            {filter === 'Chain' && (

                <form
                    className={`${style.filterDrop} 
${dark === 'true' ? 'darkGradient' : 'lightGradient'} animate__animated animate__fadeInUp animate__faster`}
                //onClick={(e) => setFilter('')}
                >
                    <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                            <p style={{ textAlign: 'left' }}>Ethereum</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&chain=rinkeby")}
                        >
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                        </div>

                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                            <p style={{ textAlign: 'left' }} className='disable_link'>Binance</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&chain=binance")}
                        >
                            <input type="radio" name="filter" disabled />
                            <span className={style.checkmark}></span>
                        </div>
                    </div>
                    <div className={style.filterItem}>
                        <div className={`${style.filterTxt} `}>
                            <p
                                style={{ textAlign: 'left' }}
                                className='disable_link'>Skale</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&chain=binance")}
                        >
                            <input type="radio" name="filter" disabled />
                            <span className={style.checkmark}></span>
                        </div>
                    </div>
                    <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                            <p style={{ textAlign: 'left' }}
                                className='disable_link'>Solana</p>
                        </div>
                        <div className={style.pbRadio}
                        //onClick={() => setFilterQuery("&chain=binance")}
                        >
                            <input type="radio" name="filter" disabled />
                            <span className={style.checkmark}></span>
                        </div>
                    </div>
                </form>)}

        </>
    )
}

export default FilterNav