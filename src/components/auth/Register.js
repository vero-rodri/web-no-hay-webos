import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Box, Text } from 'grommet';
import InputField from '../misc/forms/InputField';
import { createForm } from '../../utils/createForm'
import {
  checkEmail,
  checkPassword
} from '../../utils/formValidators';
import authService  from '../../services/authService';
import errors from '../../errors.json';
import FileInput from '../misc/forms/FileInput';

const getErrorText = text => errors[text];


class Register extends Component {
  state = {
    errors: {},
    isRegistered: false
  }
  
  handleSubmit = (event) => {
    const { form } = this.props;
    event.preventDefault();

    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        authService.register(fields, 'fileProfile')
        .then(
          () => this.setState({ isRegistered: true }), 
          error => {
            // const { message, error: errorResponse } = error.response.data;
            // this.setState({
            //   errors: {
            //     ...this.state.errors,
            //     ...errorResponse.errors,
          //   //   }
          // })
        }) 
      }
    });
  };



  
  render() {
    if ( this.state.isRegistered ) {
      return <Redirect to="/login" />
    }

    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { errors } = this.state;

    return (
      <Box margin="large">
      <Form onSubmit={this.handleSubmit}>

        <InputField
          label="Nombre:"
          icon="fas fa-user-astronaut"
          placeholder="Daenerys"
          type="text"
          {...getFieldProps('nickName', {
            initialValue: '',
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true}]
          })}
          errors={getFieldError('nickName')}
        />

        <InputField
          label="Email:"
          placeholder="reinadedragones@example.com"
          type="text"
          {...getFieldProps( 'email', {
            initialValue: '',
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true, validator: checkEmail }]
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
            rules: [{ required: true, validator: checkPassword }]
          })}
          errors={getFieldError('password')}
        />

        <FileInput
          label="Imagen de perfil:"
          form={form}
          errors={getFieldError('password')}
        />

        <Button type="submit" primary label="Registrarme" margin={{top: "medium", bottom: "small"}} fill />
      
      </Form>
      {errors && Object.keys(errors).length > 0 && (
        Object.keys(errors).map(key => (
          <p>Error: {getErrorText(errors[key].message)}</p>
        ))
      )}
      <Text size="small" alignSelf="center">
        ¿Ya estás registrado? 
        <Link to="/login" style={{ "textDecoration": "none", "fontWeight": "bold", "color": "#404040" }}>  Entra</Link>
      </Text>
    </Box>
    )
  }
}

export default createForm()(Register);


