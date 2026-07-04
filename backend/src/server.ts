import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";


import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import listingRoutes from "./routes/listing.routes";
import tenantRoutes from "./routes/tenant.routes";
import interestRoutes from "./routes/interest.routes";
import messageRoutes from "./routes/message.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { initializeChat } from "./socket/chat.socket";
import { setIO } from "./socket/socket";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Rent & Flatmate Finder API Running 🚀");
});

app.get("/hello", (req, res) => {
  res.send("Hello");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ✅ IMPORTANT: register socket globally
setIO(io);

// ✅ IMPORTANT: start socket events
initializeChat(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});