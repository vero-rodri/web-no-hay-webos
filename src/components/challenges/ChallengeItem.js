import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {LIMIT_DESCRIPTION, LIMIT_TITLE } from '../../constants';
import $ from 'jquery';
import challengeService from '../../services/challengesService';
import authService from '../../services/authService';


class ChallengeItem extends Component {

  state = {
    info: this.props,
    redirectToDetail: false,
    
  }

  userSubscription = undefined;

  componentDidMount() {
    this.userSubscription = authService.onUserChange()
      .subscribe(user => {
       // console.log("\n\n EL DIDMOUNT, con user", user)
        this.setState({
          ...this.state,
          info:{
            ...this.state.info,
            user: user.nickName,
            itemsLiked: user.challengesLiked
          }
        })
      })
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe()
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
    let formatedProps  = {...this.state.info}
    console.log("la INFO es", formatedProps)
    formatedProps.description = (formatedProps.description.length > LIMIT_DESCRIPTION) ?
      (`${formatedProps.description.slice(0, LIMIT_DESCRIPTION)} [...]`) : formatedProps.description;
    formatedProps.title = (formatedProps.title.length > LIMIT_TITLE) ?
      (`${formatedProps.title.slice(0, LIMIT_TITLE)} [...]`) : formatedProps.title;
    return formatedProps;
  }

  goToDetail = () => {
    console.log("añadiendo go detail.. ")
    return (
      challengeService.addViewToChallenge(this.state.info.id)
      .then((views) => {
        console.log("Ahora los views deberían ser = ", views)
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
    console.log("...al toggleee con ", event.target);


    const { type, id, itemsLiked } = this.state.info;

    if (this.objectIdInArray(id, itemsLiked)) {
      console.log("el id ya esta en el array de LIKED...=> toca quitar")
      $(event.target).removeClass("icon-selected");
      console.log("etiqueta actual al remover la clase ", event.target);
      if (type === 'challenge') {
        challengeService.removeChallengeFromLikes(id)
          .then((response) => {
            console.log("EL quitarr trae en likes e itemsLiked = ", response, "yeahh")
            this.setState({
              info:{
                ...this.state.info,
                ...response
              }
            })
          })
      }
    } else {
      console.log("el Id no ESTA EN EL Arr LIKED...=> toca poner")
      $(event.target).addClass("icon-selected");
      console.log("etiqueta actual al añadir ", event.target);
      if (type === 'challenge') {
        challengeService.addChallengeToLikes(id)
          .then((response) => {
            console.log("EL añadir trae en likes e itemsLiked = ", response)
            this.setState({
              info:{
                ...this.state.info,
                ...response 
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
    const { type, id, title, description, user, avatarURL, itemsLiked, views, likes, file } = formatedProps;

    console.log("SE MONTA EL COMPONENTE CON ID E ITEMSLIKES", user, id, itemsLiked)

    if (this.state.redirectToDetail) {
     return <Redirect to={`/challenges/${id}/`} />
    }
    
    //console.log("pinto el reto", title, "con nº likes", likes)
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
                  <img className="rounded-circle avatar-user" src={avatarURL}></img>
                  <span className="mx-1"><small><strong>{user}</strong></small></span>
                </div>
              </div>
              <div className="px-1 col-3 text-center group-icons">
                <div>
                  <p className="m-0 mb-1"><i class="fas fa-eye"></i><span className="mx-1">{views}</span></p>
                  <p className={`m-0 my-1 ${(this.objectIdInArray(id, this.state.info.itemsLiked)) ? 'icon-selected' : null}`} onClick={this.toggleIcon}>
                    <span><i className="fas fa-thumbs-up mx-1">{likes}</i></span>
                  </p>
                </div> 
                <p className="m-0 mt-3"><i class="fas fa-exclamation-triangle"></i></p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ChallengeItem;