import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengeItem from './ChallengeItem';
import SearchBar from '../../ui/searchBar';

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
      //(challenge.title.includes(this.state.search) && <ChallengeItem key={challenge.id} {...challenge} />))
      //<ChallengeItem key={challenge.id} {...challenge} />)

  handleSearch = (keyword) => 
    this.setState({...this.state,
                  search: keyword});

  render() {
    return (
      <div>
        <SearchBar search={this.state.search} setSearch={this.handleSearch}/>
        {this.challengeList()}
      </div>
    )
  }
}

export default ChallengeList;

