import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

let CURRENT_CHALLENGES_KEY = 'current_challenges';
let CURRENT_USER_CHALLENGES_KEY = 'current_userchallenges'
let challenges = JSON.parse(localStorage.getItem(CURRENT_CHALLENGES_KEY) || '[]')
let userChallenges = JSON.parse(localStorage.getItem(CURRENT_USER_CHALLENGES_KEY) || '[]')

const challenges$ = new BehaviorSubject(challenges);
const userChallenges$ = new BehaviorSubject(userChallenges);


const getChallenges = () => {

  return http.get('/challenges')
    .then(response => {
      challenges = response.data;
      localStorage.setItem(CURRENT_CHALLENGES_KEY, JSON.stringify(challenges));
      challenges$.next(challenges);
      return challenges;
    })
}


const createChallenge = (challenge, imgKey) => {

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const data = new FormData();

  Object.keys(challenge).forEach(key => {
    if ( key === imgKey && challenge[key]) {
      data.append(key, challenge[key].target.files[0])
    } else {
      data.append(key, challenge[key])
    }
  })
  return http.post('/challenges', data, config).then(response => response.data);
}


const getChallengeDetail= (challengeId) => {

  return http.get(`/challenges/${challengeId}`)
    .then(response => response.data)
}


const getUserChallenges = () => {

  return http.get('/user-challenges')
    .then(response => {
      userChallenges = response.data;
      localStorage.setItem(CURRENT_USER_CHALLENGES_KEY, JSON.stringify(userChallenges));
      userChallenges$.next(userChallenges);
      console.log("HAY HAY los logros ", userChallenges)
      return userChallenges;
    })
}


const createUserChallenge = (challenge) => {

  return http.post(`/challenges/${challenge}/user-challenges`)
    .then(response => response.data)
}


const addChallengeToLikes = (challengeId) => {

  return http.post(`/challenges/${challengeId}/likes`)
    .then (response => {
      getChallenges()
        .then(() => console.log("fetch challenges"))
      return response.data;
    })
}


const removeChallengeFromLikes = (challengeId) => {

  return http.delete(`/challenges/${challengeId}/likes`)
    .then(response => {
      getChallenges()
        .then(() => console.log("fetch challenges"))
      return response.data;
    })
}


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


const addViewToChallenge = (challengeId) => {

  return http.post(`/challenges/${challengeId}/views`)
    .then(response => {
      return response.data;
    })
}


const addViewToUserChallenge = (userChallengeId) => {

  return http.post(`/user-challenges/${userChallengeId}/views`)
    .then(response => {
      return response.data;
    })
}


const onChallengesChange = () => challenges$.asObservable();
const onUserChallengesChange = () => userChallenges$.asObservable();

export default {
  getChallenges,
  getChallengeDetail,
  createChallenge,
  getUserChallenges,
  onChallengesChange,
  onUserChallengesChange,
  createUserChallenge,
  addChallengeToLikes,
  removeChallengeFromLikes,
  addUserChallengeToLikes,
  removeUserChallengeFromLikes,
  addViewToChallenge,
  addViewToUserChallenge
}
