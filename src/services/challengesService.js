import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

let challenges = [];
let userChallenges = [];
const challenges$ = new BehaviorSubject(challenges);
const userChallenges$ = new BehaviorSubject(userChallenges);

const getChallenges = () => {
  return http.get('/challenges')
    .then(response => {
      challenges = response.data;
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
  console.log("dentro del service add like")
  return http.post(`/challenges/${challengeId}/likes`)
    .then (response => {
      console.log("Servicio LIKE añadir", response)
      return response.data;
    })
}

const removeChallengeFromLikes = (challengeId) => {
  console.log("dentro del service remove like")
  return http.delete(`/challenges/${challengeId}/likes`)
    .then(response => {
      console.log("Servicio LIKE quitar", response)
      return response.data;
    })
}

const addViewToChallenge = (challengeId) => {
  return http.get(`/challenges/${challengeId}/addToViews`)
    .then(response => {
      console.log("Servicio Add View", response);
      return response.data;
    })
}

const onChallengesChange = () => challenges$.asObservable();
const onUsersChallengesChange = () => userChallenges$.asObservable();

export default {
  getChallenges,
  getChallengeDetail,
  createChallenge,
  getUserChallenges,
  onChallengesChange,
  onUsersChallengesChange,
  createUserChallenge,
  addChallengeToLikes,
  removeChallengeFromLikes,
  addViewToChallenge
}