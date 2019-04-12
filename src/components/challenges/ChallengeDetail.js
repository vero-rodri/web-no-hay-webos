import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { TextArea, Button, Select, Form } from 'grommet';
import authService from '../../services/authService';
import usersService from '../../services/usersService';
import challengesService from '../../services/challengesService';
import CardsRow from '../../ui/CardsRow';
import { SELECT_SORTS, MIRROR_SELECT_SORTS, LIMIT_AVATARS_LIST } from '../../constants';
import { listByFilters } from '../../utils/handleLogicSelects';
import Modal from '../misc/Modal';
import SelectUsers from '../../ui/SelectUsers';
import userChallengesService from '../../services/userChallengesService';
import EvidencesModal from '../../ui/EvidencesModal';
import ModalSendChallenge from '../misc/ModalChallenge/ModalSendChallenge';
import icons from '../../utils/icons.json';


const getIconText = text => icons[text];

class ChallengeDetail extends Component {
  
  state = {
    user: {},
    challenge: {},
    userChallenges: [],
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


  
  componentDidMount() {
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      this.setState({
        ...this.state,
        user: user
      })
    })

    const p1 = challengesService.getChallengeDetail(this.props.match.params.challengeId)
    const p2 = challengesService.getUserChallengesFinishedByChallenge(this.props.match.params.challengeId)
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


  objectIdInArray = (userId, userChallenge) => {
    let userIdAux = JSON.stringify(userId);
    let arrAux = userChallenge.map(object => JSON.stringify(object.userId.id));
    return arrAux.includes(userIdAux);
  }


  onClickJoin = () => {       
    challengesService.createUserChallenge(this.state.challenge.id)
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
        })
      })
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

    
    const { id, photo, title, description, owner, likes, views  } = this.state.challenge;

    const { optionFiltered, userChallenges, user, challenge, listUsers, ListUsersFiltered, modalOrder, itemToShow, listAllUsersEnabledForSending } = this.state;
   
    if ( this.state.isJoinedNow ) {
      return <Redirect to={`/user-challenges/${this.state.isJoinedNow}`} />
    }

    if ( this.state.comeBackToNotifications ) {
      return <Redirect to={`/notifications`} />
    }

    return (

      <div className="d-flex flex-column m-0 p-0">


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
          <EvidencesModal id={id}
                          title={title} 
                          propAvatar={itemToShow.userId.avatarURL} 
                          propNickname={itemToShow.userId.nickName} 
                          evidences={itemToShow.evidences} 
                          modalOrder={modalOrder}
                          onShowModal={this.onShowModalEvidences}
                          isChallenge
          />
          </Modal>
        )}
      
        <div className="chl-det-header p-0">
          <img src={photo} alt={title}></img>
          <div className="overlay p-0 container">
          <div className="row overlay-icons">
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0" style={{color: "#0297dc"}}><i className=" m-0 fas fa-eye fa-lg"></i></p>
              <h6 className="m-0">{views}</h6>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0" style={{color: "rgb(249, 46, 46)"}}><i className="m-0 far fa-heart fa-lg"></i></p>
              <h6 className="m-0">{likes}</h6>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><img src={getIconText("fight")} alt="participants" style={{height: "30px", width: "30px"}}/></p>
              <h6 className="m-0">{this.countUserChallenges()}</h6>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><img src={getIconText("viking")} alt="viking" style={{height: "30px", width: "30px"}}/></p>
              <h6 className="m-0">{this.countUserChallengesFinished()}</h6>
            </div>
          </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12 mt-2 p-0">
            <h3 className="mt-3">{title}</h3>
            <p className="mb-2 text-justify">{description}</p>
            <div className="mr-2 text-right">
              <div>
                <small>Creado por:</small>
                <div>
                  <img src={owner && owner.avatarURL} className="avatar-user rounded-circle ml-2 mr-1" alt=""></img>
                  <span className="font-weight-bold">{owner && owner.nickName }</span>
                </div> 
              </div>
            </div>
          </div>
          <hr className="my-1"></hr>

          {this.props.location.pathname.startsWith('/notifications') 
            && (<div className="col-12 my-2 d-flex flex-row justify-content-around">
                  <Button className="py-1 px-2 m-1" type="button" primary label="Acepto reto!" onClick={this.onAcceptChallenge}  />
                  <Button className="py-1 px-2 m-1" type="button" primary label="Creo que paso" onClick={this.onRefuseUserChallenge} />
                </div>
          )}

          {this.props.location.pathname.startsWith('/challenges')
            && (<div className="col-12 my-2 d-flex flex-row justify-content-around">
                  <Button className="py-1 px-2 m-1" type="button" primary label="Únete al reto!" disabled={this.objectIdInArray(user.id, userChallenges)} onClick={this.onClickJoin}  />
                  <Button className="py-1 px-2 m-1" type="button" primary label="Reta a otros" onClick={this.onClickChallengeOthers} />
                </div>
          )}


          { userChallenges.length > 0 &&
            <Fragment> 
              <h6 className="mt-3">Ya lo han superado:</h6>
              <div className="row justify-content-between align-items-center my-1">

                <div className="col">
                <ul className="avatars">
                  { this.createListAvatarsUserChallenges()}
                </ul>
                </div>
                <div className="col-5">
                    <Select
                      className="p-1"
                      placeholder="Ordenar por"
                      options={Object.values(SELECT_SORTS)}
                      value={this.state.optionFiltered}
                      size="small"
                      onChange={event => { this.setState({ optionFiltered: event.option })}}
                    />
                </div>
              </div>
            </Fragment>
          }

            <CardsRow
              items={listByFilters(userChallenges, "userChallenge", MIRROR_SELECT_SORTS[optionFiltered])} 
              type="userChallenge" 
              origin="challenge"
              textAlternative="Aún no ha habido nadie con Webos para aceptar este reto"
              onShowModal={this.onShowModalEvidences} 
            />
        </div>
      </div>
    )
  }
}

export default ChallengeDetail;

