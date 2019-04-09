import React from 'react';
import { Box, Stack} from  'grommet';
import { REGEX_IMAGE, REGEX_VIDEO, LIMIT_TEXT_CARD_ITEM } from '../constants';
import Moment from 'react-moment';
import 'moment-timezone';

const CardItem = (props) => {

 /*  const onDeleteEvidence = () => {
    props.onDeleteEvidence(item.id)
  } */

  const createInfoCard = (element, type) => {
    switch (type) {
      case "challenge": {
        return {
          text: element.title,
          date: element.createdAt,
          owner: element.owner.nickName,
          likes: element.likes,
          views: element.views,
          photo: element.photo
        }
      }
      case "userChallenge": {

        return {
          text: element.challengeId.title,
          date: (element.evidences.length) ? element.evidences[0].createdAt: undefined,
          owner: element.userId.nickName,
          likes: element.likes,
          views: element.views,
          photo: (element.evidences.length) ? element.evidences[0].file: undefined
        }
      }
      case "evidence": {
        return {
          text: element.comments,
          date: element.createdAt,
          owner: undefined,
          likes: undefined,
          views: undefined,
          photo: element.file
        }
      }
      default: {}
    }
  }

  const { item, type, origin, onDeleteEvidence } = props
  const infoCard = createInfoCard(item, type);
  console.log ("la info a pintar en la carta es =>", infoCard)
  const { text, date, owner, likes, views, photo } = infoCard;

  const formattedText = (text) => ((text.length > LIMIT_TEXT_CARD_ITEM) ?  
    (`${text.slice(0, LIMIT_TEXT_CARD_ITEM)} [...]`) : text);  
    
  return (
    <Stack key={item.id} anchor='center' className="card-content mx-1">
      <Box >
        <div className="card">
          {(!photo) && <span className="card-img-top img-card-size"><h6 className="h-100 m-0 d-flex align-items-center"> CLIKEAME PARA SUBIR TU LOGRO</h6></span>}
          {((photo) && (photo.match(REGEX_VIDEO))) && 
          <video className="video-card" width="125" height="80">
            <source src={photo} type="video/ogg"/>
          </video> 
          }

          {((photo) && (photo.match(REGEX_IMAGE))) && 
          <img src={photo} className="card-img-top img-card-size" alt="" />
          }
          <div className="card-body m-0 p-0 text-center">
            {(origin !== "challenge") 
              &&  <span className="m-0" data-container="body" data-toggle="popover" data-placement="bottom" data-content={text}>
                    <u>{formattedText(text)}</u>
                  </span>}
            <div className="row m-0">
              <div className="col-7 text-left m-0 pl-2 align-items-end d-flex">
                {((origin !== "profile") && (type !== "evidence")) 
                  && <p className="m-0 height-line"><small><strong>{owner}</strong></small></p>}
                {((type === "evidence") || (origin === "profile")) 
                  && <p className="m-0 height-line"><small className="mx-1"><Moment className="" format="DD/MM/YYYY">{date}</Moment></small></p>}
              </div>    
              <div className="col-5 text-left p-0 pl-2 m-0">
                {((type !== "evidence") && ((origin === "board") || (origin === "profile"))) 
                  && <p className="m-0 height-line"><small><i className="mx-1 fas fa-thumbs-up fa-xs"></i>{likes}</small></p>}
                {((type !== "evidence") && ((origin === "board") || (origin === "profile"))) 
                  && <p className="m-0 height-line"><small><i className="mx-1 fas fa-eye fa-xs"></i>{views}</small></p>}
              </div>
            </div>
          </div>
        </div>
      </Box>
     </Stack> 
    //  <div>cardItem</div>
  )





  /* return (
    <Stack key={item.id} anchor='center' className="card-content mx-1">
      <Box >
        <div className="card">
          { ( item.file.match(REGEX_VIDEO) ) && 
          <video className="video-card" width="125" height="80">
            <source src={item.file} type="video/ogg"/>
          </video> 
          }

          { ( item.file.match(REGEX_IMAGE) ) && 
          <img src={item.file} className="card-img-top img-card-size" alt="" />
          }
          <div className="card-body m-0 p-1 row justify-content-between align-items-center">
            <div className="card-comment px-1">
              <p className="m-0"><small className="card-text m-0">{item.comments}</small></p>
            </div>
            { ( origin === 'userChallenge' && 
            <div className="px-1">
              <button className="p-0" onClick={onDeleteEvidence}><i className="fas fa-trash-alt text-danger"></i></button>
            </div>
            )}
          </div>
        </div>
      </Box>
    </Stack>
  ) */
}

export default CardItem;