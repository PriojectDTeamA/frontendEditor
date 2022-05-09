import React, { useEffect, useRef, useState } from "react";
import "./Chatbox.css";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { switchChatbox } from "../component-types/stateTypes";
import { IChatMessageProps, IEditorProps } from "../component-types/propTypes";

const ChatInput = (props: IChatMessageProps) => {
  const [currentinput, setinput] = useState("");

  const send = async () => {
    if (currentinput === "") {
      return null;
    }
    
    try {
      await props.connection.invoke("SendMessage", currentinput);
    } catch (e) {
      console.log(e);
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
      <input
        type="submit"
        value="send"
        className="message-button"
      ></input>

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
      messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
      messageRef.current.scrollIntoView(true);
    }
  }, [messages]);

  return <div className='message-container' >
    
    {messages.map((m:any, index:any) => (
      <div ref={messageRef} key={index}>
        {m[0].user === 'MyChat Bot' &&
          <div>
            <div className={'bot-message'}>{m[0].message}</div>
          </div>
        }

        {m[0].user != 'MyChat Bot' && 
          <div className={(m.user === mainUser ? 'user-message' : 'user-message-public')}>
            <div className={'message ' + (m[0].user === mainUser ? 'message-primary' : 'message-secondary')}>{m[0].message}</div>
            {m[0].user === mainUser && <div className='from-user'>{m[0].user} {m[0].time}</div>}
          </div>
        }
      </div>
    ))}
  </div>
}

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
        <ChatInput connection={props.connection}/>
      </div>
    </div>
  );
};

export default Chatbox;
