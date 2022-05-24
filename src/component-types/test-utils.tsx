// test-utils.tsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { slices } from "./stateTypes";

// ignore all the ugly 'any' types here. originally this should be jsx file and not tsx so...
function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        chatbox: slices.chatBoxSlice.reducer,
        editor: slices.editorSlice.reducer,
        projectConnection: slices.projectConnectionSlice.reducer,
        user: slices.userSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
