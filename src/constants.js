const LIMIT_DESCRIPTION = 45;
const LIMIT_TITLE = 18;

export const LIMIT_TEXT_CARD_ITEM = 9;

const SELECT_TYPES = {
  'challenge': 'retos', 
  'userChallenge': 'logros personales',
};
const MIRROR_SELECT_TYPES = {
  'retos': 'challenge', 
  'logros personales': 'userChallenge',
};
const SELECT_SORTS = {
  'views': '+ vistos', 
  'likes': '+ me gusta',
  "createDate": '+ recientes',
};
const MIRROR_SELECT_SORTS = {
  '+ vistos': 'views', 
  '+ me gusta': 'likes',
  "+ recientes": 'createDate',
};
const SELECT_CATEGORIES = [
  {'sports': 'Deportivos'},
  {'crazyThings': 'Locuras'}
];
const LIMIT_AVATARS_LIST = 4;

const DEFAULT_ICON_OPACITY = "0.15";

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
  DEFAULT_ICON_OPACITY,
  REGEX_IMAGE,
  REGEX_VIDEO
}