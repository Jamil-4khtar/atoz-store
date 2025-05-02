const express = require("express");
const router = express.Router();
const {getCategories, newCategory, deleteCategory, saveAttr} = require("../controllers/categoryController");
const { verifyLogin, verifyIsAdmin } = require("../middleware/verifyAuthToken");

router.get("/", getCategories);

// admin routes
router.use(verifyLogin)
router.use(verifyIsAdmin)
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr)



module.exports = router