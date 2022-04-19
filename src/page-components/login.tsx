import React from "react";
import { IEditorProps, IEditorState } from "../component-types/LoginTypes";
import { useState } from "react";

import "./login.css";
var logo = require("../assets/User-icon.png");

export class Login extends React.Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
  }

  render() {
    return (
      <div>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <img src={logo} id="icon" alt="User Icon" className="imagelogo" />
            </div>

            <form>
              <input
                type="text"
                id="login"
                className="fadeIn second"
                name="login"
                placeholder="login"
              ></input>
              <input
                type="text"
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="password"
              ></input>
              <input
                type="submit"
                className="fadeIn fourth"
                value="Log In"
              ></input>
            </form>
            <div id="formFooter">
              <a className="underlineHover" href="/forgotpassword">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
