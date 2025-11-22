const express = require("express");
const app = express();
const cors = require("cors");
const orderRoutes = require("./routes/order.routes");

app.use(express.json());
app.use(cors());

app.use("/api/orders", orderRoutes);

module.exports = app;
