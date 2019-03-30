import React from 'react';

const ChallengeDetail = (props) => {
  return (
    <div>
      <p>hola</p>
      <h2>Título: {props.location.title}</h2>
      <p>DESCRIPCIÓN{props.location.description}</p>
      <img src={props.location.photo}></img>
    </div>
  )

}

export default ChallengeDetail;