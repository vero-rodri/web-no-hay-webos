import axios from 'axios';
import { BehaviorSubject } from 'rxjs';


const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})


let CURRENT_CHALLENGES_KEY = 'current-challenges';
let challenges = JSON.parse(localStorage.getItem(CURRENT_CHALLENGES_KEY) || '[]')
const challenges$ = new BehaviorSubject(challenges);

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
  return http.post('/challenges', data, config)
  .then(response => {
      getChallenges();
      return response.data;
    })
}


const getChallengeDetail= (challengeId) => {
  return http.get(`/challenges/${challengeId}`)
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


const addViewToChallenge = (challengeId) => {
  return http.post(`/challenges/${challengeId}/views`)
    .then(response => {
      getChallenges()
        .then(() => console.log("fetch challenges"))
      return response.data;
    })
}


const addParticipantToChallenge = (challengeId) => {
  return http.post(`challenges/${challengeId}/new-participant`)
    .then(response => {
      return response.data
    })
}




const onChallengesChange = () => challenges$.asObservable();


export default {
  getChallenges,
  getChallengeDetail,
  createChallenge,
  onChallengesChange,
  addChallengeToLikes,
  removeChallengeFromLikes,
  addViewToChallenge,
  addParticipantToChallenge,
}
