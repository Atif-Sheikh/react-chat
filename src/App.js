import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login/login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  );
}

export default App;
