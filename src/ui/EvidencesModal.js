import React from 'react';
import Carousel from './Carousel';


const EvidencesModal = (props) => {

  const { title, 
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
            <h5>{title}</h5>
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