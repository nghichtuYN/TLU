const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const genneralAccessToken = async (payload) => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
  return accessToken;
};

module.exports = { genneralAccessToken };
