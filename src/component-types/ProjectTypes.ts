export type Language = "javascript" | "python" | "csharp" | "java";

export interface IEditorProps {
    user: string;
    joinRoom: any;
    connection: any;
}
export interface IEditorState {
    room: string;
    language: Language | "";
}
