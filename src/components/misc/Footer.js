import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormSearch } from 'grommet-icons';
import { Box } from 'grommet';

const Footer = () => {
  return(
    <div className="footerr">
      <NavLink activeClassName="is-active" to="/search">
          <FormSearch size="large" color="white"/>
      </NavLink>
    </div>
  )
}

export default Footer;