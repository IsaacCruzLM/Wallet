import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Charts from './pages/Charts';

function App() {
  return (
    <div className="mainPage">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
        <Route exact path="/charts" component={ Charts } />
      </Switch>
    </div>
  );
}

export default App;
