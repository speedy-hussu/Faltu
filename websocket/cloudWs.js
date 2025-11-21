let cloudClients = [];

const setupCloudWebSocket = (wss) => {
  console.log("🌐 Cloud WebSocket server running...");

  wss.on("connection", (ws) => {
    console.log("🔗 Local Backend connected to Cloud WS");
    cloudClients.push(ws);

    ws.on("message", (msg) => {
      console.log("🌐 Received from Local:", msg);
    });

    ws.on("close", () => {
      cloudClients = cloudClients.filter((c) => c !== ws);
      console.log("❌ Local disconnected from cloud WS");
    });
  });
};

module.exports = {
  setupCloudWebSocket,
  cloudClients,
};
