const express = require("express");
const router = express.Router();
const controller = require("../controller/order.controller");

router.post("/", controller.createOrder);
router.get("/", controller.getOrders);

module.exports = router;
