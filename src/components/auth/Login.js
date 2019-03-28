import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Form, FormField, Button } from 'grommet';
import authService  from '../../services/authService';

const validators = {
  email: (value) => {
    let error;
    if (!value) { 
      error = 'email es obligatorio'
    } 
    return error;
  },
  password: (value) => {
      let error;
      if (!value) { 
        error = 'contraseña es obligatoria'
      } 
      return error;
  }
}


class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {},
    isAuthenticated: false
  }


  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name] : value
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name] && validators[name](value)
      }
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    if ( !Object.values(this.state.errors).some(error => error !== undefined)) {
      authService.authenticate(this.state.user)
        .then(
          () => this.setState({ isAuthenticated: true }), 
          error => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                password: message
              }
          })
        })
    }
  }

  render() {
    const { email, password } = this.state.user;

    if ( this.state.isAuthenticated ) {
      return <Redirect to="/challenges" />
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormField name="email" placeholder="Nombre" label="Email:" value={email} onChange={this.handleChange} />
        <p>{this.state.errors.email}</p>
        <FormField name="password" label="Contraseña:" value={password} onChange={this.handleChange}/>
        <p>{this.state.errors.password}</p>
        <Button type="submit" primary label="Submit" />
      </Form>
    )
  }
}

export default Login;