import axios from 'axios'
import globals from './globalVariables'

//const API_URL = process.env.REACT_APP_API_URL
//console.log(process.env.REACT_APP_API_URL)
//const user = JSON.parse(localStorage.getItem('user'))
//const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = user?.tokens?.token

export const publicRequest = axios.create({
  baseURL: globals.baseURL,
})

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//     'Content-Type': 'application/json',
//   },
// })
