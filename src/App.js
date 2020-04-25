import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import OwnerRoute from './routes/OwnerRoute';
import TenantRoute from './routes/TenantRoute';

import './styles/App.css';

import Home from './pages/home';
import Property from './pages/property';
import Profile from './pages/profile';
import Booking from './pages/booking';
import History from './pages/history';
import AddProperty from './pages/add_property';
import NotFound from './pages/not_found';

const App = () => (
  <Router>
    <Switch>  
      <OwnerRoute path="/add-property" exact component={AddProperty}/>
      <PrivateRoute path="/history" exact component={History}/>
      <TenantRoute path="/booking" exact component={Booking}/>
      <PrivateRoute path="/profile" exact component={Profile}/>
      <Route path="/property/:id" exact component={Property}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default App;
