import React, { Component } from 'react';
import authService from '../services/authService';
import { Redirect, Link } from 'react-router-dom';
import { Box, Stack} from  'grommet';
import { REGEX_IMAGE, REGEX_VIDEO, LIMIT_TEXT_CARD_ITEM } from '../constants';
import Moment from 'react-moment';
import 'moment-timezone';
import { OverlayTrigger } from 'react-bootstrap'


class CardItem extends Component {

  state = {
    user: {},
    isRedirectedToItem: false
  }
  
  userSubscription = undefined;

  componentDidMount() {
    let userAux = {};
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      userAux = user;
    });

    this.setState({
      ...this.state,
      user: userAux,
    })
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
  }


  onRedirectToItem = () => {
    this.setState({
      ...this.state,
      isRedirectedToItem: true
    })
  }
  

  onDeleteEvidence = () => {
    this.props.onDeleteEvidence(this.props.item.id)
  }


  onShowModal = () => {
    ( this.props.origin === 'profile' && this.props.item.userId.id === this.state.user.id )
     ? this.onRedirectToItem() 
     : this.props.onShowModal(this.props.order, this.props.item.id)
  }


  createInfoCard = (element, type) => {
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
          owner: element.userId.nickName ? element.userId.nickName : undefined,
          ownerId: element.userId.id ? element.userId.id : undefined,          
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
          ownerId: undefined,
          likes: undefined,
          views: undefined,
          photo: element.file
        }
      }
      default: {}
    }
  }
  render() {
    const { isRedirectedToItem } = this.state;
    const { item, type, origin, onShowModal } = this.props
    const infoCard = this.createInfoCard(item, type);
    const { text, date, owner, ownerId, likes, views, photo } = infoCard;
    const formattedText = (text) => ((text.length > LIMIT_TEXT_CARD_ITEM) ?  
      (`${text.slice(0, LIMIT_TEXT_CARD_ITEM)} ...`) : text);

    const renderTooltip = props => (
      <div {...props} className="rendertooltip">{props.text}</div>
    );
      
      
    if (isRedirectedToItem) {
      if (type ==='challenge') {
        return <Redirect push to={`/challenges/${item.id}`} />
      } else if ( origin === 'profile') {
        return <Redirect push to={`/user-challenges/${item.id}`} /> 
      }
    }

    return (
      <Stack key={item.id} anchor='center' className="card-content mx-1">
        <Box >
          <div className="card">

            {(!photo) && <span className="card-img-top img-card-size" onClick={this.onRedirectToItem}><h6 className="h-100 m-0 d-flex align-items-center"> CLIKEAME PARA SUBIR TU LOGRO</h6></span>}
            {((photo) && (photo.match(REGEX_VIDEO))) && 
            <video className="video-card" width="125" height="80" onClick={(onShowModal) ? this.onShowModal : this.onRedirectToItem}>
              <source src={photo} type="video/ogg"/>
            </video> 
            }

            {((photo) && (photo.match(REGEX_IMAGE))) && 
            <img src={photo} className="card-img-top img-card-size" alt="" onClick={(onShowModal) ? this.onShowModal : this.onRedirectToItem}/>
            }
            <div className="card-body row m-0 p-0 text-center">
              <div className="col-8 card-info">

                {(origin !== "challenge") &&  
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 200, hide: 150 }}
                    overlay={renderTooltip({text})}
                  >
                    <span className="font-weight-bold" style={{fontSize: ".8rem"}}>{formattedText(text)}</span>
                  </OverlayTrigger>
                }
                <div className="row m-0">
                  <div className="col m-0 p-0">
                    {((type === "evidence") || (origin === "profile") || (origin === "challenge")) 
                      && <p className="m-0 height-line"><small ><Moment format="DD/MM/YYYY">{date}</Moment></small></p>}
                    {((origin !== "profile") && (type !== "evidence")) 
                      && <Link to={`/profile/${ownerId}`}><p className="m-0 height-line text-left"><small>De:<strong className="ml-1">{owner}</strong></small></p></Link>}
                  </div> 
                </div>   
              </div>
              <div className="col-4 m-0 card-icons">
                  {((type !== "evidence") && (((origin === "board") || (origin === "profile")) || (origin === "challenge"))) 
                    && <p className="m-0 height-line"><small><i className="mx-1 fas fa-eye fa-xs"></i>{views}</small></p>}
                  {((type !== "evidence") && (((origin === "board") || (origin === "profile")) || (origin === "challenge"))) 
                    && <p className="m-0 height-line"><small><i className="mx-1 far fa-heart fa-xs"></i>{likes}</small></p>}
                  {(type === 'evidence')
                    && <button className="p-0 mx-3" onClick={this.onDeleteEvidence}><i className="fas fa-trash-alt text-danger"></i></button>}
              </div>
            </div>
          </div>
        </Box>
      </Stack> 
    )
  }
}

export default CardItem;