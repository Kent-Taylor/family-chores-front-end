import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Daily from "./daily";

import "./styles.css";

class Index extends React.Component {
  render() {
    return (
      <div className="stuff">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Daily} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
