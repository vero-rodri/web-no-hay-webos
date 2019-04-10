import React from 'react';
import { createPortal } from 'react-dom';
import Carousel from '../../ui/Carousel';
import Moment from 'react-moment';
import 'moment-timezone';


const Modal = (props) => {

  const { title, 
          propAvatar, 
          propNickname, 
          evidences, 
          modalOrder,
          onShowModal } = props

  return createPortal((
    <div className="modal-container">
      <div className="modal-app">
      <div className="col-2 modal-col">
                  <div className="modal-header">
                    <div className="mb-1 pr-5 align-self-end">
                      <h5>{title}</h5>
                      <div className="mt-3">
                        <span><small>Reto de </small></span>
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
                <div className="col-2 modal-col">
                  <div className="" >{evidences[0].comments}</div>
                  <div className="" >
                    <Moment className="h6" format="DD/MM/YYYY">{evidences[0].createdAt}</Moment>
                  </div>
                </div>
        {/* {children} */}
      </div>
    </div>
  ),
    document.querySelector('body'),
  );
}

export default Modal;