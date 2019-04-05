import React, { Fragment, Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import {LIMIT_DESCRIPTION, LIMIT_TITLE } from '../../constants';
import $ from 'jquery';
import challengeService from '../../services/challengesService';
import authService from '../../services/authService';
import { withAuthConsumer } from '../../context/AuthStore';


class Item extends Component {

  state = {
    user: this.props.user,
    info: this.props,
    redirectToDetail: false

    //itemsLiked: []
  }

  userSubscription = undefined;

  componentDidMount() {
    console.log("%%%% DIDMOUNT ITEM %%%%")
    this.userSubscription = authService.onUserChange()
      .subscribe(user => {
        let itemsLiked = [];
        (this.state.info.type === 'challenge') ? itemsLiked = [...user.challengesLiked] : itemsLiked = [...user.userChallengesLiked];
        console.log("EN DIDMOUNT el itemsLiked es ", itemsLiked)

       // console.log("\n\n EL DIDMOUNT, con user", user)
        this.setState({
          ...this.state,
          itemsLiked: itemsLiked
        })
      })

      console.log("la subscripcio a user lleva", this.userSubscription)


      authService.getUserSession()
        .then(user => {
          console.log("el puto user es", user)
          let itemsLiked;
          (this.state.info.type === 'challenge') ? itemsLiked = [...user.challengesLiked] : itemsLiked = [...user.userChallengesLiked];
          this.setState({
            ...this.state,
            itemsLiked
          })
        })
        


        console.log("y el itemsLiked (en DM) es ", this.state.itemsLiked)
  }

  componentWillUnmount() {
  //  this.userSubscription.unsubscribe()
  }



  /* getPath = (type) => {
    console.log("el tipo es", type)
    if (type === 'challenge') {
      return '/challenges';
    } else {
      return '/user-challenges';
    }
  } */

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
    //console.log("añadiendo go detail.. ")
    return (
      (type ==='challenge') ? challengeService.addViewToChallenge(id) : challengeService.addViewToUserChallenge(id)
      //(this.state.path.startsWith("/challenges")) ? challengeService.addViewToChallenge(id) : challengeService.addViewToUserChallenge(id)
      // challengeService.addViewToChallenge(this.state.info.id)
      .then((views) => {
        //console.log("Ahora los views deberían ser = ", views)
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
        /* .then((response) => {
          this.setState({
            info:{
              ...this.state.info,
              ...response 
            }
          })
        })  */
        //intentandolo sacando el itemsLike a parte... 
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
          console.log("EL ITEMSLIKED DEL ESTADO ES", this.state.itemsLiked)
        })       
    }

    const handleAddLikeToUserChallenge = (id) => {
      challengeService.addUserChallengeToLikes(id)
      /* .then((response) => {
        this.setState({
          info:{
            ...this.state.info,
            ...response 
          }
        })
      })  */
      // probando sacando el itemsLike...
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
        console.log("EL ITEMSLIKED DEL ESTADO ES", this.state.itemsLiked)
      })
    }

    const handleRemoveLikeFromChallenge = (id) => {
      challengeService.removeChallengeFromLikes(id)
        /* .then(response => {
          this.setState({
            info:{
              ...this.state.info,
              ...response
            }
          })
        }); */
        // probando sacando el itemsLike...
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
        console.log("EL ITEMSLIKED DEL ESTADO ES", this.state.itemsLiked)
      })
      }
      
    const handleRemoveLikeFromUserChallenge = (id) => {
      challengeService.removeUserChallengeFromLikes(id)
      /* .then((response) => {
        this.setState({
          info:{
            ...this.state.info,
            ...response
          }
        })
      }); */
      // probando sacando el itemsLike...
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
        console.log("EL ITEMSLIKED DEL ESTADO ES", this.state.itemsLiked)
      })
    }

    const { type, id } = this.state.info;
    const { itemsLiked } = this.state

   // console.log("estado inicial tag =>", event.target)

    if (this.objectIdInArray(id, itemsLiked)) {
      console.log("toca quitar!")
      $(event.target).removeClass("icon-selected");
      //console.log("estado despues tag =>", event.target)
      switch (type) {
        case 'challenge': {
          console.log('remove like C..')
          handleRemoveLikeFromChallenge(id);
          break;
        }
        case 'userChallenge': {
          console.log('remove like UC..')
          handleRemoveLikeFromUserChallenge(id);
          break;
        }
        default:
      }
    } else {
      console.log("toca poner!!!")
      $(event.target).addClass("icon-selected");
   // console.log("estado despues tag =>", event.target)
      switch (type) {
        case 'challenge': {
          console.log('add like C..')
          handleAddLikeToChallenge(id);
          break;
        }
        case 'userChallenge': {
          console.log('add like UC..')
          handleAddLikeToUserChallenge(id);
          break;
        }
        default:
      }
    }
  }

  objectIdInArray = (objId, arr) => {
    console.log("entro a comparar con ", objId, arr)
    let arrAux = arr.map(objId => JSON.stringify(objId))
    let objIdAux = JSON.stringify(objId);
    console.log("\n ¿¿el id ", objIdAux, " está incluido en ", arrAux)
    console.log("respuesta ", arrAux.includes(objIdAux))
    return (arrAux.includes(objIdAux))
  }

  render() {
    console.log("---ITEM-RENDER")
    const formatedProps = this.formatFields();
    //const { type, id, title, description, userName, avatarURL, itemsLiked, views, likes, file } = formatedProps;
    const { type, id, title, description, userName, avatarURL, views, likes, file } = this.state.info;
    const { itemsLiked } = this.state;
    console.log("y en el RENDER itemsLIked ", itemsLiked)

    //console.log("SE MONTA EL COMPONENTE CON ID E ITEMSLIKES", userName, id, itemsLiked)

    if (this.state.redirectToDetail) {
      if (type === 'challenge') {
        return <Redirect to={`/challenges/${id}/`} />
      } else {
        return <Redirect to={`/user-challenges/${id}/`} />
      }
    }
    
    //console.log("pinto el reto", title, "con nº likes", likes)
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