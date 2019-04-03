import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengeItem from './ChallengeItem';

class ChallengeList extends Component {
  state = {
    challenges: [],
    search: ''
  }

  componentDidMount = () => {
    challengesService.getChallenges()
      .then(challenges => this.setState({
        challenges: challenges 
      }))
  }

  itemsList = () => 
    this.state.challenges
      .filter(challenge => challenge.title.includes(this.state.search))
      .map(challenge => <ChallengeItem key={challenge.id} {...challenge} />)

  handleSearch = (keyword) => 
    this.setState({...this.state,
                  search: keyword});

  render() {
    return (
      <div>
        <div className="container">
          {this.itemsList()}
        </div>
      </div>
    )
  }
}

export default ChallengeList;
