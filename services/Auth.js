const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECURITY_KEY = process.env.SECURITY_KEY;

const setUser = (user) => {
  const token = jwt.sign(user, SECURITY_KEY);
  return token;
};

const getUser = (token, next) => {
  try {
    const user = jwt.verify(token, SECURITY_KEY);
    return user;
  } catch (err) {
    next({ status: 400, msg: "cant validate user" });
  }
};

module.exports = { setUser, getUser };
