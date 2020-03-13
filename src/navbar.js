import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="center">
        <div className="link-container">
          <NavLink to="/" className="link">
            Daily
          </NavLink>
        </div>
        <div className="link-container">
          <NavLink to="/weekly" className="link">
            Weekly
          </NavLink>
        </div>

        <div className="link-container">
          <NavLink to="/monthly" className="link">
            Monthly
          </NavLink>
        </div>
      </div>

      <div className="right-side" />
    </div>
  );
}
