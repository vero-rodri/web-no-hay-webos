import React from 'react'
import { AuthContext } from '../context/AuthStore'
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <AuthContext.Consumer>
      {( { isAuthenticated, user } ) => {
      console.log("ESTOY EN RUTA PRIVADA con el user", user)
      return <Route {...rest} render={ (props) => {
        if (isAuthenticated()) {
          if (!rest.role || rest.role === user.role) {
            return (<Component {...props} />);
          } else {
            return <Redirect to="/forbidden" />; 
          }
        }
        return <Redirect to="/login" />; 
      }}/>
      }}
    </AuthContext.Consumer>
  );
}

export default PrivateRoute;