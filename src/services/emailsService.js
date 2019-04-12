import axios from 'axios';


const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

const sendEmails = (body) => {
  console.log("en SENDMAIL por user", body);
  return http.post('/emails', body)
    .then(response => response.data)
}

export default {
  sendEmails
}
