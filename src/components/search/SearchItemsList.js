import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import SearchItem from './SearchItem';
import { withSearchConsumer } from '../../context/SearchStore';
import { listByFilters } from '../../utils/handleLogicSelects';
import challengeService from '../../services/challengesService';
import userChallengeService from '../../services/userChallengesService';


class SearchItemsList extends Component {

  state = {
    challenges: [],
    userChallenges: [this.props.userChallenges]
  }
/* 
  challengesSubscription = undefined;
  userChallengesSubscription = undefined; */

  componentDidMount() {

   /*  this.challengesSubscription = challengeService
      .onChallengesChange()
      .subscribe(challenges => {
        this.setState({challenges: challenges});
      })

    this.userChallengesSubscription = userChallengeService
      .onUserChallengesChange()
      .subscribe(userChallenges => {
        this.setState({userChallenges: userChallenges});
      }) */
    this.setState({
    challenges: this.props.challenges,
    userChallenges: this.props.userChallenges
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
          userId: challenge.owner.id,
          userName: challenge.owner.nickName,
          avatarURL: challenge.owner.avatarURL,
          views: challenge.views,
          likes: challenge.likes,
          file: challenge.photo,
          createdAt: challenge.createdAt
        }
        return <SearchItem  key={info.id}
                            {...info} 
                            //onReprint={this.handleReprint}
                            />
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
        return <SearchItem key={info.id}
                           {...info} 
                          // onReprint={this.handleReprint}
                           onShowModal={this.props.onShowModal}
                           />
    })
  }
  

  render() {
    const { type, sort } = this.props;
    const { challenges, userChallenges } = this.props;
    return (
      <Fragment>
        {(type === "challenge") ? 
          this.listChallenges(listByFilters(challenges, type, sort)) 
          : this.listUserChallenges(listByFilters(userChallenges, type, sort))}
      </Fragment>
    )
  }
}

export default withRouter(withSearchConsumer(SearchItemsList));

