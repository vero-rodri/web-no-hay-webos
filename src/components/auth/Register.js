import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Box, Text } from 'grommet';
import InputField from '../misc/forms/InputField';
import FileInput from '../misc/forms/FileInput';
import { createForm } from '../../utils/createForm'
import {
  checkEmail,
  checkPassword
} from '../../utils/formValidators';
import authService  from '../../services/authService';
import errors from '../../utils/errors.json';
import icons from '../../utils/icons.json';

const getErrorText = text => errors[text];
const getIconText = text => icons[text];

 
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
            const { error: errorResponse } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errorResponse.errors,
              }
          })
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
    <div className="main-bg">
      <div ><img className="logo register" src={getIconText("logo")} alt="logo" ></img></div>
      <div className="intro-form-container">
        <Form onSubmit={this.handleSubmit}>

          <InputField
            label="Nombre:"
            placeholder="Daenerys"
            type="search"
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
            type="search"
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
            name="fileProfile"
          />

          {errors && Object.keys(errors).length > 0 && (
            Object.keys(errors).map((key, index) => (
            <Box key={index}>
              <Text 
                alignSelf="center"
                size="small" 
                color="status-error" 
                margin={{top: "medium", left:"small"}}>
                {getErrorText(errors[key].message)}
              </Text>
            </Box>
            )) 
          )}

          <Button style={{height: "45px"}} className="login-btn"
          type="submit" primary label="Registrarme" margin={{top: "medium", bottom: "small"}} fill />
        
        </Form>

        <Text size="small" alignSelf="center">
          ¿Ya estás registrado? 
          <Link to="/login" style={{ "textDecoration": "none", "fontWeight": "bold", "color": "#404040" }}>  Entra</Link>
        </Text>
      </div>
    </div>
    )
  }
}

export default createForm()(Register);


