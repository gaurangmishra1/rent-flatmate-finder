import { Server, Socket } from "socket.io";

export function initializeChat(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinRoom", (roomId: string) => {
      console.log("Join Room Event:", roomId);
      socket.join(roomId);
      console.log(`Joined Room: ${roomId}`);
    });

    socket.on("sendMessage", (data) => {
      console.log("Message Received:", data);

      io.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
}