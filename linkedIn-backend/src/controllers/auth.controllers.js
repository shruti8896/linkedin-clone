import {
  logoutService,
  registerService,
  loginService,
} from "../services/auth.services.js";
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password);
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login Successfull!!",
      user: user.user,
      accessToken: user.accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
};

export const register = async (req, res) => { 
  const { name, email, password, role } = req.body;
  try {
    const response = await registerService({ name, email, password, role });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await logoutService(refreshToken);
    res.clearCookie("refreshToken")
    return res.status(200).json({ message: "logout successfully!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "logout failed!!" });
  }
};
