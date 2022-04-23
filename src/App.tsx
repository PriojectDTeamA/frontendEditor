import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// in react-router v6 'Switch' is replaced with 'Routes', be mindful of this when looking up examples or documentation
// also, the component prop in the 'Route' component has been changed to 'element'

import Editor from "./page-components/Editor";
import Login from "./page-components/login";
import Home from "./page-components/home";
import JoinProject from "./page-components/JoinProject";
import NewProject from "./page-components/NewProject";

export const base_API_URL = "http://127.0.0.1:8034";

function App() {
  const [connectionChat, setConnection] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any>([]);

  const joinRoom = async (user: string, room: string) => {
    try {
      const connectionChat = new HubConnectionBuilder()
        .withUrl(`${base_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      connectionChat.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
        console.log("Received");
        
      });

      connectionChat.on("Broadcast", (text) => {
        // console.log(this.refs.editor);
        console.log("voert uit");
      });

      connectionChat.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connectionChat.onclose((e) => {
        setConnection([]);
        setMessages([]);
        setUsers([]);
      });

      await connectionChat.start();
      await connectionChat.invoke("JoinRoom", { user, room });
      setConnection(connectionChat);
      console.log("connectionChat");
      console.log(connectionChat);
      // console.log(p);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path={"/" || "/Login"} element={<Login />}></Route>{" "}
        {/* route to the login page */}
        <Route
          path="/Home"
          element={<Home userId="" username="john doe" />}
        ></Route>{" "}
        {/* route to the home page */}
        <Route
          path="/NewProject"
          element={
            <NewProject
              user="hoi"
              joinRoom={joinRoom}
              connection={connectionChat}
              navigation={useNavigate}
            />
          }
        ></Route>{" "}
        {/* route to the new_project page */}
        <Route
          path="/JoinProject"
          element={
            <JoinProject
              user="hoi"
              joinRoom={joinRoom}
              connection={connectionChat}
              navigation={useNavigate}
            />
          }
        ></Route>{" "}
        {/* route to the join_project page */}
        <Route
          path="/Editor"
          element={
            <Editor
              language="python"
              connection={connectionChat}
              users={users}
            />
          }
        ></Route>{" "}
        {/* route to the editor page */}
      </Routes>
    </Router>
  );
}

export default App;
