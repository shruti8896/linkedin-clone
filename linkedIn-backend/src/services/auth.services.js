import { compare } from "bcryptjs";
import User from "../models/user.models.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { genAccessToken, genRefreshToken } from "../config/token.js";
export const registerService = async ({
  firstname,
  lastname,
  username,
  email,
  password,
}) => {
  const hashedPassword = await hashPassword(password);
  const emailExists = await User.findOne({ email });
  console.log("0--------------------------=0");
  if (emailExists) {
    throw new Error("Email already exists");
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new Error("user id  already exists");
  } else {
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
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
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
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
