import React, { useState } from "react";
import { IChatMessageProps } from "../component-types/ChatboxTypes";

const ChatInput = () => {
  const [currentinput, setinput] = useState("");

  const send = () => {
    if (currentinput === "") {
      return null;
    }
    const inputToSend = currentinput;
    setinput("");
    return <ChatMessage text={inputToSend} />;
  };

  return <div className="chat-input"></div>;
};

const ChatMessage = (props: IChatMessageProps) => {
  return (
    <div className="chat-message">
      <p>{props.text}</p>
    </div>
  );
};

const Chatbox = () => {
  const [messages, setMessages] = useState<React.ReactNode[]>([]); // an array of ChatMessage components
  return <div className="chatbox"></div>;
};

export default Chatbox;
