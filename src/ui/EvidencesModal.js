import React from 'react';
import Carousel from './Carousel';
import { Link } from 'react-router-dom'


const EvidencesModal = (props) => {

  const { id,
          title, 
          propAvatar, 
          propNickname, 
          evidences, 
          modalOrder,
          onShowModal } = props

  return (
    <React.Fragment>
      <div className="col-2 modal-col">
        <div className="modal-header">
          <div className="mb-1 pr-5 align-self-end">
            { props.isChallenge && 
            <h5>{title}</h5>
            }
            { !props.isChallenge && 
            <Link to={`/challenges/${id}`} className="modal-link"><h5>{title}</h5></Link>
            }

            <div className="mt-3">
              <span><small>Prueba de </small></span>
              <img className="rounded-circle avatar-user ml-1" src={propAvatar} alt={propNickname}></img>
              <span className="mx-1 pl-1"><strong>{propNickname}</strong></span>
            </div>
          </div>
          <div className="modal-close" onClick={onShowModal}><i className="fas fa-times-circle"></i></div>
        </div>
      </div>
      <div className="col-8 modal-col">
        <Carousel evidences={evidences} order={modalOrder}/>
      </div>
    </React.Fragment>
  )
}

export default EvidencesModal;