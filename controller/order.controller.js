const Order = require("../models/Order");
let cloudWsClients = []; // Will be assigned in cloudWs.js

exports.setCloudClientsRef = (ref) => {
  cloudWsClients = ref;
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // Push order to Local Backend via WebSocket Relay
    cloudWsClients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: "NEW_ONLINE_ORDER",
            payload: order,
          })
        );
      }
    });

    return res.json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
