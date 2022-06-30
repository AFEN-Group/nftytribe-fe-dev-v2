import axios from 'axios'

//const API_URL = process.env.REACT_APP_API_URL
//console.log(process.env.REACT_APP_API_URL)
//const user = JSON.parse(localStorage.getItem('user'))
//const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = user?.tokens?.token

export const publicRequest = axios.create({
  baseURL: 'https://api.nftytribe.io/api',
})

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//     'Content-Type': 'application/json',
//   },
// })
