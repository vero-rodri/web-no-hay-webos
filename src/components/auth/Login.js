import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Form, Button, Box, Text } from 'grommet';
import InputField from '../misc/forms/InputField';
import { createForm } from '../../utils/createForm'
import authService  from '../../services/authService';
import errors from '../../utils/errors.json';

const getErrorText = text => errors[text];

class Login extends Component {
  state = {
    errors: {},
    isAuthenticated: false
  }

  handleSubmit = event => {
    const { form } = this.props;
    event.preventDefault();

    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        authService.authenticate(fields)
        .then(
          () => this.setState({ isAuthenticated: true }), 
          error => {
            const { error: errorResponse } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errorResponse
              }
            })
        }) 
      }
    });
  };


  render() {

    if ( this.state.isAuthenticated ) {
      return <Redirect to="/board" />
    }

    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { errors } = this.state;

    return (
      <Box margin="large">
        <Form onSubmit={this.handleSubmit}>

          <InputField
            label="Email:"
            placeholder="reinadedragones@example.com"
            type="search"
            {...getFieldProps( 'email', {
              initialValue: '',
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true }]
            })}
            errors={getFieldError('email')}
          />

          <InputField
            label="Contraseña:"
            placeholder="123Abc"
            type="password"
            {...getFieldProps('password', {
              initialValue: '',
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true }]
            })}
            errors={getFieldError('password')}
          />

          {errors && Object.keys(errors).length > 0 && (
            Object.keys(errors).map((key, index) => (
            <Box key={index}>
              <Text
                alignSelf="center"
                size="small" 
                color="status-error" 
                margin={{top: "medium", left:"small"}}>
                {getErrorText(errors[key])}
              </Text>
            </Box>
            )) 
          )}

          <Button 
          type="submit" primary label="Iniciar sesión" margin={{top: "medium", bottom: "small"}} fill />
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
