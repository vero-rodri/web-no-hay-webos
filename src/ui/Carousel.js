import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { REGEX_IMAGE, REGEX_VIDEO } from '../constants'

const Carousel = (props) => {

  const { evidences, order } = props

  const isActive = (index) => ( index === order ) && "active";
  
  const isImageOrVideo = (evidence, index) => {
    if ( evidence.file.match(REGEX_IMAGE )) {
      return (
        <div className={`crsl-container carousel-item ${isActive(index)}`} key={index}>
          <img className="crsl-img" src={evidence.file} alt={`slide ${index}`}/>
          <Moment className="h6" format="DD/MM/YYYY">{evidence.createdAt}</Moment>
          <div>{evidence.comments}</div>

      </div>)
    }
    if ( evidence.file.match(REGEX_VIDEO )) {
      return (
        <div className={`crsl-container carousel-item ${isActive(index)}`} key={index}>
        <video key={index} className="crsl-img" width="100%" controls>
          <source src={evidence.file} type="video/ogg"/>
        </video> 
      </div>)
    }
  }

    return (
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        
        <div className="carousel-inner">
          { evidences.map( (evidence, index) => { return isImageOrVideo(evidence, index) }) }
        </div>

        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
}

export default Carousel;
