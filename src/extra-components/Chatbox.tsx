import React, { useState } from "react";
import "./Chatbox.css";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { AppDispatch } from "../component-types/store";
import { switchChatbox } from "../component-types/stateTypes";
import { IChatMessageProps } from "../component-types/propTypes";

const ChatInput = () => {
  const [currentinput, setinput] = useState("");

  const send = () => {
    if (currentinput === "") {
      return null;
    }
    const inputToSend = currentinput;
    setinput("");

    // <-- call the method to send the text through to another client here

    return <ChatMessage text={inputToSend} />;
  };

  return <textarea className="chat-input"></textarea>;
};

const ChatMessage = (props: IChatMessageProps) => {
  return (
    <div className="chat-message">
      <p>{props.text}</p>
    </div>
  );
};

const Chatbox = () => {
  // const [messages, setMessages] = useState<React.ReactNode[]>([]); // an array of ChatMessage components
  const messages = useAppSelector((state) => state.chatbox.chatMessages);
  const isOpen = useAppSelector((state) => state.chatbox.chatIsOpen);
  const initialOpening = useAppSelector(
    (state) => state.chatbox.initialOpening
  );

  const dispatch: AppDispatch = useAppDispatch();

  const handleChatAnimation = () => {
    if (initialOpening)
      // initial state of the chat
      return "";
    else if (isOpen)
      // chat is open and is activated at least once
      return "slide-out";
    // chat is not open but is activated at least once
    else return "slide-in";
  };

  // TODO: load in all the messages of the chatbox that belong to the current room.
  return (
    <div>
      {isOpen && (
        <div>
          <div
            className={`slide-button slide-out`}
            onClick={() => dispatch(switchChatbox())}
          >
            {">"}
          </div>
        </div>
      )}
      <div className={`chatbox ${handleChatAnimation()}`}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chatbox;
