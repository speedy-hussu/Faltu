const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: String,
  items: [OrderItemSchema],
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "Completed", "Delivered", "Cancelled"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
