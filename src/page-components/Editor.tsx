import React from "react";
import AceEditor from "react-ace";
import { Navigate, useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { IEditorProps, IEditorState } from "../component-types/EditorTypes";
import Console from "../extra-components/Console";
// import Editorcomp from "../extra-components/Editorcomp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faRightFromBracket, faMessage } from '@fortawesome/free-solid-svg-icons'

import "./Editor.scss";

// loading in all the modes (languages) that can be used by the user
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-haskell";

// Import a Theme (okadia, github, xcode etc)
import "ace-builds/src-noconflict/theme-twilight";

class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      width: undefined,
      height: undefined,
    };
  }

  componentDidMount(){
    if(this.props.connection){
      // navigation.navigate("QRCodeResult", {clientID});
      console.log("connection: " + this.props.connection);
    }

  }

  private sendBroadcast = async (text:string) => {
    try {
      await this.props.connection.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  }

  private onChange(newvalue: string) {
    console.log(this.props.connection);
    console.log("Change", newvalue);
    this.sendBroadcast(newvalue);
  }

  
  private closeConnection = async () => {
    try {
      await this.props.connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    return (
      <div>
        <div className="button-group">
          <FontAwesomeIcon className="icon" icon={faUserGroup} />

          <FontAwesomeIcon className="icon" icon={faMessage} />
          <FontAwesomeIcon onClick={this.closeConnection} className="icon" icon={faRightFromBracket} />

        </div>

        <AceEditor
          mode={this.props.language}
          theme="twilight"
          value="this is the default text value for any editor language"
          name="editor"
          onChange={this.onChange}
          height={this.state.height}
          width={this.state.width}
          editorProps={{
            $blockScrolling: true,
          }}
        />
        <Console />
      </div>
    );
  }
}

export default Editor;
