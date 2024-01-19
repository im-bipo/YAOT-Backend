const mongoose = require("express");
const passwordHash = require("password-hash");

const USER = require("../models/user");
const { setUser } = require("../services/Auth");

const createNewUser = async (req, res, next) => {
  data = req.body;
  if (!data.name || !data.email || !data.password) {
    return next({
      status: 400,
      reqType: "createNewUser",
      resMsg:
        "Incomplete form => name, email, password are not filled properly",
    });
  }

  data.password = passwordHash.generate(data.password);

  try {
    const result = await USER.create(data);
    const token = setUser({
      name: result.name,
      email: result.email,
      role: result.role,
      pUrl: result.profilePicture,
    });
    return res.status(201).cookie("uid", token).json({ userId: result._id });
  } catch (err) {
    next(err);
  }
};
const checkForExistingUser = async (req, res, next) => {
  data = req.body;
  if (!data.email || !data.password) {
    next({
      status: 400,
      reqType: "SignUp User",
      resMsg: "Incomplete form => email, password are not filled properly",
    });
  }

  const email = data.email;
  const password = data.password;

  USER.findOne({ email }).then((userDetails) => {
    if (!userDetails) {
      next({ status: 400, msg: "user not found" });
    }
    if (passwordHash.verify(password, userDetails?.password)) {
      const token = setUser({
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
        pUrl: userDetails.profilePicture,
      });
      return res.cookie("uid", token).json({ msg: "signUp sucessfull" });
    }
    next({ status: 400, msg: "incorrect password" });
  });
};

module.exports = { createNewUser, checkForExistingUser };
