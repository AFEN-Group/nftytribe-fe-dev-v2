import HeaderMobile from './HeaderMobile'
import HeaderWeb from './HeaderWeb'
const Header = (props: any) => {
  return (
    <>
      <HeaderWeb open={props.open} />
      <HeaderMobile />
    </>
  )
}

export default Header
