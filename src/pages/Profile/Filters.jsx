import { useState, useContext } from 'react'
import style from './Profile.module.scss'
import Slider from 'react-slick'
import { ThemeContext } from '../../context/ThemeContext'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

//import arrow from '../assets/arrowM.svg'

const Filters = () => {
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

                    <div className={style.filterBx}>
                        <div className={`${style.filterM} 
                    `} >
                            <p>All</p>

                        </div>
                    </div>
                    <div className={style.filterBx}>
                        <div className={`${style.filterM} 
                    `} >
                            <p>Collected</p>


                        </div>
                    </div>
                    <div className={style.filterBx}>
                        <div className={`${style.filterM} 
                    `} >
                            <p>On Sale</p>


                        </div>
                    </div>
                    <div className={style.filterBx}>
                        <div className={`${style.filterM} 
                    `} >
                            <p>Created</p>


                        </div>
                    </div>
                    <div className={style.filterBx}>
                        <div className={`${style.filterM} 
                    `} >
                            <p>Activity</p>


                        </div>
                    </div>
                    <div className={style.filterBx}>
                        <div className={`${style.filterM} 
                    `} >
                            <p>Sold</p>


                        </div>
                    </div>

                </Slider>


            </div>


        </>
    )
}

export default Filters