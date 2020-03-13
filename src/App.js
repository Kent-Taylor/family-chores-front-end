import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "./index";
import Weekly from "./weekly";

// import Daily from "./daily";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Index />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/weekly" component={Weekly} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
