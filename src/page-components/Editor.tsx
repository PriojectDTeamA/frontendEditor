import React from "react";
import AceEditor from "react-ace";
import { Navigate, useNavigate } from "react-router-dom";
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
      connected: true,
      editorValue: "this is the default text value for any editor language"
    };
  }

  componentDidMount() {
    if (!this.props.connection) {
      this.setState({ connected: false });
    }
  }

  componentDidUpdate(){
  this.props.connection.on("Broadcast", (text:string) => {
    this.setState({ editorValue: text });
  });
  }

  componentWillUnmount(){

  }



  private sendBroadcast = async (text: string) => {
    try {
      await this.props.connection.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  };



  private onChange = (newvalue: string) => {
    // console.log(this.props.connection);
    console.log("Change", newvalue);
    this.setState({ editorValue: newvalue });

    this.sendBroadcast(newvalue);
  }

  private switchChatVisibility = () => {
    this.setState({
      chatIsOpen: !this.state.chatIsOpen,
    });
  };

  private closeConnection = async () => {
    try {
      await this.props.connection.stop();
      this.setState({ connected: false });
      // navigate("/Home");
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    return (
      <div>
        {!this.state.connected ? <Navigate to="/JoinProject" /> : null }

        {!this.state.chatIsOpen
        ?
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
        :
          null
        }

          <Chatbox
          isOpen={this.state.chatIsOpen}
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
        <Console />
        <Run runcode={() => console.log("run was clicked")} />
      </div>
    );
  }
}

export default Editor;
