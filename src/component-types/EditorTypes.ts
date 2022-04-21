import { Action } from "@reduxjs/toolkit";

export type Language = "javascript" | "python" | "csharp" | "java";

// export type Connection = "";
export interface IEditorProps {
  language: Language;
  connection: any;
  users: any;
}
export interface IEditorState {
  width: string | undefined;
  height: string | undefined;
  editorValue: string;
  consoleValue: string;
  chatIsOpen: boolean;
  initialChatOpen: boolean; // controls the very first animation of the chatbox
  connected: boolean;
}

const initialState: IEditorState = {
  width: undefined,
  height: undefined,
  editorValue: "This is the default text for the editor",
  consoleValue: "This is the default text for the console",
  chatIsOpen: false,
  initialChatOpen: false,
  connected: false,
};

export const editorReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "editor/update-editor":
      return (state = { ...state, editorValue: "" });
  }
  return state;
};
