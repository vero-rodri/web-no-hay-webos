import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Select, FormField } from 'grommet';
import authService from '../../services/authService';
import challengesService from '../../services/challengesService';
import CardsScroll from '../../ui/CardsScroll';
import { SELECT_SORTS, MIRROR_SELECT_SORTS, LIMIT_AVATARS_LIST } from '../../constants';
import { listByFilters } from '../../utils/handleLogicSelects';
import Modal from '../misc/Modal';


class ChallengeDetail extends Component {
  
  state = {
    user: {},
    challenge: {},
    userChallenges: [],
    isAlreadyJoined: false,
    isJoinedNow: '',
    optionFiltered: SELECT_SORTS['likes'],
    showModal: false,
    itemToShow: {},
    modalOrder: 0
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

      Promise.all([p1, p2])
      .then(([challenge, userChallenges]) => {
        this.setState({
        ...this.state,
        challenge: challenge,
        userChallenges: userChallenges
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
    console.log('retar a otros')
    //IMPLEMENTAR LA LÓGICA PARA RETAR A OTROS!!!
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

  onShowModal = (order, itemId) => {
    const item = this.state.userChallenges.filter( userChallenge => userChallenge.id === itemId ); 
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      modalOrder: ( order >= 0 ) ? order : this.state.modalOrder,
      itemToShow: item[0]
    })
  }


  render() {

    
    const { photo, title, description, isFinished, owner, likes, views  } = this.state.challenge;
    const { optionFiltered, userChallenges, user, modalOrder, itemToShow } = this.state;
   
    
    if ( this.state.isJoinedNow ) {
      return <Redirect to={`/user-challenges/${this.state.isJoinedNow}`} />
    }
    
    return (
      <div>
        {this.state.showModal && (
          <Modal title={title} 
                  propAvatar={itemToShow.userId.avatarURL} 
                  propNickname={itemToShow.userId.nickName} 
                  evidences={itemToShow.evidences} 
                  modalOrder={modalOrder}
                  onShowModal={this.onShowModal}
          />
        )}

        <div className="d-flex flex-column m-0 p-0">
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
            <div className="col-12 m-0 d-flex flex-row justify-content-around">
              <Button className="py-1 px-2 m-1" type="submit" primary label="Unirse al reto!" disabled={this.objectIdInArray(user.id, userChallenges)} onClick={this.onClickJoin}  />
              <Button className="py-1 px-2 m-1" type="submit" primary label="Retar a otros" disabled={!isFinished} onClick={this.onClickChallengeOthers} />
            </div>

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
            
            <CardsScroll 
              items={listByFilters(userChallenges, "userChallenge", MIRROR_SELECT_SORTS[optionFiltered])} 
              type="userChallenge" 
              origin="challenge"
              textAlternative="No ha habido Webos aún de hacer este reto..."
              onShowModal={this.onShowModal} 
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChallengeDetail;
