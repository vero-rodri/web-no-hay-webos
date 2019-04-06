import React, { Component, Fragment } from 'react';
import Service from '../../services/challengesService';
import ChallengeItem from '../challenges/ChallengeItem';


class SearchItems extends Component {

  state = {
    challenges: [],
    userChallenges: [],
    search:''
  }

  challengesSubscription = undefined;
  userChallengesSubscription = undefined;

  componentDidMount() {

    //ESTA NOS LA CARGAREMOS, PERO DE MOMENTO LA DEJO PARA PODER TRABAJAR MEJOR AL MAQUETAR...
    Service.getChallenges()
      .then(challenges => this.setState({
        challenges: challenges 
      }))
    ///////////////////////


    this.challengesSubscription = Service
      .onChallengesChange()
      .subscribe(challenges => {
        console.log("LOS RETOS SON", challenges)
        this.setState({challenges: challenges});
      })

    this.userChallengesSubscription = Service
      .onChallengesChange()
      .subscribe(userChallenges => {
        console.log("LOS logros SON", userChallenges)
        this.setState({userChallenges: userChallenges});
      })
  }

  componentWillUnmount() {
    this.challengesSubscription.unsubscribe();
    this.userChallengesSubscription.unsubscribe();
  }

  handleSearch = (keyword) => 
  this.setState({...this.state,
                search: keyword});

  listByLikes = (items, type) => {
    console.log("entro a ordenar por likes con el numero de retos ", items.length)
    const listSort = items.sort((a, b) => b.likes-a.likes);
    switch (type) {
      case 'challenge': {
        return this.listChallenges(listSort);
      }
      case 'userChallenge': {
        return this.listUserChallenges(listSort);
      }
      default:{break}
    }
  } 

  listChallenges = (items) => {
    console.log("\nentro en listar");
    return items
      .filter(challenge => challenge.title.toLowerCase().includes(this.state.search.toLowerCase()))
      .map(challenge => {
        const info = {
          type: 'challenge',
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          user: challenge.owner.nickName,
          avatarURL: challenge.owner.avatarURL,
          itemsLiked: challenge.owner.challengesLiked,
          views: challenge.views,
          likes: challenge.likes,
          file: challenge.photo
        }
        console.log("INFO del challenge", info);
        return <ChallengeItem key={info.id} {...info} />
      })
    }

  listUserChallenges = (items) => 
    items
      .filter(userChallenge => userChallenge.challengeId.title.toLowerCase().includes(this.state.search.toLowerCase()))
      .map(userChallenge => {
        const info = {
          type: 'userChallenge',
          id: userChallenge.id,
          title: userChallenge.challengeId.title,
          description: userChallenge.challengeId.description,
          user: userChallenge.userId.nickName,
          avatarURL: userChallenge.userId.avatarURL,
          itemsLiked: userChallenge.owner.userChallengesLiked,
          views: userChallenge.views,
          likes: userChallenge.likes,
          file: userChallenge.evidences[userChallenge.evidences.length - 1]      
        }
        return <ChallengeItem key={info.id} {...info} />
    })

  render() {
    const { challenges } = this.state;
    return (
      <Fragment>
        <div>
          {this.listByLikes(challenges, 'challenge')}
        </div>
      </Fragment>
    )
  }
}

export default SearchItems;
