import React, { Fragment, Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom'
import {LIMIT_DESCRIPTION, LIMIT_TITLE } from '../../constants';
import $ from 'jquery';
import challengeService from '../../services/challengesService';
import authService from '../../services/authService';
import { withAuthConsumer } from '../../context/AuthStore';
import Moment from 'react-moment';
import 'moment-timezone';


class SearchItem extends Component {

  state = {
    info: this.props,
    redirectToDetail: false
  }


  componentDidMount() {

      authService.getSession()
        .then(user => {
          let itemsLiked;
          (this.state.info.type === 'challenge') ? itemsLiked = [...user.challengesLiked] : itemsLiked = [...user.userChallengesLiked];
          this.setState({
            ...this.state,
            itemsLiked
          })
        })
  }


  formatFields = () => {

    let formatedProps  = {...this.state.info}
    formatedProps.description = (formatedProps.description.length > LIMIT_DESCRIPTION) ?
      (`${formatedProps.description.slice(0, LIMIT_DESCRIPTION)} [...]`) : formatedProps.description;
    formatedProps.title = (formatedProps.title.length > LIMIT_TITLE) ?
      (`${formatedProps.title.slice(0, LIMIT_TITLE)} [...]`) : formatedProps.title;
    return formatedProps;
  }


  goToDetail = () => {
    const { id, type } = this.state.info
    const actionType = type ==='challenge' ? challengeService.addViewToChallenge(id) : challengeService.addViewToUserChallenge(id);
    actionType
      .then(() => {
        this.setState({ redirectToDetail: true })
      })
}
    

  toggleIcon = (event) => {

    const handleAddLikeToChallenge = (id) => {
      challengeService.addChallengeToLikes(id)
        .then((response) => {
          const {likes, itemsLiked} = response
          this.setState({
            ...this.state,
            itemsLiked,
            info: {
              ...this.state.info,
              likes 
            }
          })
        })       
    }

    const handleAddLikeToUserChallenge = (id) => {
      challengeService.addUserChallengeToLikes(id)
        .then((response) => {
          const {likes, itemsLiked} = response
          this.setState({
            ...this.state,
            itemsLiked,
            info: {
              ...this.state.info,
              likes 
            }
          })
        })
    }

    const handleRemoveLikeFromChallenge = (id) => {
      challengeService.removeChallengeFromLikes(id)
        .then((response) => {
          const {likes, itemsLiked} = response
          this.setState({
            ...this.state,
            itemsLiked,
            info: {
              ...this.state.info,
              likes 
            }
          })
        })
    }
      
    const handleRemoveLikeFromUserChallenge = (id) => {
      challengeService.removeUserChallengeFromLikes(id)
        .then((response) => {
          const {likes, itemsLiked} = response
          this.setState({
            ...this.state,
            itemsLiked,
            info: {
              ...this.state.info,
              likes 
            }
          })
        })
    }

    const { type, id } = this.state.info;
    const { itemsLiked } = this.state

    if (this.objectIdInArray(id, itemsLiked)) {
      $(event.target).removeClass("icon-selected");
      switch (type) {
        case 'challenge': {
          handleRemoveLikeFromChallenge(id);
          break;
        }
        case 'userChallenge': {
          handleRemoveLikeFromUserChallenge(id);
          break;
        }
        default:
      }
    } else {
      $(event.target).addClass("icon-selected");
      switch (type) {
        case 'challenge': {
          handleAddLikeToChallenge(id);
          break;
        }
        case 'userChallenge': {
          handleAddLikeToUserChallenge(id);
          break;
        }
        default:
      }
    }
  }


  objectIdInArray = (objId, arr) => {
   
    let arrAux = arr.map(objId => JSON.stringify(objId))
    let objIdAux = JSON.stringify(objId);
    return (arrAux.includes(objIdAux))
  }

  infoTooLonger = () => {

  }

  
  render() {
    const formatedProps = this.formatFields();
    const { type, id, title, description, userName, avatarURL, views, likes, file, createdAt, userId } = formatedProps;
    const { itemsLiked, redirectToDetail } = this.state;

    if (redirectToDetail) {
      if (type === 'challenge') {
        return <Redirect to={`/challenges/${id}/`} />
      } else {
        return <Redirect to={`/user-challenges/${id}/`} />
      }
    }

    return (
      <Fragment>
        {<div className="media align-items-center mx-0 my-2 border rounded-lg row card-search">
          
            <div className="col-3 p-0" onClick={this.goToDetail}>
          {/* <Link to={`/challenges/${id}`} className="w-auto m-0">
              <img src={file} className="w-100 img-in-search rounded-lg" alt="..." />
          </Link> */}
              <img src={file} className="w-100 img-in-search rounded-lg" alt="..." />
            </div>  
          <div className="media-body col-9 p-0">
            <div className="d-flex justify-content-between">
              <div className="px-2 col-9 card-media-item">
                <h6 className="m-0 my-1" data-container="body" data-toggle="popover" data-placement="top" data-content={this.state.info.title}><u>{title}</u></h6>
                <p className="m-0" data-container="body" data-toggle="popover" data-placement="bottom" data-content={this.state.info.description}>{description}</p>
                <div className="m-0 my-1 d-flex justify-content-between align-items-center">
                  <Link to={`/profile/${userId}`} className="m-0 p-0">
                    <img className="rounded-circle avatar-user" src={avatarURL} alt={id} />
                    <span className="mx-1"><small><strong>{userName}</strong></small></span>
                  </Link>
                  <div>
                    <small className="p-0 m-0"><Moment format="DD/MM/YYYY">{createdAt}</Moment></small>
                  </div>
                </div>
              </div>
              <div className="px-1 col-3 text-center card-media-item">
                <div className="align-content-between">
                  <p className="m-0 my-1 row align-items-center icon-unselected">
                    <i className="fas fa-eye col p-0"></i>
                    <span className="mx-1 p-0 col text-left font-weight-bold">{views}</span>
                  </p>
                  <p className={`m-0 my-1 row align-items-center ${(itemsLiked && this.objectIdInArray(id, itemsLiked)) ? 'icon-selected' : 'icon-unselected'}`} onClick={this.toggleIcon}>
                    <i className="fas fa-thumbs-up col p-0"></i>
                    <span className="mx-1 p-0 col text-left font-weight-bold">{likes}</span>
                  </p>
                </div> 
                <p className="m-0 my-1 icon-unselected"><i className="fas fa-exclamation-triangle"></i></p>
              </div>
            </div>
          </div>
        </div>}
      </Fragment>
    )
  }
}

export default withRouter(withAuthConsumer(SearchItem));