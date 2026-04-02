import jwt from "jsonwebtoken";

export const getCurrentUserToken = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    console.log(token);
    if (!token) {
      res.status(400).json({ message: "Invalid token!!" });
    }
    let verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      res.status(400).json({ message: "Invalid token!!" });
    }
    console.log("printing verify token");
    console.log(verifyToken);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
