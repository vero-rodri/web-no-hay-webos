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
      // <div className="row py-2 my-1 scroll-container">
        <div className="col cards-scroll user-challenge-scroll">
          <div className="cards-scroll mx-1">
            {items.length ?
              items.map((item, index) => <CardItem  key={index} 
                                                    item={item} 
                                                    origin={origin}
                                                    order={index} 
                                                    type={type} 
                                                    onDeleteEvidence={onDeleteEvidence}
                                                    onShowModal={props.onShowModal}
                                                    onOrderModal={props.onOrderModal}
                                          />)
              : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
          </div>
        </div>
      // </div>
    )
  }

  if (type === "userChallenge") {
    console.log("el scroll va a ser de tipo userchallenge", items)
    return ( 
      <div className="row py-2 my-1 scroll-container">
        <div className="col cards-scroll user-challenge-scroll">
          <div className="cards-scroll mx-1">
            {items.length ?
              items.map((item, index) => <CardItem  key={index} 
                                                    item={item} 
                                                    origin={origin}
                                                    order={0} 
                                                    type={type}
                                                    onShowModal={props.onShowModal} 
                                                    onDeleteEvidence={onDeleteEvidence} 
                                          />)
              : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
          </div>
        </div>
      </div>
    )
  }
}

export default CardsScroll;
