// AuditLog controller removed per request.
// File retained only as a marker; do not call these functions.
exports.createAuditLog = async () => {
  throw new Error("AuditLog controller removed");
};

exports.getAuditLogs = async (req, res) => {
  res.status(410).json({ success: false, message: "Audit logs removed" });
};

exports.getUserAuditLogs = async (req, res) => {
  res.status(410).json({ success: false, message: "Audit logs removed" });
};

exports.cleanupOldLogs = async (req, res) => {
  res.status(410).json({ success: false, message: "Audit logs removed" });
};
