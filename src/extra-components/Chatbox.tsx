import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { chatMessageType, switchChatbox } from "../component-types/stateTypes";
import { IChatMessageProps } from "../component-types/propTypes";

import "./Chatbox.css";

const ChatInput = (props: IChatMessageProps) => {
  const [currentinput, setinput] = useState("");

  const send = async () => {
    if (currentinput === "") return; // error toaster here

    try {
      await props.connection.invoke("SendMessage", currentinput);
    } catch (e) {
      console.error(e);
    }

    setinput("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <div className="input-container">
        <input
          type="text"
          value={currentinput}
          onChange={(e) => setinput(e.target.value)}
          placeholder="message..."
          className="message-text"
        ></input>
        <input type="submit" value="send" className="message-button"></input>
      </div>
    </form>
  );
};

const MessageContainer = () => {
  const messageRef = useRef<null | HTMLDivElement>(null);
  const messages = useAppSelector((state) => state.chatbox.chatMessages);
  const mainUser = useAppSelector((state) => state.user);

  useEffect(() => {
    // scroll to the last incoming ref
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
      messageRef.current.scrollIntoView(true);
    }
  }, [messages]);

  return (
    <div className="message-container">
      {messages.map((m: chatMessageType, index: number) => (
        <div ref={messageRef} key={index}>
          {m.user === "MyChat Bot" && (
            <div>
              <div className={"bot-message"}>{m.message}</div>
            </div>
          )}

          {m.user !== "MyChat Bot" && (
            <div
              className={
                m.user === mainUser.username
                  ? "user-message-public"
                  : "user-message"
              }
            >
              <div
                className={
                  "message " +
                  (m.user === mainUser.username
                    ? "message-secondary"
                    : "message-primary")
                }
              >
                {m.message}
              </div>
              {m.user !== mainUser.username && (
                <div className="from-user">
                  {m.user} {m.time}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Chatbox = (props: IChatMessageProps) => {
  const isOpen = useAppSelector((state) => state.chatbox.chatIsOpen);
  const initialOpening = useAppSelector(
    (state) => state.chatbox.initialOpening
  );

  const dispatch = useAppDispatch();

  const handleChatAnimation = () => {
    if (initialOpening) return "";
    else if (isOpen) return "slide-out";
    else return "slide-in";
  };

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
        <MessageContainer />
        <ChatInput connection={props.connection} />
      </div>
    </div>
  );
};

export default Chatbox;
