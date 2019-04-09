/* import React from 'react';
import CardItem from './CardItem';

const CardsScroll = (props) => {
  
  const { items, origin, type } = props;
  // const items = props.items;
  // const origin = props.origin;

  console.log("en cardsCROLL", items)

  if ((origin === "userChallenge") || (type === "challenge")) {
    console.log("el scroll va a ser de tipo challenge", items)
    return ( 
        <div className="cards-scroll mx-1">
          { items.map((item, index) => <CardItem key={index} item={item} origin="userChallenge" onDeleteEvidence={props.onDeleteEvidence}/>)}
        </div>
    )
  }

  if ((origin === "board") || (origin === "challenge") || (type === "userChallenge")) {
    console.log("el scroll va a ser de tipo userchallenge", items)
    return ( 
      <div className="cards-scroll mx-1">
        { items.map((item, index) => <div key={index} item={item}><CardItem item={item.evidences[0]} origin="board"/></div>)}
      </div>
    )
  } else {
    console.log("el scroll no ha hecho na", items)
  }


}

export default CardsScroll; */


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
      <div className="row py-2 my-1 scroll-container">
        <div className="col cards-scroll user-challenge-scroll">
          <div className="cards-scroll mx-1">
            {items.length ?
              items.map((item, index) => <CardItem key={index} item={item} origin={origin} type={type} onDeleteEvidence={onDeleteEvidence} />)
              : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
          </div>
        </div>
      </div>
    )
  }

  if (type === "userChallenge") {
    console.log("el scroll va a ser de tipo userchallenge", items)
    return ( 
      <div className="row py-2 my-1 scroll-container">
        <div className="col cards-scroll user-challenge-scroll">
          <div className="cards-scroll mx-1">
            {items.length ?
              items.map((item, index) => <CardItem key={index} item={item} origin={origin} type={type} onDeleteEvidence={onDeleteEvidence} />)
              : <h6 className="text-center m-2 w-100">{textAlternative}</h6>} 
          </div>
        </div>
      </div>
    )
  }
}

export default CardsScroll;
