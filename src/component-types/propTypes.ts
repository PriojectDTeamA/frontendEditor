import { HubConnection } from "@microsoft/signalr";
import { NavigateFunction } from "react-router";

export interface IChatMessageProps {
  text: string;
}

export interface IProjectProps {
  user: string; // after testing connecting to the project i think this can be removed
  joinRoom: any;
  navigation: NavigateFunction | NavigationType | any;
  connection: HubConnection | null; // might need to go into the state and not into a prop
}

export interface IRunProps {
  runcode: () => void;
}

export interface IProjectBoxProps {
  language: Language;
  projectName: string;
  fadeTiming?: string;
}

export interface IEditorProps {
  language: Language;
}

export type Language = "javascript" | "python" | "csharp" | "java";