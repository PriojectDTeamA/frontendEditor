import React from "react";
import AceEditor from "react-ace";
import { Navigate } from "react-router-dom";
import { base_API_URL } from "../App";
import { IEditorProps } from "../component-types/propTypes";
import Console from "../extra-components/Console";
import Run from "../extra-components/Run";
import Chatbox from "../extra-components/Chatbox";
import UsersList from "../extra-components/UsersList";
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
import "ace-builds/src-noconflict/mode-haskell";

// Import a Theme (okadia, github, xcode etc)
import "ace-builds/src-noconflict/theme-twilight";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import {
  disconnectProject,
  switchChatbox,
  updateConsole,
} from "../component-types/stateTypes";

const Editor = (props: IEditorProps) => {
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const chatIsOpen = useAppSelector((state) => state.chatbox.chatIsOpen);
  const editorValue = useAppSelector((state) => state.editor.editorText);

  const dispatch = useAppDispatch();

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

  // this will be activated when the run button is clicked
  const runCode = async () => {
    console.log("Run was clicked");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: 1,
        code: editorValue,
        language: props.language,
      }),
    };
    await fetch(`${base_API_URL}/RunSession`, requestOptions)
      .then((response) => response.json())
      .then((data) => dispatch(updateConsole(data.Message)));
  };

  return (
    <div>
      {!connected && <Navigate to="/JoinProject" />}
      {!chatIsOpen && (
        <div className="iets">
          <div className="button-group">
            <FontAwesomeIcon
              id="user-list"
              className="icon"
              icon={faUserGroup}
            />
            <div className="popover-list">
              <UsersList></UsersList>
            </div>
            <FontAwesomeIcon
              onClick={() => dispatch(switchChatbox())}
              className="icon"
              icon={faMessage}
            />
            <FontAwesomeIcon
              onClick={closeConnection}
              className="icon"
              icon={faRightFromBracket}
            />
          </div>
        </div>
      )}
      <Chatbox />
      <AceEditor
        mode={props.language}
        theme="twilight"
        value={editorValue}
        name="editor"
        onChange={(newValue: string) => {
          sendBroadcast(newValue)
          dispatch(updateEditor(newValue))
        }}
        width="100%"
        editorProps={{
          $blockScrolling: true,
        }}
      />
      <Console />
      <Run runcode={runCode} />
    </div>
  );
};
export default Editor;
