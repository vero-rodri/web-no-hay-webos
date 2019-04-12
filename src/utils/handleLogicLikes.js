import challengeService from '../services/challengesService';
import userChallengeService from '../services/userChallengesService';
import $ from 'jquery';


export const objectIdInArray = (objId, arr) => {
  console.log("ENTRO EN OBIDINARRAY CON ",  objId, arr)
  let arrAux = arr.map(objId => JSON.stringify(objId))
  let objIdAux = JSON.stringify(objId);
  return (arrAux.includes(objIdAux))
}



export const handleLogicLikes = (event, type, id, itemsLiked) => {

  const handleAddLikeToChallenge = (id) => {
    return challengeService.addChallengeToLikes(id)
      // .then((response) => {
      //   const {likes, itemsLiked} = response
      //   this.setState({
      //     ...this.state,
      //     itemsLiked,
      //     info: {
      //       ...this.state.info,
      //       likes 
      //     }
      //   })
      // })       
  }

  const handleAddLikeToUserChallenge = (id) => {
    return userChallengeService.addUserChallengeToLikes(id)
      /* .then((response) => {
        const {likes, itemsLiked} = response
        this.setState({
          ...this.state,
          itemsLiked,
          info: {
            ...this.state.info,
            likes 
          }
        })
      }) */
  }

  const handleRemoveLikeFromChallenge = (id) => {
    return challengeService.removeChallengeFromLikes(id)
      /* .then((response) => {
        const {likes, itemsLiked} = response
        this.setState({
          ...this.state,
          itemsLiked,
          info: {
            ...this.state.info,
            likes 
          }
        })
      }) */
  }
    
  const handleRemoveLikeFromUserChallenge = (id) => {
    return userChallengeService.removeUserChallengeFromLikes(id)
      /* .then((response) => {
        const {likes, itemsLiked} = response
        this.setState({
          ...this.state,
          itemsLiked,
          info: {
            ...this.state.info,
            likes 
          }
        })
      }) */
  }
/* 
  const { type, id } = this.state.info;
  const { itemsLiked } = this.state
*/

console.log("ID =>", id);
console.log("ITEMSLIKED =>", itemsLiked);
// console.log("ID =>", id);
// console.log("ID =>", id);

  if (objectIdInArray(id, itemsLiked)) {
    $(event.target).removeClass("icon-selected");
    switch (type) {
      case 'challenge': {
        return handleRemoveLikeFromChallenge(id);
        break;
      }
      case 'userChallenge': {
        return handleRemoveLikeFromUserChallenge(id);
        break;
      }
      default:
    }
  } else {
    $(event.target).addClass("icon-selected");
    switch (type) {
      case 'challenge': {
        return handleAddLikeToChallenge(id);
        break;
      }
      case 'userChallenge': {
        return handleAddLikeToUserChallenge(id);
        break;
      }
      default:
    }
  }
}