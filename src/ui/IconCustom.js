import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const IconCustom = (props) => {

  const { icon, link, color, onClick} = props

  const handleClick = (event) => {
   
    onClick && onClick(event.target.value);
  }

  return (
    <NavLink to={link} activeClassName="icon-active-footer" className={color}>
      <div className="col align-items-center">
        {/* <Car size="large" color="light-2" /> */}
        <p className="m-0 p-0" onClick={handleClick}><i className={icon}></i></p>
        {/* <i class="fas fa-search"></i> */}
        {/* <p className="m-0 p-0">{name}</p> */}
      </div>
    </NavLink>
  ) 
}

export default IconCustom;