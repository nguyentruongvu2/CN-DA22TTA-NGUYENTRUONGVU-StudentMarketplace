const express = require("express");
const router = express.Router();
const postTypeController = require("../controllers/postTypeController");
const { authenticate, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/active", postTypeController.getActivePostTypes);

// Protected routes (Admin only)
router.get("/", authenticate, isAdmin, postTypeController.getAllPostTypes);
router.get("/:id", authenticate, isAdmin, postTypeController.getPostTypeById);
router.post("/", authenticate, isAdmin, postTypeController.createPostType);
router.put("/:id", authenticate, isAdmin, postTypeController.updatePostType);
router.delete("/:id", authenticate, isAdmin, postTypeController.deletePostType);

module.exports = router;
