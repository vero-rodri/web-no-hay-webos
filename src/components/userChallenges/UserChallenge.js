import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Form, Text } from 'grommet';
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
import ProgressBar from '../../ui/ProgressBar';
import { DEFAULT_ICON_OPACITY } from '../../constants'
import Modal from '../misc/Modal';
import Carousel from '../../ui/Carousel';


const getErrorText = text => errors[text];
const getIconText = text => icons[text];

class UserChallenge extends Component {

  state = {
    userChallenge: {},
    evidences: {},
    totalEvidences: 1,
    errors: {},
    challengeOwner: {},
    isFinished: false,
    isVisibleForm: false,
    rangeValue: 1,
    opacityHen: {
      opacity: "1"
    },
    opacityViking: {
      opacity: "0.15"
    },
    showModal: false,
    modalOrder: 0
  }


  componentDidMount() {
    challengesService.getUserChallengeDetail(this.props.match.params.userChallengeId)
      .then( userChallenge => {
        this.setState({
        ...this.state,
        userChallenge: userChallenge,
        evidences: userChallenge.evidences,
        isFinished: userChallenge.isFinished
        })
        if ( this.state.userChallenge.challengeId.periodicity ) {
          this.setState({
            ...this.state,
            totalEvidences: this.state.userChallenge.challengeId.duration / this.state.userChallenge.challengeId.periodicity
          })
        } 

        authService.getUserDetail(userChallenge.challengeId.owner)
          .then( challengeOwner => {
            this.setState({
              ...this.state,
              challengeOwner: challengeOwner
            })
            this.getProgressStatus();
          })
        }
      )
  }

  onClickEvidenceForm = () => {
    this.setState({
      ...this.state,
      isVisibleForm: !this.state.isVisibleForm
    })
  }

  onShowModal = (order) => {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      modalOrder: ( order >= 0 ) ? order : this.state.modalOrder
    })
  }

  getProgressStatus = () => {
    const newRangeValue = this.state.evidences.length / this.state.totalEvidences;
    const prevFinished = this.state.isFinished;
    this.setState({
      ...this.state,
      rangeValue: newRangeValue,
      opacityHen: {
        opacity: (newRangeValue === 1 ) ? DEFAULT_ICON_OPACITY : 1 - newRangeValue  
      },
      opacityViking: {
        opacity: (newRangeValue === 0 ) ? DEFAULT_ICON_OPACITY : newRangeValue
      },
      isFinished: newRangeValue === 1
    }, () => {
      if ( newRangeValue === 1 && this.state.isFinished !== prevFinished ) {
        challengesService.updateUserChallenge(this.state.userChallenge.id, this.state.isFinished)
          .then(console.log("actualiza la API a ", this.state.isFinished))
      } 
      if ( newRangeValue !== 1 && this.state.isFinished !== prevFinished ) {
        challengesService.updateUserChallenge(this.state.userChallenge.id, this.state.isFinished)
          .then(console.log("actualiza la API a ", this.state.isFinished))
      }
    })

  }

  onDeleteEvidence = (evidenceId) => {
    const newEvidences = this.state.evidences.filter(evidence => evidenceId !== evidence.id)
    this.setState({
      ...this.state,
      evidences: newEvidences
    },() => {this.getProgressStatus()
      evidencesService.evidenceDelete(this.state.userChallenge.id, evidenceId)
      }
    )
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
                    console.log(evidences)
                    this.setState({
                    ...this.state,
                    evidences: evidences.reverse()
                    })
                    this.getProgressStatus();
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
                totalEvidences, 
                rangeValue, 
                challengeOwner,
                isFinished, 
                opacityHen, 
                modalOrder,
                opacityViking } = this.state;
        const currentEvidences = totalEvidences - evidences.length
        
        return (
          <div className="container">
            {this.state.showModal && (
              <Modal>
                <div className="col-2 modal-col">
                  <div className="modal-header">
                    <div className="mb-1 pr-5 align-self-end">
                      <h5>{userChallenge.challengeId.title}</h5>
                      <div className="mt-3">
                        <span><small>Reto de </small></span>
                        <img className="rounded-circle avatar-user ml-1" src={challengeOwner.avatarURL} alt={challengeOwner.nickName}></img>
                        <span className="mx-1 pl-1"><strong>{challengeOwner.nickName}</strong></span>
                      </div>
                    </div>
                    <div className="modal-close" onClick={this.onShowModal}><i className="fas fa-times-circle"></i></div>
                  </div>
                </div>
                <div className="col-8 modal-col">
                  <Carousel evidences={evidences} order={modalOrder}/>
                </div>
                <div className="col-2 modal-col">
                  <div className="" >{evidences[0].comments}</div>
                  <div className="" >
                    <Moment className="h6" format="DD/MM/YYYY">{evidences[0].createdAt}</Moment>
                  </div>
                </div>

              </Modal>
            )}
            { userChallenge.challengeId && !this.state.isVisibleForm &&
            <Link to={`/challenges/${userChallenge.challengeId.id}`} className="no-decoration">
              <div className="challenge-summary row mx-2 px-3 justify-content-start">
                <div className="col-6 p-0">
                  <img className="user-challenge-img" src={userChallenge.challengeId.photo} alt={userChallenge.challengeId.id}></img> 
                </div>
                <div className="col-6 p-0 challenge-descrp">
                  <div className="h6">{userChallenge.challengeId.title}</div>
                  <div >
                    <span><small>Creado por:</small></span>
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
                { ( !isFinished ) &&
                  <div className="add-evidence-btn" onClick={this.onClickEvidenceForm}>
                    <i className="fas fa-plus-circle text-white"></i>
                  </div>
                }
                { evidences && evidences.length === 0 && (
                <div className="row ml-2">
                  <div className="default-card mr-2"/>
                  <div className="default-card mr-2"/>
                </div>
                )}
                { evidences && evidences.length > 0 && (
                <div className="col cards-scroll user-challenge-scroll">
                  <CardScroll items={evidences} 
                              origin="userChallenge" 
                              onDeleteEvidence={this.onDeleteEvidence} 
                              onShowModal={this.onShowModal}
                  />
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
              { ( currentEvidences > 1 ) && (
                <p className="mb-4">Faltan { currentEvidences } logros para superar el reto</p>
              )}
              { ( currentEvidences === 1 ) && (
                <p className="mb-4">Falta { currentEvidences } logro para superar el reto</p>
              )}
              { ( currentEvidences === 0 ) && (
                <p className="mb-4 h5 font-weight-bold text-danger">Reto superado!</p>
              )}
            </div>

            <div className="achievement">
              <div><img src={getIconText("hen")} alt="hen" style={opacityHen}/></div>
              <div className="pl-1 pr-2">
                <ProgressBar gradient={ ( rangeValue === 0 ) ? 90 : 100 - (rangeValue * 100) }/>
              </div>
              <div><img src={getIconText("viking")} alt="viking" style={opacityViking}/></div>
            </div>
          </div>
        );
    }
  }

export default createForm()(UserChallenge);