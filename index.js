import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Store connections (mainly the local backend)
let clients = new Set();

wss.on("connection", (ws) => {
  console.log("🌍 Cloud: Client connected");
  clients.add(ws);

  ws.on("message", (msg) => {
    console.log("🌍 Cloud received:", msg.toString());

    // Forward message to all connected clients
    clients.forEach((c) => {
      if (c !== ws && c.readyState === c.OPEN) c.send(msg);
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("🌍 Cloud: Client disconnected");
  });
});

// HTTP endpoint so cloud React app can send messages
app.post("/send", (req, res) => {
  const { message } = req.body;
  console.log("🌍 Cloud send:", message);

  clients.forEach((c) => {
    if (c.readyState === c.OPEN) c.send(message);
  });

  res.json({ status: "sent" });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🌍 Cloud WebSocket running on ${PORT}`);
});
