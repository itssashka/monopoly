import React, { useEffect, useRef } from "react";
import { getMessages } from "../../../store/matchSlice";
import { useSelector } from "react-redux";

const Messages = () => {
    const messages = useSelector(getMessages);
    const messagesRef = useRef(null);

    useEffect(()=>{
        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }, [messages])

    return (
        <div className="chat-messages" ref={messagesRef}>
            {messages.messages.map((message) => (
                <div className="chat-messages__message" key={message.id}>
                    <div className="message__username" style={{color: message.type === 'alert' ? "#ef6024" : "#f0941f"}}>{message.username}: </div>
                    <div className="message__text">{message.message}</div>
                </div>
            ))}
        </div>
    );
};

export default Messages;
