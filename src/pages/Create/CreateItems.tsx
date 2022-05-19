import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { ThemeContext } from '../../context/ThemeContext'
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import style from './Create.module.scss'
import TextInput from '../../components/Inputs/TextInput'
import TextArea from '../../components/Inputs/TextArea'
import SelectOption from '../../components/Inputs/SelectOption'
import icon from './assets/upload.svg'
import check from './assets/check.svg'
import arrow1 from './assets/arrowR1.svg'
import arrow2 from './assets/arrowR2.svg'
import arrowDown from './assets/arrowd.svg'

const CreateItems = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const itemType = useParams().itemType
  const [priceType, setPriceType] = useState('fixed')
  const [showAdvanced, setShowAdvanced] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const royalties = [
    { value: '0', text: '0%' },
    { value: '10', text: '10%' },
    { value: '20', text: '20%' },
  ]
  const categories = [
    { value: '', text: 'Select' },
    { value: 'art', text: 'Art' },
    { value: 'gaming', text: 'Gaming' },
    { value: 'collectibles', text: 'Collectibles' },
    { value: 'utility', text: 'Utility' },
    // { value: '5', text: 'Music' },
  ]
  const dark = themeState.dark
  return (
    <>
      <Header />
      <Container>
        <div
          className={`${style.create} animate__animated animate__fadeInLeft`}
        >
          <div className={style.createContent}>
            <div className={style.left}>
              <div className={style.leftTop}>
                <h2>
                  Create{' '}
                  {itemType === 'single' ? 'single item' : 'multiple items'}
                </h2>
                <p>Create a single NFT item by minting it now.</p>
              </div>
              <div className={style.leftBody}>
                <div
                  className={` ${
                    dark === 'true'
                      ? style.fileContainerD
                      : style.fileContainerL
                  }`}
                >
                  <img src={icon} alt="upload" />
                  <h3>Choose file</h3>
                  <p>PNG, GIF, WEBP, Maximum 100mb</p>
                </div>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.fieldBx}>
                <p>Title</p>
                <TextInput type="text" inputName="title" holder="Enter Title" />
              </div>
              <div className={style.fieldBx}>
                <p>Description</p>
                <TextArea inputName="title" holder="Enter Description" />
              </div>
              <div className={style.fieldBx}>
                <p>Price</p>
                <TextInput type="text" inputName="price" holder="Enter Price" />
              </div>
              <div className={style.fieldBx}>
                <div className={style.smBtns}>
                  <div
                    className={`${style.smBtn} ${
                      priceType === 'fixed' ? style.smBtnA : ''
                    } `}
                    onClick={() => setPriceType('fixed')}
                  >
                    Fixed price
                  </div>
                  <div
                    className={`${style.smBtn} ${
                      priceType === 'bids' ? style.smBtnA : ''
                    } `}
                    onClick={() => setPriceType('bids')}
                  >
                    Open for bids
                  </div>
                  <div
                    className={`${style.smBtn} ${
                      priceType === 'auction' ? style.smBtnA : ''
                    } `}
                    onClick={() => setPriceType('auction')}
                  >
                    Time auction
                  </div>
                </div>
              </div>

              <div className={style.fieldBx}>
                <p>Select a category</p>
                <SelectOption options={categories} inputName="categories" />
              </div>
              <div className={style.fieldBx}>
                <p>Royalties</p>
                <SelectOption inputName="royalties" options={royalties} />
              </div>
              {itemType === 'multiple' && (
                <div className={style.fieldBx}>
                  <p>Number of copies</p>
                  <TextInput
                    type="text"
                    inputName="price"
                    holder="Number of copies..."
                  />
                </div>
              )}
              <div className={style.fieldBx2}>
                <img className={style.toggleCheck} src={check} alt="toggle" />
                <p>Lazy minting</p>
                <div className={style.toggle}>
                  <div className={style.toggleBox}>
                    <label className={style.switchToggle}>
                      <input
                        //onChange={
                        // (e) =>
                        // setUserInput({
                        //   ...userInput,
                        //   is_lazy_mint: !userInput.is_lazy_mint,
                        // })
                        //handleLazy
                        //}
                        type="checkbox"
                        name="lazyMinting"
                      />
                      <span
                        className={`${style.sliderToggle} ${style.round}`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.fieldBx}>
                {!showAdvanced ? (
                  <div
                    //className={style.advancedBx}
                    className={`${style.advancedBx} animate__animated animate__fadeInUp `}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <p>Advanced settings</p>
                    <img src={dark === 'true' ? arrow2 : arrow1} alt="arrow" />
                  </div>
                ) : (
                  <div
                    //className={style.advancedBxA}
                    className={`${style.advancedBxA} animate__animated animate__fadeInUp `}
                  >
                    <div
                      className={style.aBxTop}
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <p>Advanced settings</p>
                      <img src={arrowDown} alt="arrow" />
                    </div>
                    <div className={style.aBxBody}>
                      <div className={style.fieldBx}>
                        <p>Properties</p>
                        <SelectOption
                          options={categories}
                          inputName="categories"
                        />
                      </div>
                      <div className={style.fieldBx}>
                        <p>Levels</p>
                        <SelectOption
                          options={categories}
                          inputName="categories"
                        />
                      </div>
                      <div className={style.fieldBx}>
                        <p>Stats</p>
                        <SelectOption
                          options={categories}
                          inputName="categories"
                        />
                      </div>
                      <div className={style.fieldBx2}>
                        <img
                          className={style.toggleCheck}
                          src={check}
                          alt="toggle"
                        />
                        <p>Sensitive content</p>
                        <div className={style.toggle}>
                          <div className={style.toggleBox}>
                            <label className={style.switchToggle}>
                              <input type="checkbox" name="sensitive" />
                              <span
                                className={`${style.sliderToggle} ${style.round}`}
                              ></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.submitBx}>
                <button
                  className={dark === 'true' ? 'darkGradient' : 'lightGradient'}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CreateItems
