import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormSearch } from 'grommet-icons';
import { Box } from 'grommet';
import IconCustom from '../../ui/IconCustom';

const FooterBar = () => {
  return(
    <div className="container m-0 p-0">
    <div className="footer-bar row m-0 p-0 justify-content-between align-items-center">
      <IconCustom name="Home" icon="fas fa-home" link="/board" color="text-white" />
      <IconCustom name="Buscar" icon="fas fa-search" link="/search" color="text-white" />
      {/* <NavLink activeClassName="is-active" to="/search">

          <FormSearch size="large" color="white"/>
      </NavLink> */}
    </div>

    </div>
  )
}

export default FooterBar;