import React from 'react';
import CardItem from './CardItem';
import icons from '../utils/icons.json';

const CardsScroll = (props) => {
  
  const getIconText = text => icons[text];
  const { items, textAlternative, type, origin, onDeleteEvidence, onShowModal } = props

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
            : <div className="row py-2 px-4">
                <div className="col-3"><img src={getIconText("hen")} alt="hen" style={{width: "100%"}}/></div>
                <div className="col-9"><h6 className="text-center m-2 w-100">{textAlternative}</h6></div>
              </div>
          } 
        </div>
      </div>
    )
  }
}

export default CardsScroll;
