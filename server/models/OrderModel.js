const mongoose = require("mongoose");
const User = require("./UserModel")

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  orderTotal: {
    itemsCount: {type: Number, required: true },
    cartSubTotal: {type: Number, required: true }
  },
  cartItems: [
    {
      name: {type: String, required: true},
      price: {type: Number, required: true},
      image: {path: {type: String, required: true}},
      quantity: {type: Number, required: true},
      count: { type: Number, required: true},
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }
  ],

  paymentMethod: { type: String, required: true},

  transactionResult: {
    status: String,
    createTime: String,
    amount: Number
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  paidAt: Date,

  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },

  deliveredAt: Date,

}, { timestamps: true});

const Order = mongoose.model("Order", orderSchema);

Order.watch().on("change", (data) => {
  if (data.operationType === "insert") {
    io.emit("newOrder", data.fullDocument)
  }
})

module.exports = Order