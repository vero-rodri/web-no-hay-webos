import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
})

const createEvidence = (evidence, imgKey, userChallengeId) => {
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
  return http.post(`/user-challenges/${userChallengeId}/evidences`, data, config)
  .then(response => response.data);
}

const getEvidencesList = (userChallengeId) => {
  return http.get(`/user-challenges/${userChallengeId}/evidences`)
  .then(response => response.data)
}

const evidenceDelete = (userChallengeId, evidenceId) => {
  return http.delete(`/user-challenges/${userChallengeId}/evidences/${evidenceId}`)
  .then(response => response.data)
}
 

export default {
  createEvidence,
  getEvidencesList,
  evidenceDelete
}