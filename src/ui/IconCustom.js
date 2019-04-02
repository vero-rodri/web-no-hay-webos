import React from 'react';
import { Box, Text } from 'grommet';
import { Link } from 'react-router-dom';

const IconCustom = (props) => {
  const { name, icon, link, color} = props
  return (
    <Link to={link} className={color}>
      <div className="col align-items-center">
        {/* <Car size="large" color="light-2" /> */}
        <p className="m-0 p-0"><i className={icon}></i></p>
        {/* <i class="fas fa-search"></i> */}
        <p className="m-0 p-0">{name}</p>
      </div>
    </Link>
  )
}

export default IconCustom;