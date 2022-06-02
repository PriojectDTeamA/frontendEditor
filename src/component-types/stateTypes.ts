import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "./propTypes";

// CODE FOR THE CHATBOX
interface IChatBoxState {
  chatMessages: chatMessageType[];
  newMessages: boolean;
  chatIsOpen: boolean;
  initialOpening: boolean;
}

const initialChatBoxState: IChatBoxState = {
  chatMessages: [],
  newMessages: false,
  chatIsOpen: false,
  initialOpening: true, // this is added to prevent a bug with the chatbox where it loads in on an animation
};

export type chatMessageType = {
  user: string;
  message: string;
  time: string;
};

const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState: initialChatBoxState,
  reducers: {
    switchChatbox: (state) => {
      state.chatIsOpen = !state.chatIsOpen;
      state.initialOpening = false;
    },
    setChatMessagesArray: (state, action: PayloadAction<chatMessageType>) => {
      state.chatMessages.push(action.payload);
    },
    clearChatMessages: (state) => {
      state.chatMessages = [];
    },
    setNewMessage: (state) => {
      state.newMessages = true;
    },
    clearNewMessage: (state) => {
      state.newMessages = false;
    },
    resetInitialOpen: (state) => {
      state.initialOpening = true;
    },
    receiveMessageCallback: (
      state,
      action: PayloadAction<{ user: string; message: string }>
    ) => {
      const today = new Date();
      const time =
        (today.getHours() < 10 ? "0" : "") +
        today.getHours() +
        ":" +
        (today.getMinutes() < 10 ? "0" : "") +
        today.getMinutes();
      const chatMessageObject = {
        user: action.payload.user,
        message: action.payload.message,
        time,
      };
      state.chatMessages.push(chatMessageObject);
      if (state.chatIsOpen === true) return;
      state.newMessages = true;
    },
  },
});

// CODE FOR THE USER
export type User = {
  id: number;
  username: string;
};

const initialUserState: User = {
  id: -1,
  username: "none",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setID: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// CODE FOR THE EDITOR
interface IEditorState {
  editorText: string;
  consoleText: string;
  language?: Language;
  currentUsers: User[];
  loadingScreenOn: boolean;
}

const initialEditorState: IEditorState = {
  editorText: "this is the default text value for the editor",
  consoleText: "this is the default text value for the console",
  language: "csharp",
  currentUsers: [],
  loadingScreenOn: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditorState,
  reducers: {
    updateEditor: (state, action: PayloadAction<string>) => {
      state.editorText = action.payload;
    },
    updateConsole: (state, action: PayloadAction<string>) => {
      state.consoleText = action.payload;
    },
    resetConsole: (state) => {
      state.consoleText = initialEditorState.consoleText;
    },
    setUserArray: (state, action: PayloadAction<User[]>) => {
      state.currentUsers = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    turnOnLoadingScreen: (state) => {
      state.loadingScreenOn = true;
    },
    turnOffLoadingScreen: (state) => {
      state.loadingScreenOn = false;
    },
  },
});

// CODE FOR THE PROJECT CONNECTION
interface IProjectConnectionState {
  currentRoom: string;
  projectName: string;
  connected: boolean;
}

const initialProjectConnectionState: IProjectConnectionState = {
  currentRoom: "",
  projectName: "",
  connected: false,
};

const projectConnectionSlice = createSlice({
  name: "projectConnection",
  initialState: initialProjectConnectionState,
  reducers: {
    updateRoom: (state, action: PayloadAction<string>) => {
      state.currentRoom = action.payload;
    },
    updateProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    connectProject: (state) => {
      state.connected = true;
    },
    disconnectProject: (state) => {
      state.connected = false;
      state.currentRoom = "";
      state.projectName = "";
    },
  },
});

export const slices = {
  chatBoxSlice,
  editorSlice,
  projectConnectionSlice,
  userSlice,
};
export const {
  switchChatbox,
  setChatMessagesArray,
  clearChatMessages,
  setNewMessage,
  clearNewMessage,
  resetInitialOpen,
  receiveMessageCallback,
} = chatBoxSlice.actions;
export const {
  updateEditor,
  updateConsole,
  resetConsole,
  setUserArray,
  setLanguage,
  turnOnLoadingScreen,
  turnOffLoadingScreen,
} = editorSlice.actions;
export const {
  updateRoom,
  updateProjectName,
  connectProject,
  disconnectProject,
} = projectConnectionSlice.actions;
export const { setID, setUsername } = userSlice.actions;
