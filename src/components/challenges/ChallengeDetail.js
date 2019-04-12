import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextArea, Button, Select, FormField, Form } from 'grommet';
import authService from '../../services/authService';
import usersService from '../../services/usersService';
import challengesService from '../../services/challengesService';
import userChallengesService from '../../services/userChallengesService';
import CardsRow from '../../ui/CardsRow';
import { SELECT_SORTS, MIRROR_SELECT_SORTS, LIMIT_AVATARS_LIST } from '../../constants';
import { listByFilters } from '../../utils/handleLogicSelects';
import Modal from '../misc/Modal';
import SelectUsers from '../../ui/SelectUsers';
import EvidencesModal from '../../ui/EvidencesModal';
import ModalSendChallenge from '../misc/ModalChallenge/ModalSendChallenge';

class ChallengeDetail extends Component {
  
  state = {
    user: {},
    challenge: {},
    userChallenges: [],
    userChallengesOwns: [],
    isAlreadyJoined: false,
    isJoinedNow: '',
    optionFiltered: SELECT_SORTS['likes'],
    showModalEvidences: false,
    showModalSendChallenge: false,
    itemToShow: {},
    modalOrder: 0,
    listAllUsersEnabledForSending: [],
    //usersSelectedForSending: [],
    comeBackToNotifications: false,
    // email: '',
    // emailsList : []
  }

  userSubscription = undefined;


  componentWillMount() {
  }
    
  
  componentDidMount() {
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      this.setState({
        ...this.state,
        user: user
      })
    })
     
     
     
     
     
     
      /*  usersService.getUserChallengesByUser(user.id)
        .then(userChallengesOwns => {
          // console.log("la session es ", this.state.user)
          this.setState({ 
            ...this.state,
            user: user,
            userChallengesOwns: [...userChallengesOwns] 
          }) */




    const p1 = challengesService.getChallengeDetail(this.props.match.params.challengeId);
    const p2 = userChallengesService.getUserChallengesFinishedByChallenge(this.props.match.params.challengeId);  
    const p3 = userChallengesService.getUserChallengesNoRefuseByChallenge(this.props.match.params.challengeId)
    

      Promise.all([p1, p2, p3])
      .then(([challenge, userChallenges, userChallengesOwns]) => {
        this.setState({
        ...this.state,
        challenge: challenge,
        userChallenges: userChallenges,
        userChallengesOwns: userChallengesOwns
        })
      })
      .catch(err => console.log(err));
    }


  componentWillUnmount() {
    this.userSubscription.unsubscribe();
  }


  objectIdInArray = (userId, arr) => {
    console.log("JODERRRRRRRR", userId, arr);
    if (arr.length) {
      console.log(arr.userId)
    let userIdAux = JSON.stringify(userId);
    let arrAux = arr.map(object => JSON.stringify(object.userId.id));
    return arrAux.includes(userIdAux);
    }
  }


  onClickJoin = () => {       
    userChallengesService.createUserChallenge(this.state.challenge.id)
      .then(
        (response) => 
          this.setState({
            ...this.state,
            isJoinedNow: response.id
          }),
        error => console.log(error)
      )
  }


  onClickChallengeOthers = () => {
    usersService.getUsersEnabledForSending(this.state.challenge.id)
      .then(response => {
        this.setState({
          ...this.state,
          showModalSendChallenge: !this.state.showModalSendChallenge,
          listAllUsersEnabledForSending: [...response.filter(user => JSON.stringify(this.state.user.id) !== JSON.stringify(user.id))]
         // pruebaSelect: true
        })
      })
    //IMPLEMENTAR LA LÓGICA PARA RETAR A OTROS!!!
  }

  onHideModalSendChallenge = () => {
    console.log("oculandodo modalll")
    this.setState({
      ...this.state,
      showModalSendChallenge: false
    })
  }

  countUserChallenges = () => 
    (this.state.challenge.userChallenges) ?
      this.state.challenge.userChallenges.length : 0;
  

  countUserChallengesFinished = () =>   
    (this.state.challenge.userChallenges) ?
      this.state.challenge.userChallenges
        .filter(userChallenge => userChallenge.Finished)
        .length : 0;


  createListAvatarsUserChallenges = () => {
    const { userChallenges } = this.state;
    if (this.state.userChallenges) {
      return this.state.userChallenges
      .slice(0, LIMIT_AVATARS_LIST)
          .map((userChallenge, index, arr) => {
            if (index === (arr.length-1) && (userChallenges.length > arr.length)) {
              return (
                <li key={index} className="avatars-others">
                  <span className="avatars-others">+{1 + userChallenges.length - arr.length}</span>
                </li>
              )
            } else {
              return (
                <li key={index} className="avatars-item">
                  <img src={userChallenge.userId.avatarURL} className="avatars-img" alt={`img-${userChallenge.userId.nickName}`}></img>
                </li>
              ) 
            }
          })
    }
  }

  onShowModalEvidences = (order, itemId) => {
    const item = this.state.userChallenges.filter( userChallenge => userChallenge.id === itemId ); 
    this.setState({
      ...this.state,
      showModalEvidences: !this.state.showModalEvidences,
      modalOrder: ( order >= 0 ) ? order : this.state.modalOrder,
      itemToShow: item[0]
    })
  }

  onAcceptChallenge = (event) => {
    const { userChallengeId } = this.props.location.state
    userChallengesService.acceptUserChallenge(userChallengeId)
      .then(response =>
        this.setState({
          ...this.state,
          isJoinedNow: userChallengeId
        }),
      error => console.log(error));
  }

  onRefuseUserChallenge = (event) => {
    const { userChallengeId } = this.props.location.state
    userChallengesService.deleteUserChallenge(userChallengeId)
      .then(() => 
        this.setState({
          ...this.state,
          comeBackToNotifications: true
        }))
  }


  render() {

    const { photo, title, description, isFinished, owner, likes, views  } = this.state.challenge;

    const { optionFiltered, userChallenges, user, challenge, listUsers, ListUsersFiltered, modalOrder, itemToShow, listAllUsersEnabledForSending, userChallengesOwns } = this.state;
    console.log("la var USERCHALLENGES trae..", userChallenges)
    console.log("la var UC_OWNSS ..", userChallengesOwns)

    
    if ( this.state.isJoinedNow ) {
      return <Redirect to={`/user-challenges/${this.state.isJoinedNow}`} />
    }

    if ( this.state.comeBackToNotifications ) {
      return <Redirect to={`/notifications`} />
    }

    return (

      <div className="d-flex flex-column m-0 p-0">

        {/* //vamos a probar a mostrar el modal de la sigueinte manera...en otro componente *=> FUNCIONA*/}        
        {this.state.showModalSendChallenge && 
        <ModalSendChallenge
          usersEnabled={listAllUsersEnabledForSending}
          onHideModal={this.onHideModalSendChallenge}
          user={user}
          challenge={challenge}
          />
        }

        {this.state.showModalEvidences && (
          <Modal>
          <EvidencesModal title={title} 
                          propAvatar={itemToShow.userId.avatarURL} 
                          propNickname={itemToShow.userId.nickName} 
                          evidences={itemToShow.evidences} 
                          modalOrder={modalOrder}
                          onShowModal={this.onShowModalEvidences}
          />
          </Modal>
        )}
      
        <div className="chl-det-header p-0">
          <img src={photo} alt={title}></img>
          <div className="overlay p-0 container">
          <div className="">
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><i className="m-0 fas fa-thumbs-up fa-lg"></i></p>
              <h5 className="m-0">{likes}</h5>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><i className=" m-0 fas fa-eye fa-lg"></i></p>
              <h5 className="m-0">{views}</h5>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><i className=" m-0 fas fa-users fa-lg"></i></p>
              <h5 className="m-0">{this.countUserChallenges()}</h5>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><i className=" m-0 fas fa-trophy fa-lg"></i></p>
              <h5 className="m-0">{this.countUserChallengesFinished()}</h5>
            </div>
          </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12 mt-2 p-0">
            <h3><u>{title}</u></h3>
            <span>{description}</span>
            <p className="m-0 text-right">Creado por:  
              <img src={owner && owner.avatarURL} className="avatar-user rounded-circle ml-2 mr-1"></img>
              <span className="font-weight-bold">{owner && owner.nickName }</span>
            </p>
          </div>
          <hr className="my-1"></hr>

          {this.props.location.pathname.startsWith('/notifications') 
            && (<div className="col-12 m-0 d-flex flex-row justify-content-around">
                  <Button className="py-1 px-2 m-1" type="button" primary label="Acepto reto!" onClick={this.onAcceptChallenge}  />
                  <Button className="py-1 px-2 m-1" type="button" primary label="Creo que paso" onClick={this.onRefuseUserChallenge} />
                </div>
          )}

          {this.props.location.pathname.startsWith('/challenges')
            && (<div className="col-12 m-0 d-flex flex-row justify-content-around">
                  <Button className="py-1 px-2 m-1" type="button" primary label="Unirse al reto!" disabled={this.objectIdInArray(user.id, userChallengesOwns)} onClick={this.onClickJoin}  />
                  <Button className="py-1 px-2 m-1" type="button" primary label="Retar a otros" onClick={this.onClickChallengeOthers} />
                </div>
          )}




            <h6 className="mt-3">Logros conseguidos por otros usuarios:</h6>
            <div className="row justify-content-between align-items-center my-1">

              <div className="col">
              <ul className="avatars">
                { this.createListAvatarsUserChallenges()}
              </ul>
              </div>
              <div className="col-5">
                <FormField>
                  <Select
                    className="p-1"
                    placeholder="Ordenar por"
                    options={Object.values(SELECT_SORTS)}
                    value={this.state.optionFiltered}
                    size="small"
                    onChange={event => { this.setState({ optionFiltered: event.option })}}
                  />
                </FormField>
              </div>
            </div>
            
            <CardsRow
              items={listByFilters(userChallenges, "userChallenge", MIRROR_SELECT_SORTS[optionFiltered])} 
              type="userChallenge" 
              origin="challenge"
              textAlternative="No ha habido Webos aún de hacer este reto..."
              onShowModal={this.onShowModalEvidences} 
            />
        </div>
      </div>
    )
  }
}

export default ChallengeDetail;

