import React, { Component } from 'react';
import usersService from '../../services/usersService';
import CardsRow from '../../ui/CardsRow';
import { withAuthConsumer } from '../../context/AuthStore';
import { SELECT_SORTS, MIRROR_SELECT_SORTS } from '../../constants';
import { Select } from 'grommet';
import { listByFilters } from '../../utils/handleLogicSelects'; 
import Modal from '../misc/Modal';
import EvidencesModal from '../../ui/EvidencesModal';
import Graph from '../../ui/Graph';



class Profile extends Component {

  state = {
    userId: this.props.match.params.userId || this.props.user.id,
    userChallengesInProcess: [],
    userChallengesFinished: [],
    userChallengesRejected: [],
    userChallengesPending: [],
    challenges: [],
    optionUserChallengeInProcessFiltered: SELECT_SORTS['createDate'],
    optionUserChallengeFinishedFiltered: SELECT_SORTS['createDate'],
    optionChallengeFiltered: SELECT_SORTS['createDate'],
    showModal: false,
    itemToShow: {},
    modalOrder: 0,
  }
  
  componentDidMount() {
    const { userId } = this.state;
    const p1 = usersService.getChallengesByUser(userId);
    const p2 = usersService.getUserChallengesByUser(userId);

    
    Promise.all([p1, p2])
    .then(([challenges, userChallenges]) => {
      console.log("los UC finished son ", userChallenges)  
      console.log("los CHALL son ", challenges)  
      
      this.setState({
        ...this.state,
        challenges: challenges,
        userChallengesFinished: userChallenges.filter(userChallenge => userChallenge.isFinished),
        userChallengesInProcess: userChallenges.filter(userChallenge => (!userChallenge.isFinished) && (!userChallenge.isRejected) && (!userChallenge.isPending)),
        userChallengesRejected: userChallenges.filter(userChallenge => userChallenge.isRejected),
        userChallengesPending: userChallenges.filter(userChallenge => userChallenge.isPending)
      })
    }, 
    error => console.log(error)
    ) 
  }
  
  onShowModal = (order, itemId) => {
    const itemFinished = this.state.userChallengesFinished.filter( userChallenge => userChallenge.id === itemId ); 
    const itemInProcess = this.state.userChallengesInProcess.filter( userChallenge => userChallenge.id === itemId ); 
    let item = [];
    ( itemFinished.length !== 0 ) ? item = itemFinished : item = itemInProcess
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      modalOrder: ( order >= 0 ) ? order : this.state.modalOrder,
      itemToShow: item[0]
    })
  }

  thereAreUserChallenges = () => {
    const { userChallengesFinished, userChallengesInProcess, userChallengesPending, userChallengesRejected } = this.state;
    return ((userChallengesFinished.length || userChallengesInProcess.length || userChallengesPending.length || userChallengesRejected.length)) ? true: false;
  }

  isUserSession = () => JSON.stringify(this.state.userId) === JSON.stringify(this.props.user.id);
    
    
  render() {
  
    const { challenges,
            modalOrder,
            itemToShow,  
            userChallengesInProcess, 
            userChallengesFinished,
            userChallengesRejected,
            userChallengesPending,
            optionChallengeFiltered, 
            optionUserChallengeInProcessFiltered, 
            optionUserChallengeFinishedFiltered } = this.state;

    const data = [
      {
        "id": "rechazados",
        "label": "Rehazados",
        "value": userChallengesRejected.length,
        "color": "hsl(215, 70%, 50%)"
      },
      {
        "id": "conseguidos",
        "label": "Conseguidos",
        "value": userChallengesFinished.length,
        "color": "hsl(121, 70%, 50%)"
      },
      {
        "id": "participando",
        "label": "Participando",
        "value": userChallengesInProcess.length,
        "color": "hsl(19, 70%, 50%)"
      },
      {
        "id": "pendientes",
        "label": "Pendientes",
        "value": userChallengesPending.length,
        "color": "hsl(163, 70%, 50%)"
      }
    ]


    return (        
      <div className="container my-3">
        <div className="row align-items-center mx-0 mb-0 mt-2" style={{heigth:'300px'}}>
          <img className="img-user-profile" src={this.props.user.avatarURL} alt={this.props.user.nickName}></img>
          <h3 className="m-0 mx-3 user-profile">{this.props.user.nickName}</h3>
        </div>

        {this.thereAreUserChallenges() &&
          <div className="row justify-content-between align-items-center mx-0 mb-4 mt-2 graph" style={{heigth:'300px'}}>
            {Graph(data)}       
          </div>
        }

        

          {this.state.showModal && (
            <Modal>
              <EvidencesModal id={itemToShow.challengeId.id}
                              title={itemToShow.challengeId.title} 
                              propAvatar={itemToShow.userId.avatarURL} 
                              propNickname={itemToShow.userId.nickName} 
                              evidences={itemToShow.evidences} 
                              modalOrder={modalOrder}
                              onShowModal={this.onShowModal}
              />
            </Modal>
          )}

          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Logros en proceso:</h6>
            <div className="col-5">
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionUserChallengeInProcessFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionUserChallengeInProcessFiltered: event.option })}}
                />
            </div>
          </div>
          <CardsRow 
            items={listByFilters(userChallengesInProcess, "userChallenge", MIRROR_SELECT_SORTS[optionUserChallengeInProcessFiltered])} 
            type="userChallenge"
            origin="profile"
            textAlternative={(this.isUserSession()) ? "Noto poca actividad ... o son falta de Webos??" : "No tiene retos en proceso en estos momentos ..."}
            onShowModal={this.onShowModal} 
          />

        
          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Logros realizados:</h6>
            <div className="col-5">
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionUserChallengeFinishedFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionUserChallengeFinishedFiltered: event.option })}}
                />
            </div>
          </div>
          <CardsRow 
            items={listByFilters(userChallengesFinished, "userChallenge", MIRROR_SELECT_SORTS[optionUserChallengeFinishedFiltered])} 
            type="userChallenge"
            origin="profile"
            textAlternative={(this.isUserSession()) ? "Ya estás tardando en echarle Webos y estrenar este área ..." : "Aún no ha tenido Webos a conseguir ningún reto ..."}
            onShowModal={this.onShowModal} 
          />

          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Retos creados:</h6>
            <div className="col-5">
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionChallengeFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionChallengeFiltered: event.option })}}
                />
            </div>
          </div>
          <CardsRow 
            items={listByFilters(challenges, "challenge", MIRROR_SELECT_SORTS[optionChallengeFiltered])} 
            type="challenge"
            origin="profile"
            textAlternative={(this.isUserSession()) ? "¡Venga Webón! anímate y lanza algún reto!" : "El Webón no se ha animado aún a lanzar ningún reto ..."}
          />
      </div>
    );
  }
}

export default withAuthConsumer(Profile);
