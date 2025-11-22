// server.js - No need to pass reference anymore
const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { WebSocketServer } = require("ws");

dotenv.config();

const connectDB = require("./db/db.connect");
const app = require("./app");
const { setupCloudWebSocket } = require("./websocket/cloudWs");

connectDB();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

setupCloudWebSocket(wss);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Cloud backend running on port ${PORT}`);
});
