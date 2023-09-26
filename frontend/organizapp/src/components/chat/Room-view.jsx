"use client";

import socket from "@/components/chat/socket";
import { useState, useEffect } from "react";

export default function Room() {
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);

  const joinOrCreateRoom = (evento) => {
    evento.preventDefault();
    if (roomName) {
      socket.emit("join-room", roomName);
      socket.emit("create-room", roomName);
    }
  };

  useEffect(() => {
    // Escucha el evento 'room-added' para recibir notificaciones sobre nuevas salas creadas.
    socket.on("room-list-add", (newRoomName) => {
      // Actualiza la lista de salas disponibles en el estado del componente.
      setRoomList((prevRooms) => [...prevRooms, newRoomName]);
    });

    // muere el componente.
    return () => {
      socket.off("user-connected");
      socket.off("send-message");
      socket.off("disconnect");
    };
  }, []);

  return (
    <section className="flex bg-stone-600 h-[900px] w-[250px] gap-5">
      <div className="mt-4">
        <input
          type="text"
          placeholder="Nombre de la sala"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-teal-400"
        />
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md cursor-pointer"
          onClick={ joinOrCreateRoom }
        >
          Unirse / Crear Sala
        </button>
      </div>

      <div className="mt-2">
        <button
          className="bg-teal-600 hover:bg-red-900 text-white px-3 py-2 rounded-md cursor-pointer"
          onClick={() => setRoomName("")} // Esto parece ser un botón para "Limpiar" el campo de nombre de sala
        >
          Salir de la Sala
        </button>
      </div>

      {/* Aquí puedes mostrar la lista de salas disponibles */}
      <div>
        <h2>Salas Disponibles:</h2>
        <ul>
          {roomList.map((room, index) => (
            <li key={index}>{room}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
