import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../misc/FooterBar';
import challengeService from '../../services/challengesService';
import Item from './item';
import SearchBar from './SearchBar';
import FooterBar from '../misc/FooterBar';
import SearchFilters from './SearchFiters';
import { SELECT_TYPES, MIRROR_SELECT_TYPES, SELECT_SORTS, MIRROR_SELECT_SORTS } from '../../constants';
import SearchBarr from '../../ui/SearchBarr';
import { withSearchConsumer } from '../../context/SearchStore';
import InputSearch from '../../ui/InputSearch';


class SearchItemsList extends Component {

  state = {
    challenges: [],
    userChallenges: [],
    reprint: false,
  }

  challengesSubscription = undefined;
  userChallengesSubscription = undefined;
  userSubscription = undefined;

  componentDidMount() {
    console.log('!!!!!!DIDMOUNT DE LA LISTAAA!!!!!!!')
   
    //ESTA NOS LA CARGAREMOS, PERO DE MOMENTO LA DEJO PARA PODER TRABAJAR MEJOR AL MAQUETAR...
 /*    challengeService.getChallenges()
      .then(challenges => this.setState({
        challenges: challenges 
      }))

    challengeService.getUserChallenges()
      .then(userChallenges => this.setState({
        userChallenges: userChallenges 
      })) */
    ///////////////////////


    this.challengesSubscription = challengeService
      .onChallengesChange()
      .subscribe(challenges => {
        //console.log("LOS RETOS SON", challenges)
        this.setState({challenges: challenges});
      })

    this.userChallengesSubscription = challengeService
      .onUserChallengesChange()
      .subscribe(userChallenges => {
        //console.log("LOS logros SON", userChallenges)
        this.setState({userChallenges: userChallenges});
      })

     /*  this.userSubscription = authService
        .onUserChange()
        .subscribe(user => {
        let itemsLiked = [];
        (this.state.info.type === 'challenge') ? itemsLiked = [...user.challengesLiked] : itemsLiked = [...user.userChallengesLiked];
        console.log("EN DIDMOUNT el itemsLiked es ", itemsLiked)

       // console.log("\n\n EL DIDMOUNT, con user", user)
        this.setState({
          ...this.state,
          itemsLiked: itemsLiked
        })
      }) */
  }

  componentWillUnmount() {
    this.challengesSubscription.unsubscribe();
    this.userChallengesSubscription.unsubscribe();
  }

  handleReprintList = () => {
    this.setState({
      ...this.state,
      reprint: true
    })
  }


  listChallenges = (items) => {
    return items
    .filter(challenge => challenge.title.toLowerCase().includes(this.props.search.toLowerCase()))
      .map(challenge => {
        const info = {
          type: 'challenge',
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          user: challenge.owner.nickName,
         // userId: challenge.userId.id,
          avatarURL: challenge.owner.avatarURL,
          //itemsLiked: challenge.owner.challengesLiked,
         // itemsLiked: challenge.owner.challengesLiked,
          views: challenge.views,
          likes: challenge.likes,
          file: challenge.photo
        }
        return <Item key={info.id} {...info} onReprint={this.handleReprint}/>
      })
    }

  listUserChallenges = (items) => {
    return items
      .filter(userChallenge => userChallenge.challengeId.title.toLowerCase().includes(this.props.search.toLowerCase()))
      .map(userChallenge => {
        const info = {
          type: 'userChallenge',
          id: userChallenge.id,
          title: userChallenge.challengeId.title,
          description: userChallenge.challengeId.description,
          userName: userChallenge.userId.nickName,
         // userId: userChallenge.userId.id,
          avatarURL: userChallenge.userId.avatarURL,
          //itemsLiked: userChallenge.userId.userChallengesLiked,
          views: userChallenge.views,
          likes: userChallenge.likes,
          file: userChallenge.evidences[0].file     
        }
        return <Item key={info.id} {...info} onReprint={this.handleReprint} />
    })
  }

  listByFilters = () => {

    const sortByLikes = (arr) => arr.sort((a, b) => b.likes-a.likes);
    const sortByViews = (arr) => arr.sort((a, b) => b.views-a.views);
    const sortByCreatAt = (arr) => arr.sort((a, b) => 
      // console.log("la resta es", "a ", Date.parse(a.evidences[a.evidences.length - 1].createdAt), "y b", Date.parse(b.evidences[b.evidences.length - 1].createdAt))
      // console.log("RESULT ", Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt))
      (Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1); 
    
    let filteredArr = [];

    const { type, sort } = this.props;
    const { challenges, userChallenges } = this.state;
    if (type === 'challenge') {
      switch (sort) {
        case 'likes': {
          filteredArr = sortByLikes(challenges);
          break; 
        }
        case 'views': {
          filteredArr = sortByViews(challenges);
          break;
        }
        case 'createAt': {
          filteredArr = sortByCreatAt(challenges);
          break;
        }
        default: {}
      }
      return this.listChallenges(filteredArr);
    } else {  //type == userChallenge...
      switch (sort) {
        case 'likes': {
          filteredArr = sortByLikes(userChallenges);
          break; 
        }
        case 'views': {
          filteredArr = sortByViews(userChallenges);
          break;
        }
        case 'createAt': {
          filteredArr = sortByCreatAt(userChallenges);
          break;
        }
        default: {}
      }
      return this.listUserChallenges(filteredArr);
    }
     
  }

  render() {
    console.log("@@LISTA-RENDER")
    const { pathname } = this.props.location;
   
    //console.log("BUSCANDO EL PATH ", this.props.location.pathname)
    const { search, type, sort } = this.state;
    const { challenges, userChallenges } = this.state;
    return (
      <Fragment>
        {this.listByFilters()}
      </Fragment>
    )
  }
}

export default withRouter(withSearchConsumer(SearchItemsList));

