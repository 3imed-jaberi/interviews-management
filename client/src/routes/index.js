import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import OfferForm from '../pages/OfferForm'
import OfferDetails from '../pages/OfferDetails'
import Offers from '../pages/Offers'
import Login from '../pages/Login'
import Register from '../pages/Register'

import { ProtectedRoute } from './ProtectedRoute'

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/offer-form" component={OfferForm} />
        <ProtectedRoute path="/offer/:id" component={OfferDetails} />
        <ProtectedRoute path="/:page?" component={Offers} />
      </Switch>
    </Router>
  )
}

export { Routes as default };
