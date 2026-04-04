import {
  logoutService,
  registerService,
  loginService,
} from "../services/auth.services.js";
import validateSignup from "../validators/auth.validator.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService({
      email: email.toLowerCase().trim(),
      password,
    });
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.status(200).json({
      message: "Login Successfull!!",
      user: user.userData,
      accessToken: user.accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Credential!!" });
  }
};

export const register = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  console.log(req.body);
  try {
    validateSignup(firstname, email, username, password);
    const response = await registerService({
      firstname,
      lastname,
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password,
    });
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "SignUp Successfull!!",
      user: response.userData,
      accessToken: response.accessToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error);
    return;
  }
};

export const logout = async (req, res) => {
  try {
    console.log("in logout")
    // const userId = req.user.id;
    const refreshToken = req.cookies.refreshToken;
    await logoutService(refreshToken);
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "logout successfully!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "logout failed!!" });
  }
};
 