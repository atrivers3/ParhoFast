const jwt = require("jsonwebtoken");


// The next is a Function like green signal. when get request. to send responce first we have to check is next function called, if called only then responce send to user
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //How JWT verify Token expired: First It check SIgnature(It uses the JWT_SECRET to re-calculate the hash.) Then check Timestamp(It decodes the exp(a Unix timestamp inside the encrypted-looking string.) claim and compares it to the current server time.)
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


exports.isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Only teachers allowed" });
  }
  next();
};