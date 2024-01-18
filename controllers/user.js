const mongoose = require("express");
const passwordHash = require("password-hash");

const USER = require("../models/user");

const createNewUser = async (req, res, next) => {
  data = req.body;
  if (!data.name || !data.email || !data.password) {
    next({
      reqType: "createNewUser",
      resMsg:
        "Incomplete form => name, email, password are not filled properly",
    });
  }
  data.password = passwordHash.generate(data.password);

  try {
    const result = await USER.create(data);
    return res.status(201).json({ userId: result._id });
  } catch (err) {
    next(err);
  }
};
const checkForExistingUser = async (req, res, next) => {
  data = req.body;
  if (!data.email || !data.password) {
    next({
      reqType: "SignUp User",
      resMsg: "Incomplete form => email, password are not filled properly",
    });
  }

  const email = data.email;
  const password = data.password;

  USER.findOne({ email }).then((userDetails) => {
    console.log(userDetails);
    if (!userDetails) {
      next({ msg: "user not found" });
    }
    if (passwordHash.verify(password, userDetails?.password)) {
      return res.cookie('uid' , 'hidost').json({ msg: "signUp sucessfull" });
    }
    next({ msg: "incorrect password" });
  });
};

module.exports = { createNewUser, checkForExistingUser };
