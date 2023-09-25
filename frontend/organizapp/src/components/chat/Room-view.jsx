"use client";

import socket from "@/components/chat/socket";


export default function Room({ roomName, setRoomName }) {
  const joinOrCreateRoom = (e) => {
    e.preventDefault();
    if (roomName) {
      // Comprueba si el nombre de la sala no está vacío antes de unirse o crear.
      socket.emit("join-room", roomName); // Puedes unirte a la sala existente.
      socket.emit("create-room", roomName); // Intenta crear la sala (puede verificar si ya existe en el servidor).
    }
  };

  const leaveRoom = () => {
    if (roomName) {
      // Solo intenta salir de la sala si se ha proporcionado un nombre de sala.
      socket.emit("leave-room", roomName);
    }
  };

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
          onClick={joinOrCreateRoom}
        >
          Unirse / Crear Sala
        </button>
      </div>

      <div className="mt-2">
        <button
          className="bg-teal-600 hover:bg-red-900 text-white px-3 py-2 rounded-md cursor-pointer"
          onClick={leaveRoom}
        >
          Salir de la Sala
        </button>
      </div>
    </section>
  );
}