import { compare } from "bcryptjs";
import User from "../models/user.models.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { genAccessToken, genRefreshToken } from "../config/token.js";
export const registerService = async ({ name, email, password, role }) => {
  const hashedPassword = await hashPassword(password);
  const userExists = await User.findOne({ name });
  if (userExists) {
    throw new Error("User already exists");
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email id  already exists");
  } else {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return newUser;
  }
};

export const loginService = async (email, password) => {
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  //basic password validation
  const passwordMatch = await comparePassword(password, user.password);

  if (passwordMatch) {
    const accessToken = genAccessToken(user._id);
    const refreshToken = genRefreshToken(user._id);
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    console.log("login succesfull");
    return { userData, accessToken, refreshToken };
  } else throw new Error("password mismatch!!");
};

export const logoutService = async (token) => {
  try {
    // res.clearcookie("refreshToken");
  } catch (error) {
    throw error;
  }
};
