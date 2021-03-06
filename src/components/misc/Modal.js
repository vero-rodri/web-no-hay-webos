import React from 'react';
import { createPortal } from 'react-dom';
import 'moment-timezone';


const Modal = ({ children }) => {

  return createPortal((
    <div className="modal-container">
      <div className="modal-app">
        {children}
      </div>
    </div>
  ),
    document.querySelector('body'),
  );
}

export default Modal;