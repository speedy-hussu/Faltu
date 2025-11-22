// order.controller.js
const { getCloudClients } = require("../websocket/cloudWs");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // ✅ Get current clients dynamically
    getCloudClients().forEach((client) => {
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
