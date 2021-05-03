import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './pages/Signup/signup';
import Login from './pages/Login/login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Signup} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
  );
}

export default App;
