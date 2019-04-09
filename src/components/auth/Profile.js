import React, { Component } from 'react';
import usersService from '../../services/usersService';
import CardsScroll from '../../ui/CardsScroll';
import { withAuthConsumer } from '../../context/AuthStore';
import { SELECT_SORTS, MIRROR_SELECT_SORTS } from '../../constants';
import { Select, FormField } from 'grommet';
import { listByFilters } from '../../utils/handleLogicSelects'; 

class Profile extends Component {

  state = {
    challenges: [],
    userChallenges: [],
    optionChallengeFiltered: SELECT_SORTS['createDate'],
    optionUserChallengeFiltered: SELECT_SORTS['createDate']
  }
  
  componentDidMount() {
    
    const { userId } = this.props.match.params;
    console.log("el usuario de perfil es ", userId)
    const p1 = usersService.getChallengesByUser(userId);
    const p2 = usersService.getUserChallengesFinishedByUser(userId);
    
    Promise.all([p1, p2])
    .then(([challenges, userChallenges]) => {
      console.log("los UC son ", userChallenges)  
      console.log("los CHALL son ", challenges)  
      
      this.setState({
        ...this.state,
        challenges: challenges,
        userChallenges: userChallenges
      })
    }, 
    error => console.log(error)
    ) 
  }
  
  /* formatFieldsChallenges = () => {
    const { challenges } = this.state;
    console.log("formateando..", challenges)
    if (challenges.length) {
      return challenges.map(challenge => (
        { id: challenge.id,
          file: challenge.photo,
          comments: challenge.title
        }
        ))
        
      } else {
        return [];
      }
    } */
    
    
    render() {
    
      const { challenges, userChallenges, optionChallengeFiltered, optionUserChallengeFiltered } = this.state;
     // const formattedChallenges = this.formatFieldsChallenges();
     // console.log(("fortmateados: ", formattedChallenges))
      return (
        <div className="container my-3">
          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Logros realizados:</h6>
            <div className="col-5">
              <FormField>
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionUserChallengeFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionUserChallengeFiltered: event.option })}}
                />
              </FormField>
            </div>
          </div>
          <CardsScroll 
            items={listByFilters(userChallenges, "userChallenges", MIRROR_SELECT_SORTS[this.state.optionUserChallengeFiltered])} 
            type="userChallenge"
            origin="profile"
            textAlternative="Ya estás tardando en echarle Webos y estrenar este área ..." 
          />

          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Retos creados:</h6>
            <div className="col-5">
              <FormField>
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionChallengeFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionChallengeFiltered: event.option })}}
                />
              </FormField>
            </div>
          </div>
          <CardsScroll 
            items={listByFilters(challenges, "challenges", MIRROR_SELECT_SORTS[this.state.optionChallengeFiltered])} 
            type="challenge"
            origin="profile"
            textAlternative="¡Venga! anímate y lanza algún reto!" 
          />
      </div>
    );
  }
}

export default Profile;
