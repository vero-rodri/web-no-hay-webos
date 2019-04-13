import React, { Component, Fragment } from 'react';
import authService from '../../services/authService';
import { Box, Form, Text, Button } from 'grommet';
import { Redirect } from 'react-router-dom';
import InputField from '../misc/forms/InputField';
import FileInput from '../misc/forms/FileInput';
import TextAreaInput from '../misc/forms/TextAreaInput';
import SelectInput from '../misc/forms/SelectInput'
import {
  checkLength,
  checkDate,
  checkDuration,
  checkPeriodicity
} from '../../utils/formValidators';
import { createForm } from '../../utils/createForm'
import challengeSelect from '../../utils/challenge-types.json';
import challengesService  from '../../services/challengesService';
import challengeDescription from '../../utils/challenge-descriptions.json';
import errors from '../../utils/errors.json';

const challengeOptions = Object.keys(challengeSelect);

const getChallengeDescriptionText = text => {
  return challengeDescription[text];
}

const getErrorText = text => errors[text];

class ChallengeCreate extends Component {
  state = {
    user: {},
    errors: {},
    isCompleted: false
  }

  userSubscription = undefined;

  componentDidMount() {
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      this.setState({
      ...this.state,
      user: user
      })
    })
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
  }
  
  handleSubmit = (event) => {
    const { form } = this.props;
    event.preventDefault();
    
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        const updatedFields = {
          ...fields,
          owner: this.state.user.id
        }
        challengesService.createChallenge(updatedFields, 'fileChallenge')
        .then(
          (response) =>  this.setState({ challengeId: response.id }), 
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

    if ( this.state.challengeId ) {
      return <Redirect to={`/challenges/${this.state.challengeId}`} />
    }
    
    const { form } = this.props;
    const { getFieldProps, getFieldError, setFieldsValue } = form;
    const { errors } = this.state;
    return (
      <Box margin="large">
        <Form onSubmit={this.handleSubmit}>

          <InputField
            label="Nombre:"
            placeholder="Cómete un insecto!"
            type="search"
            {...getFieldProps('title', {
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
              name="fileChallenge"
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

          <SelectInput 
            options={challengeOptions}
            {...getFieldProps('type', {
              initialValue: challengeOptions[0],
              validateFirst: true,
              rules: [{ required: true }]
            })}
            correlationNames={challengeSelect}
            onChange={(option) => { setFieldsValue({ type: option.value })}}
            errors={getFieldError('type')}
          />

          { (form.getFieldValue('type') === 'default') && (
            <Box margin={{left: "small", top: "small"}}><Text size="small" color="dark-2">{getChallengeDescriptionText(form.getFieldValue('type'))}</Text></Box>
          )}
          
          { (form.getFieldValue('type') === 'punctual') && (
            <Fragment>
              <Box margin={{left: "small", top: "small"}}><Text size="small" color="dark-2">{getChallengeDescriptionText(form.getFieldValue('type'))}</Text></Box>
              
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
            </Fragment>
          )}

          { (form.getFieldValue('type') === 'periodic') && (
            <Fragment>
              <Box margin={{left: "small", top: "small"}}><Text size="small" color="dark-2">{getChallengeDescriptionText(form.getFieldValue('type'))}</Text></Box>

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
                  rules: [{ required: true, validator: checkPeriodicity }] 
                })}
                errors={getFieldError('periodicity')}
              />
            </Fragment>
          )}



          { (form.getFieldValue('type') === 'expiration') && (
            <Fragment>
              <Box margin={{left: "small", top: "small"}}><Text size="small" color="dark-2">{getChallengeDescriptionText(form.getFieldValue('type'))}</Text></Box>

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
            </Fragment>
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
