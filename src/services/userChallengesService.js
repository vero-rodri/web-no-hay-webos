import axios from 'axios';
import { BehaviorSubject } from 'rxjs';


const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

let CURRENT_USER_CHALLENGES_PENDING_KEY = 'current-user-challenges-pending'
let userChallengesPending = JSON.parse(localStorage.getItem(CURRENT_USER_CHALLENGES_PENDING_KEY) || '[]')
const userChallengesPending$ = new BehaviorSubject(userChallengesPending);


const createUserChallengesByNotifications = (body) => {
  return http.post('/user-challenges/create-notifications', body)
    .then(response => response.data)
}


const getUserChallengesPending = () => {
  return http.get('/user-challenges/pending')
    .then(response => {
      const userChallengesPending = response.data;
      localStorage.setItem(CURRENT_USER_CHALLENGES_PENDING_KEY, JSON.stringify(userChallengesPending));
      userChallengesPending$.next(userChallengesPending);
      return userChallengesPending;
    })
}


const onUserChallengesPendingChange = () => userChallengesPending$.asObservable();


export default {
  createUserChallengesByNotifications,
  getUserChallengesPending,
  onUserChallengesPendingChange
} 
