import React from 'react';

const ChallengeDetail = (props) => {
  const {photo, title, description} = props.location
  return (
    <div class="card">
      <img src={photo} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
        <a href="#" class="btn btn-primary">Hacer reto</a>
      </div>
    </div>
  )
}

export default ChallengeDetail;