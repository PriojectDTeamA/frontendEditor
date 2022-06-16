import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { useNavigate } from "react-router-dom";
import { base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IEditorIconProps, IEditorProps } from "../component-types/propTypes";
import {
  clearChatMessages,
  showShareProjects,
  closeShareProjects,
  disconnectProject,
  resetConsole,
  setUserArray,
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
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import "./Editor.scss";

// loading in all the modes (languages) that can be used by the user
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";

// Import a Theme (okadia, github, xcode etc)
import "ace-builds/src-noconflict/theme-idle_fingers";

const Editor = (props: IEditorProps) => {
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const editorValue = useAppSelector((state) => state.editor.editorText);
  const language = useAppSelector((state) => state.editor.language);
  const room = useAppSelector((state) => state.projectConnection.currentRoom);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentWindowHeight, setWindowHeight] = useState(
    `${window.innerHeight - 300}px`
  );

  useEffect(() => {
    connected === false && navigate("/Home");
  }, [connected, navigate]);

  // close the shared project popup on opening the editor
  useEffect(() => {
    dispatch(closeShareProjects());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    let windowHeight = window.innerHeight;
    let consoleHeight = document.getElementById("console")
      ?.offsetHeight as number;
    let navbarHeight = document.getElementById("editor-navbar")
      ?.offsetHeight as number;
    // didn't find a way to get the margins between the console and editor dynamically, so just got this from the css
    // the totalMargin basically equals the following formula
    // (margin between editor and navbar) + (margin between the editor and the console) + (margin between the console and the editor) + (margin between the console and the bottom of the screen)
    let totalMargin = 90;
    let editorHeight =
      windowHeight - consoleHeight - navbarHeight - totalMargin;
    setWindowHeight(`${editorHeight}px`);
  };

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
          mode={language}
          theme="idle_fingers"
          value={editorValue}
          name="editor"
          onChange={(newValue: string) => {
            sendBroadcast(newValue);
            dispatch(updateEditor(newValue));
          }}
          width="73%"
          height={currentWindowHeight}
          editorProps={{
            $blockScrolling: true,
          }}
        />
        <Run runcode={runCodeWithLoading} height={currentWindowHeight}/>
        <Console />
      </div>
    </div>
  );
};

const EditorIcons = (props: IEditorIconProps) => {
  const dispatch = useAppDispatch();
  // check TODO's under here for the next two state variables
  const projectOwner = useAppSelector((state) => state.editor.owner);
  const mainUser = useAppSelector((state) => state.user);
  return (
    // TODO: add new icon for sharing projects, add onclick={dispatch(showShareProjects())}
    // TODO: also make sure to add a check that verifies that the mainUser.id is the same as owner, see below for an example
    // mainUser.id === projectOwner ? <FontAwesomeIcon className="share button"/> : <div style={{display: none}}></div>
    <div className="iets">
      <div className="button-group">
        <FontAwesomeIcon id="user-list" className="icon" icon={faUserGroup} />
        <div className="popover-list">
          <UsersList></UsersList>
        </div>
        {mainUser.id === projectOwner ? (
          <FontAwesomeIcon
            onClick={() => {
              console.log(
                "this icon will be used temporarily to test share project"
              );
              dispatch(showShareProjects());
            }}
            className="icon"
            icon={faShare}
          />
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        <FontAwesomeIcon
          onClick={props.closeConnection}
          className="icon"
          icon={faRightFromBracket}
        />
      </div>
    </div>
  );
};

const EditorNavbar = () => {
  const projectID = useAppSelector(
    (state) => state.projectConnection.currentRoom
  );
  const projectName = useAppSelector(
    (state) => state.projectConnection.projectName
  );

  const language = useAppSelector (
    (state) => state.editor.language
  );

  return (
    <div id="editor-navbar">
      <h3 className="projects-title col-8">
        {language} project: 	&nbsp;"<i>{projectName}</i>"	&nbsp;	&nbsp;	&nbsp;(ID: {projectID})
      </h3>
    </div>
  );
};

export default Editor;
