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
  setUserArray,
  updateEditor,
  setChatMessagesArray,
  setNewMessages,
  User,
  clearChatMessages,
} from "./component-types/stateTypes";

// Local testing:
// export const base_API_URL = "http://127.0.0.1:8034";

// Live testing:
export const base_API_URL = "http://145.24.222.113/api";
export type APIReturnType = {
  Status: string;
  Data: Record<string, any>[];
  Message?: string;
};

function App() {
  // maybe we can replace these hooks and states with state in the store
  // this won't work for the connectionChat since this is not serializable in the state and will therefore not be a good fit for redux
  const [connectionChat, setConnectionChat] = useState<HubConnection | null>(
    null
  );

  const dispatch = useAppDispatch();
  const editorValue = useAppSelector((state) => state.editor.editorText);
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const mainUser = useAppSelector((state) => state.user);
  const chatIsOpen = useAppSelector((state) => state.chatbox.chatIsOpen);

  const joinRoom = async () => {
    try {
      const tempConnection = new HubConnectionBuilder()
        .withUrl(`${base_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      setConnectionCallbacks(tempConnection);

      await tempConnection.start();
      await tempConnection.invoke("JoinRoom", {
        user: mainUser.username,
        room,
      });
      setConnectionChat(tempConnection);
      dispatch(connectProject());
    } catch (e) {
      console.error(e);
      dispatch(disconnectProject());
    }
  };

  const setConnectionCallbacks = (connection: HubConnection) => {
    connection.on("ReceiveMessage", receiveMessage);
    connection.on("Broadcast", broadcastText);
    connection.on("UsersInRoom", setRoomUsers);
    connection.onclose(onClose);
  };

  const receiveMessage = (user: string, message: string) => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    if (!chatIsOpen) {
      dispatch(setNewMessages("*"));
    }
    const chatMessageObject = { user, message, time };
    dispatch(setChatMessagesArray(chatMessageObject));
  };

  const broadcastText = (text: string) => {
    if (text !== editorValue) {
      dispatch(updateEditor(text));
    }
  };

  const setRoomUsers = (users: User[]) => {
    dispatch(setUserArray(users));
  };

  const onClose = (error?: Error | undefined) => {
    dispatch(disconnectProject());
    dispatch(clearChatMessages());
    dispatch(setUserArray([]));
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
