import React from "react";
import AceEditor from "react-ace";
import { IEditorProps, IEditorState } from "./EditorTypes";
import Console from "../extra-components/Console";
import Run from "../extra-components/Run";
import Chatbox from "../extra-components/Chatbox";

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
      chatIsOpen: false,
    };
  }

  private onChange(newvalue: string) {
    console.log("Change", newvalue);
  }

  private switchChatVisibility = () => {
    this.setState({
      chatIsOpen: !this.state.chatIsOpen,
    });
  };

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
          width="100%"
          editorProps={{
            $blockScrolling: true,
          }}
        />
        <Console />
        <Run runcode={() => console.log("run was clicked")} />
        <Chatbox
          isOpen={this.state.chatIsOpen}
          openCloseChat={this.switchChatVisibility}
        />
      </div>
    );
  }
}

export default Editor;
