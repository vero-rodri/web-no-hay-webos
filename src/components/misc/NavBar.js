import React, { Component} from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userChallengesService from '../../services/userChallengesService';
import icons from '../../utils/icons.json';
import InputSearch from '../../ui/InputSearch';


const getIconText = text => icons[text];



class NavBar extends Component {
  state = {
    user: {},
    userChallengesPending: []
  }

  userSubscription = undefined;
  usersChallengesPendingSubscription = undefined;

  componentDidMount() {
    let userAux = {};
    let userChallengesPendingAux = [];
    
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      userAux = user;
    });

    this.userChallengesPendingSubscription = userChallengesService.onUserChallengesPendingChange().subscribe((userChallengesPending) => {
      userChallengesPendingAux = userChallengesPending;
    });

    console.log("\n\n\nlas notif pendientes son: ", userChallengesPendingAux)
    this.setState({
      ...this.state,
      user: userAux,
      userChallengesPending: userChallengesPendingAux
    })
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
    this.userChallengesPendingSubscription.unsubscribe()
  }

  handleLogout = () => {
    authService.logout()
      .then(() => {
        //return <Redirect to="/login" />
        this.props.history.push('/login')
      })
  }

  render() {
    const { user, userChallengesPending } = this.state;
    const { pathname } = this.props.history.location;

    if ( pathname === '/login' || pathname === '/register') {
      return null;
    } else {
      
      return (
      <div className="pos-f-t">
        <nav className="navbar navbar-dark nav-bar-bg">
          <div className="profile-container">
            <Link to="/profile">
              <div className="nav-bar-img-div">
                <img className="nav-bar-img" src={user.avatarURL} alt={user.nickName}></img>
              </div>
            </Link>
            { !pathname.startsWith('/search') && <span>{user.nickName}</span> }
          </div>

          { pathname.startsWith('/search') && <InputSearch />}

  
          <div className="dropdown">
            <button 
                    className="navbar-toggler" 
                    id="dropdownMenuLink" 
                    type="button" 
                    data-toggle="dropdown"
                    aria-haspopup="true" 
                    aria-expanded="false"
            >
            {userChallengesPending.length 
              && <small className="badge badge-danger">AVISO</small>}
            <img className="navbar-icon" src={getIconText("eggs")} alt="eggs" ></img>
          </button>      
  
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
              {<button className="dropdown-item" onClick={this.handleLogout}>Logout</button>}
              <Link className="dropdown-item" to="/notifications">Mis notificaciones<small className="badge badge-danger">AVISO</small></Link>
              <Link className="dropdown-item" to="#">Something else here</Link>
            </div>
          </div> 
        </nav>
      </div>
      )
    }
  }
}

export default withRouter(NavBar);