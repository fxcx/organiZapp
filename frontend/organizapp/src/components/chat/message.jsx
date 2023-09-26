"use client";
import { useState, useEffect } from "react";
import socket from "./socket";


export default function Message() {
  const [message, setMessage] = useState("");
  const [messageLista, setMessageLista] = useState([]); // Para el arreglo de mensajes
 const [roomName, setRoomName] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica si roomName está definida antes de emitir el evento
    if (roomName && message) {
      socket.emit("send-message", { room: roomName, message: message });
      setMessageLista((prevMessageLista) => [...prevMessageLista, message]);
    }
  };

  useEffect(() => {
    // Escucha el evento 'message' del servidor y agrega el mensaje al historial de chat.
    socket.on("send-message", (messageData) => {
      setMessageLista((prevMessageLista) => [
        ...prevMessageLista,
        { username: messageData.username, message: messageData.message },
      ]);
    });

    // muere el componente.
    return () => {
      socket.off("send-message");
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-[800px] bg-slate-400 p-4"
    >
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-teal-400 ml-2"
      />
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-md ml-2"
      >
        Enviar
      </button>
      <ul>
        {messageLista.map((messageData, index) => (
          <li key={index}>
            {messageData.username}
            {messageData.message}
          </li>
        ))}
      </ul>
    </form>
  );
}
