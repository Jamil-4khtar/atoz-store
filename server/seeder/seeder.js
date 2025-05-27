require("dotenv").config()
const connectDB = require("../config/db");
connectDB();

const categoryData = require("./categories");
const Category = require("../models/CategoryModel");

const productData = require("./products");
const Product = require("../models/ProductModel");

const reviewData = require("./reviews");
const Review = require("../models/ReviewModel");

const getHashedData = require("./users");
const User = require("../models/UserModel");

const orderData = require("./orders");
const Order = require("../models/OrderModel");

const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();

    await Category.deleteMany();
    await Category.insertMany(categoryData);

    await Review.deleteMany();
    const reviews = await Review.insertMany(reviewData);

    const sampleProduct = productData.map((product) => ({
      ...product,
      reviews: reviews.map((r) => r._id),
    }));
    await Product.deleteMany();
    await Product.insertMany(sampleProduct);

    await User.deleteMany();
    const hashedData = await getHashedData();
    // console.log(hashedData)
    await User.insertMany(hashedData);

    await Order.deleteMany();
    await Order.insertMany(orderData);

    console.log("Seeder data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error while processing seeder data", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();
    await Category.deleteMany();
    await Review.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed")
    process.exit();
  } catch (err) {
    console.error("Error destroying data: ", err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
