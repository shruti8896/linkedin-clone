function validateSignup(firstname, email, username, password) {
  if (!firstname || !username || !email || !password) {
    throw new Error("All the required fields must be filled!!");
  }
  if (password.length < 8) {
    throw new Error("Password must be 8 characters or more!!");
  }
  if (!email.includes("@")) {
    throw new Error("Invalid email format!!");
  }
}

export default validateSignup;

export function validateLogin(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required!!");
  }
}
