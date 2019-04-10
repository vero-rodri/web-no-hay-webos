import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import userChallengesService from '../../services/userChallengesService';
import ChallengesScroll from './ChallengesScroll';
import LabelAndButton from './LabelAndButton';
import CardsRow from '../../ui/CardsRow';

class Board extends Component {

  state = {
    challenges: [],
    userChallenges: [],
    userChallengesPending: []
  }


  componentDidMount = () => {

    const p1 = challengesService.getChallenges();
    const p2 = challengesService.getUserChallenges();
    const p3 = userChallengesService.getUserChallengesPending();
    Promise.all([p1, p2, p3])
      .then(([challenges, userChallenges, userChallengesPending]) => 
        this.setState({
        challenges: challenges,
        userChallenges: userChallenges,
        userChallengesPending
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
      <div className="container mt-2">  
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

        {console.log("\n\nultimoss ", this.latestUserChallenges())}
       
        {userChallenges.length && <CardsRow 
          items={this.latestUserChallenges()} 
          type="userChallenge" 
          origin="board"
          textAlternative="Nadie aún con Webos de subir su logro..." 
        />}
         

        <LabelAndButton 
          label="Logros más virales"
          items={userChallenges}
          link="/search"          
          type="userChallenge"
          sort="views"
          labelButton="Más"
        />
            
        {userChallenges.length && <CardsRow 
          items={this.topUserChallenges()} 
          type="userChallenge" 
          origin="board"
          textAlternative="Nadie aún con Webos de subir su logro..." 
        />}   
      </div>
    )
  }
}

export default Board;
