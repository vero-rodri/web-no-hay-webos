import React, { Component } from 'react';
import NotificationItem from './NotificationItem';
import userChallengesService from '../../services/userChallengesService';
import { Redirect } from 'react-router-dom'

class Notifications extends Component {
  
  state = { 
    userChallengesPending: [],
    goToBoard: false
  }

  usersChallengesPendingSubscription = undefined;
  
  componentDidMount() {

    this.userChallengesPendingSubscription = userChallengesService.onUserChallengesPendingChange().subscribe((userChallengesPending) => {
      this.setState({
        userChallengesPending: userChallengesPending
      })
    });
  }

  componentWillUnmount() {
    this.userChallengesPendingSubscription.unsubscribe()
  }

  handleRejectUserChallenge = (userChallengeId) => {
    console.log("rechazando...", userChallengeId)
    userChallengesService.rejectUserChallenge(userChallengeId)
  }

  listNotifications = () => {
    if ( this.state.userChallengesPending.length !== 0 ) {
      return this.state.userChallengesPending.map((userChallengePending, index) =>
          <NotificationItem key={index} {...userChallengePending} handleRemove={this.handleRejectUserChallenge} />)
    } else {
      return (
        <div className="m-4 text-center">
          <h5 className="mt-5 pt-5">No tienes ninguna notificación pendiente</h5>
        </div>
      )
      // return this.setState({
      //   ...this.state,
      //   goToBoard: true
      // })
    }

  }
  
  
  render() {

    // if ( this.state.goToBoard ) {
    //   return <Redirect to="/board" />
    // }

    return (
      <div>
        {this.listNotifications()}
      </div>
    )
  }
}

export default Notifications