import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import "./Chat.css";

const ENDPOINT = "https://react-real-time-chat-nipaa.herokuapp.com/";
let socket;
// let socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});
// var connectionOptions =  {
//   "force new connection" : true,
//   "reconnectionAttempts": "Infinity",
//   "timeout" : 10000,
//   "transports" : ["websocket"]
// };

// this.socket = io.connect(ENDPOINT,connectionOptions);

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  });

  //function for sending Messages
  const sendMessage = (event) => {
    console.log(message);
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(messages, message);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
