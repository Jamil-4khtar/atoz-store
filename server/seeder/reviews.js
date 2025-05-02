const mongoose = require("mongoose");

const reviews = [
  {
    comment: "Excellent product! Highly recommended.",
    rating: 5,
    user: {
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for each user
      name: "John Doe",
    },
  },
  {
    comment: "Good value for the price.",
    rating: 4,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Jane Smith",
    },
  },
  {
    comment: "Could be better, but it's decent.",
    rating: 3,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "David Lee",
    },
  },
  {
    comment: "Amazing product! Very happy with my purchase.",
    rating: 5,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Emily White",
    },
  },
  {
    comment: "It works as expected, no complaints.",
    rating: 4,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Michael Brown",
    },
  },
  {
    comment: "The features are great, but the build quality could be improved.",
    rating: 3,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Sarah Jones",
    },
  },
  {
    comment: "This is a must-have! Absolutely love it.",
    rating: 5,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Robert Davis",
    },
  },
  {
    comment: "A solid product with good performance.",
    rating: 4,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Jennifer Wilson",
    },
  },
  {
    comment: "Disappointed with the product. Expected more.",
    rating: 2,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "William Garcia",
    },
  },
  {
    comment: "This product exceeded my expectations. Highly recommended!",
    rating: 5,
    user: {
      _id: new mongoose.Types.ObjectId(),
      name: "Linda Rodriguez",
    },
  },
]

module.exports = reviews