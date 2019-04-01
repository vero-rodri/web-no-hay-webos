import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengeItem from './ChallengeItem';
import { Box } from 'grommet';

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

  challengeList = () => 
    this.state.challenges
      .filter(challenge => challenge.title.includes(this.state.search))
      .map(challenge => <ChallengeItem key={challenge.id} {...challenge} />)

  handleSearch = (keyword) => 
    this.setState({...this.state,
                  search: keyword});

  render() {
    return (
      <div>
        <Box direction="row">
          {this.challengeList()}
        </Box>
      </div>
    )
  }
}

export default ChallengeList;

