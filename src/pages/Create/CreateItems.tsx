import React from 'react'
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import style from './Create.module.scss'

const CreateItems = () => {
  return (
    <>
      <Header />
      <Container>
        <div className={style.create}>
          <div className={style.createContent}>
            <div className={style.left}></div>
            <div className={style.right}></div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CreateItems
