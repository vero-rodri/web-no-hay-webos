import axios from 'axios';


const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})


const getUserChallengesByUser = (userId) => {
  console.log("en UC por user");
  return http.get(`users/${userId}/user-challenges`)
    .then(response => response.data)
}


const getChallengesByUser = (userId) => {
  console.log("en Challenge por user");
  return http.get(`users/${userId}/challenges`)
    .then(response => response.data)
}

export default {
  getUserChallengesByUser,
  getChallengesByUser
}