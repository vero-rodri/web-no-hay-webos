import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Box, Stack, Text } from  'grommet';

const CarouselCustom = (props) => {
  
  const itemsCarousel = (items) => 
    items.map(item => 
      <Stack anchor='center'>
          <Image fit="contain" key={item.id} src={item.photo} />
          <Box
            background={{ color: 'white', opacity: 'medium' }}
            pad='medium'
            round='medium'
            >
                <Link to={{
                pathname: `/challenges/${item.id}`,
                ...props
              }} >
            <Text className="link" size='large'><strong>{item.title}</strong></Text>
            </Link>
          </Box>
        </Stack>
    )

  return (
      <Box height="small" width="medium">  
        <Carousel margin="medium">
          {itemsCarousel(props.items)}
        </Carousel>
      </Box>
  )
}

export default CarouselCustom;