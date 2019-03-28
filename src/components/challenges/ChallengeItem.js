import React, { Component } from 'react';
import { Box, Image } from 'grommet';
import { Link } from 'react-router-dom'
import challengesService from '../../services/challengesService';

class ChallengeItem extends Component {

  
  render() {
    return (
      <Link to={{
        pathname: `/challenges/${this.props.id}`,
        ...this.props
        }} >
        <Box height="small" width="small">
          <h3>{this.props.title}</h3>
          <Image
            fit="cover"
            src={this.props.photo}
          />
        </Box>
      </Link>
    )
  }
}

export default ChallengeItem;