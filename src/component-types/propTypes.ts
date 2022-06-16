import { HubConnection } from "@microsoft/signalr";

export interface IChatMessageProps {
  connection: HubConnection | any;
}

export interface IProjectProps {
  joinRoom: (id: string) => Promise<void>;
}

export interface IRunProps {
  runcode: () => Promise<void>;
  height: string;
}

export interface IProjectBoxProps extends IProjectProps {
  language: Language;
  projectName: string;
  fadeTiming?: string;
  ID: number;
  owner: number;
  joinRoom: IProjectProps["joinRoom"];
}

export interface IEditorProps {
  connection: HubConnection;
}

export interface IEditorIconProps {
  closeConnection: () => Promise<void>;
}

export type Language = "javascript" | "python" | "csharp" | "java";
