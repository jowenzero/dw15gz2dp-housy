import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Property from './pages/property';
import Profile from './pages/profile';
import Booking from './pages/booking';
import History from './pages/history';
import AddProperty from './pages/add_property';
import Transaction from './pages/transaction';
import './styles/App.css';

const App = () => (
  <Router>
    <Switch>  
      <Route path="/transaction" exact component={Transaction}/>
      <Route path="/add-property" exact component={AddProperty}/>
      <Route path="/history" exact component={History}/>
      <Route path="/booking" exact component={Booking}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/property" exact component={Property}/>
      <Route path="/" exact component={Home}/>
      <Route render={() => <h3>404 NOT FOUND</h3>}/>
    </Switch>
  </Router>
)

export default App;
