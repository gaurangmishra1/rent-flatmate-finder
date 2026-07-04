import { useEffect, useState } from "react";
import { socket } from "../socket";
import axios from "axios";

interface Message {
  senderId: string;
  content: string;
}

export default function Chat() {
  const [roomId, setRoomId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (data: any) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const joinRoom = async () => {
    socket.emit("joinRoom", roomId);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${roomId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcjU0OHI2NjAwMDF2OWw0azhiMjRndm0iLCJyb2xlIjoiVEVOQU5UIiwiaWF0IjoxNzgzMDk0Mjg0LCJleHAiOjE3ODM2OTkwODR9.ZJzPeTTVvHiAvq5fFZfD-c8Z2aHb3_d5SRa0VhzTqz0",
          },
        }
      );

      setMessages(res.data.messages);
      alert("Joined Room");
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (!message) return;

    const data = {
      roomId,
      senderId,
      content: message,
    };

    socket.emit("sendMessage", data);

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>

      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Sender ID"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
      />

      <br />
      <br />

      <button onClick={joinRoom}>Join Room</button>

      <br />
      <br />

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <hr />

      {messages.map((msg, index) => (
        <div key={index}>
          <b>{msg.sender?.name || msg.senderId}</b>: {msg.content}
        </div>
      ))}
    </div>
  );
}