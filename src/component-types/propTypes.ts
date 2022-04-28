import { HubConnection } from "@microsoft/signalr";

export interface IChatMessageProps {
  text: string;
}

export interface IProjectProps {
  user: string; // after testing connecting to the project i think this can be removed
  joinRoom: () => Promise<void>;
  connection: HubConnection | null; // might need to go into the state and not into a prop
}

export interface IRunProps {
  runcode: () => Promise<void>;
}

export interface IProjectBoxProps {
  language: Language;
  projectName: string;
  fadeTiming?: string;
}

export interface IEditorProps {
  language: Language;
  connection: any | HubConnection;
}

export type Language = "javascript" | "python" | "csharp" | "java";
