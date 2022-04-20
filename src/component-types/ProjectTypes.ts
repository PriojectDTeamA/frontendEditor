import { NavigateFunction } from "react-router-dom";
import { Language } from "./EditorTypes";

export interface IProjectProps {
  user: string;
  joinRoom: any;
  connection: any;
  navigation: NavigateFunction | NavigationType | any;
}
export interface IProjectState {
  room: string;
  language: Language | "";
  connected: boolean;
}
