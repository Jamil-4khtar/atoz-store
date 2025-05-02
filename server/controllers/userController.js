const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const { default: mongoose } = require("mongoose");

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.json({ users });
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password)) {
      return res.status(400).json({ error: "All inputs must exist" });
    }

    let userExist = await User.findOne({ email: email.toLowerCase() });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    let user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: await hashPassword(password),
    });

    await user.save();

    res
      .cookie(
        "access_token",
        generateToken(
          user._id,
          user.firstName,
          user.lastName,
          user.email,
          user.isAdmin
        ),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      )
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ error: "Must enter both fields" });
    }

    const user = await User.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (rememberMe) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }

      return res
        .cookie(
          "access_token",
          generateToken(
            user._id,
            user.firstName,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          message: "User logged in successfully",
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    } else {
      if (!user) {
        return res.status(401).json({ error: "User is not regestered" });
      } else {
        return res.status(401).json({ error: "Wrong credentials" });
      }
    }
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = req.body.firstName || req.user.firstName;
    user.lastName = req.body.lastName || req.user.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.city = req.body.city;
    user.zipCode = req.body.zipCode;
    user.state = req.body.state;

    let pass = req.body.password;
    if (pass) {
      if (await comparePassword(pass, user.password)) {
        user.password = await hashPassword(pass);
      }
    }

    await user.save();
    const { password, ...safeUser } = user.toObject();
    res.json({ message: "User updated successfully", updatedUser: safeUser });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const profile = await User.findOne({ _id: req.params.id }).select(
      "-password"
    );

    if (!profile) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json({ profile });
  } catch (err) {
    next(err);
  }
};

const writeReview = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { comment, rating } = req.body;
    const { _id, firstName, lastName } = req.user;

    if (!(comment && rating)) {
      await session.abortTransaction();
      return res.status(400).json({ error: "All inputs are required" });
    }

    const product = await Product.findById(req.params.productId)
      .populate("reviews")
      .session(session);

    if (!product) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ error: "User has already reviewed the product." });
    }

    const review = new Review({
      comment,
      rating: Number(rating),
      user: { _id, name: `${firstName} ${lastName}` },
    });

    await review.save({ session });

    let ratingArr = [...product.reviews].map((item) => item.rating);
    // console.log(ratingArr)

    if (product.reviews.length == 0) {
      product.reviews.push(review._id);
      product.reviewsNumber = 1;
      product.rating = Number(rating);
    } else {
      product.reviews.push(review._id);
      product.reviewsNumber = product.reviews.length;
      let sum = ratingArr.reduce((acc, r) => acc + r, Number(rating));
      // console.log("sum", sum);
      product.rating = Number(sum / product.reviews.length);
    }

    // console.log("product", product);

    await product.save({ session });

    await session.commitTransaction();
    res.json({ message: "review is submitted", product });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName email isAdmin"
    );
    res.json({ message: "User Fetched", user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    
    (user.firstName = req.body.firstName || user.firstName),
      (user.lastName = req.body.lastName || user.lastName),
      (user.email = req.body.email || user.email),
      (user.isAdmin = req.body.isAdmin);

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUserData,
  updateUser,
  deleteUser,
};
