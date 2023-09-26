"use client";
import { useState, useEffect } from "react";
import socket from "./socket";

export default function User() {
  const [username, setUsername] = useState("");

  // Escucha el evento "user-connected" del servidor
  socket.on("user-connected", (userRecivido) => {
    // Agrega el nombre de usuario a la lista de conectados
    setUsername(userRecivido);

    return  socket.off("user-connectd");
  });


  return (
    <div className="bg-slate-600 w-[300] p-4">
      <h1 className="flex">welcome, {username}!</h1>
    </div>
  );
}
