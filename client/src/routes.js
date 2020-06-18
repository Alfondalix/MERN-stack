import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import EventsPage from './pages/EventsPage'
import MyRegistrtions from './pages/MyRegistrations'
import TopNav from './components.js/TopNav'
export default function Routes() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/myregstrtions" exact component={MyRegistrtions} />
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/events" component={EventsPage} />
      </Switch>
    </BrowserRouter>
  )
}
