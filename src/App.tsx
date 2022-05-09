import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
// in react-router v6 'Switch' is replaced with 'Routes', be mindful of this when looking up examples or documentation
// also, the component prop in the 'Route' component has been changed to 'element'

import Editor from "./page-components/Editor";
import Login from "./page-components/login";
import Home from "./page-components/home";
import JoinProject from "./page-components/JoinProject";
import NewProject from "./page-components/NewProject";
import { useAppDispatch, useAppSelector } from "./component-types/hooks";
import {
  connectProject,
  disconnectProject,
  setUserStringArray,
  updateEditor,
  setChatMessagesArray,
  setNewMessages,
} from "./component-types/stateTypes";

// export const base_API_URL = "http://codojo.made-by-s.id:8034";

// didnt work after testing, idk if we should use this IP
export const base_API_URL = "http://145.24.222.113/api";

function App() {
  // maybe we can replace these hooks and states with state in the store
  // this won't work for the connectionChat since this is not serializable in the state and will therefore not be a good fit for redux
  const [connectionChat, setConnectionChat] = useState<HubConnection | null>(
    null
  );

  const dispatch = useAppDispatch();
  const editorValue = useAppSelector((state) => state.editor.editorText);
  const users = useAppSelector((state) => state.editor.currentUsers);
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const mainUser = useAppSelector((state) => state.user);
  const chatIsOpen = useAppSelector((state) => state.chatbox.chatIsOpen);

  const joinRoom = async () => {
    try {
      const tempConnection = new HubConnectionBuilder()
        .withUrl(`${base_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      tempConnection.on("ReceiveMessage", (user, message) => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        if (!chatIsOpen) {
          dispatch(setNewMessages("*"));
        }
        dispatch(setChatMessagesArray([{ user, message, time }]));
      });

      tempConnection.on("Broadcast", (text: string) => {
        if (text !== editorValue) {
          dispatch(updateEditor(text));
        }
      });

      // TODO: make it so this uses a dispatch action to set the users
      tempConnection.on("UsersInRoom", (users) => {
        // BUG: doesn't actually set the users, when looking into the state users are null
        dispatch(setUserStringArray(users));
      });

      tempConnection.onclose((e) => {
        dispatch(disconnectProject());
        dispatch(setChatMessagesArray([]));
        dispatch(setUserStringArray([]));
      });

      await tempConnection.start();
      await tempConnection.invoke("JoinRoom", {
        user: mainUser.username,
        room,
      });
      setConnectionChat(tempConnection);
      dispatch(connectProject());
    } catch (e) {
      console.log(e);
      dispatch(disconnectProject());
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>{" "}
        <Route path="/Login" element={<Login />}></Route>{" "}
        {/* route to the login page */}
        <Route path="/Home" element={<Home />}></Route>{" "}
        {/* route to the home page */}
        <Route
          path="/NewProject"
          element={<NewProject joinRoom={joinRoom} />}
        ></Route>{" "}
        {/* route to the new_project page */}
        <Route
          path="/JoinProject"
          element={<JoinProject joinRoom={joinRoom} />}
        ></Route>{" "}
        {/* route to the join_project page */}
        <Route
          path="/Editor"
          element={<Editor connection={connectionChat as HubConnection} />}
        ></Route>{" "}
        {/* route to the editor page */}
      </Routes>
    </Router>
  );
}

export default App;
