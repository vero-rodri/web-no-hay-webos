import axios from 'axios';

const http = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  baseURL: 'http://localhost:3001',
  withCredentials: true
})

const register = (user) => {
  return http.post('/register', user)
    .then(response => response.data)
}


export default {
  register
}