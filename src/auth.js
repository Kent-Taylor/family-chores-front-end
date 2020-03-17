import React, { Component } from "react";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  render() {
    return (
      <form onSubmit={""}>
        <div className="login-page-container">
          <div className="left-side">
            <div className="credentials-wrapper">
              <p>Login</p>
              <input type="email" placeholder="enter email" />
              <input type="password" placeholder="enter password" />
              <button type="submit" className="common-button">
                Login
              </button>
            </div>
          </div>
          <span className="divider" />
          <div className="right-side">
            <div className="credentials-wrapper">
              <p>Sign Up</p>
              {/* <Logo /> */}
              <input type="email" placeholder="enter email" />
              <input type="password" placeholder="enter password" />
              <input type="password" placeholder=" re-type password" />
              <button type="submit" className="common-button">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
