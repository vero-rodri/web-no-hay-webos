import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

const register = (user, imgKey) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const data = new FormData();
  Object.keys(user).forEach(key => {
    if ( key === imgKey && user[key]) {
      data.append(key, user[key].target.files[0])
    } else {
      data.append(key, user[key])
    }
  })
  return http.post('/register', data, config).then(response => response.data);
}


const authenticate = (user) => {
  return http.post('/authenticate', user)
}


export default {
  register,
  authenticate
}