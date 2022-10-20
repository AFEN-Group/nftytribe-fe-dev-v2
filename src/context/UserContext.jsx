import { createContext, useEffect, useState } from 'react'

// const INITIAL_STATE = {
//   //dark: localStorage.getItem('theme') || 'false',
//   userWallet: localStorage.getItem('userInfo') || '',
// }

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState()

  // useEffect(() => {
  //   localStorage.setItem('userInfo', userState.userWallet)
  // }, [userState.userWallet])

  return (
    <UserContext.Provider value={{userState, setUserState}}>
      {children}
    </UserContext.Provider>
  )
}
