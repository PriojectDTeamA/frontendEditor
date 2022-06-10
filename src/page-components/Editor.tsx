import React, { useEffect } from "react";
import AceEditor from "react-ace";
import { useNavigate } from "react-router-dom";
import { base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IEditorIconProps, IEditorProps } from "../component-types/propTypes";
import {
  clearChatMessages,
  clearNewMessage,
  closeShareProjects,
  disconnectProject,
  resetConsole,
  resetInitialOpen,
  setUserArray,
  switchChatbox,
  turnOffLoadingScreen,
  turnOnLoadingScreen,
  updateConsole,
  updateEditor,
} from "../component-types/stateTypes";
import Console from "../extra-components/Console";
import Run from "../extra-components/Run";
import Chatbox from "../extra-components/Chatbox";
import UsersList from "../extra-components/UsersList";
import LoadingScreen from "../extra-components/LoadingScreen";
import OverlayScreen from "../extra-components/OverlayScreen";
import ShareProject from "../extra-components/ShareProject";

// import Editorcomp from "../extra-components/Editorcomp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faRightFromBracket,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import "./Editor.scss";

// loading in all the modes (languages) that can be used by the user
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";

// Import a Theme (okadia, github, xcode etc)
import "ace-builds/src-noconflict/theme-twilight";

const Editor = (props: IEditorProps) => {
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const editorValue = useAppSelector((state) => state.editor.editorText);
  const language = useAppSelector((state) => state.editor.language);
  const room = useAppSelector((state) => state.projectConnection.currentRoom);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    connected === false && navigate("/Home");
  }, [connected, navigate]);

  // close the shared project popup on opening the editor
  useEffect(() => {
    dispatch(closeShareProjects());
  }, []);

  const sendBroadcast = async (text: string) => {
    try {
      await props.connection.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await props.connection.stop().then(() => dispatch(disconnectProject()));
      dispatch(resetConsole());
    } catch (e) {
      console.log(e);
      dispatch(disconnectProject());
      dispatch(resetConsole());
      dispatch(clearChatMessages());
      dispatch(setUserArray([]));
      dispatch(resetInitialOpen());
    }
  };

  const runCodeWithLoading = async () => {
    dispatch(turnOnLoadingScreen());
    await runCode();
    dispatch(turnOffLoadingScreen());
  };

  const runCode = async () => {
    console.log("Run was clicked");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: room,
        code: editorValue,
        language: language,
      }),
    };
    await passCodeToServerAndUpdateConsole(requestOptions);
  };

  const passCodeToServerAndUpdateConsole = async (
    requestOptions: RequestInit
  ) => {
    await fetch(`${base_API_URL}/RunSession`, requestOptions)
      .then((response) => response.json())
      .then((data) => dispatch(updateConsole(data.Message)));
  };

  const windowheight = window.innerHeight;

  return (
    <div>
      {/* start conditionally shown components */}
      <EditorIcons closeConnection={closeConnection} />
      <OverlayScreen />
      <LoadingScreen />
      <ShareProject />
      {/* end conditionally shown components*/}
      <EditorNavbar />
      <Chatbox connection={props.connection} />
      <div className="editor-constraints">
        <AceEditor
          onLoad={(editorInstance) => {
            editorInstance.container.style.resize = "vertical";
            document.addEventListener("mouseup", () => editorInstance.resize());
            if (props.connection == null) {
              closeConnection();
            }
          }}
          mode={language}
          theme="twilight"
          value={editorValue}
          name="editor"
          onChange={(newValue: string) => {
            sendBroadcast(newValue);
            dispatch(updateEditor(newValue));
          }}
          width="100%"
          height={windowheight - 295 + "px"}
          editorProps={{
            $blockScrolling: true,
          }}
        />
      </div>
      <div className="console-and-run-bar">
        <Console />
        <Run runcode={runCodeWithLoading} />
      </div>
    </div>
  );
};

const EditorIcons = (props: IEditorIconProps) => {
  const dispatch = useAppDispatch();
  const newMessages = useAppSelector((state) => state.chatbox.newMessages);
  const chatIsOpen = useAppSelector((state) => state.chatbox.chatIsOpen);
  return !chatIsOpen ? (
    // TODO: add new icon for sharing projects, add onclick={dispatch(showShareProjects())}
    <div className="iets">
      <div className="button-group">
        <FontAwesomeIcon id="user-list" className="icon" icon={faUserGroup} />
        <div className="popover-list">
          <UsersList></UsersList>
        </div>
        <FontAwesomeIcon
          onClick={() => {
            dispatch(clearNewMessage());
            dispatch(switchChatbox());
          }}
          className="icon"
          icon={faMessage}
        />
        {newMessages === true && <div className="new-message"></div>}
        <FontAwesomeIcon
          onClick={props.closeConnection}
          className="icon"
          icon={faRightFromBracket}
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const EditorNavbar = () => {
  const projectID = useAppSelector(
    (state) => state.projectConnection.currentRoom
  );
  const projectName = useAppSelector(
    (state) => state.projectConnection.projectName
  );

  return (
    <div className="editor-navbar">
      <h3 className="projects-title col-8">
        {projectName} (ID: {projectID})
      </h3>
    </div>
  );
};

export default Editor;
