const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Customer = require("../models/customers");

const authorize = (req, res, next) => {
  console.log("in authooooo");
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'camilla miller webapp', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};


const checkUser = async(req, res, next) => {
  console.log("IN CHECK USERRRRRRRR");
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'camilla miller webapp', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Customer.findById(decodedToken.id);
        res.locals.user = user;
        res.locals.mtc = true;
        res.locals.wl= true;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authorize, checkUser };