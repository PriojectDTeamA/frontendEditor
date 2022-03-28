import React from "react";
import AceEditor from "react-ace";
import { IEditorProps, IEditorState } from "./EditorTypes";

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
    );
  }
}

export default Editor;
