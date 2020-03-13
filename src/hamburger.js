import React from "react";
import { NavLink } from "react-router-dom";

export default class Hamburger extends React.Component {
  //this.stuff = this.stuff.bind(this);
  render() {
    return (
      <nav role="navigation">
        <div className="menuToggle">
          <input type="checkbox" />

          <span />
          <span />
          <span />

          <ul className="menu">
            <NavLink to="/" className="letter-button">
              Tesla Home
            </NavLink>
            <NavLink to="/models" className="letter-button">
              MODEL S
            </NavLink>
            <NavLink to="/model3" className="letter-button">
              MODEL 3
            </NavLink>
            <NavLink to="/modelx" className="letter-button">
              MODEL X
            </NavLink>
            <NavLink to="/modely" className="letter-button">
              MODEL Y
            </NavLink>
            {/* <button className="letter-button">MODEL S</button>
            <button className="letter-button">MODEL 3</button>
            <button className="letter-button">MODEL X</button>
            <button className="letter-button">MODEL Y</button> */}
          </ul>
        </div>
      </nav>
    );
  }
}
