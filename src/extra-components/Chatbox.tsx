import React, { useState } from "react";
import { IChatboxProps, IChatMessageProps } from "./ChatboxTypes";
import "./Chatbox.css";

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

  return (
    <div>
      <div
        className={`slide-button ${props.isOpen ? "slide-out" : "slide-in"}`}
        onClick={props.openCloseChat}
      >
        {props.isOpen ? ">" : "<"}
      </div>
      <div className={`chatbox ${props.isOpen ? "slide-out" : "slide-in"}`}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chatbox;
