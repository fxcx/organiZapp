"use client";

import socket from "@/components/chat/socket";
import { useState, useEffect } from "react";

export default function Room() {
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);

  const joinOrCreateRoom = (evento) => {
    evento.preventDefault();
    if (roomName) {
      socket.emit("create-room", roomName);
      socket.emit("join-room", roomName);
    }
  };

  useEffect(() => {
    // Escucha el evento 'room-added' para recibir notificaciones sobre nuevas salas creadas.
    socket.on("room-list-add", (newRoomName) => {
      // Actualiza la lista de salas disponibles en el estado del componente.
      setRoomList((prevRooms) => [...prevRooms, newRoomName]);
    });

    // Escucha el evento 'left-room' del servidor
    socket.on("left-room", (message) => {
      // Aquí puedes manejar el mensaje que proviene del servidor
      console.log(message); // O muestra el mensaje en algún lugar de la interfaz
    });

    socket.on("leave-room", (roomName) => {
      // Maneja la lógica para salir de la sala
      console.log(`Saliste de la sala: ${roomName}`);
      // Puedes agregar más lógica aquí si es necesario
    });

    // muere el componente.
    return () => {
      socket.off("create-room");
      socket.off("join-room");
      socket.off("room-list-add");
      socket.off("left-room");
      socket.off("leave-room");
    };
  }, []);

  return (
    <section className="flex flex-col bg-stone-600 h-[900px] w-[300px] gap-5 p-4">
      <div>
        <input
          type="text"
          placeholder="Nombre de la sala"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-teal-400"
        />
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md mt-2 cursor-pointer"
          onClick={joinOrCreateRoom}
        >
          Unirse / Crear Sala
        </button>
      </div>


      <div className="mt-4">
        <h2 className="text-white text-lg font-semibold mb-2">
          Salas Disponibles:
        </h2>
        <ul>
          {roomList.map((room, index) => (
            <li
              key={index}
              className="text-white hover:text-teal-400 cursor-pointer"
            >
              {room}
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 rounded-md ml-2 cursor-pointer"
                onClick={() => {
                  socket.emit("join-room", room); // Emitir el evento "join-room" con el nombre de la sala
                }}
              >
                Unirse
              </button>

              <button
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md ml-2 cursor-pointer"
                onClick={() => {
                  socket.emit("leave-room", room); // Emitir el evento "leave-room" con el nombre de la sala
                }}
              >
                Salir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
