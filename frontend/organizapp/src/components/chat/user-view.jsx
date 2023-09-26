"use client";
import { useState, useEffect } from "react";
import socket from "./socket";
import Room from "@/components/chat/Room-view";

export default function UserMessage() {
  const [message, setMessage] = useState("");
  const [messageLista, setMessageLista] = useState([]); // Para el arreglo de mensajes
  const [username, setUsername] = useState("");
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

    // Escucha el evento "user-connected" del servidor
    socket.on("user-connected", (userRecivido) => {
      // Agrega el nombre de usuario a la lista de conectados
      setUsername(userRecivido);
    });

    // muere el componente.
    return () => {
      socket.off("user-connectd");
      socket.off("send-message");
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-[800px] bg-slate-400 p-4"
    >
      <div className="">
        <h1 className="flex">welcome, {username}!</h1>
      </div>
      <input
        type="text"
        placeholder="Nombre de la sala"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)} // Actualiza el estado de roomName
        className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-teal-400 ml-2"
      />
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-teal-400 ml-2"
      />
      <button
        disabled={!message || !roomName} // Deshabilita el botón si no hay mensaje o roomName
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-md ml-2"
      >
        Enviar
      </button>
      <ul>
        {messageLista.map((messageData, index) => (
          <li key={index}>
            {messageData.username}: {messageData.message}
          </li>
        ))}
      </ul>
    </form>
  );
}
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("send-message", { room: roomName, message: message });
//     setMessageLista((prevMessageLista) => [...prevMessageLista, message]);
//   };

//   useEffect(() => {
//     // Escucha el evento 'message' del servidor y agrega el mensaje al historial de chat.
//     socket.on("send-message", (messageData) => {
//       setMessageLista((prevChat) => [
//         ...prevChat,
//         { username: messageData.username, message: messageData.message },
//       ]);
//     });
    
//     // Escucha el evento "user-connected" del servidor
//     socket.on("user-connected", (userRecivido) => {
//       // Agrega el nombre de usuario a la lista de conectados
//       setUsername(userRecivido);
//     });

//     // muere el componente.
//     return () => {
//       socket.off("user-connectd");
//       socket.off("send-message");
//     };
//   }, []);

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex justify-center items-center w-[800px] bg-slate-400 p-4"
//     >
//       <div className="">
//         <h1 className="flex">welcome, {username}!</h1>
//       </div>
//       <input
//         type="text"
//         placeholder="Escribe un mensaje"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-teal-400 ml-2"
//       />
//       <button
//         disabled={!message} // Deshabilita el botón si no hay mensaje
//         type="submit"
//         className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-md ml-2"
//       >
//         Enviar
//       </button>
//       <ul>
//         {messageLista.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//     </form>
//   );
// }
