import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  ClientProduct,
  CheckoutPage
} from '../Pages/index';

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path="/checkout" component={CheckoutPage} />
      <Route path="/" component={ClientProduct} />
    </Switch>
  </Router>
);

export default Routers;
