import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Box, Stack, Text } from  'grommet';

const ChallengesScroll = (props) => {
  
  const items = (items) => 
    items.map(item => 
      <Stack key={item.id} anchor='center' className="images-content img-challenge-size mx-1">
        <Box height="small" width="medium" className="img-challenge-size">
          <Image className="h-100 w-100 rounded" alignSelf="center" key={item.id} src={item.photo} />
        </Box>
        <Link to={{
          pathname: `/challenges/${item.id}`,
          ...item }} >
          <Text className="link text-white" size='large'><strong>{item.title}</strong></Text>
        </Link>
      </Stack>
    )

  return ( 
    <div className="images-scroll px-1">
      {items(props.items)}
    </div>
  )
}

export default ChallengesScroll;