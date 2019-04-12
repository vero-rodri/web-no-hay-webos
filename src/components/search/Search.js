import React, { Component } from 'react';
import SearchFilters from './SearchFilters';
import { MIRROR_SELECT_TYPES, MIRROR_SELECT_SORTS } from '../../constants';
import SearchItemsList from './SearchItemsList';
import Modal from '../misc/Modal';
import EvidencesModal from '../../ui/EvidencesModal';
import challengeService from '../../services/challengesService';
import userChallengeService from '../../services/userChallengesService';


class Search extends Component {

  state = {
    challenges: [],
    userChallenges: [],
    type: (this.props.location.type) || 'challenge',
    sort: (this.props.location.sort) || 'likes',
    showModal: false,
    itemToShow: {},
  }

  challengesSubscription = undefined;
  userChallengesSubscription = undefined;


  componentDidMount() {

    this.challengesSubscription = challengeService
      .onChallengesChange()
      .subscribe(challenges => {
        this.setState({challenges: challenges});
      })

    this.userChallengesSubscription = userChallengeService
      .onUserChallengesChange()
      .subscribe(userChallenges => {
        this.setState({userChallenges: userChallenges});
      })
  }


  componentWillUnmount() {
    this.challengesSubscription.unsubscribe();
    this.userChallengesSubscription.unsubscribe();
  }


  handleChangeType = (type) => { 
    this.setState({
      ...this.state,
      type: MIRROR_SELECT_TYPES[type]
    });
  }

  handleChangeSort = (sort) => { 
    this.setState({
      ...this.state,
      sort: MIRROR_SELECT_SORTS[sort]
    });
  }

  onShowModal = (itemId) => {
    const item = this.state.userChallenges.filter( userChallenge => userChallenge.id === itemId );
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      itemToShow: item[0]
    })
    console.log("el item es:", this.state.itemToShow); 
  }


  render() {
   
    const { type, sort, itemToShow } = this.state;
    return (
      <div className="container">

        {this.state.showModal && (
          <Modal>
            <EvidencesModal title={itemToShow.challengeId.title} 
                            propAvatar={itemToShow.userId.avatarURL} 
                            propNickname={itemToShow.userId.nickName} 
                            evidences={itemToShow.evidences} 
                            modalOrder={0}
                            onShowModal={this.onShowModal}
            />
          </Modal>
        )}

        <SearchFilters 
          onChangeType={this.handleChangeType}
          onChangeSort={this.handleChangeSort}
          type={type}
          sort={sort}
        />
        <SearchItemsList {...this.state} onShowModal={this.onShowModal}/>
      </div>
    )
  }
}

export default Search;
