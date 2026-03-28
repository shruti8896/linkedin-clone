import jwt from "jsonwebtoken";

export const genAccessToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: process.env.Access_Expiry,
    });
  } catch (error) {
    console.error(error);
  }
};

export const genRefreshToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: process.env.Refresh_Expiry,
    });
  } catch (error) {
    console.error(error);
  }
};
