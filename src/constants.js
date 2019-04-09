const LIMIT_DESCRIPTION = 55;
const LIMIT_TITLE = 15;

export const LIMIT_TEXT_CARD_ITEM = 10;

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
const LIMIT_AVATARS_LIST = 2;

const REGEX_IMAGE = /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;
const REGEX_VIDEO = /\.(avi|gif|mp4|wmv|webm|ogv|flv|mpg)$/;

export {
  LIMIT_DESCRIPTION,
  LIMIT_TITLE,
  SELECT_TYPES,
  SELECT_SORTS,
  SELECT_CATEGORIES,
  MIRROR_SELECT_TYPES,
  MIRROR_SELECT_SORTS,
  LIMIT_AVATARS_LIST,
  REGEX_IMAGE,
  REGEX_VIDEO
}