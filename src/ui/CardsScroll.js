import React from 'react';
import CardItem from './CardItem';

const CardsScroll = (props) => {
  
  const { items, textAlternative, type, origin, onDeleteEvidence } = props;
  // const items = props.items;
  // const origin = props.origin;

  console.log("en cardsCROLL", items)

  if (type === "challenge" || type === "evidence") {
    console.log("el scroll va a ser de tipo challenge", items)
    return ( 
      <div className="col cards-scroll user-challenge-scroll">
        <div className="cards-scroll mx-1">
          {items.length ?
            items.map((item, index) => <CardItem  key={index} 
                                                  item={item} 
                                                  origin={origin} 
                                                  type={type} 
                                                  onDeleteEvidence={(id) => onDeleteEvidence(id)}
                                                  onShowModal={props.onShowModal}
                                                  onOrderModal={props.onOrderModal}
                                                  />)
            : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
        </div>
      </div>
    )
  }

  if (type === "userChallenge") {
    console.log("el scroll va a ser de tipo userchallenge", items)
    return ( 
      <div className="col cards-scroll user-challenge-scroll">
        <div className="cards-scroll mx-1">
          {items.length ?
            items.map((item, index) => <CardItem  key={index} 
                                                  item={item} 
                                                  origin={origin} 
                                                  type={type} 
                                                  onDeleteEvidence={onDeleteEvidence} />)
            : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
        </div>
      </div>
    )
  }
}

export default CardsScroll;
