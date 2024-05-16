import React, { useEffect, useRef } from 'react';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

export default function Messages({ messages }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((message, index) => {
        if (message.type === 'bot') {
          return <BotMessage key={index} fetchMessage={() => Promise.resolve(message.text)} />;
        } else if (message.type === 'user') {
          return <UserMessage key={index} text={message.text} />;
        }
        return null;
      })}
      <div id="el" ref={el} />
    </div>
  );
}
