export type Language = "javascript" | "python" | "csharp" | "java";
export interface IEditorProps {
  language: Language;
}
export interface IEditorState {
  width: string | undefined;
  height: string | undefined;
  chatIsOpen: boolean;
}
