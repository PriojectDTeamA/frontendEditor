import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
// in react-router v6 'Switch' is replaced with 'Routes', be mindful of this when looking up examples or documentation
// also, the component prop in the 'Route' component has been changed to 'element'

import Editor from "./page-components/Editor";
import Login from "./page-components/login";
import Home from "./page-components/home";
import JoinProject from "./page-components/JoinProject";
import NewProject from "./page-components/NewProject";

function App() {
  
  const [connectionChat, setConnection] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any>([]);

  const joinRoom = async (user:string, room:string) => {
    try {
      const connectionChat = new HubConnectionBuilder()
        .withUrl("http://127.0.0.1:54568/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connectionChat.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      connectionChat.on("Broadcast", (text) => {
        // console.log(this.refs.editor);
        console.log("voert uit");
      });

      connectionChat.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connectionChat.onclose(e => {
        setConnection([]);
        setMessages([]);
        setUsers([]);
      });

      await connectionChat.start();

    } catch (e) {
      console.log(e);
    }
  }

  const sendBroadcast = async (text:string) => {
    try {
      await connectionChat.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connectionChat.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route> {/* route to the login page */}
        <Route path="/home" element={<Home/>}></Route> {/* route to the home page */}
        <Route path="/NewProject" element={<NewProject user="hoi" joinRoom={joinRoom} connection={connectionChat}/>}></Route> {/* route to the new_project page */}
        <Route path="/JoinProject" element={<JoinProject user="hoi" joinRoom={joinRoom} connection={connectionChat}/>}></Route> {/* route to the join_project page */}
        <Route
          path="/editor"
          element={<Editor language="python" connection={connectionChat}/>}
        ></Route>{" "}
        {/* route to the editor page */}
      </Routes>
    </Router>
  );
}

export default App;
