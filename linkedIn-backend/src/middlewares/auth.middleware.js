import jwt from "jsonwebtoken";

export const getCurrentUserToken = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    console.log("Printing token!!");
    console.log(token);
    if (!token) {
      console.log("Inside the not token box");
      return res
        .status(401)
        .json({ message: "Unauthorized: No current User found!!" });
    }
    console.log("Came out of the  no token block");
    let verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token!!" });
    }
    console.log("printing verify token");
    console.log(verifyToken);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
