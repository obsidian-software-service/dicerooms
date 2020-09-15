import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import PlayRoom from "./pages/PlayRoom";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <BrowserRouter>
      {/* TODO NAVBAR */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/playroom" component={PlayRoom} />
        <Route path="/rooms" component={Rooms} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
