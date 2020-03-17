import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Daily from "./daily";
import Auth from "./auth";

import "./styles.css";

class Index extends React.Component {
  render() {
    return (
      <div className="stuff">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Daily} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
