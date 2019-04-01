import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

const getChallenges = () => {
  return http.get('/challenges')
    .then(response => response.data)
}

const createChallenge = (challenge) => {
  console.log("challenge que se envía: ", challenge)
  // return http.post('/challenges', challenge)
  //   .then(response => response.data)
}



export default {

  getChallenges,
  createChallenge
}