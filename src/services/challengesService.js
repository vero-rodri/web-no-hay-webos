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


const createChallenge = (challenge) => {
  console.log("challenge que se envía: ", challenge)
  // return http.post('/challenges', challenge)
  //   .then(response => response.data)
}

const getUserChallenges = () => {
  return http.get('/user-challenges')
    .then(response => {
      userChallenges = response.data;
      userChallenges$.next(userChallenges);
      return userChallenges;
    })
}

const onChallengesChange = () => challenges$.asObservable();
const onUsersChallengesChange = () => userChallenges$.asObservable();

export default {
  getChallenges,
  createChallenge,
  getUserChallenges,
  onChallengesChange,
  onUsersChallengesChange
}