import { slices } from "../component-types/stateTypes";
import {
  switchChatbox,
  setChatMessagesArray,
  clearChatMessages,
  setNewMessages,
} from "../component-types/stateTypes";

const reducer = slices.chatBoxSlice.reducer;

// testing if undefined returns the initial state of the chatbox
test("should return initial state", () => {
  expect(
    reducer(undefined, {
      type: undefined,
    })
  ).toEqual({
    chatMessages: [],
    newMessages: "",
    chatIsOpen: false,
    initialOpening: true,
  });
});

// test if the chatIsOpen switches to true and if the initialOpening goes to false
test("should handle the switching of the chatbox to open", () => {
  expect(reducer(undefined, switchChatbox())).toEqual({
    chatMessages: [],
    newMessages: "",
    chatIsOpen: true,
    initialOpening: false,
  });
});

// test if the chatIsOpen switches to false
test("should handle the switching of the chatbox to close", () => {
  const previousState = {
    chatMessages: [],
    newMessages: "",
    chatIsOpen: true,
    initialOpening: false,
  };
  expect(reducer(previousState, switchChatbox())).toEqual({
    ...previousState,
    chatIsOpen: false,
  });
});

// test if a message gets added
test("should handle adding a new string to newMessages", () => {
  const previousState = {
    chatMessages: [],
    newMessages: "",
    chatIsOpen: true,
    initialOpening: false,
  };
  expect(
    reducer(
      previousState,
      setNewMessages("Hi there!. Nice of you to use the editor")
    )
  ).toEqual({
    ...previousState,
    newMessages: "Hi there!. Nice of you to use the editor",
  });
});

// test if a new message gets overwritten
test("should handle overwriting the current string with a new one in newMessages", () => {
  const previousState = {
    chatMessages: [],
    newMessages: "Hi there!. Nice of you to use the editor",
    chatIsOpen: true,
    initialOpening: false,
  };
  expect(
    reducer(
      previousState,
      setNewMessages("I believe there is an error on line 48")
    )
  ).toEqual({
    ...previousState,
    newMessages: "I believe there is an error on line 48",
  });
});

// test if chatMessages gets set when there are no messages set yet
test("should set a new chat message", () => {
  const previousState = {
    chatMessages: [],
    newMessages: "",
    chatIsOpen: true,
    initialOpening: false,
  };
  expect(
    reducer(
      previousState,
      setChatMessagesArray({
        user: "martijn",
        message: "Did you already finish implementing this constructor?",
        time: "21:19",
      })
    )
  ).toEqual({
    ...previousState,
    chatMessages: [
      {
        user: "martijn",
        message: "Did you already finish implementing this constructor?",
        time: "21:19",
      },
    ],
  });
});

// test if additional chat messages get set as well
test("should set an additional new chat message", () => {
  const previousState = {
    chatMessages: [
      {
        user: "martijn",
        message: "Did you already finish implementing this constructor?",
        time: "21:19",
      },
    ],
    newMessages: "",
    chatIsOpen: true,
    initialOpening: false,
  };
  expect(
    reducer(
      previousState,
      setChatMessagesArray({
        user: "jeroen",
        message: "No i was planning to do that friday",
        time: "21:22",
      })
    )
  ).toEqual({
    ...previousState,
    chatMessages: [
      {
        user: "martijn",
        message: "Did you already finish implementing this constructor?",
        time: "21:19",
      },
      {
        user: "jeroen",
        message: "No i was planning to do that friday",
        time: "21:22",
      },
    ],
  });
});

// test if chatMessages gets cleared when clearChatMessages gets called
test("should clear all the chat messages currently in chatMessages", () => {
  const previousState = {
    chatMessages: [
      {
        user: "martijn",
        message: "Did you already finish implementing this constructor?",
        time: "21:19",
      },
      {
        user: "jeroen",
        message: "No i was planning to do that friday",
        time: "21:22",
      },
      {
        user: "ryan",
        message: "I could start working on that if you don't mind?",
        time: "21:22",
      },
      {
        user: "jeroen",
        message:
          "Okay great, then i will pick up the rest of my tasks tommorrow!",
        time: "21:24",
      },
    ],
    newMessages: "",
    chatIsOpen: true,
    initialOpening: false,
  };
  expect(reducer(previousState, clearChatMessages())).toEqual({
    ...previousState,
    chatMessages: [],
  });
});
