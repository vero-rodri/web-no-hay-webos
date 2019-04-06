import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengesScroll from './ChallengesScroll';
import LabelAndButton from './LabelAndButton';
import CardsScroll from '../../ui/CardsScroll'

class Board extends Component {

  state = {
    challenges: [],
    userChallenges: []
  }


  componentDidMount = () => {

    const p1 = challengesService.getChallenges();
    const p2 = challengesService.getUserChallenges();
    Promise.all([p1, p2])
      .then(([challenges, userChallenges]) => 
        this.setState({
        challenges: challenges,
        userChallenges: userChallenges
        }))    
  }

  topChallenges = () => this.state.challenges
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);


  topUserChallenges = () => this.state.userChallenges
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);
  

  latestUserChallenges = () => this.state.userChallenges
    .sort((a, b) => {
      return (Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1 
    })
    .slice(0, 10);


  render() {
    const { challenges, userChallenges } = this.state;
    return (
      <div className="container">  
        <LabelAndButton  
          label="Top Retos"
          items={challenges}
          type="challenge"
          sort="likes"
          link="/search"
          labelButton="Más"
          />
        <div className="row py-2 ml-2">
          <div className="col cards-scroll user-challenge-scroll">
            <ChallengesScroll items={this.topChallenges()} className="content" />
          </div>
        </div>
        
        <LabelAndButton 
          label="Logros más recientes"
          items={userChallenges}
          link="/search"          
          type="userChallenge"
          sort="createDate"
          labelButton="Más"
          />
        <div className="row py-2 ml-2">
          <div className="col cards-scroll user-challenge-scroll">
            {<CardsScroll items={this.latestUserChallenges()} origin="board"/>}
          </div>
        </div>

        <LabelAndButton 
          label="Logros más virales"
          items={userChallenges}
          link="/search"          
          type="userChallenge"
          sort="latests"
          labelButton="Más"
          />
          <div className="row py-2 ml-2">
            <div className="col cards-scroll user-challenge-scroll">
              {<CardsScroll items={this.topUserChallenges()} origin="board"/>}
            </div>
          </div>
      </div>
    )
  }
}

export default Board;
