import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Text, Button, Select } from 'grommet';
import authService from '../../services/authService';
import challengesService from '../../services/challengesService';
import CardsScroll from '../../ui/CardsScroll';
import { SELECT_SORTS, MIRROR_SELECT_SORTS, LIMIT_AVATARS_LIST } from '../../constants';


class ChallengeDetail extends Component {
  
  state = {
    user: {},
    challenge: {},
    usersChallenge: [],
    isAlreadyJoined: false,
    isJoinedNow: '',
    optionFiltered: SELECT_SORTS['createDate']
  }

  userSubscription = undefined;

  objectIdInArray = (userId, userChallenge) => {
    let arrAux = userChallenge.map(object => object.userId)
    return (arrAux.includes(userId))
  }

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
        });

        if (this.objectIdInArray(this.state.user.id, this.state.challenge.usersChallenge) ) {
          this.setState({
            ...this.state,
            isAlreadyJoined: true
            });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
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

  countUsersChallenge = () => 
    (this.state.challenge.usersChallenge) ?
      this.state.challenge.usersChallenge.length : 0;
  

  countUsersChallengeFinished = () =>   
    (this.state.challenge.usersChallenge) ?
      this.state.challenge.usersChallenge
        .filter(userChallenge => userChallenge.Finished)
        .length : 0;

  
  showUsersChallenge = () => {

    const topLikesUserChallenges = () => this.state.userChallenges
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
  
  
    const topViewsUserChallenges = () => this.state.userChallenges
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  
  
    const latestUserChallenges = () => this.state.userChallenges
      .sort((a, b) => {
        return (Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1 
      })
      .slice(0, 10);

    const { optionFiltered } = this.state;
    let userChallengesFiltered = [];
    switch (MIRROR_SELECT_SORTS[optionFiltered]) {
      case "likes": {
        userChallengesFiltered = topLikesUserChallenges();
        break;
      }
      case "views": {
        userChallengesFiltered = topViewsUserChallenges();
        break;
      }
      case "createDate": {
        userChallengesFiltered = latestUserChallenges();
        break;
      }
      default: {}
    }
    return <CardsScroll items={userChallengesFiltered} origin="challenge" />
  }

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


  render() {

    const { photo, title, description, isFinished, owner, likes, views  } = this.state.challenge;
    if ( this.state.isJoinedNow ) {
      return <Redirect to={`/user-challenges/${this.state.isJoinedNow}`} />
    }
    
    return (
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
              <h5 className="m-0">{this.countUsersChallenge()}</h5>
            </div>
            <div className="row justify-content-around align-items-center my-2 mx-1">
              <p className="m-0"><i className=" m-0 fas fa-trophy fa-lg"></i></p>
              <h5 className="m-0">{this.countUsersChallengeFinished()}</h5>
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
            <Button className="py-1 px-2 m-1" type="submit" primary label="Unirse al reto!" disabled={this.state.isAlreadyJoined} onClick={this.onClickJoin}  />
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
          <div className=" my-2">
            {this.state.challenge.usersChallenge && this.showUsersChallenge()}
          </div>
        </div>
      </div>
    )
  }
}

export default ChallengeDetail;