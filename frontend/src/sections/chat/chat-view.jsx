"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message)
    setMessage("")
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);


  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>organizapp</h1>
        <input
          type="text"
          placeholder="Write your message..."
          onChange={(evento) => setMessage(evento.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
          value={message}
          autoFocus
        />
        <button type="submit">send</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.from}: {msg.body}</li>
         ))}
      </ul>
    </div>
  );
}
