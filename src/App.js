import 'dotenv';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ChallengeList from './components/challenges/ChallengeList';
import ChallengeDetail from './components/challenges/ChallengeDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/challenges" component={ChallengeList} />
          <Route exact path="/challenges/:challengeId" component={ChallengeDetail} />
        </Switch>
        {/* <Redirect to="/login" /> */}
      </div>
    );
  }
}

export default App;
