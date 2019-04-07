import React from 'react';
import { Link } from 'react-router-dom';

const IconCustom = (props) => {

  const { icon, link, color, onClick} = props

  const handleClick = (event) => {
   
    onClick && onClick(event.target.value);
  }

  return (
    <Link to={link} className={color}>
      <div className="col align-items-center">
        {/* <Car size="large" color="light-2" /> */}
        <p className="m-0 p-0" onClick={handleClick}><i className={icon}></i></p>
        {/* <i class="fas fa-search"></i> */}
        {/* <p className="m-0 p-0">{name}</p> */}
      </div>
    </Link>
  )
}

export default IconCustom;