import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

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
  receiveMessageCallback,
  User,
  clearChatMessages,
  resetInitialOpen,
} from "./component-types/stateTypes";

import "bootstrap/dist/css/bootstrap.min.css";

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
  const [connectionChat, setConnectionChat] = useState<HubConnection | null>(
    null
  );

  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const mainUser = useAppSelector((state) => state.user);

  const joinRoom = async (roomId: string) => {
    try {
      const roomID = room !== "" && room !== undefined ? room : roomId;
      const tempConnection = new HubConnectionBuilder()
        .withUrl(`${base_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      setConnectionCallbacks(tempConnection);

      await tempConnection.start();
      await tempConnection.invoke("JoinRoom", {
        user: mainUser.username,
        room: roomID,
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
    dispatch(receiveMessageCallback({ user, message }));
  };

  const broadcastText = (text: string) => {
    dispatch(updateEditor(text));
  };

  const setRoomUsers = (users: User[]) => {
    dispatch(setUserArray(users));
  };

  const onClose = (error?: Error | undefined) => {
    dispatch(disconnectProject());
    dispatch(clearChatMessages());
    dispatch(setUserArray([]));
    dispatch(resetInitialOpen());
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>{" "}
        <Route path="/Login" element={<Login />}></Route>{" "}
        {/* route to the login page */}
        <Route path="/Home" element={<Home joinRoom={joinRoom} />}></Route>{" "}
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
