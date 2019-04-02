import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const CURRENT_USER_KEY = 'current-user';

let user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')
const user$ = new BehaviorSubject(user);

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

const register = (user, imgKey) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const data = new FormData();
  Object.keys(user).forEach(key => {
    if ( key === imgKey && user[key]) {
      data.append(key, user[key].target.files[0])
    } else {
      data.append(key, user[key])
    }
  })
  return http.post('/register', data, config).then(response => response.data);
}


const authenticate = (user) => {
  return http.post('/authenticate', user)
    .then(response => {
        user = response.data;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        user$.next(user);
        console.log("sale del servicio: ", user)
        return user;
      }
    )
}

const onUserChange = () => user$.asObservable()


export default {
  register,
  authenticate,
  onUserChange
}