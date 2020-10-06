import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import PlayRoom from './pages/PlayRoom';
import Rooms from './pages/Rooms';
import ModalManager from './components/ModalManager';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ModalManager />

      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/rooms" component={Rooms} />
        <PrivateRoute path="/rooms/:id" component={PlayRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
