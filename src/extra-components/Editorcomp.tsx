import React from "react";
import AceEditor from "react-ace";
import { Navigate, useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { IEditorProps, IEditorState } from "../component-types/EditorTypes";
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
import Console from "./Console";

class Editorcomp extends React.Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      width: undefined,
      height: undefined,
    };
  }

  private sendBroadcast = async (text: string) => {
    try {
      await this.props.connection.invoke("BroadcastText", text);
    } catch (e) {
      console.log(e);
    }
  };

  private onChange(newvalue: string) {
    console.log(this.props.connection);
    console.log("Change", newvalue);
    this.sendBroadcast(newvalue);
  }

  public render() {
    return (
      <div>
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

export default Editorcomp;
