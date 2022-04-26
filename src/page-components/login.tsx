import React from "react";
import { useState } from "react";
import "./login.css";
import { useAppDispatch, useAppSelector} from "../component-types/hooks";
import { base_API_URL } from "../App";
import {
  setID,
  setUsername
} from "../component-types/stateTypes";
import { IHomeProps } from "../component-types/propTypes";
import { Navigate } from "react-router-dom";

var logo = require("../assets/User-icon.png");


const Login = () => {
  const dispatch = useAppDispatch();

  // temp
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const logged_in = useAppSelector((state) => state.user.id)

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

        if(data.Status == "Success"){
          console.log("user logged in");
          console.log(data.message);
          dispatch(setID(data.Data.ID));
          dispatch(setUsername(data.Data.username));
        }else if(data.status == "Failed"){
          console.log(data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {logged_in != -1 ? (
        <div>
          {console.log("logged in!")}
          <Navigate to="/Home"/>
        </div>
      ) : (
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
              type="text"
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
          <div id="formFooter">
            <a className="underlineHover" href="/forgotpassword">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default Login;
