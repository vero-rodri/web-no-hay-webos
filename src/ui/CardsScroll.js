import React from 'react';
import CardItem from './CardItem';

const CardsScroll = (props) => {
  
  const items = props.items;
   
  return ( 
    <div className="cards-scroll mx-1">
      { items.map((item, index) => <CardItem key={index} item={item} />)}
    </div>
  )
}

export default CardsScroll;