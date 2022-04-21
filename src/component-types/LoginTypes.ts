import { Action } from "@reduxjs/toolkit";

export interface ILoginProps {}
export interface ILoginState {
  user: string;
  password: string;
}

const initialstate: ILoginState = {
  user: "",
  password: "",
};

export const loginReducer = (state = initialstate, action: Action) => {
  return state;
};
