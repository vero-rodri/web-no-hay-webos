import axios from 'axios';
import { BehaviorSubject } from 'rxjs';


const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})


let userChallengeDetail = [];
let CURRENT_USER_CHALLENGES_KEY = 'current-user-challenges'
let CURRENT_USER_CHALLENGES_PENDING_KEY = 'current-user-challenges-pending'
let userChallenges = JSON.parse(localStorage.getItem(CURRENT_USER_CHALLENGES_KEY) || '[]')
let userChallengesPending = JSON.parse(localStorage.getItem(CURRENT_USER_CHALLENGES_PENDING_KEY) || '[]')
const userChallengesPending$ = new BehaviorSubject(userChallengesPending);
const userChallengeDetail$ = new BehaviorSubject(userChallengeDetail);
const userChallenges$ = new BehaviorSubject(userChallenges);


const createUserChallengesByNotifications = (body) => 
  http.post('/user-challenges/create-notifications', body)
    .then(response => response.data);


const deleteUserChallenge = (userChallengeId) => 
  http.delete(`/user-challenges/${userChallengeId}`)
    .then(() => getUserChallengesPendingBySession());


const getUserChallengesPendingBySession = () => 
  http.get('/user-challenges/pending-by-session')
    .then(response => {
      const userChallengesPending = response.data;
      localStorage.setItem(CURRENT_USER_CHALLENGES_PENDING_KEY, JSON.stringify(userChallengesPending));
      userChallengesPending$.next(userChallengesPending);
      return userChallengesPending;
    })


const getUserChallengeDetail = (UserChallengeId) => {
  return http.get(`/user-challenges/${UserChallengeId}`)
    .then(
      response => {
        userChallengeDetail = response.data;
        userChallengeDetail$.next(userChallengeDetail);
        return userChallengeDetail;
      })
}


const getUserChallengesFinishedByChallenge = (challengeId) => {
  return http.get(`challenges/${challengeId}/user-challenges`)
    .then(response => response.data)
}


const createUserChallenge = (challenge) => {
  return http.post(`/challenges/${challenge}/user-challenges`)
    .then(response => response.data)
}

const updateUserChallenge = (userChallenge, isFinished) => {
  return http.post(`/user-challenges/${userChallenge}`, {isFinished})
    .then(response => response.data)
}


const addViewToUserChallenge = (userChallengeId) => {

  return http.post(`/user-challenges/${userChallengeId}/views`)
    .then(response => {
      return response.data;
    })
}


const acceptUserChallenge = (userChallengeId) =>
http.post(`/user-challenges/${userChallengeId}/accept`)
  .then((response) => {
    getUserChallengesPendingBySession();
    return response.data;
  });


const addUserChallengeToLikes = (userChallengeId) => {

  return http.post(`/user-challenges/${userChallengeId}/likes`)
    .then (response => {
      getUserChallenges()
        .then(() => console.log("fetch userChallenges"))
      return response.data;
    })
}
      
      
const removeUserChallengeFromLikes = (userChallengeId) => {

  return http.delete(`/user-challenges/${userChallengeId}/likes`)
    .then(response => {
      getUserChallenges()
        .then(() => console.log("fetch userChallenges"))
      return response.data;
    })
}


const getUserChallenges = () => {
  return http.get('/user-challenges')
    .then(response => {
      userChallenges = response.data;
      localStorage.setItem(CURRENT_USER_CHALLENGES_KEY, JSON.stringify(userChallenges));
      userChallenges$.next(userChallenges);
      return userChallenges;
    })
}





const onUserChallengesPendingChange = () => userChallengesPending$.asObservable();
const onUsersChallengeDetailChange = () => userChallengeDetail$.asObservable();
const onUserChallengesChange = () => userChallenges$.asObservable();


export default {
  createUserChallengesByNotifications,
  deleteUserChallenge,
  getUserChallengesPendingBySession,
  onUserChallengesPendingChange,
  acceptUserChallenge,
  addUserChallengeToLikes,
  removeUserChallengeFromLikes,
  getUserChallenges,
  getUserChallengeDetail,
  getUserChallengesFinishedByChallenge,
  createUserChallenge,
  updateUserChallenge,
  addViewToUserChallenge,
  onUsersChallengeDetailChange,
  onUserChallengesChange
} 
