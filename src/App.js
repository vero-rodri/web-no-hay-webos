import 'dotenv';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ChallengeList from './components/challenges/ItemsList';
import ChallengeDetail from './components/challenges/ChallengeDetail';
import ChallengeCreate from './components/challenges/ChallengeCreate';
import EvidenceCreate from './components/evidences/EvidenceCreate'
import Board from './components/board/Board';
import SearchItems from './components/misc/SearchItems';
import SearchBar from './components/misc/SearchBar';


class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/board" component={Board} />
          <Route exact path="/search" component={SearchItems} />
          <Route exact path="/challenges/top" component={SearchItems} />
          <Route exact path="/user-challenges/top" component={SearchItems} />
          <Route exact path="/challenges/create" component={ChallengeCreate} />
          <Route exact path="/challenges/:challengeId" component={ChallengeDetail} />
          <Route exact path="/challenges/:challengeId/user-challenges/:userChallengeId/evidences/create" component={EvidenceCreate}/>
        </Switch>
        {/* <Redirect to="/board" /> */}
      </div>
    );
  }
}

export default App;
