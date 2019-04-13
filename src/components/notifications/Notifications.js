import React, { Component } from 'react';
import NotificationItem from './NotificationItem';
import userChallengesService from '../../services/userChallengesService';

class Notifications extends Component {
  
  state = {
    userChallengesPending: []
  }

  usersChallengesPendingSubscription = undefined;
  
  componentDidMount() {

    this.userChallengesPendingSubscription = userChallengesService.onUserChallengesPendingChange().subscribe((userChallengesPending) => {
      this.setState({
        userChallengesPending: userChallengesPending
      })
    });
  }

  handleRejectUserChallenge = (userChallengeId) => {
    console.log("rechazando...", userChallengeId)
    userChallengesService.rejectUserChallenge(userChallengeId)
  }

  listNotifications = () => 
    this.state.userChallengesPending.map((userChallengePending, index) =>
        <NotificationItem key={index} {...userChallengePending} handleRemove={this.handleRejectUserChallenge} />)
  
  
  render() {
    return (
      <div>
        {this.listNotifications()}
      </div>
    )
  }
}

export default Notifications