import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'grommet';

class NotificationItem extends Component {

  state = {
    goToDetail: false
  }
  
  handleRedirect = () => {
    console.log("intento hacer redirect....")
    this.setState({
      goToDetail: true
    })
  }
  
  render() {
    const { message } = this.props;
    const { avatarURL, nickName} = this.props.sender;
    const { title, photo } = this.props.challengeId
    console.log("sender ", this.props.sender)
    
    if (this.state.goToDetail) {
      return <Redirect to={{
                pathname: `/notifications/${this.props.challengeId.id}`,
                state: {
                  userChallengeId: this.props.id
                }
              }} />
    } else {
      return ( 
        <Fragment>
          {console.log("propiedades de la notificacion", this.props)}
    
          <div className="media border mx-2 my-3 rounded d-flex justify-content-between" style={{height: '150px'}}>
            <div className="media-body col-8 h-100">
              <div className=" d-flex row p-0 h-100">
                <div className="p-2 m-0 row">
                  <img className="rounded-circle avatar-user" src={avatarURL} alt={this.props.sender.id} />
                  <h5 className="m-0 mx-1"><strong>{nickName}</strong> te reta a:</h5>
                </div>
                <h6 className="m-0 px-2 my-1 w-100 text-center"><u>{title}</u></h6>
                <p className="m-0 px-2"><small><i>{message}</i></small></p>
              </div>
            </div>
            <div className="col-4 h-100 p-0">
              <div className="p-2 m-0 h-100 ">
                <Button className="py-1 px-2 my-1 w-100" type="button" primary label="Más info" onClick={this.handleRedirect} />
                <Button className="py-1 px-2 my-1 w-100" type="button" primary label="Declinar" onClick={() => this.props.handleRemove(this.props.id)}/>
              </div>
            </div>
            {/* <div className="col p-0">
              <img className="rounded-lg w-100 img-notification" src={photo}  alt="..." />
            </div> */}
          </div>
     
        </Fragment>
      ) 
    }
  }
}

export default NotificationItem;