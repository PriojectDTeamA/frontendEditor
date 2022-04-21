import { configureStore } from "@reduxjs/toolkit";
import { chatBoxReducer } from "./ChatboxTypes";
import { editorReducer } from "./EditorTypes";
import { loginReducer } from "./LoginTypes";
import { projectReducer } from "./ProjectTypes";

export const store = configureStore({
  reducer: {
    chatbox: chatBoxReducer,
    editor: editorReducer,
    login: loginReducer,
    project: projectReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:  chatbox: IChatBoxState; editor: IEditorState; login: ILoginState;}
export type AppDispatch = typeof store.dispatch;
