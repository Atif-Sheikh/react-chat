import React from 'react';
import App from 'base-shell/lib'

import config from './config'

import './firebase';
import './App.css';

function Appp() {
  return (
    <div className="App">
      <App config={config} />
    </div>
  );
}

export default Appp;
