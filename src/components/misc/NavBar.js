import React, { Component} from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import icons from '../../utils/icons.json';
import InputSearch from '../../ui/InputSearch';

const getIconText = text => icons[text];



class NavBar extends Component {
  state = {
    user: {}
  }

  userSubscription = undefined;

  componentDidMount() {
    this.userSubscription = authService.onUserChange().subscribe((user) => {
      this.setState({
        ...this.state,
        user: user
      })
    })
  }

  componentWillUnmount() {
    this.userSubscription.unsubscribe()
  }

  handleLogout = () => {
    authService.logout()
      .then(() => {
        return <Redirect to="/login" />
        //this.props.history.push('/login')
      })
  }

  render() {
    const { user } = this.state;
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
            <span>{user.nickName}</span>
          </div>

          {pathname.startsWith('/search') &&<InputSearch className="my-search-bar col-3" />}

  
          <div className="dropdown">
            <button 
                    className="navbar-toggler" 
                    id="dropdownMenuLink" 
                    type="button" 
                    data-toggle="dropdown"
                    aria-haspopup="true" 
                    aria-expanded="false"
            >
            <img className="navbar-icon" src={getIconText("eggs")} alt="eggs" ></img>
          </button>      
  
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
              <button onClick={this.handleLogout} className="dropdown-item">Logout</button>
              <Link className="dropdown-item" to="#">Another action</Link>
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