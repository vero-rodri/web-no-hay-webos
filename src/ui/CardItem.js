import React from 'react';
import { Box, Stack} from  'grommet';
import { REGEX_IMAGE, REGEX_VIDEO } from '../constants'

const CardItem = (props) => {

  const item = props.item;
  const origin = props.origin;

  const onDeleteEvidence = () => {
    props.onDeleteEvidence(item.id)
  }

  const onShowModal = () => {
    props.onShowModal(props.order)
  }

  return (
    <Stack key={item.id} anchor='center' className="card-content mx-1">
      <Box >
        <div className="card">
          { ( item.file.match(REGEX_VIDEO) ) && 
          <video className="video-card" width="125" height="80" onClick={onShowModal}>
            <source src={item.file} type="video/ogg"/>
          </video> 
          }

          { ( item.file.match(REGEX_IMAGE) ) && 
          <img src={item.file} className="card-img-top img-card-size" alt="" onClick={onShowModal}/>
          }
          <div className="card-body m-0 p-1 row justify-content-between align-items-center">
            <div className="card-comment px-1">
              <p className="m-0"><small className="card-text m-0">{item.comments}</small></p>
            </div>
            { ( origin === 'userChallenge' && 
            <div className="px-1">
              <button className="p-0" onClick={onDeleteEvidence}><i className="fas fa-trash-alt text-danger"></i></button>
            </div>
            )}
          </div>
        </div>
      </Box>
    </Stack>
  )
}

export default CardItem;