const LIMIT_DESCRIPTION = 100;
const LIMIT_TITLE = 40;
const SELECT_TYPES = {
  'challenge': 'Reto', 
  'userChallenge': 'UC',
};
const MIRROR_SELECT_TYPES = {
  'Reto': 'challenge', 
  'UC': 'userChallenge',
};
const SELECT_SORTS = {
  'views': '+ Vistos', 
  'likes': '+ Likes',
  "createDate": '+ Recientes',
};
const MIRROR_SELECT_SORTS = {
  '+ Vistos': 'views', 
  '+ Likes': 'likes',
  "+ Recientes": 'createDate',
};
const SELECT_CATEGORIES = [
  {'sports': 'Deportivos'},
  {'crazyThings': 'Locuras'}
];

export {
  LIMIT_DESCRIPTION,
  LIMIT_TITLE,
  SELECT_TYPES,
  SELECT_SORTS,
  SELECT_CATEGORIES,
  MIRROR_SELECT_TYPES,
  MIRROR_SELECT_SORTS
}