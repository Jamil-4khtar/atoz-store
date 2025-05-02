const express = require("express");
const router = express.Router();
const { verifyLogin, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUserOrders, getTheOrder, createOrder, updatePaidOrNot, updateDelivery, getAllOrders, getOrderForAnalysis } = require("../controllers/orderController");


// user routes
router.use(verifyLogin)
router.get("/", getUserOrders)
router.get("/user/:orderId", getTheOrder)
router.post("/", createOrder)
router.put("/paid/:id", updatePaidOrNot)

// admin routes
router.use(verifyIsAdmin)
router.put("/delivered/:id", updateDelivery)
router.get("/admin", getAllOrders)
router.get("/analysis/:date", getOrderForAnalysis)

module.exports = router