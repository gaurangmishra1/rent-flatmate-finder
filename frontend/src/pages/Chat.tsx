import { useEffect, useState } from "react";
import api from "../api/api";
import { socket } from "../socket";

interface Message {
  id?: string;
  senderId: string;
  content: string;
}

export default function Chat() {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  async function joinRoom() {
    socket.emit("joinRoom", roomId);

    const token = localStorage.getItem("token");

    const res = await api.get(`/messages/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessages(res.data.messages);
  }

  function sendMessage() {
    if (!message) return;

    const data = {
      roomId,
      senderId: user.id,
      content: message,
    };

    socket.emit("sendMessage", data);

    setMessages((prev) => [...prev, data]);

    setMessage("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat</h1>

      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <button onClick={joinRoom}>Join Room</button>

      <hr />

      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid gray",
          padding: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.senderId}</b>: {m.content}
          </div>
        ))}
      </div>

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}