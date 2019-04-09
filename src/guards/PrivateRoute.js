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
          return (<Component {...props} />);
        } else {
          return <Redirect to="/login" />; 
        } 
      }}/>
      }}
    </AuthContext.Consumer>
  );
}

export default PrivateRoute;



/* import React from 'react'
import { AuthContext } from '../contexts/AuthStore';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <AuthContext.Consumer>
      {( { isAuthenticated } ) => (
      <Route {...rest} render={ (props) => {
        if (isAuthenticated()) {
          
            return (<Component {...props} />);
          
        }
        return <Redirect to="/login" />; 
      }}/>
      )}
    </AuthContext.Consumer>
  );
}

export default PrivateRoute; */

