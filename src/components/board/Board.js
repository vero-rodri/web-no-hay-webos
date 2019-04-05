import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengeItem from '../search/item';
import Footer from '../misc/FooterBar';
import NavBar from '../misc/NavBar';
import ChallengesScroll from './ChallengesScroll';
import LabelAndButton from './LabelAndButton';
import CardsScroll from './CardsScroll';


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
     
        console.log("la resta es", "a ", Date.parse(a.evidences[a.evidences.length - 1].createdAt), "y b", Date.parse(b.evidences[b.evidences.length - 1].createdAt))
        console.log("RESULT ", Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt))
        return (Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1 
      })
    .slice(0, 10);


  render() {
    const { challenges, userChallenges } = this.state;
    console.log("los userChallengs", userChallenges)
    return (
      <div>
        
        <LabelAndButton  
          label="Top Retos"
          items={challenges}
          type="challenge"
          sort="likes"
          //link="/challenges/top"
          link="/search"
          labelButton="Más"
          />
        <ChallengesScroll items={this.topChallenges()} className="content" />
        
        <LabelAndButton 
          label="Logros más recientes"
          items={userChallenges}
          //link="/user-challenges/latest"
          link="/search"          
          type="userChallenge"
          sort="likes"
          labelButton="Más"
          />
        {<CardsScroll items={this.latestUserChallenges()} />}
        
        <LabelAndButton 
          label="Logros más virales"
          items={userChallenges}
          //link="/user-challenges/top"
          link="/search"          
          type="userChallenge"
          sort="likes"
          labelButton="Más"
          />
        {<CardsScroll items={this.topUserChallenges()} />}
        
        <Footer className="footer"/>
      </div>
    )
  }
}

export default Board;