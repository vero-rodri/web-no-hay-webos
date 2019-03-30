import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Form, Button, Box, Text } from 'grommet';
import InputField from '../misc/forms/InputField';
import { createForm } from '../../utils/createForm'
import authService  from '../../services/authService';


class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {},
    isAuthenticated: false
  }


  handleChange =(name, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  // handleChange = (event) => {
  //   console.log('entra en handleChange')
  //   const {name, value} = event.target;
  //   this.setState({
  //     user: {
  //       ...this.state.user,
  //       [name] : value
  //     }
  //     // errors: {
  //     //   ...this.state.errors,
  //     //   [name]: validators[name] && validators[name](value)
  //     // }
  //   })
  // }


  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   if ( !Object.values(this.state.errors).some(error => error !== undefined)) {
  //     authService.authenticate(this.state.user)
  //       .then(
  //         () => this.setState({ isAuthenticated: true }), 
  //         error => {
  //           const { message, errors } = error.response.data;
  //           this.setState({
  //             errors: {
  //               ...this.state.errors,
  //               ...errors,
  //               password: message
  //             }
  //         })
  //       })
  //   }
  // }

  handleSubmit = event => {
    const { form } = this.props;
    event.preventDefault();

    form.validateFields((errors, fields) => {
      console.log({ errors });
      console.log({ fields });
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        authService.authenticate(this.state.user)
        .then(
          () => this.setState({ isAuthenticated: true }), 
          error => {
            const { message, errors } = error.response.data;
            // this.setState({
            //   errors: {
            //     ...this.state.errors,
            //     ...errors,
            //     password: message
            //   }
          // })
        }) 
        //aquí no falta la promesa que recoge los errores del back??
      }
    });
  };


  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { email, password } = this.state.user;

    if ( this.state.isAuthenticated ) {
      return <Redirect to="/challenges" />
    }

    return (
      <Box margin="large">
        <Form onSubmit={this.handleSubmit}>

          <InputField
            label="Email:"
            placeholder="reinadedragones@example.com"
            type="text"
            name="email"
            value={email}
            handleChange={this.handleChange}
            {...getFieldProps('email', {
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true }]
            })}
            errors={getFieldError('email')}
          />

          <InputField
            label="Contraseña:"
            placeholder="123aBc"
            type="password"
            name="password" 
            value={password}
            handleChange={this.handleChange}
            {...getFieldProps('password', {
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true }]
            })}
            errors={getFieldError('password')}
          />

          <Button type="submit" primary label="Iniciar sesión" margin={{top: "medium", bottom: "small"}} fill />
        </Form>
        <Text size="small" alignSelf="center">
          ¿Aún no tienes una cuenta? 
          <Link to="/register" style={{ "textDecoration": "none", "fontWeight": "bold", "color": "#404040" }}>  Regístrate</Link>
        </Text>
      </Box>
    )
  }
}

export default createForm()(Login);
