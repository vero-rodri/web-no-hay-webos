import React, { Fragment, Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import {LIMIT_DESCRIPTION, LIMIT_TITLE } from '../../constants';
import $ from 'jquery';
import challengeService from '../../services/challengesService';
import authService from '../../services/authService';
import { withAuthConsumer } from '../../context/AuthStore';


class Item extends Component {

  state = {
    info: this.props,
    redirectToDetail: false
  }



  componentDidMount() {

      authService.getSession()
        .then(user => {
          console.log("el puto user es", user)
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
    return (
      (type ==='challenge') ? challengeService.addViewToChallenge(id) : challengeService.addViewToUserChallenge(id)
      .then((views) => {
        this.setState({
          info:{
            ...this.state.info,
            views:views 
          },
          redirectToDetail: true
        })
      })
    )
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

  render() {
    const formatedProps = this.formatFields();
    //const { type, id, title, description, userName, avatarURL, itemsLiked, views, likes, file } = formatedProps;
    const { type, id, title, description, userName, avatarURL, views, likes, file } = this.state.info;
    const { itemsLiked } = this.state;

    if (this.state.redirectToDetail) {
      if (type === 'challenge') {
        return <Redirect to={`/challenges/${id}/`} />
      } else {
        return <Redirect to={`/user-challenges/${id}/`} />
      }
    }
    
    return (
      <Fragment>
        {<div className="media align-items-center mx-1 my-2 border rounded-lg">
          <img src={file} className="m-0 img-in-search rounded-lg" alt="..." />
          <div className="media-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="px-2 col-9" onClick={this.goToDetail}>
                <h6 className="m-0 mb-1"><u>{title}</u></h6>
                <p className="m-0 my-1">{description}</p>
                <div className="mt-1">
                  <img className="rounded-circle avatar-user" src={avatarURL} alt={id} />
                  <span className="mx-1"><small><strong>{userName}</strong></small></span>
                </div>
              </div>
              <div className="px-1 col-3 text-center group-icons">
                <div>
                  <p className="m-0 mb-1"><i class="fas fa-eye"></i><span className="mx-1">{views}</span></p>
                  <p className={`m-0 my-1 ${(itemsLiked && this.objectIdInArray(id, itemsLiked)) ? 'icon-selected' : null}`} onClick={this.toggleIcon}>
                    <span><i className="fas fa-thumbs-up mx-1">{likes}</i></span>
                  </p>
                </div> 
                <p className="m-0 mt-3"><i class="fas fa-exclamation-triangle"></i></p>
              </div>
            </div>
          </div>
        </div>}
      </Fragment>
    )
  }
}

export default withRouter(withAuthConsumer(Item));