import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import ChallengeList from '../challenges/ChallengeList';
import CarouselCustom from './CarouselCustom';
import ChallengeItem from '../challenges/ChallengeItem';
import TextCustom from '../../ui/TextCustom';
import Footer from './Footer';
import Nav from './Nav';


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

  challengeList = () => 
    this.state.challenges
      .filter(challenge => challenge.title.includes(this.state.search))
      .map(challenge => <ChallengeItem key={challenge.id} {...challenge} />)


  render() {
    console.log("los chachensss ",this.state.challenges);
    console.log("y los logros ",this.state.userChallenges);
    const { challenges, userChallenges } = this.state;
    return (
      <div>
        <Nav />
        <TextCustom>Los desafíos más visitados: </TextCustom>
        <CarouselCustom className="carousel" items={challenges}/>
        <TextCustom> Los userChallenges más vistos: </TextCustom>
        {<ChallengeList challenges={this.state.challenges} />}
        <Footer className="footer"/>
      </div>
    )
  }

}

export default Board;