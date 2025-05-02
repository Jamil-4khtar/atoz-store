const { Router } = require("express");
const { getMe, logout } = require("../controllers/authController");
const router = Router();


router.get("/me", getMe);
router.post("/logout", logout)


module.exports = router