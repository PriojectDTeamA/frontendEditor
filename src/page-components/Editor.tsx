import React from "react";
import AceEditor from "react-ace";
import { Navigate, useNavigate } from "react-router-dom";
import { base_API_URL } from "../App";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { IEditorProps, IEditorState } from "../component-types/EditorTypes";
import Console from "../extra-components/Console";
import Run from "../extra-components/Run";
import Chatbox from "../extra-components/Chatbox";
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
import UsersList from "../extra-components/UsersList";

class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      width: undefined,
      height: undefined,
      chatIsOpen: false,
      initialChatOpen: true,
      connected: true,
      editorValue: "this is the default text value for any editor language",
      consoleValue: "this is the default text value for the console",
    };
  }

  componentDidMount() {
    if (!this.props.connection) {
      this.setState({ connected: false });
    }
    else {
      this.props.connection.on("Broadcast", (text: string) => {
        console.log("update!");
        if (text != this.state.editorValue)
          this.setState({ editorValue: text });
      });
    }
  }

  // componentDidUpdate() {
  //   if(this.state.connected){
  //     console.log("test");
  //     this.props.connection.on("Broadcast", (text: string) => {
  //       // console.log(text);
  //       if (text != this.state.editorValue)
  //         this.setState({ editorValue: text });
  //     });
  //   }
  // }

  componentWillUnmount() {}

  private sendBroadcast = (text: string) => {
    try {
      this.props.connection.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  };

  private onChange = (newvalue: string) => {
    // console.log(this.props.connection);
    console.log("Change", newvalue);
    this.setState({ editorValue: newvalue });

    this.sendBroadcast(newvalue);
  };

  private closeConnection = async () => {
    try {
      this.setState({ connected: false });
      await this.props.connection.stop();
      // navigate("/Home");
    } catch (e) {
      console.log(e);
    }
  };

  // makes it so the chat folds out or in
  private switchChatVisibility = () => {
    this.setState({
      chatIsOpen: !this.state.chatIsOpen,
      initialChatOpen: false,
    });
  };

  // this will be activated when the run button is clicked
  private runCode = async() => {
    console.log("Run was clicked");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: 1, code: this.state.editorValue })
    }
    await fetch(`${base_API_URL}/RunSession`, requestOptions)
    .then((response) => response.json())
    .then((data) => this.setState({consoleValue: data.Message}));
  };

  public render() {
    return (
      <div>
        {!this.state.connected ? <Navigate to="/JoinProject" /> : null}

        {!this.state.chatIsOpen && (
          <div className="iets">
            <div className="button-group">
              <FontAwesomeIcon
                id="user-list"
                className="icon"
                icon={faUserGroup}
              />

              <div className="popover-list">
                <UsersList users={this.props.users}></UsersList>
              </div>

              <FontAwesomeIcon
                onClick={this.switchChatVisibility}
                className="icon"
                icon={faMessage}
              />
              <FontAwesomeIcon
                onClick={this.closeConnection}
                className="icon"
                icon={faRightFromBracket}
              />
            </div>
          </div>
        )}
        <Chatbox
          isOpen={this.state.chatIsOpen}
          initialOpening={this.state.initialChatOpen}
          openCloseChat={this.switchChatVisibility}
        />
        <AceEditor
          mode={this.props.language}
          theme="twilight"
          value={this.state.editorValue}
          name="editor"
          onChange={this.onChange}
          height={this.state.height}
          width="100%"
          editorProps={{
            $blockScrolling: true,
          }}
        />
        <Console text={this.state.consoleValue} />
        <Run runcode={this.runCode} />
      </div>
    );
  }
}

export default Editor;
