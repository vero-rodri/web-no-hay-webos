import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import challengeService from '../../services/challengesService';
import SearchItem from './SearchItem';
import { withSearchConsumer } from '../../context/SearchStore';


class SearchItemsList extends Component {

  state = {
    challenges: [],
    userChallenges: [],
  }

  challengesSubscription = undefined;
  userChallengesSubscription = undefined;


  componentDidMount() {

    this.challengesSubscription = challengeService
      .onChallengesChange()
      .subscribe(challenges => {
        this.setState({challenges: challenges});
      })

    this.userChallengesSubscription = challengeService
      .onUserChallengesChange()
      .subscribe(userChallenges => {
        this.setState({userChallenges: userChallenges});
      })
  }


  componentWillUnmount() {
    this.challengesSubscription.unsubscribe();
    this.userChallengesSubscription.unsubscribe();
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
          userId: challenge.owner.id,
          userName: challenge.owner.nickName,
          avatarURL: challenge.owner.avatarURL,
          views: challenge.views,
          likes: challenge.likes,
          file: challenge.photo,
          createdAt: challenge.createdAt
        }
        return <SearchItem key={info.id} {...info} onReprint={this.handleReprint}/>
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
          userId: userChallenge.userId.id,
          userName: userChallenge.userId.nickName,
          avatarURL: userChallenge.userId.avatarURL,
          views: userChallenge.views,
          likes: userChallenge.likes,
          file: userChallenge.evidences[0].file  ,
          createdAt: userChallenge.evidences[0].createdAt    
        }
        return <SearchItem key={info.id} {...info} onReprint={this.handleReprint} />
    })
  }


  listByFilters = () => {

    const sortByLikes = (arr) => arr.sort((a, b) => b.likes-a.likes);
    const sortByViews = (arr) => arr.sort((a, b) => b.views-a.views);
    const sortByCreateAt = (arr) => arr.sort((a, b) => {
      // console.log("la resta es", "a ", Date.parse(a.evidences[a.evidences.length - 1].createdAt), "y b", Date.parse(b.evidences[b.evidences.length - 1].createdAt))
      // console.log("RESULT ", Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt))
      return (Date.parse(b.createdAt) - Date.parse(a.createdAt) > 0) ? 1 : -1
    });


    // const sortByCreateAt = (arr) => arr.sort((a, b) => {
    //   console.log ("logro1", a)
    //   console.log ("logro2", b)

    // /*   a.evidences && const aDate = new Date(a.evidences[a.evidences.length - 1].createdAt)
    //   const bDate = new Date(b.evidences[b.evidences.length - 1].createdAt)

    //   console.log("el aDate es ",  aDate.getTime());
    //   console.log("el bDate es ",  bDate.getTime());
    //   console.log("la diferencia" ,  bDate.getTime() - a.getTime());
      

    //   return bDate - aDate; */

    //   // console.log("la resta es", "a ", Date.parse(a.evidences[a.evidences.length - 1].createdAt), "y b", Date.parse(b.evidences[b.evidences.length - 1].createdAt))
    //   // console.log("RESULT ", Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt))
    //   //return ((b.evidences[b.evidences.length - 1].createdAt.getTime()) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1
    // }); 
    
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
        case 'createDate': {
          filteredArr = sortByCreateAt(challenges);
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
        case 'createDate': {
          filteredArr = sortByCreateAt(userChallenges);
          break;
        }
        default: {}
      }
      return this.listUserChallenges(filteredArr);
    }
  }


  render() {
    return (
      <Fragment>
        {this.listByFilters()}
      </Fragment>
    )
  }
}

export default withRouter(withSearchConsumer(SearchItemsList));

