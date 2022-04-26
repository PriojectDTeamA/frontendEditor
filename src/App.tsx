import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
} from "./component-types/stateTypes";

export const base_API_URL = "http://127.0.0.1:8034";

function App() {
  // maybe we can replace these hooks and states with state in the store
  // this won't work for the connectionChat since this is not serializable in the state and will therefore not be a good fit for redux
  const [connectionChat, setConnectionChat] = useState<HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<any[]>([]); // what is this used for?

  const dispatch = useAppDispatch();
  const editorValue = useAppSelector((state) => state.editor.editorText);
  const users = useAppSelector((state) => state.editor.currentUsers);

  const joinRoom = async (username: string, room: string) => {
    try {
      const tempConnection = new HubConnectionBuilder()
        .withUrl(`${base_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      tempConnection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      tempConnection.on("Broadcast", (text: string) => {
        console.log("update!");
        if (text !== editorValue) {
          dispatch(updateEditor(text));
        }
      });

      // TODO: make it so this uses a dispatch action to set the users
      tempConnection.on("UsersInRoom", (users) => {
        dispatch(setUserStringArray(users));
      });

      tempConnection.onclose((e) => {
        dispatch(disconnectProject());
        setMessages([]);
        dispatch(setUserStringArray([]));
      });

      await tempConnection.start();
      await tempConnection.invoke("JoinRoom", { username, room });
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
          element={<Editor connection={connectionChat} language="python" />}
        ></Route>{" "}
        {/* route to the editor page */}
      </Routes>
    </Router>
  );
}

export default App;
