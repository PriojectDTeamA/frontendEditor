import { Action, createSlice } from "@reduxjs/toolkit";
import { propTypes } from "react-bootstrap/esm/Image";
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

const initialState: IProjectState = {
  room: "",
  language: "",
  connected: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    join: async () => {
      await 
    }
  }
})
export const projectReducer = (state = initialstate, action: Action) => {
  return state;
};
