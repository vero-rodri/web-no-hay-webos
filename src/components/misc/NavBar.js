import React, { Component} from 'react';
import { Link, withRouter, Redirect, NavLink } from 'react-router-dom';
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

  userSubscription = {};
  usersChallengesPendingSubscription = undefined;

  componentDidMount() {
    // let userAux = {};
    // let userChallengesPendingAux = [];
    
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      this.setState({
        user
      })
    });

    this.userChallengesPendingSubscription = userChallengesService.onUserChallengesPendingChange().subscribe((userChallengesPending) => {
      this.setState({
        userChallengesPending
      })
    });

    // console.log("\n\n\nlas notif pendientes son: ", userChallengesPendingAux)
    // this.setState({
    //   ...this.state,
    //   user: userAux,
    //   userChallengesPending: userChallengesPendingAux
    // })
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
    this.userChallengesPendingSubscription.unsubscribe();
  }

  handleLogout = () => {
    authService.logout()
      .then(() => {
        //return <Redirect to="/login" />
        this.props.history.push('/login')
      })
  }

  areThereNotifications = () => (this.state.userChallengesPending.length) ? true : false;

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
            <NavLink to="/profile" activeClassName="icon-active-footer">
              <div className="nav-bar-img-div">
                <img className="nav-bar-img" src={user.avatarURL} alt={user.nickName}></img>
              </div>
            </NavLink>
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
            {this.areThereNotifications() 
              && <sup className="mx-1"><small className="badge badge-pill badge-danger">{userChallengesPending.length}</small></sup>}
              <img className="navbar-icon" src={getIconText("eggs")} alt="eggs" ></img>
            </button>     
  
            <div className="dropdown-menu dropdown-menu-right nav-bar-dropdown" aria-labelledby="dropdownMenuLink">
              <Link className="dropdown-item" to="#">Editar perfil</Link>
              <Link className="dropdown-item" to="/notifications">
                Mis notificaciones
                {this.areThereNotifications() 
                  && <span className="mx-2"><small className="badge badge-danger">{userChallengesPending.length}</small></span>}
              </Link>
              <div className="dropdown-divider"></div>
                  {<button className="dropdown-item" onClick={this.handleLogout}>Logout</button>}
            </div>
          </div> 
        </nav>
      </div>
      )
    }
  }
}

export default withRouter(NavBar);