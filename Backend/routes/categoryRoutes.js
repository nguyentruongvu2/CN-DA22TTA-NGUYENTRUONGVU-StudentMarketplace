const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticate, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/active", categoryController.getActiveCategories);

// Protected routes (Admin only)
router.get("/", authenticate, isAdmin, categoryController.getAllCategories);
router.get("/:id", authenticate, isAdmin, categoryController.getCategoryById);
router.post("/", authenticate, isAdmin, categoryController.createCategory);
router.put("/:id", authenticate, isAdmin, categoryController.updateCategory);
router.delete("/:id", authenticate, isAdmin, categoryController.deleteCategory);

module.exports = router;
