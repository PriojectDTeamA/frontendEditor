import { configureStore } from "@reduxjs/toolkit";
import { slices } from "./stateTypes";

export const store = configureStore({
  reducer: {
    chatbox: slices.chatBoxSlice.reducer,
    editor: slices.editorSlice.reducer,
    projectConnection: slices.projectConnectionSlice.reducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:  chatbox: IChatBoxState; editor: IEditorState; login: ILoginState;}
export type AppDispatch = typeof store.dispatch;
