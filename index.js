const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { WebSocketServer } = require("ws");

dotenv.config();

const connectDB = require("./db/connect");
const app = require("./app");

const { setupCloudWebSocket, cloudClients } = require("./websocket/cloudWs");
const orderController = require("./controllers/orderController");

connectDB();

// allow controller to send WS messages
orderController.setCloudClientsRef(cloudClients);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// start WS
setupCloudWebSocket(wss);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Cloud backend running on port ${PORT}`);
});
