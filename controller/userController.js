
const Customer = require("../models/customers");
const jwt = require('jsonwebtoken');
const { compare } = require("bcrypt");



const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'camilla miller webapp', {
    expiresIn: maxAge
  });
};


module.exports.login_get = (req,res) => {
    res.render('login');
}

module.exports.signup_get = (req,res) => {
    res.render('signup');
}

const handleErrors = (err) => {

  console.log(err.message);
  var errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('customer validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}



module.exports.signup_post = async (req, res) => {

  const { email, password } = req.body;
  try 
  {
    const customer = await Customer.create({ email, password });
    //set cookie with jwt 
    const token = createToken(customer._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ customer: customer._id });
  }
  catch(err) 
  {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
   
}

module.exports.login_post = async (req, res) => {

  const { email, password } = req.body;

  try {
    const customer = await Customer.login(email, password);
    console.log("Customer in controller" + customer);

    //set cookie with jwt
    const token = createToken(customer._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    console.log("user exists");
    res.status(200).json({ customer: customer._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
  
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}





