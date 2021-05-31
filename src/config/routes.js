/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
// import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
// import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'

import { Route } from 'react-router-dom'

const Signup = lazy(() => import('../pages/Signup/signup'))
const Login = lazy(() => import('../pages/Login/login'))
const Dashboard = lazy(() => import('../pages/Dashboard/dashboard'))

const routes = [
  <Route path="/" exact component={Signup} />,
  <Route path="/login" exact component={Login} />,
  <Route path="/dashboard" component={Dashboard} />,
]

export default routes
