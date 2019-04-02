import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Box, Stack, Text } from  'grommet';

const CardsScroll = (props) => {

  const items = (items) => 
    items.map(item => 
      <Stack key={item.id} anchor='center' className="card-content mx-1">
        <Box className="">
          <div className="card">
            <img src={item.evidences[0].file} className="card-img-top img-card-size" alt="" />
            <div className="card-body m-0 p-1 row justify-content-between align-items-center">
              <div className="px-1">
                <p className="m-0"><small className="card-text m-0">{item.challengeId.title}</small></p>
                <p className="m-0"><small className="card-text m-0">EV->{item.evidences[0].title}</small></p>
                <p className="m-0">{item.userId.nickName}</p>
              </div>
              <div className="px-1">
                <span><i className="fas fa-ellipsis-v"></i></span>
              </div>
            </div>
          </div>
        </Box>
      </Stack>
    )
  return ( 
    <div className="cards-scroll mx-1">
      {items(props.items)}
    </div>
  )
}

export default CardsScroll;