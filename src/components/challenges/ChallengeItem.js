import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'


class ChallengeItem extends Component {

  
  render() {
    console.log("EL RETO TIENE", this.props)
    const { title, photo, owner, id, views } = this.props
    return (
      <Fragment>
        <Link to={{
          pathname: `/challenges/${id}`,
          ...this.props
          }} >
          <div className="media align-items-center m-1 border rounded-lg">
            <img src={photo} className="m-0 img-in-search rounded-lg" alt="..." />
            <div className="media-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="m-0"><small>TÍT: {title}</small></p>
                  {owner && <p className="m-0"><small>CREa: {owner.nickName}</small></p>}
                </div>
                <div>
                  <span>views<i class="fas fa-eye"></i>{views}</span></div>
              </div>
            </div>
          </div>
        </Link>
      </Fragment>
    )
  }
}

export default ChallengeItem;