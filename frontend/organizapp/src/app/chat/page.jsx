"use client"
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useSession } from 'next-auth/react'
import sendImg from "../../../public/assets/icons8-enviar-96.png";

const socket = io('http://localhost:4000');

function Chat() {
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });
    return () => {
      socket.off('chat_message');
    }
  }, []);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: session?.user?.name,
      mensaje: nuevoMensaje
    });
  }

  const esMensajeMio = (usuario) => {
    return usuario === session?.user?.name;
  }

  return (
    <div className="bg-gray-600 min-h-screen p-4 flex flex-col">
      <div className="bg-gray-100 border-2 border-green-300 p-4 rounded-md mb-4">
        <div>
          {mensajes.map((mensaje, index) => (
            <div
              key={index}
              className={`p-2 rounded-md shadow-md mb-2 ${esMensajeMio(mensaje.usuario) ? "self-end bg-green-100" : "self-start bg-white"}`}
            >
              <span className={`font-semibold ${esMensajeMio(mensaje.usuario) ? "text-green-600" : "text-blue-600"}`}>
                {esMensajeMio(mensaje.usuario) ? "Me:" : mensaje.usuario + ":"}
              </span> {mensaje.mensaje}
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-md bg-gray-300"
          onChange={e => setNuevoMensaje(e.target.value)}
          placeholder="Write your message..."
          autoFocus
        />
        <div
          onClick={enviarMensaje}
          className="bg-gray-300 flex items-center p-2 rounded-md hover:bg-gray-400 cursor-pointer"
        >
          <Image
            src={sendImg}
            alt="Mi Imagen WebP"
            width={25}
            height={25}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
