const express = require("express");
const app = express();
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes")

app.use((req, res, next) => {
  console.log("Handling api routes...");
  next();
});


app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes)


module.exports = app;
