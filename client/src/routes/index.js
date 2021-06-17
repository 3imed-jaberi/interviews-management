import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import OfferForm from '../pages/OfferForm'
import OfferDetails from '../pages/OfferDetails'
import Offers from '../pages/Offers'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Routes = () => (
  <Router>
    <Header isAuthenticated={false} userData={{}} logout={() => { }} />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/offer-form" component={OfferForm} />
      <Route path="/offer/:id" component={OfferDetails} />
      <Route path="/:page?" component={Offers} />
    </Switch>
  </Router>
);


export { Routes as default };