import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

const create = (evidence, imgKey) => {
  //NO FUNCIONA PORQUE FALTA PASAR LOS ID DE USERCHALLENGE Y CHALLENGE ¿DEBERÍAN LLEGAR POR PARAMS?
  const challengeId = '';
  const userChallengeId = ''; //modificar

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const data = new FormData();  
  Object.keys(evidence).forEach(key => {
    if ( key === imgKey && evidence[key]) {
      data.append(key, evidence[key].target.files[0])
    } else {
      data.append(key, evidence[key])
    }
  })
  //ESTA RUTA HAY QUE RELLENARLA CON LOS DATOS DE PARAMS:
  return http.post(`/challenges/${challengeId}/user-challenges/${userChallengeId}/evidences`, data, config)
    .then(response => response.data);
}



export default {
  create
}