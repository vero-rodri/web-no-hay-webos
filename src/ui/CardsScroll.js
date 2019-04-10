import React from 'react';
import CardItem from './CardItem';

const CardsScroll = (props) => {
  
  const { items, textAlternative, type, origin, onDeleteEvidence, onShowModal } = props;

  if (type === "challenge" ) {
    return ( 
      <div className="col cards-scroll user-challenge-scroll">
        <div className="cards-scroll mx-1">
          {items.length ?
            items.map((item, index) => <CardItem  key={index} 
                                                  item={item} 
                                                  origin={origin} 
                                                  order={index}
                                                  type={type} 
                                                  />)
            : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
        </div>
      </div>
    )
  }

  if ( type === "evidence" ) {
    return ( 
      <div className="col cards-scroll user-challenge-scroll">
        <div className="cards-scroll mx-1">
          {items.length ?
            items.map((item, index) => <CardItem  key={index} 
                                                  item={item} 
                                                  origin={origin} 
                                                  order={index}
                                                  type={type} 
                                                  onDeleteEvidence={(id) => onDeleteEvidence(id)}
                                                  onShowModal={(order, id ) => onShowModal(order, id)}
                                                  onOrderModal={props.onOrderModal}
                                                  />)
            : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
        </div>
      </div>
    )
  }


  if (type === "userChallenge") {
    return ( 
      <div className="col cards-scroll user-challenge-scroll">
        <div className="cards-scroll mx-1">
          {items.length ?
            items.map((item, index) => <CardItem  key={index} 
                                                  item={item} 
                                                  origin={origin}
                                                  order={0} 
                                                  type={type}
                                                  onShowModal={(order, id ) => onShowModal(order, id)} 
                                                  />)
            : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
        </div>
      </div>
    )
  }
}

export default CardsScroll;
