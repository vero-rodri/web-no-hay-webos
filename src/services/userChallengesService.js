import axios from 'axios';
import { BehaviorSubject } from 'rxjs';


const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
}) 

let CURRENT_USER_CHALLENGES_PENDING_KEY = 'current-user-challenges-pending'
let userChallengesPending = JSON.parse(localStorage.getItem(CURRENT_USER_CHALLENGES_PENDING_KEY) || '[]')
const userChallengesPending$ = new BehaviorSubject(userChallengesPending);


const createUserChallengesByNotifications = (body) => 
  http.post('/user-challenges/create-notifications', body)
    .then(response => response.data);


const rejectUserChallenge = (userChallengeId) => 
  http.post(`/user-challenges/${userChallengeId}/reject`)
    .then(() => getUserChallengesPendingBySession());


const getUserChallengesPendingBySession = () => 
  http.get('/user-challenges/pending-by-session')
    .then(response => {
      const userChallengesPending = response.data;
      localStorage.setItem(CURRENT_USER_CHALLENGES_PENDING_KEY, JSON.stringify(userChallengesPending));
      userChallengesPending$.next(userChallengesPending);
      return userChallengesPending;
    })


const acceptUserChallenge = (userChallengeId) =>
http.post(`/user-challenges/${userChallengeId}/accept`)
  .then((response) => {
    getUserChallengesPendingBySession();
    return response.data;
  });

const getUserChallengesByChallenge = (challengeId) => {
  return http.get(`challenges/${challengeId}/user-challenges/all`)
    .then(response => response.data)
  }

const onUserChallengesPendingChange = () => 
  userChallengesPending$.asObservable();


export default {
  createUserChallengesByNotifications,
  rejectUserChallenge,
  getUserChallengesPendingBySession,
  onUserChallengesPendingChange,
  acceptUserChallenge,
  getUserChallengesByChallenge
} 
