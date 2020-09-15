import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import PlayRoom from "./pages/PlayRoom";
import Rooms from "./pages/Rooms";
import ModalManager from "./components/ModalManager";

function App() {
  return (
    <BrowserRouter>
      {/* TODO NAVBAR */}
      <ModalManager />

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/rooms" component={Rooms} />
        <Route path="/rooms/:id" component={PlayRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
