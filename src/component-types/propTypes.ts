import { HubConnection } from "@microsoft/signalr";

export interface IChatMessageProps {
  connection: HubConnection | any;
}

export interface IProjectProps {
  joinRoom: () => Promise<void>;
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
  connection: HubConnection;
}

export interface IEditorIconProps {
  closeConnection: () => Promise<void>;
}

export type Language = "javascript" | "python" | "csharp" | "java";
