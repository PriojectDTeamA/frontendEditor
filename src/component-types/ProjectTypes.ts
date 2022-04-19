import { ReactEventHandler, ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

export type Language = "javascript" | "python" | "csharp" | "java";

export interface IEditorProps {
    user: string;
    joinRoom: any;
    connection: any;
    navigation: NavigateFunction | NavigationType | any;
}
export interface IEditorState {
    room: string;
    language: Language | "";
    connected: boolean;
}
