import { createContext, useEffect, useState } from 'react'
import { publicRequest } from '../utils/requestMethods'

const INITIAL_STATE = {
  //user: '',
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(INITIAL_STATE)
  const currentAddress = localStorage.getItem('currentAccount')
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const getUser = async () => {
      try {
        const result = await publicRequest.get(`/user/${currentAddress}`,{headers:{
          'content-type':'application/json',
          'Authorization':`Bearer ${sessionStorage.getItem('token')}`
        }})
        console.log('get user>>>', result.data.data)
        console.log("current user >>", currentAddress)
        setAuthState({...authState,user:result.data.data})
        // setIsLoading(false)
      } catch (error) {
        console.log(error)
        // setIsLoading(false)
      }
    }
    if (currentAddress) {
      getUser()
    }

  }, [currentAddress])
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authState.user))
  }, [authState.user])

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  )
}
