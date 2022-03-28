import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// in react-router v6 'Switch' is replaced with 'Routes', be mindful of this when looking up examples or documentation
// also, the component prop in the 'Route' component has been changed to 'element'

import Editor from "./page-components/Editor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path=""></Route> {/* route to the login page */}
        <Route path=""></Route> {/* route to the home page */}
        <Route path=""></Route> {/* route to the new_project page */}
        <Route path=""></Route> {/* route to the join_project page */}
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
