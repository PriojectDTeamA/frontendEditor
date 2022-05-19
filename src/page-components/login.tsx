import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { APIReturnType, base_API_URL } from "../App";
import { setID, setUsername } from "../component-types/stateTypes";
import { useNavigate } from "react-router-dom";

import logo from "../assets/User-icon.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // temp
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const logged_in = useAppSelector((state) => state.user.id);

  useEffect(() => {
    logged_in !== -1 && navigate("/Home");
  }, [logged_in, navigate]);

  const login = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: password }),
      };
      await fetch(`${base_API_URL}/Login`, requestOptions)
        .then((response) => response.json())
        .then((data: APIReturnType) => {
          if (data.Status === "Success") {
            console.log("user logged in");
            console.log(data.Data);
            console.log(data.Data[0].ID);
            dispatch(setID(data.Data[0].ID));
            dispatch(setUsername(data.Data[0].username));
          } else if (data.Status === "Failed") {
            toast.error(data.Message, { position: "top-center" });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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
            }}
          >
            <input
              type="text"
              id="login"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="fadeIn second standard-input"
              name="login"
              placeholder="login"
            ></input>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fadeIn third standard-input"
              name="password"
              placeholder="password"
            ></input>
            <input
              type="submit"
              className="fadeIn fourth standard-input"
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
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;
