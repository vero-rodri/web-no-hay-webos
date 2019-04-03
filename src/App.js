import 'dotenv';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import ChallengeDetail from './components/challenges/ChallengeDetail';
import ChallengeCreate from './components/challenges/ChallengeCreate';
import UserChallenge from './components/userChallenges/UserChallenge';
import Board from './components/board/Board';
import Search from './components/misc/SearchItems';
import NavBar from './components/misc/NavBar';
import FooterBar from './components/misc/FooterBar';
import SearchItems from './components/misc/SearchItems';


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
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/board" component={Board} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/challenges/top" component={SearchItems} />
            <Route exact path="/user-challenges/top" component={SearchItems} />
            <Route exact path="/challenges/create" component={ChallengeCreate} />
            <Route exact path="/challenges/:challengeId" component={ChallengeDetail} />
            <Route exact path="/user-challenges/:userChallengeId" component={UserChallenge} />
            {/* <Route exact path="/challenges/:challengeId/user-challenges/:userChallengeId/evidences/create" component={EvidenceCreate}/> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
