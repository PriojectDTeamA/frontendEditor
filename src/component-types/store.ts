import { compose, configureStore } from "@reduxjs/toolkit";
import { slices } from "./stateTypes";

export const store = configureStore({
  reducer: {
    chatbox: slices.chatBoxSlice.reducer,
    editor: slices.editorSlice.reducer,
    projectConnection: slices.projectConnectionSlice.reducer,
    user: slices.userSlice.reducer,
  },
  devTools: true,
});
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:  chatbox: IChatBoxState; editor: IEditorState; projectConnection: IProjectConnectionState; user: User}
export type AppDispatch = typeof store.dispatch;
