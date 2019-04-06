import React from 'react';
import IconCustom from '../../ui/IconCustom';
import { withRouter } from 'react-router-dom';

const FooterBar = (props) => {

  const { pathname } = props.history.location;

  if ( pathname === '/login' || pathname === '/register') {
    return null;
  } else {
    return(
      <div className="container m-0 p-0">
        <div className="footer-bar row m-0 p-0 justify-content-center align-items-center">
          <IconCustom name="Buscar" icon="fas fa-search" link="/search" color="text-white" />
          <IconCustom name="Home" icon="fas fa-home" link="/board" color="text-white" />
          <IconCustom name="CrearReto" icon="fas fa-plus" link="/challenges/create" color="text-white" />
        </div>
      </div>
    )
  }
}

export default withRouter(FooterBar);