import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";
import axios from "axios";

import API from "./ChatbotAPI";

import "./styles.css";
import Header from "./components/Header";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchChatAPI = async (text) => {
    if (text == " ") return;
    try {
      let data = JSON.stringify({
        q: text,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://1d8tp0zb26.execute-api.us-east-1.amazonaws.com/genai-app-poc-ApiStage/api/v1/llm/rag",
        headers: {
          authorization:
            "eyJraWQiOiJOc1lNd2VES3pHVTVNTVpITFAwajBkdHNVN1dUZXpOY1pwZVBxTEwrQVhJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNDQwMzU1Ny1iNWVkLTRlYWUtOGY2NS1hYjhhYzQzYzZkODEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9rYzdxcm4wQ2oiLCJjb2duaXRvOnVzZXJuYW1lIjoiYzQ0MDM1NTctYjVlZC00ZWFlLThmNjUtYWI4YWM0M2M2ZDgxIiwib3JpZ2luX2p0aSI6IjU4MjA4ZDI1LWExYmItNGE4Yy05MzAyLTYyY2E1MTBhZjIwYyIsImF1ZCI6IjQxOWFsbzhhNDE1ZGVpN3Myb3JtYWdoYjlwIiwiZXZlbnRfaWQiOiI1OTlkNGQyNi04MTRmLTQyOTgtYTA0OC0xYzg0MjJkNTlkY2EiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5ODg0MzczMiwiZXhwIjoxNjk4OTMwMTMyLCJpYXQiOjE2OTg4NDM3MzIsImp0aSI6ImRkY2I3MDAzLWM5MmUtNDk0Zi1hYzk5LTBhZjFjNTA3NmM2NCIsImVtYWlsIjoiaGFzc2FuLm5hZGVlbUBuZXRzb2x0ZWNoLmNvbSJ9.h4gAHNGXqoW4HT9-9NDVEF4lrdgO3T4XPLjgGqpqpTdhJ80CgJmcWDA5l-EnG08NUJhwIQfhQILqSgKicvlVZD3VSX-nWfhctxDYAc3ARjJDj4sJa_jnJTKWrUVsnX37LF-ewptUNOq4TVCGeBM7MwZ_vnCOSCPSCdJHRb5_g667cJcnq8XB-Q56hxQu_f6VEgBYm_QpdpjwmjPHUhEQr0ApoF04ZCQPOydX6yncv01YDnH9nra3aCtb2ImcCSnRFxA2PKKTE6ck_IVEDPqC8EaLEFfaA_JycbzfES-XywtE_Mtox9GNE9C67qXYMhI0busGLwTBOG0DQkkZ8SdUKQ",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(
            "testingingisningis",
            JSON.stringify(response.data.answer)
          );
          const answer = response.data.answer; // Assuming the response structure has an 'answer' field

          const newMessages = messages.concat(
            <UserMessage key={messages.length + 1} text={text} />,
            <BotMessage
              key={messages.text + 2}
              fetchMessage={async () => answer}
            />
          );
          setMessages(newMessages);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
    fetchChatAPI(text);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Chatbot />, rootElement);
