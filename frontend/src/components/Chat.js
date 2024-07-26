import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import "./style.css"; // Import the CSS file

function Chat(props) {
  const name = props.name;
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", handleIncomingMessage);
    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, []);

  const handleIncomingMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  const handleCheckToggle = () => {
    setChecked(!checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && message) {
      socket.emit("sendMessage", { name, message });
      setMessage("");
    }
  };

  return (
    <div className="chat">
      {checked ? (
        <div className="chat-box">
          <div className="close-button" onClick={handleCheckToggle}>
            X
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              placeholder="Your message"
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <div className="chat">
            <ul>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`message ${
                    message.name === name ? "self" : "other"
                  }`}
                >
                  <span className="message-name">{message.name}:</span>
                  <span className="message-content">{message.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <button className="open-chat" onClick={handleCheckToggle}>
          open chat
        </button>
      )}
    </div>
  );
}

export default Chat;
