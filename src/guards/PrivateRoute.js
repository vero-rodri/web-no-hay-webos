import React from 'react'
import { withAuthConsumer } from '../context/AuthStore'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/forbidden" />
  }
  return (
    <Route {...rest} component={Component} />
  );
}

export default withAuthConsumer(PrivateRoute);


/* import React from 'react'
import { AuthContext } from '../context/AuthStore'
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <AuthContext.Consumer>
      {( { isAuthenticated, user } ) => {
      console.log("ESTOY EN RUTA PRIVADA con el user", user)
      return <Route {...rest} render={ (props) => {
        if (isAuthenticated()) {
          return (<Component {...props} />);
        } else {
          return <Redirect to="/login" />; 
        } 
      }}/>
      }}
    </AuthContext.Consumer>
  );
}

export default PrivateRoute; */



/* import React from 'react'
import { AuthContext } from '../contexts/AuthStore';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {

  return (
    <Route {...rest} component={Component} />
  );
}

export default withAuthConsumer(PrivateRoute);*/