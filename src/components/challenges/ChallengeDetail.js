import React from 'react';

const ChallengeDetail = (props) => {
  const {photo, title, description} = props.location
  return (
    <div className="card">
      <img src={photo} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">Hacer reto</a>
      </div>
    </div>
  )
}

export default ChallengeDetail;