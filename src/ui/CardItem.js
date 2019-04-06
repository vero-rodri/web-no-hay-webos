import React from 'react';
import { Box, Stack} from  'grommet';

const CardItem = (props) => {

  const item = props.item;

  return (
    <Stack key={item.id} anchor='center' className="card-content mx-1">
      <Box >
        <div className="card">
          {/* <video width="125" height="80" controls>
            <source src={item.file} type="video/ogg"/>
          </video> */}
          <img src={item.file} className="card-img-top img-card-size" alt="" />
          <div className="card-body m-0 p-1 row justify-content-between align-items-center">
            <div className="card-comment px-1">
              <p className="m-0"><small className="card-text m-0">{item.comments}</small></p>
            </div>
            <div className="px-1">
              <button className="p-0"><i className="fas fa-trash-alt text-danger"></i></button>
            </div>
          </div>
        </div>
      </Box>
    </Stack>
  )
}

export default CardItem;