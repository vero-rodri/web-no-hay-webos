import React from 'react';
import CardItem from './CardItem';

const CardsScroll = (props) => {
  
  const { items, origin } = props;
  // const items = props.items;
  // const origin = props.origin;

  console.log("en cardsCROLL", items)

  if (origin === "userChallenge") {
    return ( 
        <div className="cards-scroll mx-1">
          { items.map((item, index) => <CardItem key={index} item={item} origin="userChallenge"/>)}
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