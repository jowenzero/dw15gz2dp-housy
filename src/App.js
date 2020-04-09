import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import HomeLogin from './pages/home_login'
import './styles/App.css';

const App = () => (
  <Router>
    <Switch>  
      <Route path="/login" exact component={HomeLogin}/>
      <Route path="/" exact component={Home}/>
      <Route render={() => <h3>404 NOT FOUND</h3>}/>
    </Switch>
  </Router>
)

export default App;
