// all the relevant state values we need are described under this line (in no particular order):
// NAME             : TYPE              : WHY IS IT USED?
// chatIsOpen       : boolean           : To keep track of the chat being open or closed
// chatMessages     : ReactNode[]       : To keep track of all the messages that are sent in the chat
// user             : string | number   : To keep track of the currently logged in user
// consoleText      : string            : To keep track of the output in the console (which changes upon "running" the code)
// editorText       : string            : To keep track of the text that is being written in the editor
// currentLanguage  : string            : (Don't know if this is neccessarily a state variable, maybe this should be a prop for editor since it is not mutable after joining a room/project)
// currentUsers     : User[]            : To keep track of the users that are currently logged in to the same room, this will be displayed in the editor (User has to be defined as a type or interface with the necessary values in its object)
// currentRoom      : string            : To keep track of the room that users have joined
// connected        : boolean           : To keep track of the connection between clients using the editor
// connection       : HubConnection     : (Maybe either Connected or Connection can be used to keep track of the connection, maybe connected isn't useful anymore if there is a connection invoked that you can check anywhere)
// while developing I or You might find this list is incomplete, please feel free to update this list and the code below here, but don't forget to update your fellow developers as well :-).

// the following is code that i would interpret follows and groups this state in the best possible way:
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

// CODE FOR THE CHATBOX
interface IChatBoxState {
  chatMessages: ReactNode[];
  chatIsOpen: boolean;
  initialOpening: boolean;
}

const initialChatBoxState: IChatBoxState = {
  chatMessages: [],
  chatIsOpen: false,
  initialOpening: true, // this is added to prevent a bug with the chatbox where it loads in on an animation
};

const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState: initialChatBoxState,
  reducers: {
    openChatbox: (state) => {
      state.chatIsOpen = true;
      state.initialOpening = false;
    },
    closeChatbox: (state) => {
      state.chatIsOpen = false;
    },
    switchChatbox: (state) => {
      state.chatIsOpen = !state.chatIsOpen;
      state.initialOpening = false;
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
  currentUsers: User[];
  stringUsers: string[]; // TODO: this is temporary, once the login is fixed and everybody has an id this should become currentUsers (like above) everywhere
}

const initialEditorState: IEditorState = {
  editorText: "this is the default text value for the editor",
  consoleText: "this is the default text value for the console",
  currentUsers: [],
  stringUsers: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditorState,
  reducers: {
    updateEditor: (state, action: PayloadAction<string>) => {
      console.warn("Editor is being updated...");
      state.editorText = action.payload;
    },
    updateConsole: (state, action: PayloadAction<string>) => {
      state.consoleText = action.payload;
    },
    setUserStringArray: (state, action: PayloadAction<string[]>) => {
      state.stringUsers = action.payload;
    },
  },
});

// CODE FOR THE PROJECT CONNECTION
interface IProjectConnectionState {
  currentRoom: string;
  connected: boolean;
}

const initialProjectConnectionState: IProjectConnectionState = {
  currentRoom: "",
  connected: false,
};

const projectConnectionSlice = createSlice({
  name: "projectConnection",
  initialState: initialProjectConnectionState,
  reducers: {
    updateRoom: (state, action: PayloadAction<string>) => {
      state.currentRoom = action.payload;
    },
    connectProject: (state) => {
      state.connected = true;
    },
    disconnectProject: (state) => {
      state.connected = false;
    },
  },
});

export const slices = {
  chatBoxSlice,
  editorSlice,
  projectConnectionSlice,
  userSlice,
};
export const { openChatbox, closeChatbox, switchChatbox } =
  chatBoxSlice.actions;
export const { updateEditor, updateConsole, setUserStringArray } =
  editorSlice.actions;
export const { updateRoom, connectProject, disconnectProject } =
  projectConnectionSlice.actions;
export const { setID, setUsername } = userSlice.actions;
