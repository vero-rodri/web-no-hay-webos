import React, { Component } from 'react';
import challengesService from '../../services/challengesService';
import userChallengesService from '../../services/userChallengesService';
import ChallengesScroll from './ChallengesScroll';
import LabelAndButton from './LabelAndButton';
import Modal from '../misc/Modal';
import CardsRow from '../../ui/CardsRow';

class Board extends Component {

  state = {
    challenges: [],
    userChallenges: [],
    showModal: false,
    itemToShow: {},
    modalOrder: 0,
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

  onShowModal = (order, itemId) => {
    const item = this.state.userChallenges.filter( userChallenge => userChallenge.id === itemId ); 
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      modalOrder: ( order >= 0 ) ? order : this.state.modalOrder,
      itemToShow: item[0]
    })
  }
  

  render() {
    const { challenges, userChallenges, itemToShow, modalOrder } = this.state;

    return (
      <div className="container mt-2">
      
        {this.state.showModal && (
          <Modal title={itemToShow.challengeId.title} 
                  propAvatar={itemToShow.userId.avatarURL} 
                  propNickname={itemToShow.userId.nickName} 
                  evidences={itemToShow.evidences} 
                  modalOrder={modalOrder}
                  onShowModal={this.onShowModal}
          />
        )}

        <LabelAndButton 
          label="Top Retos"
          items={challenges}
          type="challenge"
          sort="likes"
          link="/search"
          labelButton="Más"
          />
        <div className="row py-2">
          <div className="col cards-scroll user-challenge-scroll mx-1 pl-1 pr-2">
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
          onShowModal={this.onShowModal}
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
          onShowModal={this.onShowModal}
        />}   
      </div>
    )
  }
}

export default Board;
