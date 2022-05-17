import { createContext, useEffect, useState } from 'react'

const INITIAL_STATE = {
  //dark: localStorage.getItem('theme') || 'false',
  userWallet: localStorage.getItem('userInfo') || '',
}

export const UserContext = createContext(INITIAL_STATE)

export const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState(INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('userInfo', userState.userWallet)
  }, [userState.userWallet])

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {children}
    </UserContext.Provider>
  )
}
