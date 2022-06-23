import { useRef, useContext } from 'react'
import style from '../Explore.module.scss'
import Slider from 'react-slick'
import { ThemeContext } from '../../../context/ThemeContext'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import arrow from '../assets/arrowM.svg'

const FilterNav = () => {
    const [themeState] = useContext(ThemeContext)
    const dark = themeState.dark
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
        //focusOnHover: true,
        //centerPadding: 0,
        //length: 40,
        slidesToShow: 3,
        // slidesToScroll: 1,
        pauseOnHover: true,
        // beforeChange: (current, next) => setImageIndex(next),


    }
    let { customSlider } = useRef('')
    return (
        <div className={style.slideBoxM}>
            <Slider {...settings} >
                {/* <div className={style.slideContainerM}> */}
                <div
                    className={`${style.exploreCatM} ${dark === 'true' ? 'darkGradient' : 'lightGradient'}`}
                //onClick={(e) => setTab('african_art')}
                >
                    <p>Categories</p>

                    {/* <img src={arrow} alt="arrow" /> */}

                </div>
                <div
                    className={`${style.exploreCatM} ${dark === 'true' ? 'darkGradient' : 'lightGradient'}`}
                //onClick={(e) => setTab('african_art')}
                >
                    <p>Sale type</p>
                    {/* <img src={arrow} alt="arrow" /> */}

                </div>
                <div
                    className={`${style.exploreCatM} ${dark === 'true' ? 'darkGradient' : 'lightGradient'}`}
                //onClick={(e) => setTab('african_art')}
                >
                    <p>Blockchain</p>
                    {/* <img src={arrow} alt="arrow" /> */}

                </div>
                <div
                    className={`${style.exploreCatM} ${dark === 'true' ? 'darkGradient' : 'lightGradient'}`}
                //onClick={(e) => setTab('african_art')}
                >
                    <p>Categories</p>
                    {/* <img src={arrow} alt="arrow" /> */}

                </div>

                {/* </div> */}
            </Slider>
        </div>
    )
}

export default FilterNav