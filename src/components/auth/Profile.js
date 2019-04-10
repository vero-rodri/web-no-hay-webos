import React, { Component } from 'react';
import usersService from '../../services/usersService';
import CardsRow from '../../ui/CardsRow';
import { withAuthConsumer } from '../../context/AuthStore';
import { SELECT_SORTS, MIRROR_SELECT_SORTS } from '../../constants';
import { Select, FormField } from 'grommet';
import { listByFilters } from '../../utils/handleLogicSelects'; 


class Profile extends Component {

  state = {
    userId: this.props.match.params.userId || this.props.user.id,
    userChallengesInProcess: [],
    userChallengesFinished: [],
    challenges: [],
    optionUserChallengeInProcessFiltered: SELECT_SORTS['createDate'],
    optionUserChallengeFinishedFiltered: SELECT_SORTS['createDate'],
    optionChallengeFiltered: SELECT_SORTS['createDate']
  }
  
  componentDidMount() {
    
    //const { userId } = this.props.match.params;

    const { userId } = this.state;
    console.log("el usuario de perfil es ", userId)
    const p1 = usersService.getChallengesByUser(userId);
    const p2 = usersService.getUserChallengesByUser(userId);
    //const p3 = usersService.getUserChallengesInProcessByUser(userId);

    
    Promise.all([p1, p2])
    .then(([challenges, userChallenges]) => {
      console.log("los UC finished son ", userChallenges)  
      console.log("los CHALL son ", challenges)  
      
      this.setState({
        ...this.state,
        challenges: challenges,
        userChallengesFinished: userChallenges.filter(userChallenge => userChallenge.isFinished),
        userChallengesInProcess: userChallenges.filter(userChallenge => !userChallenge.isFinished)
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
    
      const { challenges,  userChallengesInProcess, userChallengesFinished, optionChallengeFiltered, optionUserChallengeInProcessFiltered, optionUserChallengeFinishedFiltered } = this.state;
     // const formattedChallenges = this.formatFieldsChallenges();
     // console.log(("fortmateados: ", formattedChallenges))
      return (        
        <div className="container my-3">
          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Logros en proceso:</h6>
            <div className="col-5">
              <FormField>
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionUserChallengeInProcessFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionUserChallengeInProcessFiltered: event.option })}}
                />
              </FormField>
            </div>
          </div>
          <CardsRow 
            items={listByFilters(userChallengesInProcess, "userChallenges", MIRROR_SELECT_SORTS[optionUserChallengeInProcessFiltered])} 
            type="userChallenge"
            origin="profile"
            textAlternative="Ya estás tardando en echarle Webos y estrenar este área ..." 
          />

        
          <div className="row justify-content-between align-items-center mx-0 mb-0 mt-2">
            <h6 className="m-0">Logros realizados:</h6>
            <div className="col-5">
              <FormField>
                <Select
                  className="p-1"
                  placeholder="Ordenar por"
                  options={Object.values(SELECT_SORTS)}
                  value={optionUserChallengeFinishedFiltered}
                  size="small"
                  onChange={event => { this.setState({ optionUserChallengeFinishedFiltered: event.option })}}
                />
              </FormField>
            </div>
          </div>
          <CardsRow 
            items={listByFilters(userChallengesFinished, "userChallenges", MIRROR_SELECT_SORTS[optionUserChallengeFinishedFiltered])} 
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
          <CardsRow 
            items={listByFilters(challenges, "challenges", MIRROR_SELECT_SORTS[optionChallengeFiltered])} 
            type="challenge"
            origin="profile"
            textAlternative="¡Venga! anímate y lanza algún reto!" 
          />
      </div>
    );
  }
}

export default withAuthConsumer(Profile);
