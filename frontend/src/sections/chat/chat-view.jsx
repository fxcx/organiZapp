"use client"

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("localhost:4000", {
  autoConnect:true
});

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessageInfo = {
      body: newMessage,
      from: "Me",
    };
    setMessages([...messages, newMessageInfo]);
    socket.emit("message", newMessage)
    setNewMessage("")
  };

  const receiveMessage = (message) => {
    setNewMessages((previousMessages) => [...previousMessages, message]);
  }

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);


  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>organizapp</h1>
        <input
          type="text"
          placeholder="Write your message..."
          onChange={(evento) => setNewMessages(evento.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
          value={newMessage}
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
