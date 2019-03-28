import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengeItem from './ChallengeItem';

class ChallengeList extends Component {
  state = {
    challenges: []
  }

  componentDidMount = () => {
    challengesService.getChallenges()
      .then(challenges => this.setState({
        challenges: challenges 
      }))
  }

  challengeList = () => 
    this.state.challenges.map(challenge => <ChallengeItem key={challenge.id} {...challenge} />)
  
  
  render() {
    return (
      <div>
        {this.challengeList()}
      </div>
    )
  }
}

export default ChallengeList;

