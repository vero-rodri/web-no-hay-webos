import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Text, Button, Form } from 'grommet';
import authService from '../../services/authService';
import challengesService from '../../services/challengesService';


class ChallengeDetail extends Component {
  state = {
    user: {},
    challenge: {},
    isAlreadyJoined: false,
    isJoinedNow: false
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
    
    challengesService.getChallengeDetail(this.props.match.params.challengeId)
      .then( challenge => {
        this.setState({
        ...this.state,
        challenge: challenge
        });
        if ( this.objectIdInArray(this.state.user.id, this.state.challenge.usersChallenge) ) {
          this.setState({
            ...this.state,
            isAlreadyJoined: true
            });
        }
      })
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
            isJoinedNow: true
          }),
        error => console.log(error)
      )
  }

  onClickChallengeOthers = () => {
    console.log('retar a otros')
    //IMPLEMENTAR LA LÓGICA PARA RETAR A OTROS!!!
  }

  render() {

    const { photo, title, description, isFinished } = this.state.challenge;

    if ( this.state.isJoinedNow ) {
      return <Redirect to={`/user-challenges/${this.state.isJoined}`} />
    }

    return (
      <div className="d-flex flex-column m-0 p-0">
        <div className="chl-det-header p-0">
          <img src={photo} alt={title}></img>
          <div className="overlay">
            <div className="text">Hello World</div>
          </div>
        </div>
    
        <div className="col-12 mt-3">
          <Text>{description}</Text>
        </div>
        <div className="col-12 mt-3 d-flex flex-row justify-content-around">
          <Button type="submit" primary label="Unirse al reto!" margin={{top: "medium", bottom: "small"}} disabled={this.state.isAlreadyJoined} onClick={this.onClickJoin}  />
          <Button type="submit" primary label="Retar a otros" margin={{top: "medium", bottom: "small"}} disabled={!isFinished} onClick={this.onClickChallengeOthers} />
        </div>
      </div>
    )
  }
}


export default ChallengeDetail;