// AuditLog routes file removed per request.
// This file intentionally throws to indicate the routes were deleted.
const express = require("express");
const router = express.Router();

router.use((req, res) => {
  res.status(410).json({ success: false, message: "Audit routes removed" });
});

module.exports = router;
