const { getUser } = require("../services/Auth");


// const USER = require("../models/user");
// const mongoose = require("mongoose");

const allowOnlyAdmins = async (req, res, next) => {
  //check cookies
  if (!req.cookies?.uid) return next({ status: 400, msg: "login first" });

  //check user role
  if (req.body.userRole !== "admin")
    return next({ status: 401, msg: "page not found" });

  //verify jwt
  const userDetailsJwt = getUser(req.cookies.uid,next);

  //verify role in database
  //   const userDetailsFormDb = await USER.findOne({
  //     email: userDetailsFormJwt.email,
  //   })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => next(err));
  //   console.log(userDetailsFormDb);

  if (req.body.userRole !== userDetailsJwt.role) {
    return next({
      status: 401,
      msg: "error in local storage, user role is not valid",
    });
  }
  console.log(userDetailsJwt);
  next();
};

module.exports = allowOnlyAdmins;
