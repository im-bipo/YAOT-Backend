const { getUser } = require("../services/Auth");

const CheckForAuthentication = async (req, res, next) => {
  //check cookies
  if (!req.cookies?.uid) {
    req.body.user = null;
    return next();
  }
  if (!req.body?.userRole) {
    console.log('no user role',req.body);
    req.body.userRole = null;
    return next();
  }
  console.log('user role',req.body);

  //verify jwt
  const userDetailsJwt = getUser(req.cookies.uid, next);

  if (req.body.userRole !== userDetailsJwt?.role) {
    return next({
      status: 401,
      msg: "error in local storage, user role is not valid",
    });
  }

  req.body.user = userDetailsJwt;
  next();
};


const restrictTo = (roles = ['']) => {
  return async (req,res,next) => {
    if(!roles.includes(req.body.userRole))
    next({mgs :'unauthorize',req : req.body})
    
    next()
  }
}

module.exports = {CheckForAuthentication,restrictTo};
