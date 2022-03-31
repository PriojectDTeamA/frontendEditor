import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// in react-router v6 'Switch' is replaced with 'Routes', be mindful of this when looking up examples or documentation
// also, the component prop in the 'Route' component has been changed to 'element'

import Editor from "./page-components/Editor";
import Login from "./page-components/login";
import Home from "./page-components/home";
import JoinProject from "./page-components/JoinProject";
import NewProject from "./page-components/NewProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>{" "}
        {/* route to the login page */}
        <Route path="/home" element={<Home />}></Route>{" "}
        {/* route to the home page */}
        <Route path="/NewProject" element={<NewProject />}></Route>{" "}
        {/* route to the new_project page */}
        <Route path="/JoinProject" element={<JoinProject />}></Route>{" "}
        {/* route to the join_project page */}
        <Route
          path="/editor"
          element={<Editor language="python" />}
        ></Route>{" "}
        {/* route to the editor page */}
      </Routes>
    </Router>
  );
}

export default App;
