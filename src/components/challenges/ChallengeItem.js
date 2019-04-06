import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom'
import {LIMIT_DESCRIPTION, LIMIT_TITLE } from '../../constants';
import $ from 'jquery';
import Service from '../../services/challengesService';


class ChallengeItem extends Component {

  state = {
    info: this.props,
    redirectToDetail: false
  }


  getPath = (type) => {
    console.log("el tipo es", type)
    if (type === 'challenge') {
      return '/challenges';
    } else {
      return '/user-challenges';
    }
  }

  formatFields = () => {
    let formatedProps  = {...this.props}
    formatedProps.description = (formatedProps.description.length > LIMIT_DESCRIPTION) ?
      (`${formatedProps.description.slice(0, LIMIT_DESCRIPTION)} [...]`) : formatedProps.description;
    formatedProps.title = (formatedProps.title.length > LIMIT_TITLE) ?
      (`${formatedProps.title.slice(0, LIMIT_TITLE)} [...]`) : formatedProps.title;
    return formatedProps;
  }

  goToDetail = () => {
    return (
      Service.addViewToChallenge(this.props.id)
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

    const { type, id, itemsLiked } = this.props;

    if (this.objectIdInArray(id, itemsLiked)) {
      $(event.target).removeClass("icon-selected");
      if (type === 'challenge') {
        Service.removeChallengeFromLikes(id)
          .then((likes) => {
            this.setState({
              info:{
                ...this.state.info,
                likes:likes 
              }
            })
          })
      }
    } else {
      $(event.target).addClass("icon-selected");
      if (type === 'challenge') {
        Service.addChallengeToLikes(id)
          .then((likes) => {
            this.setState({
              info:{
                ...this.state.info,
                likes:likes 
              }
            })
          })
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
    const { id, title, description, user, avatarURL, itemsLiked, views, likes, file } = formatedProps;

    if (this.state.redirectToDetail) {
     return <Redirect to={`/challenges/${id}/`} />
    }
    
    return (
      <Fragment>
        <div className="media align-items-center mx-1 my-2 border rounded-lg">
          <img src={file} className="m-0 img-in-search rounded-lg" alt="..." />
          <div className="media-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="px-2 col-9" onClick={this.goToDetail}>
                {/* <Link to={{
                    pathname: `${this.getPath(type)}/${id}`,
                    ...this.props
                    }} > */}
                  <h6 className="m-0 mb-1"><u>{title}</u></h6>
                  {/* </Link> */}
                <p className="m-0 my-1">{description}</p>
                <div className="mt-1">
                  <img className="circle avatar-user" src={avatarURL} alt={title}></img>
                  <span className="mx-1"><small><strong>{user}</strong></small></span>
                </div>
              </div>
              <div className="px-1 col-3 text-center group-icons">
                <div>
                  <p className="m-0 mb-1"><i className="fas fa-eye"></i><span className="mx-1">{views}</span></p>
                  <p className={`m-0 my-1 ${(this.objectIdInArray(id, itemsLiked)) ? 'icon-selected' : null}`} onClick={this.toggleIcon}><span><i className="fas fa-thumbs-up mx-1">{likes}</i></span></p>
                </div> 
                <p className="m-0 mt-3"><i className="fas fa-exclamation-triangle"></i></p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ChallengeItem;