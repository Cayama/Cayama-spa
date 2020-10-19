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
      <Route exact path="/" component={ClientProduct} />
      <Route path="/checkout" component={CheckoutPage} />
    </Switch>
  </Router>
);

export default Routers;
