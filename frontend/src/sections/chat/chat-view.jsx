'use client'

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import moment from "moment";


const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"]
});

const username = prompt("what is your username");

export default function ChatView() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
  }, []);

  const submit = event => {
    event.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };

  return (
    <div>
      <div>
        <div >
          <h6>Hello {username}</h6>
        </div>
      </div>
      <div >
        <div>
          <h6>Messages</h6>
          <div id="messages">
            {messages.map(({ user, date, text }, index) => (
              <div key={index}>
                <div>
                  {moment(date).format("h:mm:ss a")}
                </div>
                <div >{user.name}</div>
                <div >{text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={submit} id="form">
            <div>
              <input
                type="text"
                onChange={e => setMessage(e.currentTarget.value)}
                value={message}
                id="text"
              />
              
                <button id="submit" type="submit" >
                  Send
                </button>
           
            </div>
          </form>
        </div>
        <div >
          <h6>Users</h6>
          <ul id="users">
            {users.map(({ name, id }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};