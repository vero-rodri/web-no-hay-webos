import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Box, Text } from 'grommet';
import TextAreaInput from '../misc/forms/TextAreaInput';
import InputField from '../misc/forms/InputField';
import FileInput from '../misc/forms/FileInput';
import { createForm } from '../../utils/createForm'
import evidencesService  from '../../services/evidencesService';
import errors from '../../utils/errors.json';

const getErrorText = text => errors[text];


class EvidenceCreate extends Component {
  state = {
    errors: {},
    isCreated: false
  }
  
  handleSubmit = (event) => {
    const { form } = this.props;
    event.preventDefault();
    
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        evidencesService.create(fields, 'fileProfile', 'description')
        .then(
          () => this.setState({ isCreated: true }), 
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
    if ( this.state.isCreated ) {
      return <Redirect to="/login" />
    }

    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { errors } = this.state;
    
    return (
      <Box margin="large">
      <Form onSubmit={this.handleSubmit}>

        <InputField
          label="Título:"
          placeholder="Prueba 1"
          type="search"
          {...getFieldProps('title', {
            initialValue: '',
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true}]
          })}
          errors={getFieldError('title')}
        />

        <TextAreaInput
          label="Descripción:"
          placeholder="Describe aquí tu evidencia"
          type="textarea"
          {...getFieldProps('description', {
            initialValue: ''
          })}
        />

        <FileInput
          label="Prueba gráfica:"
          form={form}
          name="fileEvidence"
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

        <Button 
        type="submit" primary label="Subir evidencia" margin={{top: "medium", bottom: "small"}} fill />
      
      </Form>
    </Box>
    )
  }
}

export default createForm()(EvidenceCreate);


