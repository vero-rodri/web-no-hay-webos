import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Form, Text, RangeInput } from 'grommet';
import InputField from '../misc/forms/InputField';
import FileInput from '../misc/forms/FileInput';
import { createForm } from '../../utils/createForm'
import challengesService from '../../services/challengesService';
import errors from '../../utils/errors.json';
import icons from '../../utils/icons.json';
import CardScroll from '../../ui/CardsScroll';
import Moment from 'react-moment';
import 'moment-timezone';
import authService from '../../services/authService';
import evidencesService from '../../services/evidencesService';


const getErrorText = text => errors[text];
const getIconText = text => icons[text];

class UserChallenge extends Component {

  state = {
    userChallenge: {},
    evidences: {},
    errors: {},
    challengeOwner: {},
    isVisibleForm: false,
    rangeValue: 4,
    opacityHen: {
      opacity: "1"
    },
    opacityViking: {
      opacity: "0.1"
    }
  }


  componentDidMount() {
    challengesService.getUserChallengeDetail(this.props.match.params.userChallengeId)
      .then( userChallenge => {
        this.setState({
        ...this.state,
        userChallenge: userChallenge,
        evidences: userChallenge.evidences
        })
        authService.getUserDetail(userChallenge.challengeId.owner)
          .then( challengeOwner => {
            this.setState({
              ...this.state,
              challengeOwner: challengeOwner
            })
          })
        }
      )
  }


  onClickEvidenceForm = () => {
    this.setState({
      ...this.state,
      isVisibleForm: true
    })
  }

  onRangeValue = () => {
    const newRangeValue = this.state.userChallenge.evidences.length
    this.setState({
      ...this.state,
      rangeValue: newRangeValue
    })
  }

  handleSubmit = (event) => {
    const { form } = this.props;
    event.preventDefault();
    
    form.validateFields((errors, fields) => {
      const userChallengeId = this.props.match.params.userChallengeId
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        challengesService.createEvidence(fields, 'fileEvidence', userChallengeId)
        .then(
          () => { this.setState({ isVisibleForm: false });
                  evidencesService.getEvidencesList(this.state.userChallenge.id)
                  .then(evidences => {
                    this.setState({
                    ...this.state,
                    evidences: evidences
                    })
                    console.log("las evidencias que llegan a UserChallenge: ", evidences);
                  })
          }       
        , 
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
  }

    
    render() {

        const { form } = this.props;
        const { getFieldProps, getFieldError } = form;
        const { errors, 
                userChallenge,
                evidences, 
                rangeValue, 
                challengeOwner, 
                opacityHen, 
                opacityViking } = this.state;
        
        return (
          <div className="container">
            { userChallenge.challengeId &&
            <Link to={`/challenges/${userChallenge.challengeId.id}`} className="no-decoration">
              <div className="challenge-summary row mx-2 px-3 justify-content-start">
                <div className="col-6 p-0">
                  <img className="user-challenge-img" src={userChallenge.challengeId.photo} alt={userChallenge.challengeId.id}></img> 
                </div>
                <div className="col-6 p-0 challenge-descrp">
                  <div className="h6">{userChallenge.challengeId.title}</div>
                  <div >
                    <span><small>Por:</small></span>
                    <div className="my-1">
                      <img className="rounded-circle avatar-user" src={challengeOwner.avatarURL} alt={challengeOwner.nickName}></img>
                      <span className="mx-1 pl-1"><strong>{challengeOwner.nickName}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            }

              <div className="d-flex justify-content-center mt-3">
                <p className="pr-2">Unido al reto el</p>
                <Moment className="h6" format="DD/MM/YYYY">{userChallenge.createdAt}</Moment>
              </div>

              <h6>Logros</h6>
              <div className="row py-2 scroll-container">
                <div className="add-evidence-btn" onClick={this.onClickEvidenceForm}>
                  <i className="fas fa-plus-circle text-white"></i>
                </div>
                { evidences && evidences.length === 0 && (
                <div className="row ml-2">
                  <div className="default-card mr-2"/>
                  <div className="default-card mr-2"/>
                </div>
                )}
                { evidences && evidences.length > 0 && (
                <div className="col cards-scroll user-challenge-scroll">
                  <CardScroll items={evidences} origin="userChallenge"/>
                </div>
                )}
              </div>

            { ( this.state.isVisibleForm ) && (
              <div>
                <Box margin="large">
                  <Form onSubmit={this.handleSubmit}>
                  
                  <FileInput
                    label="Foto o video del logro:"
                    form={form}
                    name="fileEvidence"
                  />
    
                  <InputField
                    label="Comentarios:"
                    placeholder="Uff... ha sido difícil pero lo he conseguido!"
                    type="search"
                    {...getFieldProps('comments', {
                      initialValue: '',
                      validateFirst: true,
                      validateTrigger: 'onblur'
                    })}
                    errors={getFieldError('comments')}
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
                  type="submit" primary label="Añadir logro" margin={{top: "medium", bottom: "small"}} fill />
    
                </Form>
              </Box>
            </div>
            )}

            <div className="d-flex justify-content-center mt-3 pt-2">
              <p className="mb-4">Faltan XX logros para superar el reto</p>
            </div>

            <div className="achievement">
              <div><img src={getIconText("hen")} alt="hen" style={opacityHen}/></div>
              <div className="pl-1 pr-2">
                <RangeInput value={rangeValue} min={0} max={10} step={1} onChange={this.onRangeValue}/>
              </div>
              <div><img src={getIconText("viking")} alt="viking" style={opacityViking}/></div>
            </div>
          </div>
        );
    }
  }

export default createForm()(UserChallenge);