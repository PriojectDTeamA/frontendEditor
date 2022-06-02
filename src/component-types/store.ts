import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { slices } from "./stateTypes";

const reducers = combineReducers({
  chatbox: slices.chatBoxSlice.reducer,
  editor: slices.editorSlice.reducer,
  projectConnection: slices.projectConnectionSlice.reducer,
  user: slices.userSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root");
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:  chatbox: IChatBoxState; editor: IEditorState; projectConnection: IProjectConnectionState; user: User}
export type AppDispatch = typeof store.dispatch;
