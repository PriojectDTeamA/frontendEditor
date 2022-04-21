import { Action } from "@reduxjs/toolkit";
import React from "react";

export interface IChatMessageProps {
  text: string;
}

export interface IChatboxProps {
  isOpen: boolean;
  initialOpening: boolean;
  openCloseChat: () => void;
}

export interface IChatBoxState {
  messages: React.ReactNode[];
  isOpen: boolean;
}

const initialState: IChatBoxState = {
  messages: [],
  isOpen: false,
};

export const chatBoxReducer = (
  state: IChatBoxState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "chatbox/open":
      return (state = { ...state, isOpen: true });
    case "chatbox/close":
      return (state = { ...state, isOpen: false });
    default:
      return state;
  }
};
