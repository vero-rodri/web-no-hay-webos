import React from 'react'
import { withAuthConsumer } from '../context/AuthStore'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />
  }
  return (
    <Route {...rest} component={Component} />
  );
}

export default withAuthConsumer(PrivateRoute);
