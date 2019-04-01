import React, { Component, Fragment } from 'react';
import { Box, Form, Text, Select, Button } from 'grommet';
import { Redirect } from 'react-router-dom';
import InputField from '../misc/forms/InputField';
import FileInput from '../misc/forms/FileInput';
import TextAreaInput from '../misc/forms/TextAreaInput';
import SelectInput from '../misc/forms/SelectInput'
import {
  checkLength,
  checkDate,
  checkDuration
} from '../../utils/formValidators';
import { createForm } from '../../utils/createForm'
import challengeSelect from '../../utils/challenge-types.json';
import challengesService  from '../../services/challengesService';
import errors from '../../utils/errors.json';

const challengeOptions = Object.values(challengeSelect);
const challengeTypes = Object.keys(challengeSelect)
const getChallengeTypesText = text => {
  return Object.keys(challengeSelect).filter( elem => challengeSelect[elem] === text);
}

const getErrorText = text => errors[text];

class ChallengeCreate extends Component {
  state = {
    challengeText: challengeOptions[0],
    challengeType: challengeTypes[0],
    errors: {},
    isCompleted: false
  }
  
  setOnChange = (event) => {
    this.setState({
      challengeText: event.value,
      challengeType: getChallengeTypesText(event.value)
    })
  }
  
  handleSubmit = (event) => {
    const { form } = this.props;
    event.preventDefault();
    
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        challengesService.createChallenge(fields, 'fileProfile', 'type')
        .then(
          () => this.setState({ isCompleted: true }), 
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
      return <Redirect to="/challenges" />
    }
    
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { errors } = this.state;
    
    
    
    return (
      <Box margin="large">
        <Form onSubmit={this.handleSubmit}>

          <InputField
            label="Nombre:"
            placeholder="Un dibujo a tinta al día!"
            type="search"
            {...getFieldProps('name', {
              initialValue: '',
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true, validator: checkLength}]
            })}
            errors={getFieldError('name')}
            />

            <FileInput
              label="Imagen:"
              form={form}
              name="fileProfile"
              //controlar en el front: ES OBLIGATORIA!!
              /> 
  
          <TextAreaInput
            label="Descripción:"
            placeholder="Describe aquí tu reto"
            type="textarea"
            {...getFieldProps('description', {
              initialValue: '',
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true }]
            })}
            errors={getFieldError('description')}
          />

          <Box margin={{top: "medium"}}>
            <Text margin={{bottom: "xsmall"}}>Tipo de reto:</Text>
            <Select
              //name="type"
              options={challengeOptions}
              value={this.state.challengeText}
              onChange={this.setOnChange}
              // {...getFieldProps( 'type', {
              //   initialValue: this.state.challengeType,
              //   validateFirst: true,
              //   rules: [{ required: true }]
              // })}
              // errors={getFieldError('type')}
    
              />
            <Text>{getChallengeTypesText(this.state.challengeType)}</Text>
          </Box>

          {/* <SelectInput 
            options={challengeOptions}
            //value={}
            {...getFieldProps('type', {
              //initialValue: this.challengeOptions[0],
              getValueFromEvent: onselect,
              validateFirst: true,
              rules: [{ required: true }]
            })}
            errors={getFieldError('type')}
            /> */}
          
          { (this.state.challengeType[0] === 'punctual') && (

            <InputField
            label="Fecha:"
            type="date"
            {...getFieldProps('date', {
              initialValue: '',
              validateFirst: true,
              validateTrigger: 'onblur',
              rules: [{ required: true, validator: checkDate }] 
            })}
            errors={getFieldError('date')}
            />
          )}

          { (this.state.challengeType[0] === 'periodic') && (

            <Fragment>
                <InputField
                  label="Duración (en días):"
                  type="number"
                  {...getFieldProps('duration', {
                    initialValue: '',
                    validateFirst: true,
                    validateTrigger: 'onblur',
                    rules: [{ required: true, validator: checkDuration }] 
                  })}
                  errors={getFieldError('duration')}
                />
    
                <InputField
                label="Periodicidad (en días):"
                type="number"
                {...getFieldProps('periodicity', {
                  initialValue: '',
                  validateFirst: true,
                  validateTrigger: 'onblur',
                  rules: [{ required: true }] 
                })}
                errors={getFieldError('periodicity')}
              />
            </Fragment>


          )}


          { (this.state.challengeType[0] === 'expiration') && (

            <InputField
              label="Duración (en días):"
              type="number"
              {...getFieldProps('duration', {
                initialValue: '',
                validateFirst: true,
                validateTrigger: 'onblur',
                rules: [{ required: true, validator: checkDuration }] 
              })}
              errors={getFieldError('duration')}
            />
          )}

          <Button 
            type="submit" primary label="Crear reto" margin={{top: "medium", bottom: "small"}} fill />
        
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

        </Form>
      </Box>
    );
  }
}

export default createForm()(ChallengeCreate);
