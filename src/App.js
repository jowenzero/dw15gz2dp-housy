import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Property from './pages/property';
import './styles/App.css';

const App = () => (
  <Router>
    <Switch>  
      <Route path="/property" exact component={Property}/>
      <Route path="/" exact component={Home}/>
      <Route render={() => <h3>404 NOT FOUND</h3>}/>
    </Switch>
  </Router>
)

export default App;
