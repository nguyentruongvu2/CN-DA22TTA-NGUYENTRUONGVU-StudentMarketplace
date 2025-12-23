const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");
const { authenticate, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/active", filterController.getActiveFilters);

// Protected routes (Admin only)
router.get("/", authenticate, isAdmin, filterController.getAllFilters);
router.get("/:id", authenticate, isAdmin, filterController.getFilterById);
router.post("/", authenticate, isAdmin, filterController.createFilter);
router.put("/:id", authenticate, isAdmin, filterController.updateFilter);
router.delete("/:id", authenticate, isAdmin, filterController.deleteFilter);

module.exports = router;
