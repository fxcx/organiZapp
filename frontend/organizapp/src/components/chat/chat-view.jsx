"use client";

import { useEffect, useState } from "react";
import  socket  from "@/components/chat/socket";
import Room from '@/components/chat/Room-view'
import UserImput from '@/components/chat/user-view'


export default function ChatView() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    // Escucha el evento 'message' del servidor y agrega el mensaje al historial de chat.
    socket.on("send-message", (data) => {
      setChat((prevChat) => [
        ...prevChat,
        { username: data.username, message: data.message },
      ]);
    });

    // Escucha el evento 'join-room' y 'user-join' y agrega los mensajes a la sala actual.
    socket.on("join-room", (message) => {
      setChat((prevChat) => [
        ...prevChat,
        { username: username, message: message },
      ]);
    });

    socket.on("user-join", (message) => {
      setChat((prevChat) => [
        ...prevChat,
        { username: username, message: message },
      ]);
    });

    // Maneja las desconexiones.
    socket.on("disconnect", (dis) => {
      if (dis === "io server disconnect") {
        socket.connect();
      }
      setChat((prevChat) => [
        ...prevChat,
        { username: username, message: `User disconnected: ${socket.id}` },
      ]);
    });

    // muere el componente.
    return () => {
      socket.off("send-message");
      socket.off("join-room");
      socket.off("user-join");
      socket.off("disconnect");
    };
  }, [username]);

  const sendMessage = () => {
    // Emite el evento 'send-message' con los datos del mensaje.
    socket.emit("send-message", { username, message, room: roomName });
    setMessage(""); // Limpia el campo de entrada de mensajes después de enviarlo.
  };

  return (
    <section className="flex h-screen">
      <Room roomName={roomName} setRoomName={setRoomName} />
      <div className="flex-1 bg-white p-4">
        {chat.map((data, idx) => (
          <div key={idx}>
            <strong>{data.username}</strong>
            <li>{data.message}</li>
          </div>
        ))}
      </div>
      <UserImput
        username={username}
        message={message}
        setUsername={setUsername}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </section>
  );
}