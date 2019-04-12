import React from 'react';


const EmailItem = (props) => {

  const handleDelete = (event) => {
    props.handleDelete(props.email);
  }

  return (
    <div className="d-flex row align-items-center">
      <li className="px-2 py-1 email-li">{props.email}</li>
      <span className="px-2" onClick={handleDelete}><i className="fas fa-trash-alt text-danger"></i></span>
    </div>
  )
}

export default EmailItem;