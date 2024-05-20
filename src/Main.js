import React, { useState, Suspense, lazy,useEffect } from 'react';
import FloatingButton from './components/FloatingButton';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import API from './ChatbotAPI';

const Chatbot = lazy(() => import('./components/Chatbot'));

function Main() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [uid,setUID]=useState('')

  useEffect(()=>{
    setUID(uuidv4())
  },[])

  const toggleChat = () => {
    setShowChat(!showChat);
  };

    const fetchChatAPI = async (text) => {
    if (text.trim() === '') return;

    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: '....', isLoading: true },
      ]);

      const response = await API.fetchChatAPI(text,uid);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = { type: 'bot', text: response, isLoading: false };
        return updatedMessages;
      });
    } catch (error) {
      console.error(error);
    }
  };


 useEffect(() => {
    const loadWelcomeMessage = async () => {
      const welcomeMessage = await API.GetChatbotResponse('hi');
      setMessages([{ type: 'bot', text: welcomeMessage }]);
    };
    loadWelcomeMessage();
  }, []);

const send = async (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text },
    ]);
    debouncedFetchChatAPI(text);
  };

   const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedFetchChatAPI = debounce(fetchChatAPI, 300);


  return (
    <div className="App">
      <FloatingButton onClick={toggleChat} />
      {showChat && (
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Chatbot onClose={toggleChat} allMessages={messages} onSend={send}/>
          </ErrorBoundary>
        </Suspense>
      )}
    </div>
  );
}

export default Main;
