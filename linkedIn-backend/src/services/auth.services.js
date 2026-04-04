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
  //TODO:normalize email and username, test@gmail.com != Test@gmail.com
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    if (existingUser?.email === email) {
      throw new Error("Email already exists");
    }
    if (existingUser?.username === username) {
      throw new Error("username  already exists");
    }
  } else {
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    const accessToken = genAccessToken(newUser._id);
    const refreshToken = genRefreshToken(newUser._id);
    newUser.refreshToken = refreshToken;
    await newUser.save();

    const userData = {
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
    };

    return { userData, accessToken, refreshToken };
  }
};

export const loginService = async ({ email, password }) => {
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  //basic password validation
  const passwordMatch = await comparePassword(password, user.password);

  if (passwordMatch) {
    const accessToken = genAccessToken(user._id);
    const refreshToken = genRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    //TODO: store refresh token and rotate on every request
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
    await User.findOneAndUpdate(
    { refreshToken: token },
    { $set: { refreshToken: null } }
  );
    // res.clearcookie("refreshToken");
  } catch (error) {
    throw error;
  }
};
