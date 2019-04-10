import 'dotenv';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import ChallengeDetail from './components/challenges/ChallengeDetail';
import ChallengeCreate from './components/challenges/ChallengeCreate';
import UserChallenge from './components/userChallenges/UserChallenge';
import Board from './components/board/Board';
import NavBar from './components/misc/NavBar';
import FooterBar from './components/misc/FooterBar';
import Search from '../src/components/search/Search';
import PrivateRoute from './guards/PrivateRoute';
import Ejemplo from './components/misc/selectPrueba';


class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="container-fluid p-0">
          <NavBar />
          <FooterBar />
        </div>
        <div className="container-fluid px-0 py-1 margin-main-container">
          <Switch>
            {/* esto va guay, pero vamos a probar protegiendo rutas */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/board" component={Board} />
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/profile/:userId" component={Profile}/>
            <Route exact path="/search" component={Search} />
            <Route exact path="/challenges/create" component={ChallengeCreate} />
            <Route exact path="/challenges/:challengeId" component={ChallengeDetail} />
            <Route exact path="/user-challenges/:userChallengeId" component={UserChallenge} />
            <Route exact path="/notifications" component={Notification} />
            <Route exact path="/ejemplo" component={Ejemplo} />
            <Redirect to="/board" />



            {/* //He intentado las rutas privadas pero siempre isAuthenticated es undefinde...me he vuelto loco y no he dado con ello aún */}
           {/*  <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/board" component={Board} />
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/profile/:userId" component={Profile} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/challenges/create" component={ChallengeCreate} />
            <PrivateRoute exact path="/challenges/:challengeId" component={ChallengeDetail} />
            <PrivateRoute exact path="/user-challenges/:userChallengeId" component={UserChallenge} /> */}
            {/* <PrivateRoute exact path="/admin" role={"admin"} component={AdminMessage} />
            <Route exact path="/forbidden" component={Forbidden}/>
            <Route exact path="/not-found" component={NotFound}/>
            <Redirect to="/not-found"/> */}



          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
