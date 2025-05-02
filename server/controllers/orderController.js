const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
// const { isValidObjectId } = require("mongoose");

const getUserOrders = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: No user found"})
    }

    const orders = await Order.find({ user: req.user._id });

    if(!orders.length) {
      return res.status(404).json({ message: "No orders found for this user"})
    }

    res.json({ message: "fetched user orders", orders });
  } catch (err) {
    next(err);
  }
};

const getTheOrder = async (req, res, next) => {
  try {
    // if (!isValidObjectId(req.params.orderId)) {
    //   return res.status(400).json({ error: "Invalid order ID format" });
    // }
    console.log(req.params.orderId)
    const order = await Order.findOne({ _id: req.params.orderId }).populate(
      "user"
    );

    res.json({ message: "Order fetched", order });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { cartItems, orderTotal, paymentMethod } = req.body;
    // console.log(cartItems, orderTotal, paymentMethod)
    if (!(cartItems && orderTotal && paymentMethod)) {
      res.status(400).json({ message: "All inputs are required" });
    }

    let ids = cartItems.map((item) => {
      return item.productId;
    });

    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });

    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach((p, i) => {
        p.sales += qty[i];
        p.save();
      });
    });

    const order = new Order({
      user: req.user._id,
      orderTotal,
      cartItems,
      paymentMethod,
    });

    const createdOrder = await order.save();

    res
      .status(201)
      .json({ message: "Order is placed successfully", createdOrder });
  } catch (err) {
    next(err);
  }
};

const updatePaidOrNot = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order)
      return res
        .status(404)
        .json({ error: "Order not found, please try later" });

    order.isPaid = true;
    order.paidAt = new Date()

    await order.save();
    console.log("order", order)
    res.json({ message: "Your order is paid successfully", order });
  } catch (err) {
    next(err);
  }
};

const updateDelivery = async (req, res, next) => {
  try {
    // console.log(req.params.id)
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ error: "Order not found, please try later" });

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();
    res.json({ message: "Your order is delivered successfully" });
  } catch (err) {
    next(err);
  }
};  

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" });

    res.json({ message: "Orders fetched successfully", orders });
  } catch (err) {
    next(err);
  }
};

const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(req.params.date)
    end.setHours(23, 59, 59, 999)

    const orders =  await Order.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    }).sort({ createdAt: "asc"});

    res.json({ message: "date set for the order analysis", orders})


  } catch (err) {
    next(err);
  }
};
module.exports = {
  getUserOrders,
  getTheOrder,
  createOrder,
  updatePaidOrNot,
  updateDelivery,
  getAllOrders,
  getOrderForAnalysis
};
