import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.json({ success: false, message: "Not Authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    req.body.role = decoded.role;
    next();
  } catch {
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
