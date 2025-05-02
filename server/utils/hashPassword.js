const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash
}
// hashPassword("123123").then(x => console.log(x))

const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword)
}

module.exports = {hashPassword, comparePassword}

