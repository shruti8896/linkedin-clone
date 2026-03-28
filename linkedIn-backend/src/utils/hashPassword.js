import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (newPassword, oldPassword) => {
  return await bcrypt.compare(newPassword, oldPassword);
};
