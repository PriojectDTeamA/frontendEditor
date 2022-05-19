import React, { useEffect } from "react";
import AceEditor from "react-ace";
import { useNavigate } from "react-router-dom";
import { base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IEditorIconProps, IEditorProps } from "../component-types/propTypes";
import {
  disconnectProject,
  setNewMessages,
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
  const chatIsOpen = useAppSelector((state) => state.chatbox.chatIsOpen);
  const editorValue = useAppSelector((state) => state.editor.editorText);
  const language = useAppSelector((state) => state.editor.language);
  const showLoadingScreen = useAppSelector(
    (state) => state.editor.loadingScreenOn
  );
  const room = useAppSelector((state) => state.projectConnection.currentRoom);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    connected === false && navigate("/JoinProject");
  }, [connected, navigate]);

  const sendBroadcast = async (text: string) => {
    try {
      await props.connection.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await props.connection.stop();
      dispatch(disconnectProject());
    } catch (e) {
      console.log(e);
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

  return (
    <div>
      {!chatIsOpen && <EditorIcons closeConnection={closeConnection} />}
      {showLoadingScreen && <LoadingScreen />}
      <Chatbox connection={props.connection} />
      <AceEditor
        mode={language}
        theme="twilight"
        value={editorValue}
        name="editor"
        onChange={(newValue: string) => {
          sendBroadcast(newValue);
          dispatch(updateEditor(newValue));
        }}
        width="100%"
        editorProps={{
          $blockScrolling: true,
        }}
      />
      <Console />
      <Run runcode={runCodeWithLoading} />
    </div>
  );
};

const EditorIcons = (props: IEditorIconProps) => {
  const dispatch = useAppDispatch();
  const newMessages = useAppSelector((state) => state.chatbox.newMessages);
  return (
    <div className="iets">
      <div className="button-group">
        <FontAwesomeIcon id="user-list" className="icon" icon={faUserGroup} />
        <div className="popover-list">
          <UsersList></UsersList>
        </div>
        <FontAwesomeIcon
          onClick={() => {
            dispatch(setNewMessages(""));
            dispatch(switchChatbox());
          }}
          className="icon"
          icon={faMessage}
        />
        {newMessages !== "" && <div className="new-message"></div>}
        <FontAwesomeIcon
          onClick={props.closeConnection}
          className="icon"
          icon={faRightFromBracket}
        />
      </div>
    </div>
  );
};

export default Editor;
