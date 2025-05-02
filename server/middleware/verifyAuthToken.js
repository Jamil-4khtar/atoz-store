const jwt = require("jsonwebtoken");

const verifyLogin = async (req, res, next) => {
  // return next()
  try {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "forbidden" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);
    req.user = decode;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyIsAdmin = (req, res, next) => {
  // return next()
    if(req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "User does not have administrative access" })
    }
};

module.exports = { verifyLogin, verifyIsAdmin };
