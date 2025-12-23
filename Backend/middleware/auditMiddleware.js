// Audit middleware removed per request.
// If any code still imports this, calls will throw to surface the leftover usage.
exports.auditMiddleware = (action, description) => {
  return (req, res, next) => {
    throw new Error("Audit middleware removed");
  };
};

exports.logAction = async () => {
  throw new Error("Audit logging removed");
};
