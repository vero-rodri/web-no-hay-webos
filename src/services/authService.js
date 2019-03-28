import axios from 'axios';

const http = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  baseURL: 'http://localhost:3001',
  withCredentials: true
})

const register = (user) => {
  return http.post('/register', user)
}


// const register = (user) => {
//   console.log(user);
//   const data = new FormData();
//   Object.keys(user).forEach(key =>  { 
//     console.log(key, user[key]);
//     return data.append(key, user[key])
//   })
//   console.log(data);
//   return http.post('/register', data)
// }

const authenticate = (user) => {
  return http.post('/authenticate', user)
}


export default {
  register,
  authenticate
}