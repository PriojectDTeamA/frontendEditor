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
  chatIsOpen: boolean;
  connected: boolean;
}
