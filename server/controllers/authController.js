const jwt = require("jsonwebtoken");

const getMe = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);

    if (!decode) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.json({ verifiedUser: decode });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const logout = async (req, res) => {
  return res.clearCookie("access_token").json({ message: "Logged out" });
};

module.exports = { getMe, logout };
