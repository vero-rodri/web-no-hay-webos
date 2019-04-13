import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../Modal';
import { Button, Form } from 'grommet';
import userChallengesServices from '../../../services/userChallengesService';
import SelectUsers from '../../../ui/SelectUsers';
import EmailItem from './EmailItem';
import EmailInput from './EmailInput';
//import transporter from '../../utils/nodemailer.config'
import emailsService from '../../../services/emailsService';
import './ModalChallenge.css';


class ModalSendChallenge extends Component {

  state = {
    usersSelected: [],
    email: '',
    comment: '',
    emailsList: []
  }

  listUsersOptions = () => this.props.usersEnabled.map((user, index) => {
    return {
      ...user,
      label: user.nickName,
      value: index
    }});

  handleChangeUsersSelectedModal = (event) => {
    this.setState({
      ...this.state,
      usersSelected: event
    })
  } 

  handleCommentModal = (event) => {
    this.setState({
      ...this.state,
      comment: event.target.value
    })
  }


  handleSubmitModal = (event) => {
    event.preventDefault();

    const { user, challenge, location } = this.props;
    const { comment, usersSelected, emailsList } = this.state;
    const body = {
      message: comment,
      sender: user.id,
      usersId: usersSelected.map(user => user.id),
      challengeId: challenge.id
    };

    const p1 = userChallengesServices.createUserChallengesByNotifications(body);
    const p2 = emailsService.sendEmails({ sender: user, 
                                          emails: emailsList, 
                                          challenge:challenge, 
                                          pathname: location.pathname,
                                          message: comment
                                        });

    Promise.all([p1, p2])
      .then(([userChallenges, _]) => {
      })

    this.props.onHideModal()
  }

 

  addEmailToList = (email) => { 
    if (!this.state.emailsList.includes(email)) {
      this.setState({
        ...this.state,
        emailsList: [
          ...this.state.emailsList,
          email
        ]
      })
    }
  }


  handleDeleteEmail = (emailToDelete) => {
    this.setState({
      ...this.state,
      emailsList: [
        ...this.state.emailsList.filter(email => email !== emailToDelete)
      ]
    })
  }


  listEmails = () => {
    return this.state.emailsList.map((email, index) => 
      <EmailItem key={index} email={email} handleDelete={this.handleDeleteEmail}></EmailItem>)
  }

  
  render() {
    const { emailsList, usersSelected, comment } = this.state;
    return (
      <Modal>
            <div className=" align-items-center">
              <div className="modal-close" onClick={() =>this.props.onHideModal()}>
                <span className="text-right w-100"><i className="fas fa-times-circle"></i></span>
              </div>
              <div className="py-3 text-center">
                <h5>Lanza este reto a algún amig@!!</h5>
              </div>
              <Form onSubmit={this.handleSubmitModal}>
                <div className="py-3">
                <h6>Puedes notificar a cualquier usuario de la aplicación que aún no esté participando</h6>
                  <SelectUsers  className="react-select-container" 
                                handleChange={this.handleChangeUsersSelectedModal}
                                options={this.listUsersOptions()}
                                value={this.state.usersSelected}
                                placeholder="Puedes escoger a uno o a varios..."
                  />
                </div>
                
                <div className="py-3">
                  <h6>...o puedes mandar este reto por email a algún amig@</h6>
                  <EmailInput addEmail={this.addEmailToList} />
                  {this.listEmails()}
                </div>
                
                <div className="py-3">
                  <h6>Añade un mensaje para picarles...</h6>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="¿¿Hay Webos a..." 
                            value={comment}
                            onChange={this.handleCommentModal}>
                  </textarea>
                </div>

                <div className="d-flex justify-content-center py-3">
                  <Button type="submit" 
                          size="large" 
                          primary  
                          label="Notificar!"
                          // disabled={!usersSelected.length && !emailsList.length}
                          className={ !usersSelected.length && !emailsList.length && "btn-disabled"}
                          />
                </div>
              </Form>
            </div>
          </Modal>
    )
  }
}

export default withRouter(ModalSendChallenge);
