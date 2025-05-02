const jwt = require("jsonwebtoken");

const generateToken = (_id, firstName, lastName, email, isAdmin) => {
  return jwt.sign(
    { _id, firstName, lastName, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  
};

module.exports = generateToken;
