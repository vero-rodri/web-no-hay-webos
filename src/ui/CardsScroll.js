import React from 'react';
import CardItem from './CardItem';

const CardsScroll = (props) => {
  
  const { items, origin } = props;

  if (origin === "userChallenge") {
    return ( 
        <div className="cards-scroll mx-1">
          { items.map((item, index) => <CardItem  key={index} 
                                                  item={item} 
                                                  origin="userChallenge" 
                                                  order={index}
                                                  onDeleteEvidence={props.onDeleteEvidence} 
                                                  onShowModal={props.onShowModal}
                                                  onOrderModal={props.onOrderModal}
        />)}
        </div>
    )
  }

  if ((origin === "board") || (origin === "challenge")) {
    return ( 
      <div className="cards-scroll mx-1">
        { items.map((item, index) => <div key={index} item={item}><CardItem item={item.evidences[0]} origin="board"/></div>)}
      </div>
    )
  }

}

export default CardsScroll;
