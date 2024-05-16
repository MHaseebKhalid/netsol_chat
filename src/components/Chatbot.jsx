import React, { useState, useEffect, useRef, useCallback } from 'react';
import Messages from './Messages';
import Input from './Input';
import Header from './Header';
import './Chatbot.css';


const Chatbot = ({ onClose,onSend,allMessages }) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);


  useEffect(()=>{
    setMessages(allMessages)
  },[allMessages])


  const handleClickOutside = useCallback((event) => {
    if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      <div className="chatbot">
        <div className="chatbot-header">
          <Header />
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <Messages messages={messages} />
        <Input onSend={(text)=>onSend(text)} />
      </div>
    </div>
  );
};

export default Chatbot;
