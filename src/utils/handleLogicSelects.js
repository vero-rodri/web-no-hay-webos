import { MIRROR_SELECT_SORTS } from '../constants';

const showUsersChallenge = (items) => {

  const topLikesUserChallenges = () => this.state.userChallenges
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);


  const topViewsUserChallenges = () => this.state.userChallenges
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);


  const latestUserChallenges = () => this.state.userChallenges
    .sort((a, b) => {
      return (Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1 
    })
    .slice(0, 10);

  const { optionFiltered } = this.state;
  let userChallengesFiltered = [];
  switch (MIRROR_SELECT_SORTS[optionFiltered]) {
    case "likes": {
      userChallengesFiltered = topLikesUserChallenges();
      break;
    }
    case "views": {
      userChallengesFiltered = topViewsUserChallenges();
      break;
    }
    case "createDate": {
      userChallengesFiltered = latestUserChallenges();
      break;
    }
    default: {}
  }
  return userChallengesFiltered;
  //return <CardsScroll items={userChallengesFiltered} origin="challenge" />
}



export const listByFilters = (items, type, sort) => {

  const sortByLikes = (arr) => arr.sort((a, b) => b.likes-a.likes);
  const sortByViews = (arr) => arr.sort((a, b) => b.views-a.views);
  const sortByCreateAt = (arr) => arr.sort((a, b) => {
    return (Date.parse(b.createdAt) - Date.parse(a.createdAt) > 0) ? 1 : -1
//    return (Date.parse(b.evidences[b.evidences.length - 1].createdAt) - Date.parse(a.evidences[a.evidences.length - 1].createdAt) > 0) ? 1 : -1 
//quizas esta linea de arriba la necesite para implementar bien el creatAt cuando son userchallenges...
  });

  let filteredArr = [];

  switch (sort) {
    case 'likes': {
      filteredArr = sortByLikes(items);
      break; 
    }
    case 'views': {
      filteredArr = sortByViews(items);
      break;
    }
    case 'createDate': {
      filteredArr = sortByCreateAt(items);
      break;
    }
    default: {}
  }
  return filteredArr;
}



 /*  if (type === 'challenge') {
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
    } */
//   }
// }




/* 
export {
  showUsersChallenge,
  listByFilters
} */