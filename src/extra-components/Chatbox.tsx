import React, { useState } from "react";
import "./Chatbox.css";
import {
  IChatMessageProps,
  IChatboxProps,
} from "../component-types/ChatboxTypes";

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

const Chatbox = (props: IChatboxProps) => {
  const [messages, setMessages] = useState<React.ReactNode[]>([]); // an array of ChatMessage components

  const openAndCloseChat = () => {
    props.openCloseChat();
  };

  const handleChatAnimation = () => {
    if (props.initialOpening)
      // initial state of the chat
      return "";
    else if (props.isOpen)
      // chat is open and is activated at least once
      return "slide-out";
    // chat is not open but is activated at least once
    else return "slide-in";
  };

  return (
    <div>
      {props.isOpen && (
        <div>
          <div className={`slide-button slide-out`} onClick={openAndCloseChat}>
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
