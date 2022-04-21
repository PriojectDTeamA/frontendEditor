import React from "react";
import { ILoginProps } from "../component-types/LoginTypes";
import { useState } from "react";
import { base_API_URL } from "../App";

import "./login.css";
var logo = require("../assets/User-icon.png");

const Login = (props: ILoginProps) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: password })
      }
      await fetch(`${base_API_URL}/Login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

        if(data.status == "Success"){
          console.log("user logged in");
          console.log(data.message);
        }else if(data.status == "Failed"){
          console.log(data.message);
          setPassword("");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={logo} id="icon" alt="User Icon" className="imagelogo" />
          </div>
          <form      
            onSubmit={(e) => {
            e.preventDefault();
            login();
          }}>
            <input
              type="text"
              id="login"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="fadeIn second"
              name="login"
              placeholder="login"
            ></input>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fadeIn third"
              name="password"
              placeholder="password"
            ></input>
            <input
              type="submit"
              className="fadeIn fourth"
              value="Log In"
            ></input>
          </form>
          {/* <div id="formFooter">
            <a className="underlineHover" href="/forgotpassword">
              Forgot Password?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
