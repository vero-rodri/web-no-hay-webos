/* import React, { Component } from 'react';

class Profile extends Component {

  state = {
    challenges: [],
    userChallenges: [],
  }

  componentDidMount() {
    

  }

  render() {
    return (
      <div>
        Profile
      </div>
    );
  }
}

export default Profile;



lass SearchItemsList extends Component {

  state = {
    challenges: [],
    userChallenges: [],
  }

  challengesSubscription = undefined;
  userChallengesSubscription = undefined;


  componentDidMount() {

    this.challengesSubscription = challengeService
      .onChallengesChange()
      .subscribe(challenges => {
        this.setState({challenges: challenges});
      })

    this.userChallengesSubscription = challengeService
      .onUserChallengesChange()
      .subscribe(userChallenges => {
        this.setState({userChallenges: userChallenges});
      })
  }


  componentWillUnmount() {
    this.challengesSubscription.unsubscribe();
    this.userChallengesSubscription.unsubscribe();
  } */