import style from './Container.module.scss'

const Container1 = (props: any) => {
  return (
    <div className={style.container}>
      <div>{props.children}</div>
    </div>
  )
}

export default Container1
