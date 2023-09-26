"use client";
import { useState, useEffect } from "react";
import socket from "./socket";
import User from "./user";

export default function Message() {
  const [message, setMessage] = useState("");
  const [messageLista, setMessageLista] = useState([]); // Para el arreglo de mensajes

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (message) {
      socket.emit("send-message", { message: message });
      setMessageLista((prevMessageLista) => [
        ...prevMessageLista,
        message, 
      ]);
      setMessage(""); // Limpiar el input de mensaje después de enviarlo
    }
  };

  useEffect(() => {
    // En el cliente
    socket.on("message", ({ message }) => {
      setMessageLista((prevMessageLista) => [...prevMessageLista, message]);
    });

    // muere el componente.
    return () => {
      socket.off("send-message");
      socket.off("message");
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center  gap-2  md:gap-4 items-center w-[800px] bg-slate-400 p-4"
    >
      <User />
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
      <ul className="mt-4 mx-auto max-w-[800px]">
        {messageLista.map((message, index) => (
          <li
            key={index}
            className="bg-teal-100 text-teal-800 px-2 py-1 mt-2 rounded-md"
          >
            {message}
          </li>
        ))}
      </ul>
    </form>
  );
}
