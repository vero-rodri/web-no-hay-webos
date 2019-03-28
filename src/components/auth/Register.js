import React, { Component } from 'react';
import { Form, FormField, Button } from 'grommet';
import authService  from '../../services/auth.services';
import { PASSWORD_PATTERN, EMAIL_PATTERN } from '../../utils/constants';

const validators = {
  nickName: (value) => {
    let error;
    if (!value) {
      error = 'nombre es obligatorio'
    }
    return error;
  },
  email: (value) => {
    let error;
    if (!value) { 
      error = 'email es obligatorio'
    } else if ( !EMAIL_PATTERN.test(value) ) { 
      error = 'email no válido'
    }
    return error;
  },
  password: (value) => {
      let error;
      if (!value) { 
        error = 'contraseña es obligatoria'
      } else if ( !PASSWORD_PATTERN.test(value) ) { 
        error = 'contraseña debe contener al menos 6 caracteres con letras, números y mayúsculas'
      }
      return error;
  }
}


class Register extends Component {
  state = {
    user: {
      nickName: '',
      email: '',
      password: '',
      fileProfile: ''
    },
    errors: {},
    isRegistered: false
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
      authService.register(this.state.user)
        .then(
          () => this.setState({ isRegistered: true }), 
          error => {
            const { message, errors } = error.response.data;
            console.log(errors)
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                email: message
              }
          })
        })
    }
  }

  render() {
    const {nickName, email, password, fileProfile} = this.state.user;
    // const { email, password } = this.state.errors;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormField name="nickName" label="Nombre de usuario:" value={nickName} onChange={this.handleChange}/>
        <p>{this.state.errors.nickName}</p>
        <FormField name="email" placeholder="Nombre" label="Email:" value={email} onChange={this.handleChange} />
        <p>{this.state.errors.email}</p>
        <FormField name="password" label="Contraseña:" value={password} onChange={this.handleChange}/>
        <p>{this.state.errors.password}</p>
        <FormField name="fileProfile" type="file" label="Imagen de perfil:" value={fileProfile} onChange={this.handleChange}/>
        <Button type="submit" primary label="Submit" />
      </Form>
    )
  }
}

export default Register;