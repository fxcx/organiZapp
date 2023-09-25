"use client";

export default function UserInput({
  username,
  message,
  setUsername,
  setMessage,
  sendMessage,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && message.trim() !== "") {
      sendMessage();
    }
  };

  return (
    <form
      className="flex justify-center items-center w-[800px] bg-slate-400 p-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Tu nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-teal-400"
      />
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
    </form>
  );
}