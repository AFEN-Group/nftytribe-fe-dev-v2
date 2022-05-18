import { useContext } from 'react'
import { useParams } from 'react-router'
import { ThemeContext } from '../../context/ThemeContext'
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import style from './Create.module.scss'
import icon from './assets/upload.svg'
import TextInput from '../../components/Inputs/TextInput'
import TextArea from '../../components/Inputs/TextArea'
import SelectOption from '../../components/Inputs/SelectOption'

const CreateItems = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const itemType = useParams().itemType
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
                <p>Royalties</p>
                <SelectOption inputName="royalties" options={royalties} />
              </div>
              <div className={style.fieldBx}>
                <p>Select a category</p>
                <SelectOption options={categories} inputName="categories" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CreateItems
