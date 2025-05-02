const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUserData,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyLogin, verifyIsAdmin } = require("../middleware/verifyAuthToken");

// user routes:
router.post("/register", registerUser);
router.post("/login", loginUser);

// user logged in routes:
router.use(verifyLogin);
router.put("/profile", updateUserProfile);
router.get("/profile/:id", getUserProfile);
router.post("/review/:productId", writeReview);

// admin routes:
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUserData)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


module.exports = router;
