import React from 'react';
import CardsScroll from './CardsScroll';

const CardsRow = (props) => {

  return ( 
    <div className="row py-2 my-3 scroll-container">
      <CardsScroll {...props} />
      </div>
  )
}

export default CardsRow;
