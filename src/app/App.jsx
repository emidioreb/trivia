import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';
import Settings from '../pages/Settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/ranking" component={ Ranking } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Home } />
      </Switch>
    </div>
  );
}
