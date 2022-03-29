import React from "react";
import AceEditor from "react-ace";
import { IEditorProps, IEditorState } from "./EditorTypes";
import Console from "../extra-components/Console";

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

  private onChange(newvalue: string) {
    console.log("Change", newvalue);
  }

  public render() {
    return (
      <div>
        <AceEditor
          mode={this.props.language}
          theme="twilight"
          value="this is the default text value for any editor language"
          name="editor"
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
