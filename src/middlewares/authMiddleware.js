import jwt from "jsonwebtoken";

const SECRET = "mon_secret_super_secure";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token requis" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // on stocke user
    next(); // 🔥 très important
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
}